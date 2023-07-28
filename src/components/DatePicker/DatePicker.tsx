import React from 'react';
import { StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GlobalStyles } from '../../utils/const/globalStyles/GlobalStylesValues';

interface DatePickerProps {
  label?: string;
  date: Date;
  mode: 'date' | 'time' | 'datetime';
  onConfirm: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  date,
  mode,
  onConfirm,
}) => {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <DateTimePicker
        value={date}
        mode={mode}
        display="default"
        onChange={(_, selectedDate) => onConfirm(selectedDate as Date)}
        style={styles.customStyles}
        textColor={GlobalStyles.colors.WHITE}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    ...GlobalStyles.text.title,
    color: GlobalStyles.colors.WHITE,
    fontWeight: 'bold',
    marginBottom: 5,
    marginVertical: 15,
  },

  customStyles: {
    backgroundColor: GlobalStyles.colors.GRAY,
  },
});

export default DatePicker;
