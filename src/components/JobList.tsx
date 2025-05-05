'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getJobOffers } from '../services/api';
import { Job } from '../types/job';
import Logo from './Logo';
import Image from 'next/image'

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    vertical: '',
    location: '',
    workMode: '',
    jobType: ''
  });

  useEffect(() => {
    getJobOffers().then((data) => {
      setJobs(data);
      setFilteredJobs(data);
    });
  }, []);

  // Manejar cambios en los filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    // Filtrar trabajos en tiempo real
    const filtered = jobs.filter((job) => 
      (updatedFilters.vertical === '' || job.vertical === updatedFilters.vertical) &&
      (updatedFilters.location === '' || job.location === updatedFilters.location) &&
      (updatedFilters.workMode === '' || job.workMode === updatedFilters.workMode) &&
      (updatedFilters.jobType === '' || job.jobType === updatedFilters.jobType)
    );

    setFilteredJobs(filtered);
  };

  const handleClearFilters = () => {
    setFilters({
      vertical: '',
      location: '',
      workMode: '',
      jobType: ''
    });
  
    // Restaurar los trabajos filtrados a todos los trabajos disponibles
    setFilteredJobs(jobs);
  };
  
  // Obtener valores únicos para los filtros
  const getUniqueValues = (key: keyof Job) => {
    return Array.from(new Set(jobs.map(job => job[key] as string | number)));
  };
  
  // Agrupar trabajos por vertical
  const groupedJobs = filteredJobs.reduce<Record<string, Job[]>>((acc, job) => {
    if (!acc[job.vertical]) {
      acc[job.vertical] = [];
    }
    (acc[job.vertical] ??= []).push(job);

    return acc;
  }, {});

  const verticalIcons: Record<string, string> = {
    Tecnología: '/icons/tech.svg',
    Growth: '/icons/growth.svg',
    Wings: '/icons/wings.svg',
    Experience: '/icons/experience.svg',
    Business: '/icons/business.svg'
  };  

  return (
    <div className='job-container'>
      <Logo />

      {/* Filtros */}
      <div className="filters-container" >
        <select name="vertical" value={filters.vertical} onChange={handleFilterChange} className="filter-select">
          <option value="">Departament</option>
          {getUniqueValues('vertical').map((vertical) => (
            <option key={vertical} value={vertical}>{vertical}</option>
          ))}
        </select>

        <select name="location" value={filters.location} onChange={handleFilterChange} className="filter-select">
          <option value="">Location</option>
          {getUniqueValues('location').map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <select name="workMode" value={filters.workMode} onChange={handleFilterChange} className="filter-select">
          <option value="">Work Mode</option>
          {getUniqueValues('workMode').map((workMode) => (
            <option key={workMode} value={workMode}>{workMode}</option>
          ))}
        </select>

        <select name="jobType" value={filters.jobType} onChange={handleFilterChange} className="filter-select">
          <option value="">Job Type</option>
          {getUniqueValues('jobType').map((jobType) => (
            <option key={jobType} value={jobType}>{jobType}</option>
          ))}
        </select>
        <button onClick={handleClearFilters} className='clear-filter'>
          Clear Filters
        </button>
      </div>

      {/* Mostrar trabajos filtrados */}
      {Object.entries(groupedJobs).map(([vertical, jobs]) => (
        <div key={vertical} className='vertical-margin'>
          <h3 className="title-vertical">
            <Image src={verticalIcons[vertical]!} alt={`Icono de ${vertical}`} className='vertical-icon' width={24} height={24}/>
            {vertical}
          </h3>

          <hr className='line' />

          {jobs.map((job) => (
            <div key={job.id} className='job-offer'>
              <div>
                <p className="job-title">{job.title}</p>
                <p className="job-meta">{job.workMode} | {job.jobType}</p>
                <p className="job-meta">{job.location}</p>
              </div>
              <Link
                href={`/jobs/${job.id}`}
                className={`job-button hover-${vertical.toLowerCase()}`}
              >
                APPLY
              </Link>
            </div>
          ))}
        </div>
      ))}

    </div>
  );
};

export default JobList;
