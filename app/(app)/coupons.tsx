import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import CategoryPicker from '~/components/CategoryPicker';
import useUser from '~/hooks/useUser';
import { getTypeDataFromName, useStoreTypeStore } from '~/stores/storeTypeStore';
import { useUserStore } from '~/stores/userStore';
import { Container, Strong, Title } from '~/tamagui.config';
import ICoupon from '~/types/coupon';
import { supabase } from '~/utils/supabase';

import QRCode from 'react-native-qrcode-svg';

import { IItem } from '~/types/item';
import { CouponsList } from '~/components/coupons/CouponsList';
import {
  SliderTrackActiveFrame,
  View,
  ScrollView,
  YGroup,
  XGroup,
  useTheme,
  Text,
  styled,
  SizableText,
} from 'tamagui';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';
import { Coupon } from '~/components/coupons/Coupon';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

const fetchCoupons = async (userId: string): Promise<IItem[]> => {
  const { data, error } = await supabase
    .from('items')
    .select(
      `
      id,
      bought_at,
      is_active,
      used_at,
      coupon (
        id,
        title,
        price,
        percent,
        limit,
        store_type
      ),
      user (
        id,
        email,
        full_name,
        avatar_url
      )
    `
    )
    .eq('user', userId)
    .order('bought_at', { ascending: false })
    .returns<IItem[]>();

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data;
};

const fetchCoupon = async (userId: string, id: number) => {
  const { data, error } = await supabase
    .from('items')
    .select(
      `
        id,
        bought_at,
        is_active,
        used_at,
        coupon (
          id,
          title,
          price,
          percent,
          limit,
          store_type
        ),
        user (
          id,
          email,
          full_name,
          avatar_url
        )
      `
    )
    .eq('user', userId)
    .eq('id', id)
    .returns<IItem[]>();

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data[0];
};

const StyledIonicons = styled(Ionicons, {
  color: '$text',
  name: 'add',
});

const webFuncitonalitiesUrl =
  process.env.EXPO_PUBLIC_WEBFUNCTIONALITIES_URL || 'unknown webfunctionalities url';

export default function CouponsPage() {
  const showingType = useStoreTypeStore((state) => state.type);
  const usePoints = useUserStore((state) => state.usePoints);
  const [watchingItemCouponId, setwatchingItemCouponId] = useState<number | null>(null);
  const [data, setData] = useState<null | IItem[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user, points } = useUser();
  const router = useRouter();

  const theme = useTheme();

  const openSheet = useBottomSheetStore((store) => store.openSheet);

  const refetch = async () => {
    setData(null);
    setIsLoading(true);
    const data = await fetchCoupons(user!.id);
    setData(data);
    setIsLoading(false);
  };

  const [activeCoupons, setActiveCoupons] = useState<ICoupon[]>([]);
  const [usedItems, setusedItems] = useState<IItem[]>([]);
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const filteredItems = data!.filter((item) => item.is_active);
      setActiveCoupons(filteredItems.map((item) => item.coupon));
      const filteredItemsForIsUsed = data!.filter((item) => !item.is_active);
      const sorted = filteredItemsForIsUsed.sort(
        (a, b) => new Date(b.used_at) - new Date(a.used_at)
      );
      setusedItems(sorted);
    }
  }, [data]);

  const useShowCoupon = useCallback(
    async (couponId: number, id?: number) => {
      if (!id) id = data?.find((item) => item.coupon.id === couponId && item.is_active)?.id;

      if (!id) {
        Alert.alert('Нещо се обърка!');
        return;
      }

      setwatchingItemCouponId(couponId);

      const item = await fetchCoupon(user!.id, id);

      const storeTypes = item.coupon.store_type.map((type) => getTypeDataFromName(type));

      if (!item.is_active) Alert.alert('Купона за отстъпка беше успешно приложен!');

      openSheet({
        snapPoints: ['70%'],
        onExit: () => {
          setwatchingItemCouponId(null);
        },
        content: (
          <View flex={1} padding={15} paddingTop={22} paddingBottom={25}>
            <ScrollView flex={1}>
              <YGroup gap={7} flex={1}>
                <XGroup
                  borderRadius={30}
                  justifyContent="center"
                  backgroundColor={'white'}
                  position="relative">
                  <QRCode
                    value={`${webFuncitonalitiesUrl}/coupon/${couponId}/${user?.id}`}
                    logo={require('~/assets/icon.png')}
                    logoSize={40}
                    quietZone={10}
                    color={theme.$primary.get()}
                    size={200}
                  />
                  {!item.is_active && (
                    <XGroup
                      position="absolute"
                      backgroundColor={'rgba(255, 255, 255, 0.5)'}
                      width={195}
                      height={195}
                      alignItems="center"
                      justifyContent="center"
                      borderEndEndRadius={0}
                      borderTopEndRadius={0}
                      borderTopStartRadius={0}
                      borderEndStartRadius={0}>
                      <SizableText
                        textAlign="center"
                        color={'black'}
                        fontWeight={'bold'}
                        fontSize={22}>
                        Неактивен!
                      </SizableText>
                    </XGroup>
                  )}
                </XGroup>
                <Coupon coupon={item.coupon} couponsType="preview" storeTypes={storeTypes} />
                <XGroup
                  gap={10}
                  marginTop={10}
                  backgroundColor={`$secondaryTransparent`}
                  alignItems="center"
                  padding={8}
                  borderEndEndRadius={5}
                  borderTopEndRadius={5}
                  borderTopStartRadius={5}
                  borderEndStartRadius={5}>
                  <XGroup
                    backgroundColor={`$secondaryTransparent`}
                    borderEndEndRadius={3}
                    borderTopEndRadius={3}
                    borderTopStartRadius={3}
                    borderEndStartRadius={3}
                    paddingTop={3}
                    paddingLeft={3}
                    borderRadius={5}
                    paddingBottom={3}
                    paddingRight={3}>
                    <StyledIonicons size={16} name="information-circle-outline" />
                  </XGroup>
                  <Text fontSize={22} fontWeight={'bold'} color={'$text'}>
                    Как да използвам купона?
                  </Text>
                </XGroup>
                <XGroup
                  backgroundColor={`$secondaryTransparent`}
                  marginTop={-4}
                  padding={8}
                  borderEndEndRadius={5}
                  borderTopEndRadius={5}
                  borderTopStartRadius={5}
                  borderEndStartRadius={5}>
                  <Text color={'$textShade'} fontSize={15}>
                    Този купон може да бъде използван само в{' '}
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
                        ))}{' '}
                    който си партнира с нас (Можете да видите кои обекти са наши партнйори на
                    картата). Там при заплащане трябва да заявите желанието да използвате{' '}
                    <Strong>EcoКупон</Strong> и да покажете този QR код на касиера / келнера /
                    консултанта.
                  </Text>
                </XGroup>
              </YGroup>
            </ScrollView>
          </View>
        ),
      });
    },
    [data]
  );

  useEffect(() => {
    const itemsChannel = supabase
      .channel('items_db_chnages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'items',
          // filter: `user=eq.${user!.id}`,
        },
        (payload) => {
          if (
            (payload.new as any).coupon === watchingItemCouponId &&
            (payload.new as any).user === user.id
          ) {
            useShowCoupon(watchingItemCouponId!, (payload.new as any).id);
          }
          refetch();
        }
      )
      .subscribe();

    return () => {
      itemsChannel.unsubscribe();
    };
  }, [watchingItemCouponId]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <View flex={1}>
      <CategoryPicker />
      <ScrollView flexGrow={1} backgroundColor={'$background'}>
        <Container padding={10} paddingTop={20}>
          <Title fontSize={40} marginBottom={20} color={'$textShade'}>
            Активни купони
          </Title>
          {isLoading && (
            <Text color={'$text'} textAlign="center">
              Моля изчакайте...
            </Text>
          )}
          {activeCoupons &&
          Array.isArray(activeCoupons) &&
          activeCoupons.length > 0 &&
          !isLoading ? (
            <CouponsList
              couponsType="active"
              data={activeCoupons!}
              isLoading={isLoading}
              showingType={showingType}
              useCoupon={useShowCoupon}
            />
          ) : !isLoading ? (
            <Text color={'$text'} textAlign="center">
              Нямате активни купони
            </Text>
          ) : (
            <></>
          )}
          <Title fontSize={30} marginBottom={20} marginTop={50} color={'$textShade'}>
            Използвани купони
          </Title>
          {isLoading && (
            <Text color={'$text'} textAlign="center">
              Моля изчакайте...
            </Text>
          )}
          {usedItems && Array.isArray(usedItems) && usedItems.length > 0 && !isLoading ? (
            <CouponsList
              couponsType="used"
              data={usedItems.map((item) => item.coupon)!}
              isLoading={isLoading}
              showingType={showingType}
              useCoupon={useShowCoupon}
              items={usedItems}
            />
          ) : !isLoading ? (
            <Text color={'$text'} textAlign="center">
              Нямате използвани купони
            </Text>
          ) : (
            <></>
          )}
        </Container>
      </ScrollView>
    </View>
  );
}
