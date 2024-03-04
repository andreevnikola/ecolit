import { makeRedirectUri } from 'expo-auth-session';
import { Stack, Link, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { Main, YStack, ButtonText } from 'tamagui';
import { Container, Title, Subtitle, StyledButton } from '~/tamagui.config';
import { supabase } from '~/utils/supabase';

const redirectTo = makeRedirectUri();

const resendVerificationEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) Alert.alert(error.message);
  else Alert.alert('Провери си пощата. Пратили сме Ви нов линк за верификация!');
};

export default function EmailVerificationSent() {
  const { email } = useLocalSearchParams();

  return (
    <Container>
      <Main flex={1}>
        <Stack.Screen options={{ title: 'Потвърди акаунт' }} />
        <YStack>
          <Title fontWeight={'$16'}>Акаунта не е потвърден!</Title>
          <Subtitle fontSize={20} lineHeight={25}>
            Пратили сме E-Mail на адрес {email}, съдържащ линк, отварянето на който е необходимо за
            активирането на акаунта Ви.
          </Subtitle>
        </YStack>
      </Main>
      <StyledButton colors="accent" onPress={() => resendVerificationEmail(email as string)}>
        <ButtonText>Препрати E-MAIL</ButtonText>
      </StyledButton>
    </Container>
  );
}
