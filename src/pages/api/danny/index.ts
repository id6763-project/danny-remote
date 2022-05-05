import Cors from 'cors';

export interface DannyStatus {
  isBusy: boolean;
  currentSessionId?: string;
  isPlaying?: boolean;
}

export const danny: DannyStatus = {
  isBusy: false,
  currentSessionId: null,
};

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    res.status(200).send(danny);
  } else if (req.method === 'POST') {
    danny.isBusy = false;
    danny.isPlaying = false;
    danny.currentSessionId = null;

    res.status(200).send(danny);
  }
}
