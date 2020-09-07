import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 56px 18px;
  justify-content: flex-end;

  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${getStatusBarHeight() + 56}px;
  `}
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 64px;
  background: #000;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  margin-right: 18px;
  font-family: 'Poppins_400Regular';
  font-size: 20px;
`;
