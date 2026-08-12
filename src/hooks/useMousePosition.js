import { writable } from 'svelte/store';

export const mousePosition = writable({ x: -100, y: -100 });

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (event) => {
    mousePosition.set({ x: event.clientX, y: event.clientY });
  });
}
