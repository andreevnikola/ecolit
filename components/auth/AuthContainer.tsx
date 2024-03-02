import { Link } from 'expo-router';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { View, YGroup, styled, ScrollView, XGroup } from 'tamagui';
import OAUthButtons from '~/components/auth/OAuthButtons';
import { Href, Strong, Title, Main, Container } from '~/tamagui.config';

import { DismissKeyboardView } from '~/components/DismissKeyboardHOC';
import { Image } from 'tamagui';

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView, {
  flex: 1,
});

export default function AuthContainer({
  page,
  children,
}: {
  page: 'signin' | 'register';
  children: React.ReactNode;
}) {
  return (
    <Container padding={5} flex={1}>
      <ScrollView flexGrow={1} keyboardShouldPersistTaps="handled">
        <Main>
          <StyledKeyboardAvoidingView flex={1} behavior={'position'}>
            {/* <Title textAlign="center" marginBottom={20}>
              EcoLit
            </Title> */}
            <XGroup alignItems="center" justifyContent="center" mb={25}>
              <Image
                source={require('~/assets/logo.png')}
                resizeMode="contain"
                width={250}
                height={100}
              />
            </XGroup>
            {children}
          </StyledKeyboardAvoidingView>
        </Main>
      </ScrollView>
      <YGroup gap={10}>
        <OAUthButtons />
        <Link href={`/auth/${page === 'signin' ? 'register' : 'signin'}`}>
          <Href isUnderlined={true} colors={'accent'}>
            {page === 'signin' ? (
              <>
                Нямаш акаунт? <Strong>Регистрирай се!</Strong>
              </>
            ) : (
              <>
                Имаш акаунт? <Strong>Впиши се!</Strong>
              </>
            )}
          </Href>
        </Link>
      </YGroup>
    </Container>
  );
}
