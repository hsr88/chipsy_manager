// Simple hash-based router for landing pages
import { writable } from 'svelte/store';

export const currentPath = writable(getPathFromHash());

function getPathFromHash(): string {
  const hash = window.location.hash;
  if (hash.startsWith('#')) return hash.slice(1) || '/';
  return '/';
}

export function navigate(path: string) {
  window.location.hash = path;
  currentPath.set(path);
  window.scrollTo(0, 0);
}

export function initRouter() {
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    currentPath.set(getPathFromHash());
    window.scrollTo(0, 0);
  });
  
  // Set initial path
  currentPath.set(getPathFromHash());
}

// Check if we should show the game
export function isGameRoute(): boolean {
  return getPathFromHash() === '/game';
}
