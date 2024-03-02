import { Alert } from 'react-native';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';
import { StyledButton, ButtonText } from '~/tamagui.config';
import { supabase } from '~/utils/supabase';

async function signOut(hideSheet: () => void) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    Alert.alert(error.message);
    return;
  }

  hideSheet();
}

export default function SignOutButton() {
  const hideSheet = useBottomSheetStore((state) => state.hideSheet);

  return (
    <StyledButton
      onPress={() => signOut(hideSheet)}
      backgroundColor={'#e63e44'}
      pressStyle={{
        backgroundColor: '#ed555b',
      }}>
      <ButtonText>Изход от акаунт</ButtonText>
    </StyledButton>
  );
}
