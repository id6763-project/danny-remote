import { sessionManager } from '../../../../api/session-manager';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'GET') {
    const sessionId = req.query.id;
    const session = sessionManager.findSession(sessionId);

    if (session) {
      res.status(200).send(session);
    } else {
      res.status(404).send();
    }
  }
}
