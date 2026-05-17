import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://logisticsprizm.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  build: { assets: '_assets' },
  vite: { ssr: { noExternal: [] } },
});
