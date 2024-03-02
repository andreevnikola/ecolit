import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useUserStore } from '~/stores/userStore';
import { supabase } from '~/utils/supabase';

export default function loadUserFromSession(user: User | null): void {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setUser(null);
        return;
      }

      setUser({
        email: user.email!,
        avatarUrl: user.user_metadata.avatar_url,
        firstName: user.user_metadata.fullName.split(' ')[0],
        lastName: user.user_metadata.fullName.split(' ')[1] || null,
        fullName: user.user_metadata.fullName,
      });
    };
    load();
  }, []);
}
