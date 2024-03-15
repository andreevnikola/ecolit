import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { ButtonText, Image, ScrollView, Text, View, XGroup, YGroup, useTheme } from 'tamagui';
import CategoryPicker from '~/components/CategoryPicker';
import { getTypeDataFromName, useStoreTypeStore } from '~/stores/storeTypeStore';
import { Container, Strong, StyledButton, Title } from '~/tamagui.config';
import ICoupon from '~/types/coupon';
import { supabase } from '~/utils/supabase';

const fetchLocations = async (): Promise<ICoupon[]> => {
  const { data, error } = await supabase.from('coupons').select(`*`).returns<ICoupon[]>();

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data;
};

export default function BuyCouponsPage() {
  const [hasRefetched, setHasRefetched] = useState(false);
  const showingType = useStoreTypeStore((state) => state.type);
  const haveResults = useRef(false);
  const theme = useTheme();
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: fetchLocations,
  });

  useEffect(() => {
    haveResults.current = false;
  }, [showingType]);

  if ((!data || data.length < 1) && !hasRefetched) {
    setHasRefetched(true);
    refetch();
  }

  return (
    <View flex={1}>
      <CategoryPicker />
      <ScrollView flexGrow={1} backgroundColor={'$background'}>
        <Container padding={10} paddingTop={20}>
          <Title fontSize={40} marginBottom={30} color={'$textShade'}>
            Закупи купон
          </Title>
          <YGroup gap={15} flex={1}>
            {data &&
              data.length > 0 &&
              data.map((coupon: ICoupon) => {
                if (showingType !== 'всички' && !coupon.store_type.includes(showingType)) {
                  return <View key={coupon.id}></View>;
                }

                haveResults.current = true;
                const storeTypes = coupon.store_type.map((type) => getTypeDataFromName(type));

                return (
                  <View
                    key={coupon.id}
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
                          . Най-голямата отстъпка която този купон може да ви усигори е{' '}
                          {coupon.limit}лв.
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
                              key={storeType?.type}
                              borderStartStartRadius={3}
                              borderStartEndRadius={3}
                              borderEndStartRadius={3}
                              borderEndEndRadius={3}
                              padding={2}
                              backgroundColor={`rgb(${storeType?.color})`}>
                              <Ionicons
                                name={storeType?.icon as any}
                                size={17}
                                color={theme.textShade.get()}
                              />
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
                      <StyledButton
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
                    </YGroup>
                  </View>
                );
              })}
            {!haveResults.current && (
              <Text color={'$text'} textAlign="center">
                Няма намерени резултати.
              </Text>
            )}
          </YGroup>
        </Container>
      </ScrollView>
    </View>
  );
}
