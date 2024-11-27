import React from 'react';

const Sitemap = () => {
  // This component will not render anything in the browser
  // Instead, it will return XML content
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
    <url>
      <loc>https://monkeytype.live/</loc>
    </url>
    <url>
      <loc>https://monkeytype.live/leaderboard</loc>
    </url>
  </urlset>`;

  // Set the response type to XML
  const handleResponse = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    window.location.href = url;
  };

  React.useEffect(() => {
    handleResponse();
  }, []);

  return null; // No UI to render
};

export default Sitemap; 