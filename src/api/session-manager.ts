import { Session } from './session';
import { v4 as uuidv4 } from 'uuid';

export class SessionManager {
  sessions: Session[];

  constructor() {
    this.sessions = [];

    const adminSession = this.generateSession();
    adminSession.id = 'admin';
    adminSession.isAdmin = true;
  }

  retrieveSession(id: string) {
    return this.sessions.find((session) => session.id === id);
  }

  generateSession() {
    const newSession = {
      id: uuidv4(),
      lastAccessedAt: new Date().getTime(),
      createdAt: new Date().getTime(),
      hasCompleted: false,
      hasMultipleAccess: false,
      isAdmin: false,
    } as Session;

    this.sessions.push(newSession);

    return newSession;
  }
}

export const sessionManager = new SessionManager();
