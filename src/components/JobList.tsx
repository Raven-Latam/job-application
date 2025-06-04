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
      setJobs(data.jobs);
      setFilteredJobs(data.jobs);
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
      (updatedFilters.location === '' || job.locations.includes(updatedFilters.location)) &&
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
    if (key === 'locations') {
      const allLocations = jobs.flatMap(job => job.locations);
      return Array.from(new Set(allLocations)).sort();
    }
    return Array.from(new Set(jobs.map(job => job[key] as string | number))).sort();
  };
  

  // Normalizar el nombre de la vertical para usarlo como clave
  const normalizeVerticalName = (vertical: string) => {
    return vertical.replace(/ /g, '_');
  };

  // Agrupar trabajos por vertical
  const groupedJobs = filteredJobs.reduce<Record<string, Job[]>>((acc, job) => {
    const normalizedVertical = normalizeVerticalName(job.vertical);
    if (!acc[normalizedVertical]) {
      acc[normalizedVertical] = [];
    }
    (acc[normalizedVertical] ??= []).push(job);

    return acc;
  }, {});

  const verticalIcons: Record<string, string> = {
    'Technology_&_Operations': '/icons/tech.svg',
    'Growth & Analytics': '/icons/growth.svg',
    'Manta Agency': '/icons/wings.svg',
    'Product_Design_&_Experience': '/icons/experience.svg',
    'Business_&_Design': '/icons/business.svg'
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
          {getUniqueValues('locations').map((location) => (
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
      {Object.entries(groupedJobs).map(([verticalKey, jobs]) => (
        <div key={verticalKey} className='vertical-margin'>
          <h3 className="title-vertical">
            <Image src={verticalIcons[verticalKey]!} alt={`Icono de ${verticalKey.replace(/_/g, ' ')}`} className='vertical-icon' width={24} height={24}/>
            {verticalKey.replace(/_/g, ' ')}
          </h3>

          <hr className='line' />

          {jobs.map((job) => (
            <div key={job.id} className='job-offer'>
              <div>
                <p className="job-title">{job.title}</p>
                <p className="job-meta">{job.workMode} | {job.jobType}</p>
                <p className="job-meta">{job.locations?.join(' | ')}</p>
              </div>
              <Link
                href={`/jobs/${job.id}`}
                className={`job-button hover-${verticalKey.toLowerCase()}`}
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