import { AppState } from 'react-native';
import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export default function onOpenScripts({
  structurerAndSetter,
}: {
  structurerAndSetter: (rawUser: User | null) => void;
}) {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  const {
    data: { subscription: authSateChangeSubscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    // console.log(event, session);

    if (event === 'INITIAL_SESSION') {
      structurerAndSetter(session?.user || null);
    } else if (event === 'SIGNED_IN') {
      // handle sign in event
    } else if (event === 'SIGNED_OUT') {
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }
  });

  return [authSateChangeSubscription];
}
