import SEO_DATA from '@/constants/SEO_DATA/SEO_DATA';
import getMetadata from '@/utils/seo/get-metadata';

export const metadata = getMetadata(SEO_DATA.index);

export default function Page() {
  return <h1> Hello, Home page! </h1>;
}
