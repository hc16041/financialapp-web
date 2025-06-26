import { format } from 'date-fns';

export class DateUtils {
  static formatDate(date: Date | string): string {
    return format(new Date(date), 'yyyy-MM-dd');
  }

  static formatDateTime(date: Date | string): string {
    return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
  }

  static isAfterToday(date: Date | string): boolean {
    return new Date(date) > new Date();
  }
}