import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { ButtonText, Image, ScrollView, Text, View, XGroup, YGroup, useTheme } from 'tamagui';
import CategoryPicker from '~/components/CategoryPicker';
import { CouponsList } from '~/components/coupons/CouponsList';
import useUser from '~/hooks/useUser';
import { getTypeDataFromName, useStoreTypeStore } from '~/stores/storeTypeStore';
import { useUserStore } from '~/stores/userStore';
import { Container, Strong, StyledButton, Title } from '~/tamagui.config';
import ICoupon from '~/types/coupon';
import { supabase } from '~/utils/supabase';

const fetchCoupons = async (): Promise<ICoupon[]> => {
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
  const usePoints = useUserStore((state) => state.usePoints);

  const { user, points } = useUser();
  const router = useRouter();

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['coupons'],
    queryFn: fetchCoupons,
  });

  const handleBuy = async (id: number, price: number) => {
    const { error: errorSavingItem } = await supabase
      .from('items')
      .insert({ coupon: id, user: user!.id });
    const { error: errorDecliningUserCoins } = await supabase
      .from('users')
      .update({ points: points - price })
      .eq('id', user!.id);
    if (errorSavingItem || errorDecliningUserCoins) {
      console.error(errorSavingItem);
      console.error(errorDecliningUserCoins);
      Alert.alert('Нещо се обурка. Моля опитайте пак по-късно!');
      return;
    }
    usePoints(price);
    Alert.alert('Успешно закупихте промоционален купон!');
    router.push('/(app)/coupons');
  };

  const buyCoupon = (id: number, title: string, price: number) => {
    if (points < price) {
      Alert.alert('Нямате достатъчно налични EcoТочки за да закупите този купон!');
      return;
    }

    Alert.alert(`Потвърдете закупуване на купона „${title}“ за ${price} точки.`, '', [
      {
        text: 'Откажи',
        style: 'cancel',
      },
      {
        text: 'Купи',
        onPress: () => handleBuy(id, price),
      },
    ]);
  };

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
          <CouponsList
            couponsType="store"
            data={data}
            isLoading={isLoading}
            showingType={showingType}
            buyCoupon={buyCoupon}
          />
        </Container>
      </ScrollView>
    </View>
  );
}
