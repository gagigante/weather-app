import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export const Container = styled(LinearGradient).attrs({
  colors: ['#5C56EF', '#8DD1F6'],
})`
  flex: 1;
  padding: 48px 0;

  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${getStatusBarHeight() + 56}px;
  `};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`;

export const GoBackButton = styled.TouchableOpacity``;

export const RefreshButton = styled(RectButton)`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  opacity: 0.8;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LocationRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LocationText = styled.Text`
  color: #fff;
  margin-left: 6px;
  font-family: 'Poppins_400Regular';
`;

export const DateTimeRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DateTimeText = styled.Text`
  margin-top: 12px;
  font-family: 'Poppins_400Regular';
  color: #e6e6ff;
`;

export const WeatherRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const WeatherImage = styled.Image`
  width: 64px;
  height: 64px;
`;

export const WeatherText = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #fff;
  font-size: 56px;
`;

export const WeatherDetails = styled.Text`
  font-family: 'Poppins_400Regular';
  text-align: center;
  color: #fff;
`;

export const WeatherDescription = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 18px;
  color: #fff;
`;

export const WeatherDetailCard = styled.View`
  width: ${windowWidth - 48}px;
  background: #fff;
  opacity: 0.8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  padding: 12px;
  border-radius: 6px;
`;

export const WeatherDetailCardItem = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.View`
  margin-left: 8px;
`;

export const InfoLabel = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #636363;
`;

export const InfoData = styled.Text`
  font-family: 'Poppins_400Regular';
`;

export const InfoDivider = styled.View`
  margin: 0 24px;
  width: 1px;
  height: 56px;
  background: #000;
`;
