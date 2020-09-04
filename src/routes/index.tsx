import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import Main from '../pages/Main';

const RootNavigator = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator.Navigator screenOptions={{ headerShown: false }}>
        <RootNavigator.Screen name="Landing" component={Landing} />

        <RootNavigator.Screen name="Main" component={Main} />
      </RootNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
