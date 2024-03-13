import { Marker } from 'react-native-maps';
import { Avatar, Image, View, XGroup } from 'tamagui';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';
import { ILocation } from '~/types/location';
import MapBottomSheet from './MapBottomSheet';
import { Ionicons } from '@expo/vector-icons';
import { getTypeDataFromName } from '~/stores/storeTypeStore';

export default function MapMarker({ location }: { location: ILocation }) {
  const openSheet = useBottomSheetStore((store) => store.openSheet);

  const storeTypeData = getTypeDataFromName(location.place_info.store_type);

  const onMarkerPress = () => {
    console.log(location);

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
        <>
          <XGroup width={20} height={20} borderRadius={3}>
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
              marginLeft={34}
              marginTop={20}
              alignItems="center"
              justifyContent="center"
              backgroundColor={`rgb(${storeTypeData.color})`}>
              <Ionicons color="black" name={storeTypeData?.icon as any} size={15} />
            </XGroup>
          )}
        </>
      )}
    </Marker>
  );
}
