import { Ionicons } from '@expo/vector-icons';
import { Linking, Platform, View } from 'react-native';
import { Avatar, XGroup, YGroup, Text, Image, ButtonText } from 'tamagui';
import { StyledButton, Title } from '~/tamagui.config';
import { ILocation } from '~/types/location';

export default function MapBottomSheet({ location }: { location: ILocation }) {
  const uriScheme = Platform.select({
    ios: `maps://app?daddr=${location.latitude},${location.longitude}&dname=${location.place_info.name}`,
    android: `google.navigation:q=${location.latitude},${location.longitude}&label=${location.place_info.name}`,
    default: `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}&destination_place_id=${location.place_info.name}`,
  });

  const navigate = () => Linking.openURL(uriScheme);

  return (
    <View flex={1} padding={15}>
      <YGroup gap={10} flex={1}>
        <XGroup>
          <Image src={{ uri: location.place_info.image_url }} width={'100%'} height={150} />
        </XGroup>
        <XGroup
          justifyContent="space-between"
          alignItems="center"
          backgroundColor={'$backgroundShade'}
          padding={3}
          borderEndEndRadius={5}
          borderTopEndRadius={5}
          borderTopStartRadius={5}
          borderEndStartRadius={5}>
          <XGroup gap={10} alignItems="center">
            <XGroup borderRadius={5}>
              <Image src={{ uri: location.place_info.logo_url }} width={30} height={30} />
            </XGroup>
            <Text fontSize={22} fontWeight={'bold'} color={'$text'}>
              {location.place_info.name}
            </Text>
          </XGroup>
          <XGroup
            backgroundColor={location.type === 'bin' ? '$primary' : '$secondary'}
            borderEndEndRadius={3}
            borderTopEndRadius={3}
            borderTopStartRadius={3}
            borderEndStartRadius={3}
            paddingTop={1}
            paddingLeft={1}
            borderRadius={0}
            paddingBottom={5}
            paddingRight={location.type === 'bin' ? 2 : 4}>
            <Image
              src={
                location.type === 'bin'
                  ? require('~/assets/trash_bin.png')
                  : require('~/assets/store.png')
              }
              width={25}
              height={25}
            />
          </XGroup>
        </XGroup>
        <XGroup
          backgroundColor={'$backgroundShade'}
          marginTop={-7}
          padding={8}
          borderEndEndRadius={5}
          borderTopEndRadius={5}
          borderTopStartRadius={5}
          borderEndStartRadius={5}>
          <Text color={'$textShade'} fontSize={15}>
            {location.place_info.description}
          </Text>
        </XGroup>
        <XGroup
          gap={10}
          backgroundColor={
            location.type === 'bin' ? '$primaryTransparent' : '$secondaryTransparent'
          }
          alignItems="center"
          padding={8}
          borderEndEndRadius={5}
          borderTopEndRadius={5}
          borderTopStartRadius={5}
          borderEndStartRadius={5}>
          <XGroup
            backgroundColor={location.type === 'bin' ? '$primary' : '$secondary'}
            borderEndEndRadius={3}
            borderTopEndRadius={3}
            borderTopStartRadius={3}
            borderEndStartRadius={3}
            paddingTop={1}
            paddingLeft={1}
            borderRadius={0}
            paddingBottom={5}
            paddingRight={location.type === 'bin' ? 2 : 4}>
            <Image
              src={
                location.type === 'bin'
                  ? require('~/assets/trash_bin.png')
                  : require('~/assets/store.png')
              }
              width={25}
              height={25}
            />
          </XGroup>
          <Text fontSize={22} fontWeight={'bold'} color={'$text'}>
            {location.type === 'bin' ? 'Кош на EcoLit' : 'Пазарувай с EcoLit точки'}
          </Text>
        </XGroup>
        <XGroup
          backgroundColor={
            location.type === 'bin' ? '$primaryTransparent' : '$secondaryTransparent'
          }
          marginTop={-7}
          padding={8}
          borderEndEndRadius={5}
          borderTopEndRadius={5}
          borderTopStartRadius={5}
          borderEndStartRadius={5}>
          <Text color={'$textShade'} fontSize={15}>
            {location.type === 'bin'
              ? 'На тази локация можете да рециклирате вашите отпадъци в EcoLit кош и да бъдете възнаградени с точки за действията Ви.'
              : 'На тази локация можете да пазарувате използвайки EcoТочки. Можете да получавате намаления върху продуктите които желаете да закупите или да платите цялата сметка с EcoТочки.'}
          </Text>
        </XGroup>
        <StyledButton
          roundness="small"
          onPressOut={() => navigate()}
          backgroundColor={'#dd4d3f'}
          pressStyle={{ backgroundColor: '#eb5b4d' }}
          focusStyle={{ backgroundColor: '#eb5b4d' }}>
          <Ionicons name="compass-outline" size={22} color={'white'} />
          <ButtonText flexGrow={1} textAlign="center" fontWeight={'bold'} fontSize={15}>
            Марширут до локация
          </ButtonText>
        </StyledButton>
      </YGroup>
    </View>
  );
}
