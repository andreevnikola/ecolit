import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Input, View, XGroup, YGroup } from 'tamagui';

import { ButtonText, Container, StyledButton } from '../../tamagui.config';
import { BackButton } from '~/components/BackButton';
import AuthContainer from '~/components/auth/AuthContainer';

import { Alert, StyleSheet } from 'react-native';
import { supabase } from '~/utils/supabase';
import { DismissKeyboardView } from '~/components/DismissKeyboardHOC';
import { getAvatar } from '~/utils/auth/getAvatar';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signUpWithEmail() {
    if (firstName.length > 15 || firstName.length < 3) {
      Alert.alert('Моля въведете валидно малко име!');
      return;
    }
    if (firstName.length > 20 || firstName.length < 3) {
      Alert.alert('Моля въведете валидно фамилно име!');
      return;
    }

    setLoading(true);
    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: firstName + ' ' + lastName,
          avatar_url: getAvatar(firstName + ' ' + lastName),
        },
      },
    });

    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    if (!session) router.push(`/auth/email-verification-sent?email=${email}`);
    else router.push('/active/home');
  }

  return (
    <Container>
      <Stack.Screen options={{ title: 'Регистрирай се', headerLeft: () => <BackButton /> }} />
      <AuthContainer page="register">
        <View style={styles.container}>
          <YGroup gap={20}>
            <YGroup gap={5}>
              <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="E-Mail: "
                  autoCapitalize={'none'}
                />
              </View>
              <XGroup gap={5} flex={1} style={[styles.verticallySpaced, styles.mt20]}>
                <View flexGrow={1} flex={1} backgroundColor={'$background'}>
                  <Input
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    placeholder="Малко име:"
                    autoCapitalize={'none'}
                    flex={1}
                  />
                </View>
                <View flexGrow={1} flex={1} backgroundColor={'$background'}>
                  <Input
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    placeholder="Фамилно име:"
                    autoCapitalize={'none'}
                    flex={1}
                  />
                </View>
              </XGroup>
              <View style={styles.verticallySpaced}>
                <Input
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Парола: "
                  autoCapitalize={'none'}
                />
              </View>
            </YGroup>
            <YGroup gap={7}>
              <View style={styles.verticallySpaced}>
                <StyledButton disabled={loading} onPress={() => signUpWithEmail()}>
                  <ButtonText>Регистрирай се</ButtonText>
                </StyledButton>
              </View>
            </YGroup>
          </YGroup>
        </View>
      </AuthContainer>
    </Container>
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
