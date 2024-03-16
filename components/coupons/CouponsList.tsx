import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { View, YGroup, XGroup, ButtonText, useTheme, Text, Image } from 'tamagui';
import { Strong, StyledButton } from '~/tamagui.config';
import ICoupon from '~/types/coupon';
import { StoreType } from '~/types/storeType';
import { Coupon } from './Coupon';
import { getTypeDataFromName } from '~/stores/storeTypeStore';

export function CouponsList({
  data,
  showingType,
  buyCoupon,
  useCoupon,
  couponsType,
  isLoading,
}: {
  data: ICoupon[] | null | undefined;
  showingType: StoreType;
  isLoading: boolean;
  buyCoupon?: (id: number, title: string, price: number) => void;
  useCoupon?: (id: number) => void;
  couponsType: 'used' | 'store' | 'active' | 'preview';
}) {
  const haveResults = useRef(false);

  useEffect(() => {
    haveResults.current = false;
  }, [showingType]);
  return (
    <YGroup gap={15} flex={1}>
      {data &&
        data.length > 0 &&
        data.map((coupon: ICoupon) => {
          if (showingType !== 'всички' && !coupon.store_type.includes(showingType)) {
            return;
          }

          haveResults.current = true;
          const storeTypes = coupon.store_type.map((type) => getTypeDataFromName(type));

          return (
            <Coupon
              couponsType={couponsType}
              coupon={coupon}
              storeTypes={storeTypes}
              key={Math.random()}
              buyCoupon={buyCoupon}
              useCoupon={useCoupon}
            />
          );
        })}
      {isLoading && (
        <Text color={'$text'} textAlign="center">
          Моля изчакайте...
        </Text>
      )}
      {!haveResults.current && !isLoading && (
        <Text color={'$text'} textAlign="center">
          Няма намерени резултати.
        </Text>
      )}
    </YGroup>
  );
}
