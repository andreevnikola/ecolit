import { View, YStack, styled } from 'tamagui';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const StyledMapView = styled(MapView, {
  width: '100%',
  height: '100%',
});

export default function MapPage() {
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Трябва да ни разрешите достъп до локацията Ви за да можете да ползвате апликацията ни!'
        );
        askPermission();
      }
    };

    (async () => {
      const permissions = await Location.getForegroundPermissionsAsync();
      if (!permissions.granted) await askPermission();
      let location = await Location.getCurrentPositionAsync({});
      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  }, []);

  if (coords.lat === 0 && coords.lng === 0) return <></>;

  return (
    <View flex={1}>
      <StyledMapView
        showsUserLocation={true}
        showsCompass={true}
        showsMyLocationButton={true}
        minZoomLevel={12}
        maxZoomLevel={15}
        initialCamera={{
          center: {
            latitude: coords.lat,
            longitude: coords.lng,
          },
          heading: 10,
          pitch: 3,
        }}
      />
    </View>
  );
}
