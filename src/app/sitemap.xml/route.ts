// src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';
import jobsData from '@/app/data/db.json';

export async function GET() {
  const baseUrl = 'https://<TU-SUBDOMINIO>.vercel.app'; // Cámbialo luego por tu dominio final

  // Extraemos el array de jobs desde el JSON importado
  const jobUrls = jobsData.jobs.map((job) => `
    <url>
      <loc>${baseUrl}/jobs/${job.id}</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${baseUrl}/apply/${job.id}</loc>
      <priority>0.7</priority>
    </url>
  `);

  // URLs estáticas
  const staticUrls = [`
    <url>
      <loc>${baseUrl}/</loc>
      <priority>1.0</priority>
    </url>
  `];

  // Armamos el XML completo
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls.join('')}
  ${jobUrls.join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
