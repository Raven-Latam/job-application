import SEO_DATA from '@/constants/SEO_DATA/SEO_DATA';
import getMetadata from '@/utils/seo/get-metadata';
//import JobList from '@/components/JobList';
import '../styles/globals.css';

export const metadata = getMetadata(SEO_DATA.index);

/*export default function Page() {
  return <JobList />;
}*/

// src/app/page.tsx
export default function Page() {
  return <h1>¡Hola Mundo!</h1>;
}
