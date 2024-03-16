import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { IUser } from '~/types/user';
import { supabase } from '~/utils/supabase';

interface IProfile {
  points: number;
}

const defaultProfile: IProfile = {
  points: 0,
};

interface IUserStore {
  user: IUser | null;
  isLoading: boolean;
  id: string | undefined;
  points: number;
  setUser: (newUser: IUser | null) => void;
  structureAndSetUser: (rawUser: User | null) => void;
  revalidatePoints: (id: string) => void;
  usePoints: (usedPoints: number) => void;
}

async function getProfileFromDB(id: string | undefined): Promise<IProfile> {
  const { data: profiles, error } = await supabase
    .from('users')
    .select()
    .eq('id', id)
    .returns<IProfile[]>();
  let profile: IProfile =
    profiles && Array.isArray(profiles) && profiles.length > 0 ? profiles[0] : defaultProfile;

  if (error) console.log(error);

  return profile;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  isLoading: true,
  id: undefined,
  points: 0,
  setUser: (newUser: IUser | null) => set({ user: newUser }),
  structureAndSetUser: async (rawUser: User | null) => {
    const profile = await getProfileFromDB(rawUser?.id);

    set({
      user: rawUser
        ? {
            email: rawUser.email!,
            avatarUrl: rawUser.user_metadata.avatar_url,
            firstName: rawUser.user_metadata.full_name.split(' ')[0],
            lastName: rawUser.user_metadata.full_name.split(' ')[1] || null,
            fullName: rawUser.user_metadata.full_name,
            id: rawUser?.id,
          }
        : null,
      isLoading: false,
      points: profile.points,
    });
  },
  revalidatePoints: async (id: string) => {
    const points = (await getProfileFromDB(id)).points;
    set({ points: points });
  },
  usePoints: (usedPoints: number) => set((state) => ({ points: state.points - usedPoints })),
}));
