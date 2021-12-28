import React from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';

type FontWeight = 'light' | 'regular' | 'bold';
type Variant = 'h1' | 'p';
interface Props {
  style: StyleProp<TextStyle | ViewStyle>;
  variant?: Variant;
  fontWeight?: FontWeight;
}

export const AppText: React.FC<Props> = ({children, style, variant = 'p', fontWeight = 'regular'}) => {
  const baseStyle: StyleProp<TextStyle> = {
    fontFamily: `RobotoMono-${fontWeight.toUpperCase()}`,
  };

  const getVariant = (): StyleProp<TextStyle> => {
    if (variant === 'h1') return {fontSize: 32, letterSpacing: -0.5};
    return {fontSize: 22};
  };

  return <Text style={[baseStyle, style, getVariant()]}>{children}</Text>;
};