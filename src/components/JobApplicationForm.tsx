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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [currency, setCurrency] = useState('CLP');
  const [portfolio, setPortfolio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');

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
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('currentLocation', currentLocation);
    formData.append('expectedSalary', expectedSalary);
    formData.append('currency', currency);
    formData.append('linkedin', linkedin);
    formData.append('portfolio', portfolio);
    formData.append('github', github);

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
            Which location are you applying for?
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className='inputs-form'
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
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
          <label htmlFor="expectedSalary" className="form-title">
            Expected Salary
          </label>
          <div className="salary-currency-container">
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-select"
            >
              <option value="CLP">CLP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="MXN">MXN</option>
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