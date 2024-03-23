import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { IUser } from '~/types/user';
import { Text } from 'react-native';
import React from 'react';

interface IBottomSheetStore {
  isOpened: boolean;
  snapPoints: any;
  content: React.ReactNode;
  onExit: () => void;
  hideSheet: () => void;
  openSheet: (data: { snapPoints: any; content: JSX.Element; onExit?: () => void }) => void;
}

export const useBottomSheetStore = create<IBottomSheetStore>((set) => ({
  isOpened: false,
  snapPoints: ['80%'],
  content: <Text>Awesome 🎉</Text>,
  onExit: () => {},
  hideSheet: () => set({ isOpened: false }),
  openSheet: (data: { snapPoints: any; content: JSX.Element; onExit?: () => void }) => {
    set({ isOpened: false });
    setTimeout(
      () =>
        set({
          snapPoints: data.snapPoints,
          content: data.content,
          isOpened: true,
          onExit: data.onExit || (() => {}),
        }),
      10
    );
  },
}));
