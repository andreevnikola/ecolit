import { useUserStore } from '~/stores/userStore';

export default function useUser() {
  const user = useUserStore((state) => state.user);
  const points = useUserStore((state) => state.points);
  const isLoading = useUserStore((state) => state.isLoading);

  return {
    user: user,
    isLoading: isLoading,
    points: points,
  };
}
