'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../types/job';
import { getJobOffers } from '../services/api';
import Logo from './Logo';
import { JOB_DEFAULTS } from '../constants/jobDefaults';

type Props = {
  id: string;
};

const JobDetail = ({ id }: Props) => {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      getJobOffers().then((data) => {
        const foundJob = data.jobs.find((j: Job) => j.id === Number(id)); 
        setJob(foundJob || null);
      });
    }
  }, [id]);

  const getButtonClassName = () => {
    if (!job) return 'job-button'; 

    switch (job.vertical) {
      case 'Technology & Operations':
        return 'job-button hover-technology_&_operations';
      case 'Growth':
        return 'job-button hover-growth';
      case 'Wings':
        return 'job-button hover-wings';
      case 'Product Design & Experience':
        return 'job-button hover-product_design_&_experience';
      case 'Business & Design':
        return 'job-button hover-business_&_design';
      default:
        return 'job-button hover-wings'; 
    }
  };

  if (!job) {
    return <div>Loading works...</div>;
  }

  // Formato para textos por default de la job description
  const formattedAboutUs = JOB_DEFAULTS.aboutUs.replace(/\n/g, '<br />');
  const formattedAboutYou = JOB_DEFAULTS.aboutYou.replace(/\n/g, '<br />');
  const formattedOurWorkPlace = JOB_DEFAULTS.ourWorkPlace.replace(/\n/g, '<br />');
  const cleanHTML = (html: string): string => {
    return html
      .replace(/<p><br\s*\/?><\/p>/gi, '') // quita <p><br></p>
      .replace(/&nbsp;/gi, ' ')            // reemplaza espacios duros por normales
      .trim();
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
      <p className="job-meta">{job.locations?.join(' | ')}</p>
      <p className="job-meta">{job.workMode} | {job.jobType}</p>
      <hr className='line' />

      <div>
        <h2 className="job-title">About us</h2>
        <p
          className="job-meta"
          dangerouslySetInnerHTML={{ __html: formattedAboutUs || '' }}
        />

        <h2 className="job-title">About you</h2>
        <p 
          className="job-meta"
          dangerouslySetInnerHTML={{ __html: formattedAboutYou || '' }}
        />

        <h2 className="job-title">Our work place</h2>
        <p 
          className="job-meta"
          dangerouslySetInnerHTML={{ __html: formattedOurWorkPlace || '' }}
        />

        <h2 className="job-title">The Job</h2>
        <p
          className="job-meta"
          dangerouslySetInnerHTML={{ __html: cleanHTML(job.description?.yourRole || '') }}
        />

        <h2 className="job-title">Responsibilities</h2>
        <p
          className="job-meta"
          dangerouslySetInnerHTML={{ __html: cleanHTML(job.description?.responsabilities || '') }}
        />

        <h2 className="job-title">Skills and Experience</h2>
        <p
          className="job-meta"
          dangerouslySetInnerHTML={{ __html: cleanHTML(job.description?.skillsAndExperience || '') }}
        />

        {job.description?.ourBenefits && (
          <>
            <h2 className="job-title">Our benefits</h2>
            <p
              className="job-meta"
              dangerouslySetInnerHTML={{ __html: cleanHTML(job.description.ourBenefits) }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
