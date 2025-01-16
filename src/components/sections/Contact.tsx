'use client';

import { FC, useState, useCallback } from 'react';
import ContactForm from '../contact/ContactForm';
import ContactInfo from '../contact/ContactInfo';
import NotificationContainer from '../ui/NotificationContainer';

const Contact: FC = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'error';
    message: string;
  }>>([]);

  const addNotification = useCallback((type: 'success' | 'error', message: string) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, type, message }]);
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <section id="contact" className="py-20 min-h-screen flex flex-col">
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
      
      <div className="container mx-auto px-4">
        {/* Section title with code-like decoration */}
      <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-code-gray font-mono text-sm mb-2 block">// CONTACT</span>
            <h2 className="text-4xl font-mono text-code-white relative">
              <span className="text-neon-blue">&lt;</span>
              Contact
              <span className="text-neon-blue">/&gt;</span>
            </h2>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="mb-6 font-mono">
              <span className="text-code-gray text-sm">// Initialize contact details</span>
              <h3 className="text-xl mt-1">
                <span className="text-neon-purple">const</span>{' '}
                <span className="text-neon-blue">contactInfo</span>{' '}
                <span className="text-code-white">=</span>{' '}
                <span className="text-code-gray">{'{'}</span>
              </h3>
            </div>
            <ContactInfo />
          </div>

          <div>
            <div className="mb-6 font-mono">
              <span className="text-code-gray text-sm">// Start message wizard</span>
              <h3 className="text-xl mt-1">
                <span className="text-neon-purple">async function</span>{' '}
                <span className="text-neon-blue">sendMessage</span>
                <span className="text-code-white">()</span>{' '}
                <span className="text-code-gray">{'{'}</span>
              </h3>
            </div>
            <ContactForm
              onSubmitSuccess={() => 
                addNotification('success', 'Message sent successfully! I\'ll get back to you soon.')
              }
              onSubmitError={() => 
                addNotification('error', 'Failed to send message. Please try again.')
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
