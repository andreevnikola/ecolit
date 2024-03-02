import { View, XGroup, YGroup, styled } from 'tamagui';
import { Text } from 'tamagui';
import useUser from '~/hooks/useUser';
import { Strong } from '~/tamagui.config';

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
          <Text fontSize={30} color={'$primary'}>
            <Strong>0</Strong>т
          </Text>
        </XGroup>
      </YGroup>
    </View>
  );
}
