export const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  const navigationEvent = new CustomEvent('navigate', { detail: { path } });
  window.dispatchEvent(navigationEvent);
};
