import { Marker } from 'react-native-maps';
import { Avatar, Image, View, XGroup } from 'tamagui';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';
import { ILocation } from '~/types/location';
import MapBottomSheet from './MapBottomSheet';

export default function MapMarker({ location }: { location: ILocation }) {
  const openSheet = useBottomSheetStore((store) => store.openSheet);

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
      image={
        location.type === 'bin' ? require('~/assets/trash_bin.png') : require('~/assets/store.png')
      }>
      {location.place_info.logo_url && (
        <XGroup width={20} height={20} borderRadius={3}>
          <Image
            source={{ uri: location.place_info.logo_url }}
            resizeMode="contain"
            width={20}
            height={20}
          />
        </XGroup>
      )}
    </Marker>
  );
}
