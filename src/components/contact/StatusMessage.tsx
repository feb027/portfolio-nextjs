import { FC } from 'react';

interface StatusMessageProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
}

const StatusMessage: FC<StatusMessageProps> = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500/10' : 'bg-red-500/10';
  const borderColor = type === 'success' ? 'border-green-500' : 'border-red-500';
  const textColor = type === 'success' ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`${bgColor} ${borderColor} ${textColor} border rounded-lg p-4 relative`}>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1"
          aria-label="Close message"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
