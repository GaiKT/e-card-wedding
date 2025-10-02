"use client";

import { useEffect } from "react";

export default function BrowserExtensionHandler() {
  useEffect(() => {
    // Handle browser extension attributes that cause hydration issues
    const handleBrowserExtensions = () => {
      if (typeof window !== "undefined") {
        // Remove problematic attributes added by browser extensions
        const elementsWithCzShortcut = document.querySelectorAll(
          "[cz-shortcut-listen]"
        );
        elementsWithCzShortcut.forEach((element) => {
          element.removeAttribute("cz-shortcut-listen");
        });

        // Handle Grammarly extension attributes
        const elementsWithGrammarly = document.querySelectorAll(
          "[data-new-gr-c-s-check-loaded], [data-gr-ext-installed]"
        );
        elementsWithGrammarly.forEach((element) => {
          element.removeAttribute("data-new-gr-c-s-check-loaded");
          element.removeAttribute("data-gr-ext-installed");
        });
      }
    };

    // Run immediately
    handleBrowserExtensions();

    // Run after DOM mutations (for dynamic content)
    const observer = new MutationObserver(handleBrowserExtensions);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [
        "cz-shortcut-listen",
        "data-new-gr-c-s-check-loaded",
        "data-gr-ext-installed",
      ],
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
