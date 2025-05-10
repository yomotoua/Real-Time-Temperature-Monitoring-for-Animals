// src/pages/api/alerts.ts

import { NextApiRequest, NextApiResponse } from 'next';

const alerts = [
  { animal: 'Cow', temperature: 41.0 },
  { animal: 'Horse', temperature: 35.0 }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(alerts);
}
