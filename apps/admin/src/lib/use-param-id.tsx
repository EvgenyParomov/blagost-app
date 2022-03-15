import { useRouter } from 'next/router';

export function useParamId<Id extends Brand<string, string>>(key: string) {
  const router = useRouter();
  const id = router.query[key];
  return id as Id;
}
