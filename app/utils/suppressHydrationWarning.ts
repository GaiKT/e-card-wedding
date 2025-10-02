/**
 * Utility to suppress hydration warnings for browser extension attributes
 * This helps avoid hydration mismatches caused by browser extensions
 */

export function suppressHydrationWarning() {
  // Suppress hydration warnings for browser extension attributes
  if (typeof window !== 'undefined') {
    const originalConsoleError = console.error;
    
    console.error = (...args: any[]) => {
      const message = args[0];
      
      // Skip hydration warnings for browser extension attributes
      if (
        typeof message === 'string' &&
        (
          message.includes('cz-shortcut-listen') ||
          message.includes('data-new-gr-c-s-check-loaded') ||
          message.includes('data-gr-ext-installed') ||
          message.includes('Hydration failed because the initial UI does not match what was rendered on the server')
        )
      ) {
        return;
      }
      
      originalConsoleError.apply(console, args);
    };
  }
}