import React, { useEffect, useState, useCallback } from 'react';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  Title,
  BoldText,
  Description,
  Button,
  ButtonText,
} from './styles';

import LandingBackground from '../../assets/landing.png';

interface Region {
  latitude: number;
  longitude: number;
}

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const [currentRegion, setCurrentRegion] = useState<Region>({} as Region);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
        });
      }
    }

    loadInitialPosition();
  }, []);

  const handleNavigateToMain = useCallback(() => {
    navigate('Main', currentRegion);
  }, [currentRegion, navigate]);

  return (
    <Container source={LandingBackground}>
      <Header>
        <Title>
          Weather
          {'\n'}
          <BoldText>App</BoldText>
        </Title>

        <Description>
          Take a look at the weather in your current location
        </Description>
      </Header>

      <Button onPress={handleNavigateToMain}>
        <ButtonText>Get weather data</ButtonText>
        <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
      </Button>
    </Container>
  );
};

export default Landing;
