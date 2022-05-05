export class Api {
  static baseUrl = '/api/';

  static invoke<T>(url, init?: RequestInit) {
    return fetch(`${this.baseUrl}${url}`, init).then(
      (res) => res.json() as unknown as T
    );
  }
}
