import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

// Simple in-memory store for rate limiting
// Note: This will reset when the serverless function cold starts
const rateLimit = new Map<string, { count: number; timestamp: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

export async function POST(request: Request) {
  // Get IP address from headers
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0] || 'unknown';
  
  // Check rate limit
  const now = Date.now();
  const userRateLimit = rateLimit.get(ip);
  
  if (userRateLimit) {
    // Clean up old rate limit entries
    if (now - userRateLimit.timestamp > RATE_LIMIT_WINDOW) {
      rateLimit.delete(ip);
    } else if (userRateLimit.count >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }

  // Update rate limit
  rateLimit.set(ip, {
    count: (userRateLimit?.count || 0) + 1,
    timestamp: userRateLimit?.timestamp || now,
  });

  // Add request origin validation
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    `https://www.${process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '')}`,
    process.env.NEXT_PUBLIC_PREVIEW_URL,
    'http://localhost:3000'
  ].filter((origin): origin is string => Boolean(origin));

  if (!origin || !allowedOrigins.some(allowed => origin === allowed)) {
    console.log('Invalid origin:', origin); // For debugging
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Resend API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { name, email, subject, message } = await request.json();

    // Enhanced input validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Length validation
    if (
      name.length > 100 || 
      email.length > 100 || 
      subject.length > 200 || 
      message.length > 1000
    ) {
      return NextResponse.json({ error: 'Input length exceeds limit' }, { status: 400 })
    }

    // In development, log the email instead of sending
    if (process.env.NODE_ENV === 'development') {
      console.log('Email would be sent:', {
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [contactEmail || 'febnawanrochman2@gmail.com'],
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
      
      return NextResponse.json(
        { message: 'Email logged in development' },
        { status: 200 }
      );
    }

    // Production email sending
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [contactEmail || 'febnawanrochman2@gmail.com'],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
