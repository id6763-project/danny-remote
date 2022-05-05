import { sessionManager } from '../../../../api/session-manager';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'GET') {
    const sessionId = req.query.id;
    const session = sessionManager.findSession(sessionId);

    if (session && session.isAdmin) {
      res.status(200).send(sessionManager.sessions);
    } else {
      res.status(200).send([]);
    }
  }
}
