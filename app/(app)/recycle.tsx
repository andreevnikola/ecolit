import {
  Image,
  Main,
  ScrollView,
  SizableText,
  styled,
  Text,
  useTheme,
  View,
  XGroup,
  YGroup,
} from 'tamagui';
import CategoryPicker from '~/components/CategoryPicker';
import { Container, Strong, Title } from '~/tamagui.config';

import QRCode from 'react-native-qrcode-svg';
import useUser from '~/hooks/useUser';
import { supabase } from '~/utils/supabase';
import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '~/stores/userStore';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StyledIonicons = styled(Ionicons, {
  color: '$text',
  name: 'add',
});

export default function RecyclePage() {
  const { user, isLoading, points } = useUser();
  const gainedPoints = useUserStore((state) => state.gainedPoints);
  const resetGains = useUserStore((state) => state.resetGains);
  const [latelyGained, setLatelyGained] = useState<number[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (gainedPoints === 0) return;

    Alert.alert(`Успешно получихте ${gainedPoints} Eco Точки.`);

    resetGains();

    setLatelyGained([gainedPoints, ...latelyGained]);
  }, [gainedPoints]);

  return (
    <View flex={1}>
      <ScrollView flexGrow={1} backgroundColor={'$background'}>
        <Container padding={10} paddingTop={20}>
          <Title fontSize={40} marginBottom={20} color={'$textShade'}>
            Рециклирай
          </Title>
          {latelyGained.map((gained) => (
            <XGroup
              justifyContent="space-between"
              key={Math.random()}
              alignItems="center"
              borderRadius={3}
              backgroundColor={'$secondary'}
              marginBottom={7}
              gap={5}
              flex={1}
              padding={8}>
              <XGroup gap={5} alignItems="center" flex={1} justifyContent="center">
                <Image src={require('../../assets/coin.png')} width={25} height={25} />
                <SizableText fontSize={13} color={'$text'} lineHeight={17} flex={1}>
                  Успешно рециклирахте. Успешно бяхте възнаградени за действията си.
                </SizableText>
              </XGroup>
              <View
                backgroundColor={'$accent'}
                borderStartEndRadius={3}
                borderStartStartRadius={3}
                borderStartEndRadius={3}
                borderEndEndRadius={3}
                borderEndStartRadius={3}
                justifyContent="center"
                paddingTop={7}
                paddingBottom={7}
                padding={4}>
                <Text fontSize={15} fontWeight={'900'} color={'$text'}>
                  +{gained}
                </Text>
              </View>
            </XGroup>
          ))}
          <XGroup
            borderRadius={10}
            marginTop={15}
            justifyContent="center"
            backgroundColor={'white'}
            position="relative">
            <QRCode
              value={`EcoLit.Recycle:${user?.id}`}
              logo={require('~/assets/icon.png')}
              logoSize={40}
              quietZone={10}
              color={theme.$primary.get()}
              size={230}
            />
          </XGroup>

          <XGroup
            marginTop={20}
            gap={10}
            backgroundColor={`$secondary`}
            alignItems="center"
            padding={8}
            borderEndEndRadius={5}
            borderTopEndRadius={5}
            borderTopStartRadius={5}
            borderEndStartRadius={5}>
            <XGroup
              backgroundColor={`$accent`}
              borderEndEndRadius={3}
              borderTopEndRadius={3}
              borderTopStartRadius={3}
              borderEndStartRadius={3}
              paddingTop={3}
              paddingLeft={3}
              borderRadius={5}
              paddingBottom={3}
              paddingRight={3}>
              <StyledIonicons size={16} name={'help-outline'} />
            </XGroup>
            <Text fontSize={22} fontWeight={'bold'} color={'$text'}>
              Как да рециклирам?
            </Text>
          </XGroup>
          <XGroup
            backgroundColor={`$secondaryTransparent`}
            marginTop={6}
            padding={8}
            borderEndEndRadius={5}
            borderTopEndRadius={5}
            borderTopStartRadius={5}
            borderEndStartRadius={5}>
            <Text color={'$textShade'} fontSize={15}>
              Когато рециклирате в някой от нашите контейнери, бивате възнаградени с Eco Точки. Тези
              точки могат да бъдат използвани за закупуване на купони за отстъпка, които са валидни
              в магазините на нашите партньори. Локацията на наш кош за рециклиране можете да
              намерите на картата.{' '}
              <Strong>
                За да рециклирате в коша, покажете QR кода на камерата намираща се върху контейнера,
                и изхвърлете боклука който искате да рецииклирате. След това можете дори и да
                напуснете локацията, а до 1, 2 минути ще получите възнаграждението (Eco Точките) в
                акаунта си.
              </Strong>
            </Text>
          </XGroup>
        </Container>
      </ScrollView>
    </View>
  );
}
