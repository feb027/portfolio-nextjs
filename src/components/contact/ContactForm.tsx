'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, CheckCircle, XCircle } from 'lucide-react';

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
  const [history, setHistory] = useState<Array<{ prompt: string; response: string; status?: 'error' | 'success' }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const steps = [
    {
      prompt: 'Please enter your name:',
      key: 'name',
      validate: (value: string) => value.length >= 2,
      errorMessage: 'Name must be at least 2 characters long'
    },
    {
      prompt: 'Enter your email address:',
      key: 'email',
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: 'Please enter a valid email address'
    },
    {
      prompt: 'What is this regarding? (subject):',
      key: 'subject',
      validate: (value: string) => value.length >= 3,
      errorMessage: 'Subject must be at least 3 characters long'
    },
    {
      prompt: 'Type your message:',
      key: 'message',
      validate: (value: string) => value.length >= 10,
      errorMessage: 'Message must be at least 10 characters long'
    }
  ];

  // Simulate typing effect for prompts
  useEffect(() => {
    setIsTyping(true);
    const timeout = setTimeout(() => setIsTyping(false), 500);
    return () => clearTimeout(timeout);
  }, [currentStep]);

  // Get CSRF token on mount
  useEffect(() => {
    const getCsrfToken = async () => {
      const response = await fetch('/api/csrf');
      const { token } = await response.json();
      setCsrfToken(token);
    };
    getCsrfToken();
  }, []);

  const handleSubmit = async (value: string) => {
    const step = steps[currentStep];
    if (!step.validate(value)) {
      setHistory(prev => [...prev, {
        prompt: step.prompt,
        response: step.errorMessage,
        status: 'error'
      }]);
      return;
    }

    const updatedFormData = { ...formData, [step.key]: value };
    setFormData(updatedFormData);
    
    setHistory(prev => [...prev, { 
      prompt: step.prompt, 
      response: value,
      status: 'success'
    }]);
    setInput('');

    if (currentStep === steps.length - 1) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify(updatedFormData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to send message');
        }

        onSubmitSuccess?.();
        setHistory(prev => [...prev, {
          prompt: 'Message sent successfully! ✨',
          response: '',
          status: 'success'
        }]);
        
        // Reset form after delay
        setTimeout(() => {
          setCurrentStep(0);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setHistory([]);
        }, 3000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        setHistory(prev => [...prev, {
          prompt: 'Error sending message:',
          response: errorMessage,
          status: 'error'
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-terminal-darker rounded-xl border border-terminal-border overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="bg-terminal-dark border-b border-terminal-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/90" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
              <div className="w-3 h-3 rounded-full bg-green-500/90" />
            </div>
            <Terminal className="w-4 h-4 text-code-gray" />
          </div>
          <span className="font-mono text-sm text-code-gray">contact_form.sh</span>
          <Send className="w-4 h-4 text-code-gray" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {history.map(({ prompt, response, status }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-neon-purple select-none">❯</span>
                  <span className="text-neon-blue">~/message$</span>
                  <span className="text-code-white">{prompt}</span>
                </div>
                {response && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pl-6 flex items-center gap-2"
                  >
                    {status === 'error' ? (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400">{response}</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">{response}</span>
                      </>
                    ) : (
                      <span className="text-code-gray">{response}</span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {currentStep < steps.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="text-neon-purple select-none">❯</span>
              <span className="text-neon-blue">~/message$</span>
              <motion.span 
                className="text-code-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {steps[currentStep].prompt}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1 text-neon-blue"
                  >
                    █
                  </motion.span>
                )}
              </motion.span>
            </motion.div>
          )}

          <div className="flex items-center gap-2 pl-6 group">
            <motion.div
              animate={{ 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-neon-cyan"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-code-white 
                       placeholder:text-code-gray/50 font-mono text-sm"
              placeholder="Type your response and press Enter..."
              autoFocus
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
