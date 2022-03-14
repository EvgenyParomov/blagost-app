import { ReactNode } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';

export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}

const clientSideEmotionCache = createEmotionCache();

type Props = {
  children?: ReactNode;
  cache?: EmotionCache;
};
export function CssCacheProvider({
  children,
  cache = clientSideEmotionCache,
}: Props) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
