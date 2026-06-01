import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google?: any;
    handleCredentialResponse?: (response: { credential: string }) => void;
  }
}

// Replace with your actual Google Cloud client ID.
// Get one at: https://console.cloud.google.com/apis/credentials
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

interface GoogleSignInButtonProps {
  onSuccess: (userInfo: { name: string; email: string; avatar: string }) => void;
  onError?: (error: string) => void;
}

// Base64 decode for JWT payload (no verification — for client-side demo only)
function decodeJwtPayload(token: string): { name?: string; email?: string; picture?: string; sub?: string } {
  try {
    const base64 = token.split('.')[1];
    const json = decodeURIComponent(
      atob(base64.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export function GoogleSignInButton({ onSuccess, onError }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (GOOGLE_CLIENT_ID.startsWith('YOUR_')) return; // Dev placeholder

    const renderButton = () => {
      if (!window.google?.accounts?.id || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => {
          const payload = decodeJwtPayload(response.credential);
          if (payload.email) {
            onSuccess({
              name: payload.name || payload.email.split('@')[0],
              email: payload.email,
              avatar: payload.picture || '👤',
            });
          } else {
            onError?.('Could not decode user info.');
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        shape: 'rectangular',
        theme: 'outline',
        text: 'signin_with',
        size: 'large',
        logo_alignment: 'left',
      });

      if (window.google.accounts.id.prompt) {
        window.google.accounts.id.prompt();
      }
    };

    // GIS script loads asynchronously — retry a few times
    let attempts = 0;
    const interval = window.setInterval(() => {
      if (window.google?.accounts?.id) {
        renderButton();
        window.clearInterval(interval);
      } else if (attempts > 20) {
        window.clearInterval(interval);
        onError?.('Google Sign-In failed to load.');
      }
      attempts++;
    }, 100);

    return () => window.clearInterval(interval);
  }, [onSuccess, onError]);

  // Fallback when Google GIS isn't loaded or client_id is placeholder
  if (GOOGLE_CLIENT_ID.startsWith('YOUR_') || !window.google) {
    return (
      <button
        type="button"
        onClick={() => {
          // Fallback: simulate Google sign-in for demo
          const fallbackUser = {
            name: 'Alex Thompson',
            email: 'alex.tech@gmail.com',
            avatar: '👨‍💻',
          };
          onSuccess(fallbackUser);
        }}
        className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-medium transition-all"
        title="Google Sign-In Play Mode"
      >
        <svg viewBox="0 0 48 48" className="h-5 w-5">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,20c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        <span className="text-sm">Continue with Google</span>
      </button>
    );
  }

  return <div ref={buttonRef} className="flex justify-center" />;
}
