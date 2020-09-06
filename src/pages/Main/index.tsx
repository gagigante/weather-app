import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ActivityIndicator, View } from 'react-native';
import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

import apiClient from '../../services/apiClient';

import convertKelvinToCelsius from '../../utils/convertKelvinToCelsius';

import IApiResponse from './IApiResponse';

import {
  Container,
  Header,
  GoBackButton,
  RefreshButton,
  Content,
  LocationRow,
  LocationText,
  DateTimeRow,
  DateTimeText,
  WeatherRow,
  WeatherImage,
  WeatherText,
  WeatherDetails,
  WeatherDescription,
  WeatherDetailCard,
  WeatherDetailCardItem,
  Info,
  InfoLabel,
  InfoData,
  InfoDivider,
} from './styles';

interface RouteParams {
  latitude: number;
  longitude: number;
}

const Main: React.FC = () => {
  const route = useRoute();
  const { goBack } = useNavigation();

  const routeParams = route.params as RouteParams;

  const [requestDatetime, setRequestDatetime] = useState(new Date());
  const [apiData, setApiData] = useState<IApiResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    apiClient
      .get('data/2.5/weather', {
        params: {
          lat: routeParams.latitude,
          lon: routeParams.longitude,
        },
      })
      .then(response => {
        setApiData(response);

        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);

        Alert.alert('Error');
      });
  }, [routeParams]);

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleUpdateData = useCallback(async () => {
    setRefreshLoading(true);

    const { granted } = await requestPermissionsAsync();

    let latitude;
    let longitude;

    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      latitude = coords.latitude;
      longitude = coords.longitude;
    }

    apiClient
      .get('data/2.5/weather', {
        params: {
          lat: latitude,
          lon: longitude,
        },
      })
      .then(response => {
        setApiData(response);

        setRequestDatetime(new Date());

        setRefreshLoading(false);
      })
      .catch(() => {
        setRefreshLoading(false);

        Alert.alert('Error', 'something went wrong try again');
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Container>
      <Header>
        <GoBackButton onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={26} color="#FFF" />
        </GoBackButton>

        <RefreshButton onPress={handleUpdateData}>
          {refreshLoading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <MaterialIcons name="refresh" size={26} color="#000" />
          )}
        </RefreshButton>
      </Header>

      <Content>
        <LocationRow>
          <MaterialIcons name="location-on" size={18} color="#fff" />

          <LocationText>
            {apiData && `${apiData.data.name} - ${apiData.data.sys.country}`}
          </LocationText>
        </LocationRow>

        <DateTimeRow>
          <DateTimeText>
            {format(requestDatetime, 'EEE dd MMMM HH:m', {
              locale: enUS,
            })}
          </DateTimeText>
        </DateTimeRow>

        <WeatherRow>
          <WeatherImage
            source={{
              uri: `http://openweathermap.org/img/wn/${
                apiData && apiData.data.weather[0].icon
              }@2x.png`,
            }}
          />

          <WeatherText>
            {apiData && convertKelvinToCelsius(apiData.data.main.temp)}
          </WeatherText>
        </WeatherRow>

        <WeatherDetails>
          {apiData &&
            `${convertKelvinToCelsius(
              apiData.data.main.temp_max,
            )} / ${convertKelvinToCelsius(
              apiData.data.main.temp_min,
            )} Feels like ${convertKelvinToCelsius(
              apiData.data.main.feels_like,
            )}`}
        </WeatherDetails>

        <WeatherDescription>
          {apiData &&
            apiData.data.weather[0].description.charAt(0).toUpperCase() +
              apiData.data.weather[0].description.slice(1)}
        </WeatherDescription>

        <WeatherDetailCard>
          <WeatherDetailCardItem>
            <MaterialIcons name="cloud" size={26} color="#000" />

            <Info>
              <InfoLabel>Humidity</InfoLabel>

              <InfoData>{apiData && `${apiData.data.main.humidity}%`}</InfoData>
            </Info>
          </WeatherDetailCardItem>

          <InfoDivider />

          <WeatherDetailCardItem>
            <MaterialIcons name="menu" size={26} color="#000" />

            <Info>
              <InfoLabel>Wind speed</InfoLabel>

              <InfoData>{apiData && `${apiData.data.wind.speed} m/s`}</InfoData>
            </Info>
          </WeatherDetailCardItem>
        </WeatherDetailCard>
      </Content>
    </Container>
  );
};

export default Main;
