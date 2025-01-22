'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
  onSubmitSuccess?: () => void;
  onSubmitError?: () => void;
}

const ContactForm: FC<ContactFormProps> = ({ onSubmitSuccess, onSubmitError }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [history, setHistory] = useState<Array<{ prompt: string; response: string }>>([]);

  const steps = [
    {
      prompt: 'Please enter your name:',
      key: 'name',
      validate: (value: string) => value.length >= 2
    },
    {
      prompt: 'Enter your email address:',
      key: 'email',
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      prompt: 'What is this regarding? (subject):',
      key: 'subject',
      validate: (value: string) => value.length >= 3
    },
    {
      prompt: 'Type your message:',
      key: 'message',
      validate: (value: string) => value.length >= 10
    }
  ];

  const handleSubmit = async (value: string) => {
    const step = steps[currentStep];
    if (!step.validate(value)) {
      setHistory(prev => [...prev, {
        prompt: step.prompt,
        response: 'Error: Invalid input. Please try again.'
      }]);
      return;
    }

    setFormData(prev => ({ ...prev, [step.key]: value }));
    setHistory(prev => [...prev, { prompt: step.prompt, response: value }]);
    setInput('');

    if (currentStep === steps.length - 1) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        onSubmitSuccess?.();
        setHistory(prev => [...prev, {
          prompt: 'Message sent successfully! ✨',
          response: ''
        }]);
        setTimeout(() => {
          setCurrentStep(0);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setHistory([]);
        }, 3000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setHistory(prev => [...prev, {
          prompt: 'Error sending message:',
          response: errorMessage
        }]);
        onSubmitError?.();
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input);
    }
  };

  return (
    <div className="bg-terminal-darker p-6 rounded-xl border border-terminal-border font-mono">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
        </div>
        <span className="text-sm text-code-gray">contact_installer.sh</span>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {history.map(({ prompt, response }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <div className="flex gap-2 text-sm">
                <span className="text-neon-purple">❯</span>
                <span className="text-neon-blue">~/contact$</span>
                <span className="text-code-white">{prompt}</span>
              </div>
              {response && (
                <div className="text-code-gray pl-6">
                  {response.startsWith('Error') ? (
                    <span className="text-red-400">{response}</span>
                  ) : (
                    response
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {currentStep < steps.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 text-sm items-center"
          >
            <span className="text-neon-purple">❯</span>
            <span className="text-neon-blue">~/contact$</span>
            <span className="text-code-white">{steps[currentStep].prompt}</span>
          </motion.div>
        )}

        <div className="flex items-center gap-2 pl-6">
          <span className="text-code-gray animate-pulse">|</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-code-white"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
