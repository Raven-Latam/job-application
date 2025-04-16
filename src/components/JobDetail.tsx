'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../types/job';
import { getJobOffers } from '../services/api';
import Logo from './Logo';

type Props = {
  id: string;
};

const JobDetail = ({ id }: Props) => {
  const router = useRouter();
  
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      getJobOffers().then((data) => {
        const foundJob = data.find((j) => Number(j.id) === Number(id)); 
        setJob(foundJob || null);
      });
    }
  }, [id]);
  
  

  if (!job) {
    return <div>Cargando trabajo...</div>;
  }

  const formattedDescription = job.description.replace(/\n/g, '<br />');

  const getButtonClassName = () => {
    if (!job) return "job-button"; 

    switch (job.vertical) {
      case 'Tecnología':
        return 'job-button hover-tecnología';
      case 'Growth':
        return 'job-button hover-growth';
      case 'Wings':
        return 'job-button hover-wings';
      case 'Experience':
        return 'job-button hover-experience';
      case 'Business':
        return 'job-button hover-business';
      default:
        return 'job-button'; 
    }
  };

  return (
    <div className='job-container'>
      <Logo />
      <h1 className="job-title">{job.title}</h1>
      <button
        onClick={() => router.push(`/apply/${job.id}`)}
        className={getButtonClassName()}
      >
        APPLY FOR THIS JOB
      </button>
      <p className="job-meta">{job.location}</p>
      <p className="job-meta">{job.workMode} | {job.jobType}</p>
      <hr className='line' />
      <div>
        <h2 className="job-title">About us</h2>
        <p className="job-meta" dangerouslySetInnerHTML={{ __html: formattedDescription }} />
      </div>
    </div>
  );
};

export default JobDetail;
