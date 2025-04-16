//import axios from 'axios'; DESCOMENTAR PARA USAR API
import { Job } from '@/types/job';
/* usando el db.json como API
export const getJobOffers = async (): Promise<Job[]> => {
  const response = await axios.get<Job[]>('http://localhost:5001/jobs');
  return response.data;
};
*/
// usando el db.json sin API
import jobsData from '../../db.json';

export const getJobOffers = async (): Promise<Job[]> => {
  return jobsData.jobs;
};
