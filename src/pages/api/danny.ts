export interface DannyStatus {
  isBusy: boolean;
  currentSessionId?: string;
  isPlaying?: boolean;
}

export const danny: DannyStatus = {
  isBusy: false,
  currentSessionId: null,
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).send(danny);
  } else if (req.method === 'POST') {
    const { sessionId } = req.body;

    danny.isBusy = true;
    danny.currentSessionId = sessionId;

    res.status(200).send(danny);
  }
}
