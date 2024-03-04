import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import React from 'react';
import { Text, YStack } from 'tamagui';

import { ButtonText, Container, Href, Main, Strong, Subtitle, Title } from '../../tamagui.config';
import { StyledButton } from '../../tamagui.config';

import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '../../utils/supabase';
import { Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

export default function OAUthButtons() {
  // Handle linking into app from email app.
  const url = Linking.useURL();

  const router = useRouter();

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) {
      Alert.alert('Не можахме да Ви впишем в този акаунт!');
      console.error('No access token provided');
      return;
    }

    const { access_token, refresh_token } = params;

    if (!access_token) {
      Alert.alert('Не можахме да Ви впишем в този акаунт!');
      console.error('No access token provided');
      return;
    }

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) {
      Alert.alert(error.message);

      console.error(error.message);
      return null;
    }
    return data.session;
  };

  const performOAuth = async (provider: 'google' | 'facebook') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      Alert.alert(error.message);
      console.error('HERE: ' + error.message);
      return;
    }

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);

    if (res.type === 'success') {
      const { url } = res;
      const session = await createSessionFromUrl(url);
      if (session) {
        router.replace('/');
      }
    }
  };

  return (
    <YStack gap={10}>
      <StyledButton
        roundness="small"
        onPressOut={() => performOAuth('google')}
        backgroundColor={'#dd4d3f'}
        pressStyle={{ backgroundColor: '#eb5b4d' }}
        focusStyle={{ backgroundColor: '#eb5b4d' }}>
        <Ionicons name="logo-google" size={20} color={'white'} />
        <ButtonText>
          Впиши се чрез <Text fontWeight={'bold'}>Google</Text>
        </ButtonText>
      </StyledButton>
      <StyledButton
        roundness="small"
        onPressOut={() => performOAuth('facebook')}
        backgroundColor={'#4267B2'}
        pressStyle={{ backgroundColor: '#567bc7' }}
        focusStyle={{ backgroundColor: '#567bc7' }}>
        <Ionicons name="logo-facebook" size={20} color={'white'} />
        <ButtonText>
          Впиши се чрез <Text fontWeight={'bold'}>Facebook</Text>
        </ButtonText>
      </StyledButton>
    </YStack>
  );
}
