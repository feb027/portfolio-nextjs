'use client';

import { FC, useState } from 'react';
import ContactForm from '../contact/ContactForm';
import ContactInfo from '../contact/ContactInfo';
import StatusMessage from '../contact/StatusMessage';

const Contact: FC = () => {
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  return (
    <section id="contact" className="py-20 min-h-screen flex flex-col">
      <div className="container mx-auto px-4">
        {/* Section title with code-like decoration */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-sm mb-2 block">{'// CONTACT'}</span>
            <h2 className="text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              Contact
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>
        
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
