// Mock for next/navigation in Storybook
export const useRouter = () => ({
  push: (url) => console.log('Navigate to:', url),
  replace: (url) => console.log('Replace with:', url),
  back: () => console.log('Navigate back'),
  forward: () => console.log('Navigate forward'),
  refresh: () => console.log('Refresh'),
  prefetch: () => Promise.resolve(),
});

export const usePathname = () => '/';
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});

export const redirect = (url) => {
  console.log('Redirect to:', url);
};

export const permanentRedirect = (url) => {
  console.log('Permanent redirect to:', url);
};

export const notFound = () => {
  console.log('Not found');
};
