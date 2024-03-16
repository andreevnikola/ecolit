import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, YGroup, XGroup, ButtonText, useTheme, Text, Image } from 'tamagui';
import { Strong, StyledButton } from '~/tamagui.config';
import ICoupon from '~/types/coupon';
import { StoreType } from '~/types/storeType';

export function Coupon({
  coupon,
  storeTypes,
  couponsType,
  useCoupon,
  buyCoupon,
}: {
  coupon: ICoupon;
  storeTypes: any;
  couponsType: 'used' | 'store' | 'active' | 'preview';
  useCoupon?: (id: number) => void;
  buyCoupon?: (id: number, title: string, price: number) => void;
}) {
  const theme = useTheme();

  return (
    <View
      key={Math.random()}
      padding={15}
      backgroundColor={'$backgroundShade'}
      borderStartStartRadius={7}
      borderStartEndRadius={7}
      borderEndStartRadius={7}
      borderEndEndRadius={7}
      shadowOpacity={0.3}
      shadowColor={'$backgroundTint'}
      shadowRadius={8}>
      <YGroup gap={20}>
        <XGroup justifyContent="space-between" alignItems="center">
          <XGroup gap={8} alignItems="center">
            <FontAwesome color={theme.textShade.get()} name="ticket" size={18} />
            <Text color={'$text'} fontWeight={'bold'} fontSize={20}>
              {coupon.title}
            </Text>
          </XGroup>
          <XGroup gap={3} alignItems="center">
            <Text color={'$primary'} fontWeight={'bold'} fontSize={20}>
              {coupon.price}
            </Text>
            <Image width={20} height={20} src={require('~/assets/coin.png')} />
          </XGroup>
        </XGroup>
        <View
          backgroundColor={'$backgroundTint'}
          padding={10}
          borderStartStartRadius={7}
          borderStartEndRadius={7}
          borderEndStartRadius={7}
          borderEndEndRadius={7}>
          <Text color={'$textShade'}>
            Този купон ще Ви осигури {coupon.percent}% отстъпка при пазаруване в{' '}
            {storeTypes.length === 1
              ? storeTypes[0]?.additional.title.toLocaleLowerCase()
              : storeTypes.map((storeType, i) => (
                  <Strong key={'_Fd_' + i}>
                    {storeType!.additional.title.toLocaleLowerCase() +
                      (i === storeTypes.length - 1
                        ? ''
                        : i === storeTypes.length - 2
                          ? ' или '
                          : ', ')}
                  </Strong>
                ))}
            . Най-голямата отстъпка която този купон може да ви усигори е {coupon.limit}лв.
          </Text>
        </View>
        <XGroup justifyContent="space-between" alignItems="center">
          <XGroup
            gap={5}
            borderStartStartRadius={3}
            borderStartEndRadius={3}
            borderEndStartRadius={3}
            borderEndEndRadius={3}
            padding={2}
            alignItems="center"
            backgroundColor={'$backgroundTint'}>
            {storeTypes.map((storeType) => (
              <View
                key={Math.random()}
                borderStartStartRadius={3}
                borderStartEndRadius={3}
                borderEndStartRadius={3}
                borderEndEndRadius={3}
                padding={2}
                backgroundColor={`rgb(${storeType?.color})`}>
                <Ionicons name={storeType?.icon as any} size={17} color={theme.textShade.get()} />
              </View>
            ))}
          </XGroup>
          <XGroup gap={3} alignItems="center">
            <Text color={'$accent'} fontSize={20}>
              Намал. <Strong>{coupon.percent}</Strong>%.
            </Text>
          </XGroup>
          <XGroup gap={3} alignItems="center">
            <Text color={'$textShade'} fontSize={20}>
              Лимит: <Strong>{coupon.limit}</Strong>лв.
            </Text>
          </XGroup>
        </XGroup>
        {couponsType === 'store' && (
          <StyledButton
            onPress={() => buyCoupon!(coupon.id, coupon.title, coupon.price)}
            marginTop={-10}
            roundness="small"
            borderStartStartRadius={3}
            borderStartEndRadius={3}
            borderEndStartRadius={3}
            borderEndEndRadius={3}
            padding={8}
            backgroundColor={'$primary'}>
            <Ionicons name="basket-outline" size={20} color={'white'} />
            <ButtonText flexGrow={1} textAlign="center">
              <Strong>Купи</Strong>
            </ButtonText>
          </StyledButton>
        )}
        {couponsType === 'active' && (
          <StyledButton
            onPress={() => useCoupon!(coupon.id)}
            marginTop={-10}
            roundness="small"
            borderStartStartRadius={3}
            borderStartEndRadius={3}
            borderEndStartRadius={3}
            borderEndEndRadius={3}
            padding={8}
            backgroundColor={'$accent'}>
            <Ionicons name="bag-check-outline" size={20} color={'white'} />
            <ButtonText flexGrow={1} textAlign="center">
              <Strong>Използвай купон</Strong>
            </ButtonText>
          </StyledButton>
        )}
      </YGroup>
    </View>
  );
}
