/* import axios from 'axios';
import { Job } from '@/types/job';
usando el db.json como API
export const getJobOffers = async (): Promise<Job[]> => {
  const response = await axios.get<Job[]>('http://localhost:5001/jobs');
  return response.data;
};
*/
// usando el db.json sin API

export const getJobOffers = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/api/jobs`);
  const data = await res.json();
  return data;
};