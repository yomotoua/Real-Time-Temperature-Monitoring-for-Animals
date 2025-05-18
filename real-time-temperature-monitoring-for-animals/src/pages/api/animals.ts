import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch animals from the Django backend API
    const response = await fetch('http://127.0.0.1:8000/api/animals/'); // Make sure your Django backend exposes this endpoint
    const data = await response.json();

    // Check if the response is valid
    if (response.ok) {
      res.status(200).json(data); // Return the list of animals to the frontend
    } else {
      res.status(response.status).json({ message: 'Failed to fetch animals' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
