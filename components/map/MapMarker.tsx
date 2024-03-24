import { Marker } from 'react-native-maps';
import { Avatar, Image, View, XGroup } from 'tamagui';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';
import { ILocation } from '~/types/location';
import MapBottomSheet from './MapBottomSheet';
import { Ionicons } from '@expo/vector-icons';
import { getTypeDataFromName } from '~/stores/storeTypeStore';
import { StyleSheet } from 'react-native';

export default function MapMarker({ location }: { location: ILocation }) {
  const openSheet = useBottomSheetStore((store) => store.openSheet);

  const storeTypeData = getTypeDataFromName(location.place_info.store_type);

  const onMarkerPress = () => {
    openSheet({
      content: <MapBottomSheet location={location} />,
      snapPoints: ['40%', '85%'],
    });
  };

  return (
    <Marker
      onPress={onMarkerPress}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      image={undefined}
      // image={
      //   location.type === 'bin'
      //     ? require('~/assets/trash_bin.png')
      //     : require('~/assets/store.png')
      // }>
    >
      {location.place_info.logo_url && (
        <View width={57} height={63} flex={1} justifyContent="center" alignItems="center">
          <View marginLeft={-2} marginTop={-4}>
            <Image
              width={40}
              height={location.type === 'bin' ? 49 : 51}
              src={
                location.type === 'bin'
                  ? require('~/assets/trash_bin.png')
                  : require('~/assets/store.png')
              }
            />
          </View>
          <XGroup width={20} height={20} borderRadius={3} top={1} left={1} position="absolute">
            <Image
              source={{ uri: location.place_info.logo_url }}
              resizeMode="contain"
              width={18}
              height={18}
            />
          </XGroup>
          {storeTypeData && (
            <XGroup
              width={20}
              height={20}
              borderRadius={100}
              left={34}
              top={42}
              alignItems="center"
              justifyContent="center"
              position="absolute"
              backgroundColor={`rgb(${storeTypeData.color})`}>
              <Ionicons color="black" name={storeTypeData?.icon as any} size={12} />
            </XGroup>
          )}
        </View>
      )}
    </Marker>
  );
}
