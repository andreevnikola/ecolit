import { View, YGroup, YStack, styled } from 'tamagui';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Alert, AppState, BackHandler } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '~/utils/supabase';
import { ILocation } from '~/types/location';
import MapMarker from '~/components/map/MapMarker';

import { ErrorText } from '~/tamagui.config';
import CategoryPicker from '~/components/map/CategoryPicker';

const fetchLocations = async (): Promise<ILocation[]> => {
  const { data, error } = await supabase
    .from('locations')
    .select(
      `
    id,
    latitude,
    longitude,
    type,
    place_info (
      image_url,
      name,
      description,
      website,
      logo_url,
      store_type
    )
  `
    )
    .returns<ILocation[]>();

  if (error) {
    console.log(error.message);
    throw error;
  }

  return data;
};

const StyledMapView = styled(MapView, {
  width: '100%',
  height: '100%',
});

export default function MapPage() {
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });

  const [canAskAgain, setCanAskAgain] = useState(true);

  const hasRefetched = useRef(false);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });

  if (isError && !hasRefetched) refetch();
  if (isError && hasRefetched)
    Alert.alert('Не успхме да заредим локациите. Моля опитайте пак по-късно!');

  useEffect(() => {
    let retried = false;
    const askPermission = async () => {
      let { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      if (!canAskAgain) {
        setCanAskAgain(false);
        return false;
      }
      if (status !== 'granted') {
        Alert.alert(
          'Трябва да ни разрешите достъп до локацията Ви за да можете да ползвате апликацията ни!'
        );
        if (!retried) {
          retried = true;
          askPermission();
        } else {
          setCanAskAgain(false);
          return false;
        }
      }
      return true;
    };

    (async () => {
      const permissions = await Location.getForegroundPermissionsAsync();
      let isGranted = permissions.granted;
      if (!isGranted) isGranted = await askPermission();
      if (!isGranted) return;
      let location = await Location.getCurrentPositionAsync({});
      setCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  }, []);

  if (!canAskAgain)
    return (
      <View
        flex={1}
        backgroundColor={'$background'}
        justifyContent="center"
        alignItems="center"
        padding={10}>
        <ErrorText>
          Отворете настройките си и ни разрешете достъп до локацията Ви за да продължите!
        </ErrorText>
      </View>
    );

  if (coords.lat === 0 && coords.lng === 0)
    return <View flex={1} backgroundColor={'$background'} />;

  return (
    <YGroup flex={1}>
      {/* <CategoryPicker /> */}
      <View flex={1} backgroundColor={'$background'}>
        <StyledMapView
          showsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={true}
          provider="google"
          minZoomLevel={12}
          maxZoomLevel={17}
          initialCamera={{
            center: {
              latitude: coords.lat,
              longitude: coords.lng,
            },
            heading: 10,
            zoom: 14,
            pitch: 10,
          }}>
          {!isLoading && !isError && data && data?.length > 0 && (
            <>
              {data.map((location) => (
                <MapMarker key={location.id} location={location} />
              ))}
            </>
          )}
          {/* <Marker coordinate={{}} title='Marker' /> */}
        </StyledMapView>
      </View>
    </YGroup>
  );
}
