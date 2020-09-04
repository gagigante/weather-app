import React from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Container } from './styles';

interface RouteParams {
  latitude: number;
  longitude: number;
}

const Main: React.FC = () => {
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  return (
    <Container>
      <Text>{routeParams.latitude}</Text>
    </Container>
  );
};

export default Main;
