import Constants from 'expo-constants';

const { manifest } = Constants;

export const replaceLocalHost = (path: string) => {
  const isDev = manifest?.packagerOpts?.dev;
  const debuggerDomain = manifest?.debuggerHost?.split(`:`)?.shift() ?? '/';

  if (isDev) {
    return path.replace('localhost', debuggerDomain);
  }

  return path;
};
