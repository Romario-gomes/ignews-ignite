/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Romário' },
    { id: 2, name: 'Janaína' },
    { id: 3, name: 'Vanessa' },
  ]

  return response.json(users);
};