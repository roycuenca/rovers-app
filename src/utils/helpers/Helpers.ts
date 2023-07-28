import { format } from 'date-fns';

export const errorServiceHandler = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(`Error getting rover photos: ${error.message}`);
  } else {
    throw new Error('Unknown error occurred while getting rover photos');
  }
};

export const formattedDate = (date: Date) =>
  format(new Date(date), 'yyyy-MM-dd');

export const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 8);
};
