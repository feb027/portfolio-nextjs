// Simple sanitization function that works in Edge runtime
export function sanitizeInput(input: string): string {
  // Remove HTML tags
  const withoutTags = input.replace(/<[^>]*>/g, '');
  
  // Remove potentially dangerous characters
  const sanitized = withoutTags
    .replace(/[<>{}]/g, '') // Remove angle brackets and curly braces
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .trim();
  
  return sanitized;
} 