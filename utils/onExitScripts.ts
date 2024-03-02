import { AppState } from 'react-native';
import { supabase } from './supabase';
import { Subscription } from '@supabase/supabase-js';

export default function onExitScripts(subscriptions: Subscription[]) {
  try {
    subscriptions.map((sub) => {
      sub.unsubscribe();
    });

    supabase.auth.stopAutoRefresh();
  } catch (error) {
    console.error(error);
  }
}
