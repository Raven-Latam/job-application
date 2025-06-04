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
      responsabilities: string;
      skillsAndExperience: string;
    };
    locations: string[];
    workMode: string;
    jobType: string;
  }
  