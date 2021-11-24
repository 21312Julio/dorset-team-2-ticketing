import urljoin from 'url-join';
import { environment } from 'src/environments/environment';

export function URI(...url: string[]) {
  return urljoin(environment.baseUrl, ...url);
}
