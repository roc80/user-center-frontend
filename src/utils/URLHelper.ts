export const loginPath = '/user/login';
export const registerPath = '/user/register';

export function getPathWithRedirectUrl(path: string): string {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('redirect_url');
  if (redirectUrl) {
    return `${path}?redirect_url=${encodeURIComponent(redirectUrl)}`;
  } else {
    return path;
  }
}
