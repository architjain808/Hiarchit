/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 */

// Disable Angular's patching of passive event listeners
// This prevents strict scroll-jacking libraries like Lenis from throwing
// "Unable to preventDefault inside passive event listener invocation" errors
(window as any).__Zone_disable_passive_events = true;
