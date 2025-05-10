// src/pages/api/animals.ts

import { NextApiRequest, NextApiResponse } from 'next';

const animals = [
  { id: 1, name: "Cow" },
  { id: 2, name: "Horse" },
  { id: 3, name: "Dog" }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(animals);
}