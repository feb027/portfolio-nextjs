import { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import StatusMessage from '../contact/StatusMessage';

interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    type: 'success' | 'error';
    message: string;
  }>;
  onClose: (id: string) => void;
}

const NotificationContainer: FC<NotificationContainerProps> = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 min-w-[320px] max-w-md">
      <AnimatePresence>
        {notifications.map((notification) => (
          <StatusMessage
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => onClose(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
