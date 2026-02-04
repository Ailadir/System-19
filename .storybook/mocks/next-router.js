// Mock for next/router in Storybook
export const useRouter = () => ({
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: (url) => console.log('Navigate to:', url),
  replace: (url) => console.log('Replace with:', url),
  reload: () => console.log('Reload'),
  back: () => console.log('Navigate back'),
  forward: () => console.log('Navigate forward'),
  prefetch: () => Promise.resolve(),
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
});

export default {
  useRouter,
};
