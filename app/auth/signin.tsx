// import { Feather, Ionicons } from '@expo/vector-icons';
// import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Text, YStack, useTheme } from 'tamagui';

// import { ButtonText, Container, Main, Subtitle, Title } from '../../tamagui.config';
// import { BackButton } from '~/components/BackButton';
// import { StyledButton } from '../../tamagui.config';

// export default function Details() {
//   const handleLoginGoogle = () => {
//     console.log('');
//   };

//   return (
//     <Container>
//       <Stack.Screen options={{ title: 'Впиши се', headerLeft: () => <BackButton /> }} />
//       <Main>
//         <Title textAlign="center">EcoLit</Title>
//         <YStack gap={10}>
//           <StyledButton
//             roundness="small"
//             onPressOut={handleLoginGoogle}
//             backgroundColor={'#dd4d3f'}
//             pressStyle={{ backgroundColor: '#eb5b4d' }}
//             focusStyle={{ backgroundColor: '#eb5b4d' }}>
//             <Ionicons name="logo-google" size={20} color={'white'} />
//             <ButtonText>
//               Впиши се чрез <Text fontWeight={'bold'}>Google</Text>
//             </ButtonText>
//           </StyledButton>
//         </YStack>
//       </Main>
//     </Container>
//   );
// }

import { Button } from 'react-native';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '../../utils/supabase';

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);

  if (res.type === 'success') {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

const sendMagicLink = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: 'andr.nikola.08@gmail.com',
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) throw error;
  // Email sent.
};

export default function Auth() {
  // Handle linking into app from email app.
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  return (
    <>
      <Button onPress={performOAuth} title="Sign in with Google" />
      <Button onPress={sendMagicLink} title="Send Magic Link" />
    </>
  );
}
