import { Title, Meta, Link } from 'react-head';
import SocialImage from '../../assets/social-img.png';
import Logo from '../../assets/logo.png';

const BASE_URL = import.meta.env.VITE_FRONT_URL;
const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function SEO({
  title,
  description,
  image = SocialImage,
  path = '',
}) {
  const fullUrl = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${APP_NAME}`;

  const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return (
    <>
      {/* Title */}
      <Title>{fullTitle}</Title>

      {/* Basic SEO */}
      <Meta name="description" content={description} />
      <Meta
        name="keywords"
        content="Nexora, Social App, Social Media, RouteAcademy"
      />
      <Meta name="author" content="Abdelrahman Ayman" />
      <Meta name="robots" content="index, follow" />
      <Meta name="theme-color" content="#000000" />
      <Meta name="color-scheme" content="dark light" />

      {/* Canonical */}
      <Link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content={APP_NAME} />
      <Meta property="og:title" content={fullTitle} />
      <Meta property="og:description" content={description} />
      <Meta property="og:url" content={fullUrl} />
      <Meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={fullTitle} />
      <Meta name="twitter:description" content={description} />
      <Meta name="twitter:image" content={fullImage} />

      {/* Icons */}
      <Link rel="icon" href={Logo} />
      <Link rel="apple-touch-icon" href={Logo} />
    </>
  );
}
