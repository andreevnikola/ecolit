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
        <View width={65} height={78} flex={1} justifyContent="center" alignItems="center">
          <View marginLeft={-5} marginTop={-5}>
            <Image
              width={50}
              height={location.type === 'bin' ? 58 : 62}
              src={
                location.type === 'bin'
                  ? require('~/assets/trash_bin.png')
                  : require('~/assets/store.png')
              }
            />
          </View>
          <XGroup width={20} height={20} borderRadius={3} top={5} left={4} position="absolute">
            <Image
              source={{ uri: location.place_info.logo_url }}
              resizeMode="contain"
              width={20}
              height={20}
            />
          </XGroup>
          {storeTypeData && (
            <XGroup
              width={23}
              height={23}
              borderRadius={100}
              left={39}
              top={50}
              alignItems="center"
              justifyContent="center"
              position="absolute"
              backgroundColor={`rgb(${storeTypeData.color})`}>
              <Ionicons color="black" name={storeTypeData?.icon as any} size={15} />
            </XGroup>
          )}
        </View>
      )}
    </Marker>
  );
}
