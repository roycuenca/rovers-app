import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

interface ButtonProps {
  text: string;
  customStyles?: ViewStyle;
  labelStyles?: StyleProp<TextStyle>;
  onPressButton: () => void;
  mode?:
    | 'text'
    | 'outlined'
    | 'contained'
    | 'elevated'
    | 'contained-tonal'
    | undefined;
}

const ButtonApp: React.FC<ButtonProps> = ({
  text,
  customStyles,
  labelStyles,
  onPressButton,
  mode,
}) => {
  return (
    <Button
      mode={mode ?? 'contained'}
      onPress={() => onPressButton()}
      style={customStyles}
      labelStyle={labelStyles}
    >
      {text}
    </Button>
  );
};

export default ButtonApp;
