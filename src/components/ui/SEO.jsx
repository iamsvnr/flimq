import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image }) {
  const siteTitle = 'FLIMQ';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const desc = description || 'Discover movies and TV shows on FLIMQ';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
