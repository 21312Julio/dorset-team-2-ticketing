import { RRuleSet } from 'rrule';

export function capitalize(text: string) {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  } else {
    return text;
  }
}
