import { useEffect, useState } from 'react';

const errorMessage =
  'matchMedia is not supported, this could happen both because window.matchMedia is not supported by' +
  " your current browser or you're using the useMediaQuery hook while server side rendering.";

const matchMediaIsSupported = isClient() && isAPISupported('matchMedia');

/**
 * Accepts a media query string then uses the
 * [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API to determine if it
 * matches with the current document.
 *
 * It also monitors the document changes to detect when it matches or stops matching the media query.
 *
 * Returns `true` if the document matches the given media query, `false` otherwise.
 *
 */
function useMediaQuery(mediaQuery: string): boolean {
  const [isVerified, setIsVerified] = useState(matchMediaIsSupported ? !!window.matchMedia(mediaQuery).matches : false);

  useEffect(() => {
    if (!matchMediaIsSupported && !isTest()) {
      console.warn(errorMessage);
      return;
    }

    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = (): void => {
      setIsVerified(!!mediaQueryList.matches);
    };

    mediaQueryList.addEventListener('change', documentChangeHandler);

    documentChangeHandler();

    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [mediaQuery]);

  return isVerified;
}

function isClient(): boolean {
  return typeof window === 'object';
}

function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

function isAPISupported(api: keyof typeof window): boolean {
  return api in window;
}

export { useMediaQuery };
