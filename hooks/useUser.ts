import { useUserStore } from '~/stores/userStore';

export default function useUser() {
  const user = useUserStore((state) => state.user);

  return user;
}
