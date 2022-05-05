// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { danny } from './index';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId } = req.body;

    danny.isBusy = true;
    danny.currentSessionId = sessionId;

    res.status(200).send(danny);
  }
}
