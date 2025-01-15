interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
        variant === 'primary' ? 'bg-blue-600 text-white' :
        variant === 'secondary' ? 'bg-gray-600 text-white' :
        'border-2 border-blue-600 text-blue-600'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
