import { danny } from './index';
import { sessionManager } from '../../../api/session-manager';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId } = req.body;

    const currentSession = sessionManager.findSession(sessionId);

    danny.isBusy = false;
    danny.currentSessionId = sessionId;

    res.status(200).send(danny);
  }
}
