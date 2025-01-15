'use client';

import { FC, FormEvent, useState } from 'react';

interface ContactFormProps {
  onSubmitSuccess?: () => void;
  onSubmitError?: () => void;
}

const ContactForm: FC<ContactFormProps> = ({ onSubmitSuccess, onSubmitError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    // This is just a placeholder
    try {
      // await submitForm(formData);
      onSubmitSuccess?.();
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      onSubmitError?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        required
        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
      />

      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        rows={6}
        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
