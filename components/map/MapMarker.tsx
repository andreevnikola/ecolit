import { Marker } from 'react-native-maps';
import { Avatar, Image, View, XGroup } from 'tamagui';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';
import { ILocation } from '~/types/location';
import MapBottomSheet from './MapBottomSheet';
import { Ionicons } from '@expo/vector-icons';
import { getTypeDataFromName } from '~/stores/storeTypeStore';

export default function MapMarker({ location }: { location: ILocation }) {
  const openSheet = useBottomSheetStore((store) => store.openSheet);

  const storeTypeData = getTypeDataFromName(location.place_info.store_type || 'всичко');

  const onMarkerPress = () => {
    openSheet({
      content: <MapBottomSheet location={location} storeTypeData={storeTypeData} />,
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
      image={
        location.type === 'bin' ? require('~/assets/trash_bin.png') : require('~/assets/store.png')
      }>
      {location.place_info.logo_url && (
        <>
          <XGroup width={20} height={20} borderRadius={3}>
            <Image
              source={{ uri: location.place_info.logo_url }}
              resizeMode="contain"
              width={20}
              height={20}
            />
          </XGroup>
          {location.type === 'store' && (
            <XGroup width={30} height={30} borderRadius={100} marginLeft={35} marginTop={20}>
              <Ionicons
                color={'black'}
                // name={getTypeDataFromName(location.place_info.store_type!).icon as any}
              />
            </XGroup>
          )}
        </>
      )}
    </Marker>
  );
}
