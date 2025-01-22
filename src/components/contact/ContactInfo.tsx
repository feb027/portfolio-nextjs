import { FC } from 'react';

interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

const ContactInfo: FC = () => {
  const contactMethods: ContactMethod[] = [
    {
      icon: '📧',
      label: 'Email',
      value: 'hello@example.com',
      href: 'mailto:hello@example.com'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+1 234 567 890',
      href: 'tel:+1234567890'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'City, Country'
    }
  ];

  return (
    <div className="space-y-6">
      {contactMethods.map((method) => (
        <div key={method.label} className="flex items-center gap-4">
          <span className="text-2xl">{method.icon}</span>
          <div>
            <h3 className="text-sm text-slate-400">{method.label}</h3>
            {method.href ? (
              <a 
                href={method.href}
                className="text-blue-400 hover:text-blue-300"
              >
                {method.value}
              </a>
            ) : (
              <p className="text-slate-200">{method.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
