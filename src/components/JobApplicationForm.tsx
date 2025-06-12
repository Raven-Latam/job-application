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
  const [resume, setResume] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [currency, setCurrency] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  
  type Country = { code: string; name: string };
  type Currency = { code: string; name: string };

  const [countries, setCountries] = useState<Country[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    if (id) {
      getJobOffers().then((data) => {
        const found = data.jobs.find((j: Job) => j.id === Number(id));
        setJob(found || null);
        setCountries(data.countries || []);
        setCurrencies(data.currencies || []);
      });
    }
  }, [id]);  
  
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('nombre', firstName);
    formData.append('apellidos', lastName);
    formData.append('pais_residencia', currentLocation);
    formData.append('email', email);
    formData.append('telefono', phone);
    formData.append('pretencion_renta', expectedSalary);
    formData.append('moneda_pretencion_renta', currency);
    if (resume) {
      formData.append('curriculum', resume);
    }
    if (linkedin) formData.append('redes_sociales[linkedin]', linkedin);
    if (portfolio) formData.append('redes_sociales[portafolio]', portfolio);
    if (github) formData.append('redes_sociales[github]', github);

    try {
      const response = await fetch(`https://bo.raven.inc/api/recruiter/offerings/${id}`, {
        method: 'POST',
        headers: {
          'X-Raven-Api-Token': process.env.NEXT_PUBLIC_RAVEN_API_TOKEN || '',
        },
        body: formData
      });
  
      const result = await response.json();

      if (response.status === 201) {
        alert('✔️ Postulación enviada con éxito!');
      } else {
        alert(`❌ Error del servidor: ${response.status} - ${result.message || 'Sin mensaje'}`);
      }
    } catch (error) {
      console.error('❌ Error en la red o en el fetch:', error);
      alert('❌ Ocurrió un error en la red al enviar la postulación.');
    }
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
      case 'Technology & Operations':
        return 'button-send hover-technology_&_operations';
      case 'Growth & Analytics':
        return 'button-send hover-growth';
      case 'Manta Agency':
        return 'button-send hover-wings';
      case 'Product Design & Experience':
        return 'button-send hover-product_design_&_experience';
      case 'Business & Design':
        return 'button-send hover-business_&_design';
      default:
        return 'button-send hover-wings';
    }
  };

  return (
    <div className='job-container'>
      <Logo/>
      {job && ( 
        <>
          <h1 className="job-title">{job.title}</h1>
          <p className="job-meta">{job.locations?.join(' | ')}</p>
          <p className="job-meta">{job.workMode} | {job.jobType}</p>
          <hr className='line' />
        </>
      )}
      <form onSubmit={handleSubmit}>
        <div className="margin-inputs name-fields-container">
          <div className="input-half">
            <label htmlFor="firstName" className="form-title">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className='inputs-form'
            />
          </div>
          <div className="input-half">
            <label htmlFor="lastName" className="form-title">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className='inputs-form'
            />
          </div>
        </div>

        <div className='margin-inputs'>
          <label htmlFor="resume" className="form-title">
            Resume / CV
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
            📎 Upload file
          </label>

          <span className='file-alert'>
            {selectedFileName || 'No file selected'}
          </span>
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
            Phone Number
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
            Current location
          </label>
          <select
            id="currentLocation"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            required
            className='inputs-form'
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

        </div>
        <div className='margin-inputs'>
          <label htmlFor="expectedSalary" className="form-title">
            Expected Salary
          </label>
          <div className="salary-currency-container">
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-select"
            required
          >
            <option value="">Select currency</option>
            {currencies.map((cur) => (
              <option key={cur.code} value={cur.code}>
                {cur.name}
              </option>
            ))}
          </select>

            <input
              type="text"
              id="expectedSalary"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              className='inputs-form'
            />
          </div>
        </div>

        <div className='margin-inputs'>
          <label htmlFor="linkedin" className="form-title">
            LinkedIn
          </label>
          <input
            type="text"
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className='inputs-form'
          />
        </div>
        <div className='margin-inputs'>
          <label htmlFor="portfolio" className="form-title">
            Portfolio
          </label>
          <input
            type="text"
            id="portfolio"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className='inputs-form'
          />
        </div>
        <div className='margin-inputs'>
          <label htmlFor="github" className="form-title">
            GitHub
          </label>
          <input
            type="text"
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className='inputs-form'
          />
        </div>
        <button
          type="submit"
          className={getButtonClassName()}
        >
          SUBMIT APPLICATION
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;