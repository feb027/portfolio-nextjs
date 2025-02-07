import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatDate(date: string) {
  // Ensure consistent date formatting regardless of timezone
  const parsedDate = parseISO(date);
  return format(parsedDate, 'MMMM d, yyyy', {
    locale: enUS,
  });
} 