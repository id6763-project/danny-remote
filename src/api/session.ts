export interface Session {
  id: string;
  lastAccessedAt: number;
  createdAt: number;
  hasCompleted: boolean;
  hasMultipleAccess: boolean;
  isAdmin: boolean;
}
