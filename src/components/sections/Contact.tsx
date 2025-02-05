'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../contact/ContactForm';
import ContactInfo from '../contact/ContactInfo';
import StatusMessage from '../contact/StatusMessage';
import DOMPurify from 'dompurify'

const Contact: FC = () => {
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Use in form submissions
  const handleSubmit = async (data: FormData) => {
    try {
      const sanitizedData = {
        name: DOMPurify.sanitize(data.get('name') as string),
        email: DOMPurify.sanitize(data.get('email') as string),
        subject: DOMPurify.sanitize(data.get('subject') as string),
        message: DOMPurify.sanitize(data.get('message') as string)
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData)
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    }
  }

  return (
    <section id="contact" className="py-20 min-h-screen flex flex-col">
      <div className="container mx-auto px-4">
        {/* Enhanced Section Title - Matching other sections */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
            />
            <div className="py-4">
              <span className="text-code-gray font-mono text-sm mb-2 block">{'// SECTION'}</span>
              <h2 className="text-4xl font-mono text-code-white relative inline-block">
                <span className="text-neon-blue">&lt;</span>
                Contact
                <span className="text-neon-blue">/&gt;</span>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -right-8 top-1/2 w-6 h-px bg-neon-blue/30"
                  animate={{ width: [0, 24, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -left-8 top-1/2 w-6 h-px bg-neon-blue/30"
                  animate={{ width: [0, 24, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </h2>
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
            />
          </div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">{'Contact Information'}</h3>
            <ContactInfo />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">{'Send Me a Message'}</h3>
            {status && (
              <div className="mb-6">
                <StatusMessage
                  type={status.type}
                  message={status.message}
                  onClose={() => setStatus(null)}
                />
              </div>
            )}
            <ContactForm
              onSubmitSuccess={() => 
                setStatus({
                  type: 'success',
                  message: 'Message sent successfully! I\'ll get back to you soon.'
                })
              }
              onSubmitError={() => 
                setStatus({
                  type: 'error',
                  message: 'Failed to send message. Please try again.'
                })
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
