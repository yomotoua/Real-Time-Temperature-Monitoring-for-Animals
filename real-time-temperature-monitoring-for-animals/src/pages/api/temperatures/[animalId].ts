import { NextApiRequest, NextApiResponse } from 'next';

type Temperature = {
  temperature: number;
  created_at: string;
};

const temperatures: { [key: string]: Temperature[] } = {
  cow: [
    {
      temperature: 36.5,
      created_at: '2025-05-10T20:02:00.000Z',
    },
  ],
  horse: [
    {
      temperature: 39.0,
      created_at: '2025-05-10T20:02:00.000Z',
    },
  ],
  dog: [
    {
      temperature: 37.5,
      created_at: '2025-05-10T20:02:00.000Z',
    },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { animalId } = req.query;

  // Validate animalId type
  if (typeof animalId === 'string') {
    if (temperatures[animalId]) {
      res.status(200).json(temperatures[animalId]);
    } else {
      res.status(404).json({ message: 'Animal not found' });
    }
  } else {
    res.status(400).json({ message: 'Invalid animal ID' });
  }
}
