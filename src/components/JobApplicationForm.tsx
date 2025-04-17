'use client';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { Job } from '../types/job';
import { getJobOffers } from '../services/api';

type Props = {
  id: string;
};

const JobApplicationForm = ({ id }: Props) => {

  const [job, setJob] = useState<Job | null>(null);
  const [location, setLocation] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');

  const locations = ['Santiago', 'Buenos Aires', 'Ciudad de México', 'Madrid'];

  useEffect(() => {
    if (id) {
      getJobOffers().then((data) => {
        const found = data.find((j: Job) => j.id === Number(id));
        setJob(found || null);
      });
    }
  }, [id]);  
  
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('location', location);
    if (resume) {
      formData.append('resume', resume);
    }
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('currentLocation', currentLocation);
    formData.append('currentCompany', currentCompany);

    fetch(`/api/jobs/${id}/apply`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error al enviar la aplicación:', error);
      });
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResume(file); 
    if (file) {
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName('');
    }
  };
  
  const getButtonClassName = () => {
    if (!job) return "button-send";

    switch (job.vertical) {
      case 'Tecnología':
        return 'button-send hover-tecnología';
      case 'Growth':
        return 'button-send hover-growth';
      case 'Wings':
        return 'button-send hover-wings';
      case 'Experience':
        return 'button-send hover-experience';
      case 'Business':
        return 'button-send hover-business';
      default:
        return 'button-send';
    }
  };

  return (
    <div className='job-container'>
      <Logo/>
      {job && ( 
        <>
          <h1 className="job-title">{job.title}</h1>
          <p className="job-meta">{job.location}</p>
          <p className="job-meta">{job.workMode} | {job.jobType}</p>
          <hr className='line' />
        </>
      )}
      <form onSubmit={handleSubmit}>
        <div className='margin-inputs'>
          <label htmlFor="location" className="form-title">
            ¿A qué ubicación estás aplicando?
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className='inputs-form'
          >
            <option value="">Selecciona una ubicación</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className='margin-inputs'>
          <label htmlFor="resume" className="form-title">
            Currículum / CV
          </label>

          <input
            type="file"
            id="resume"
            onChange={handleResumeChange}
            accept=".pdf,.doc,.docx"
            required
            className='file-hide'
          />

          <label
            htmlFor="resume"
            className='label-file'
          >
            📎 Subir archivo
          </label>

          <span className='file-alert'>
            {selectedFileName || 'Sin archivos seleccionados'}
          </span>
        </div>

        <div className='margin-inputs'>
          <label htmlFor="fullName" className="form-title">
            Nombre completo
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className='inputs-form'
          />
        </div>
        <div className='margin-inputs'>
          <label htmlFor="email" className="form-title">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='inputs-form'
          />
        </div>
        <div className='margin-inputs'>
          <label htmlFor="phone" className="form-title">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className='inputs-form'
          />
        </div>
        <div className='margin-inputs'>
          <label htmlFor="currentLocation" className="form-title">
            Ubicación actual
          </label>
          <input
            type="text"
            id="currentLocation"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            required
            className='inputs-form'
          />
        </div>
        <div className='margin-inputs'>
          <label htmlFor="currentCompany" className="form-title">
            Compañía actual
          </label>
          <input
            type="text"
            id="currentCompany"
            value={currentCompany}
            onChange={(e) => setCurrentCompany(e.target.value)}
            className='inputs-form'
          />
        </div>
        <button
          type="submit"
          className={getButtonClassName()}
        >
          Enviar aplicación
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;