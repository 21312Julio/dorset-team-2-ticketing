import {
  format,
  formatISO,
  parseISO,
  isDate,
  differenceInMinutes,
} from 'date-fns';

/*
 * Use stripTZ to send datetime for Schedules and Recurrences
 * Server will add the appropriate timezone without changing
 * the original submitted datetime.
 * ISO-8601 Format: (formatISO)
 *   "+08:00" for timezones or "Z" for UTC
 */
export function stripTZ(datetime: string | Date): string {
  if (datetime) {
    let dt: string;
    if (isDate(datetime)) {
      dt = formatISO(datetime as Date);
    } else {
      dt = datetime as string;
    }
    return dt;
  }
}

/*
 * Use these functions to display schedule and recurrence
 * start and end_datetime.
 * This should show the time as per timezone set from server,
 * and not localized to local browser timezone.
 */
export function formatDateTimeNoTZ(datetime: string | Date) {
  let date: Date = parseISO(stripTZ(datetime));
  let formatted = format(date, 'd MMM yy, h:mm a');
  return formatted;
}

export function formatDateNoTZ(datetime: string | Date) {
  let date: Date = parseISO(stripTZ(datetime));
  let formatted = format(date, 'yyyy-MM-dd');
  return formatted;
}

export function formatTimeNoTZ(datetime: string | Date) {
  let date: Date = parseISO(stripTZ(datetime));
  let formatted = format(date, 'h:mm a');
  return formatted;
}

export function formatDayDateNoTZ(datetime: string | Date) {
  let date: Date = parseISO(stripTZ(datetime));
  let formatted = format(date, 'E, dd MMM yy');
  return formatted;
}

export function formatScheduleDuration(startDt: string, endDt: string) {
  let duration = getDurationMinutes(startDt, endDt);
  return `${duration} mins`;
}

export function getDurationMinutes(startDt: string, endDt: string) {
  return differenceInMinutes(parseISO(endDt), parseISO(startDt));
}
