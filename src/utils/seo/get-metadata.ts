/* eslint-disable @typescript-eslint/no-explicit-any */
import SEO_DATA, { DEFAULT_IMAGE_PATH } from '@/constants/SEO_DATA/SEO_DATA';

const DEFAULT_TITLE = SEO_DATA.index.title;
const DEFAULT_DESCRIPTION = SEO_DATA.index.description;

export default function getMetadata({
  title,
  description,
  keywords,
  robotsNoindex,
  rssPathname = null,
  pathname,
  category = null,
  type = 'website',
  imagePath = DEFAULT_IMAGE_PATH,
}: any) {
  const SITE_URL = '';
  const canonicalUrl = SITE_URL + pathname;
  const imageUrl = imagePath?.startsWith('http') ? imagePath : SITE_URL + imagePath;

  const metaImageUrl = imagePath ? imageUrl : `${SITE_URL}${DEFAULT_IMAGE_PATH}`;
  const metaTitle = title || DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;

  const twitterSite = '';
  const locale = 'en_US';
  const siteName = '';
  const robots = robotsNoindex === 'noindex' ? { index: false } : 'index, follow';

  return {
    title: metaTitle,
    description: metaDescription,
    viewport: {
      width: 'device-width',
      initialScale: 1,
      viewportFit: 'cover',
    },
    alternates: {
      canonical: canonicalUrl,
      types: {
        'application/rss+xml': rssPathname ? `${SITE_URL}${rssPathname}` : null,
      },
    },
    keywords: Array.from(new Set(keywords?.split(',').map((keyword: any) => keyword.trim()))).join(
      ', '
    ),
    robots,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: metaImageUrl,
        },
      ],
      type,
      locale,
    },
    category,
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      site: twitterSite,
      images: [
        {
          url: metaImageUrl,
        },
      ],
    },
  };
}
