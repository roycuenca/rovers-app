import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TextInput as PaperTextInput, Text } from 'react-native-paper';
import { GlobalStyles } from '../../utils/const/globalStyles/GlobalStylesValues';

interface CustomTextInputProps {
  label?: string;
  value: string;
  mode?: 'flat' | 'outlined' | undefined;
  placeholder?: string;
  containerStyles?: ViewStyle;
  inputStyles?: TextStyle;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  onChangeText: (date: string) => void;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  label,
  value,
  mode,
  placeholder,
  containerStyles,
  inputStyles,
  keyboardType,
  onChangeText,
}) => {
  return (
    <View style={[styles.container, containerStyles && containerStyles]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <PaperTextInput
        style={[styles.input, inputStyles && inputStyles]}
        contentStyle={styles.containerStyle}
        mode={mode ?? 'outlined'}
        placeholder={placeholder}
        keyboardType={keyboardType ?? 'default'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    ...GlobalStyles.text.title,
    color: GlobalStyles.colors.WHITE,
    fontWeight: 'bold',
    marginBottom: 5,
    marginVertical: 15,
  },
  input: {
    marginBottom: 5,
    backgroundColor: GlobalStyles.colors.GRAY,
    fontSize: 16,
  },
  containerStyle: {
    color: GlobalStyles.colors.WHITE,
  },
});

export default CustomTextInput;
