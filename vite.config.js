import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function copyResume() {
  try {
    const src = path.resolve(__dirname, 'Kishore_Resume.pdf');
    if (fs.existsSync(src)) {
      const publicDir = path.resolve(__dirname, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.copyFileSync(src, path.join(publicDir, 'Kishore_Resume.pdf'));
      fs.copyFileSync(src, path.join(publicDir, 'resume.pdf'));
    }
  } catch (err) {
    console.error('Failed to copy resume:', err);
  }
}

function copyResumePlugin() {
  return {
    name: 'copy-resume-plugin',
    buildStart() {
      copyResume();
    },
    configureServer() {
      copyResume();
    }
  };
}

export default defineConfig({
  plugins: [
    copyResumePlugin(),
    svelte(),
    tailwindcss(),
  ],
});
