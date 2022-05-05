import { Session } from '../api/session';
import { Api } from './Api';

export class SessionManager {
  constructor() {}

  createAndSaveSession(): Promise<Session> {
    return Api.invoke<Session>('sessions/create', { method: 'POST' }).then(
      (session) => {
        sessionStorage.setItem('session', session.id);
        return session;
      }
    );
  }

  /**
   * Function to check for existing session or create a new one.
   */
  getSession(): Promise<Session> {
    const sessionId = sessionStorage.getItem('session');

    if (sessionId) {
      return Api.invoke<Session>(`sessions/${sessionId}/get`).catch(() =>
        this.createAndSaveSession()
      );
    } else {
      return this.createAndSaveSession();
    }
  }
}

export const sessionManager = new SessionManager();
