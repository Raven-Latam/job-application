import { Links } from '@/constants/links/links';

export const DEFAULT_IMAGE_PATH = '/raven-logo.png'; // Puede ser tu logo o una imagen OG

export default {
  index: {
    title: 'Raven App | Encuentra tu próximo trabajo',
    description: 'Explora oportunidades laborales por categoría, ubicación y vertical. Postula directamente desde nuestra plataforma.',
    pathname: Links.HOME,
    imagePath: DEFAULT_IMAGE_PATH,
  },
};
