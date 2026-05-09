import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Public sales site. The product app lives at app.logisticsprizm.com.
export default defineConfig({
  site: 'https://logisticsprizm.com',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  build: {
    assets: '_assets',
  },
  vite: {
    ssr: { noExternal: [] },
  },
});
