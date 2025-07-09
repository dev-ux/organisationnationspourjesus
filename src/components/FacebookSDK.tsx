"use client";

import React from 'react';

interface WindowWithFB extends Window {
  FB?: any;
  fbAsyncInit?: () => void;
}

declare const window: WindowWithFB;

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

export default function FacebookSDK() {
  React.useEffect(() => {
    // Vérifier si le SDK est déjà chargé
    if (window.FB) {
      return;
    }

    // Charger le SDK Facebook
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: 'v18.0'
      });
    };

    // Insérer le script SDK
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/fr_FR/sdk.js';
    document.body.appendChild(script);
  }, []);

  return null;
}
