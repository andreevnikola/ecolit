import { View, XGroup, YGroup, styled, Image } from 'tamagui';
import { Text } from 'tamagui';
import useUser from '~/hooks/useUser';
import { Strong } from '~/tamagui.config';
import SignOutButton from '../auth/SignOutButton';

const StyledText = styled(Text, {
  color: '$text',
  fontSize: 15,
});

export default function UserProfileSheetContent() {
  const { user } = useUser();

  return (
    <View flex={1} padding={15}>
      <YGroup gap={20} flex={1}>
        <XGroup
          justifyContent="space-between"
          borderBottomColor={'$textShade'}
          paddingBottom={20}
          borderRadius={0}
          paddingLeft={10}
          paddingRight={10}
          borderBottomWidth={2}>
          <StyledText>Пълно име: </StyledText>
          <StyledText>
            <Strong>{user?.fullName}</Strong>
          </StyledText>
        </XGroup>
        <XGroup
          justifyContent="space-between"
          borderBottomColor={'$textShade'}
          paddingBottom={20}
          borderRadius={0}
          paddingLeft={10}
          paddingRight={10}
          borderBottomWidth={2}>
          <StyledText>Ел. поща: </StyledText>
          <StyledText>
            <Strong>{user?.email}</Strong>
          </StyledText>
        </XGroup>
        <XGroup justifyContent="space-between">
          <Text fontSize={30} color={'$primary'}>
            Баланс:
          </Text>
          <XGroup alignItems="center" gap={3}>
            <Strong fontSize={30} color={'$primary'}>
              {user?.points}
            </Strong>
            <Image src={require('~/assets/coin.png')} width={25} height={25} />
          </XGroup>
        </XGroup>
      </YGroup>
      <SignOutButton />
    </View>
  );
}
