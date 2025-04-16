export interface Job {
    id: number;
    title: string;
    vertical: string;
    description: {
      aboutUs: string;
      aboutYou: string;
      ourWorkPlace: string;
      ourBenefits: string;
      yourRole: string;
      responsibilities: string;
      skillsAndExperience: string;
    };
    location: string;
    workMode: string;
    jobType: string;
  }
  