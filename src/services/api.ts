import axios from 'axios';
import { Job } from '@/types/job';

export const getJobOffers = async (): Promise<Job[]> => {
  const response = await axios.get<Job[]>('http://localhost:5001/jobs');
  return response.data;
};