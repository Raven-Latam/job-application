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
        const foundJob = data.find((j: Job) => j.id === Number(id)); 
        setJob(foundJob || null);
      });
    }
  }, [id]);

  const getButtonClassName = () => {
    if (!job) return 'job-button'; 

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

  if (!job) {
    return <div>Cargando trabajo...</div>;
  }

  // Solo format aboutUs
  const formattedAboutUs = job.description?.aboutUs?.replace(/\n/g, '<br />');

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
        <p
          className="job-meta"
          dangerouslySetInnerHTML={{ __html: formattedAboutUs || '' }}
        />

        <h2 className="job-title">About you</h2>
        <p className="job-meta">{job.description?.aboutYou}</p>

        <h2 className="job-title">Our work place</h2>
        <p className="job-meta">{job.description?.ourWorkPlace}</p>

        <h2 className="job-title">Our benefits</h2>
        <p className="job-meta">{job.description?.ourBenefits}</p>

        <h2 className="job-title">Tu rol</h2>
        <p className="job-meta">{job.description?.yourRole}</p>

        <h2 className="job-title">Responsabilidades</h2>
        <p className="job-meta">{job.description?.responsibilities}</p>

        <h2 className="job-title">Habilidades y experiencia</h2>
        <p className="job-meta">{job.description?.skillsAndExperience}</p>
      </div>
    </div>
  );
};

export default JobDetail;
