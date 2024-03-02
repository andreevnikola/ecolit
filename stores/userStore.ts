import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { IUser } from '~/types/user';

interface IUserStore {
  user: IUser | null;
  isLoading: boolean;
  setUser: (newUser: IUser | null) => void;
  structureAndSetUser: (rawUser: User | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (newUser: IUser | null) => set({ user: newUser }),
  structureAndSetUser: (rawUser: User | null) =>
    set({
      user: rawUser
        ? {
            email: rawUser.email!,
            avatarUrl: rawUser.user_metadata.avatar_url,
            firstName: rawUser.user_metadata.full_name.split(' ')[0],
            lastName: rawUser.user_metadata.full_name.split(' ')[1] || null,
            fullName: rawUser.user_metadata.full_name,
          }
        : null,
      isLoading: false,
    }),
}));
