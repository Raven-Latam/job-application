const API_URL = 'https://dev.bo.raven.inc/api/recruiter/offerings';
export const getJobOffers = async () => {
  try {
    const res = await fetch(API_URL, {
      headers: {
        'X-Raven-Api-Token': process.env.NEXT_PUBLIC_RAVEN_API_TOKEN || '',
      },
    });

    if (!res.ok) {
      throw new Error(`Error en la API: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching job offers:', error);
    return { jobs: [], countries: [], currencies: [] };
  }
};