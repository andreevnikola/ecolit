import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Input, View, YGroup } from 'tamagui';

import { ButtonText, Container, StyledButton } from '../../tamagui.config';
import { BackButton } from '~/components/BackButton';
import AuthContainer from '~/components/auth/AuthContainer';

import { Alert, StyleSheet } from 'react-native';
import { supabase } from '~/utils/supabase';
import { DismissKeyboardView } from '~/components/DismissKeyboardHOC';
import Loader from '~/components/Loader';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoadingLoginResult, setIsLoadingLoginResult] = useState(false);

  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      if (error.message === 'Email not confirmed' && data)
        router.push(`/auth/email-verification-sent?email=${email}`);
      return;
    }
    setIsLoadingLoginResult(true);
    setTimeout(() => {
      setIsLoadingLoginResult(false);
      router.replace('/');
    }, 550);
  }

  return (
    <>
      <Container>
        <Stack.Screen options={{ title: 'Впиши се', headerLeft: () => <BackButton /> }} />
        <AuthContainer page="signin">
          <View style={styles.container}>
            <YGroup gap={15}>
              <YGroup gap={5}>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                  <Input
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="E-Mail:"
                    autoCapitalize={'none'}
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Input
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Парола:"
                    autoCapitalize={'none'}
                  />
                </View>
              </YGroup>
              <View style={[styles.verticallySpaced, styles.mt20]}>
                <StyledButton disabled={loading} onPress={() => signInWithEmail()}>
                  <ButtonText>Впиши се</ButtonText>
                </StyledButton>
              </View>
            </YGroup>
          </View>
        </AuthContainer>
      </Container>
      <Loader isLoading={isLoadingLoginResult} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    gap: 10,
    flex: 1,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
