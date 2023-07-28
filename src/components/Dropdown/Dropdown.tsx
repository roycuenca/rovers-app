import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { GlobalStyles } from '../../utils/const/globalStyles/GlobalStylesValues';

interface DropDownSelectProps {
  label?: string;
  selectedValue: string | null;
  expanded: boolean;
  filtersData: any;
  handleExpanded: () => void;
  handleSelectItem: (value: string) => void;
}

const DropDownSelect: React.FC<DropDownSelectProps> = ({
  label,
  selectedValue,
  expanded,
  filtersData,
  handleExpanded,
  handleSelectItem,
}) => {
  return (
    <List.Section>
      {label && <Text style={styles.labelText}>{label}</Text>}
      <List.Accordion
        style={styles.customItemStyle}
        titleStyle={styles.textStyle}
        title={selectedValue}
        expanded={expanded}
        onPress={() => handleExpanded()}
      >
        {filtersData.map((item: any) => (
          <List.Item
            key={item.id}
            title={item.name ?? item}
            style={styles.customItemStyle}
            titleStyle={styles.textStyle}
            onPress={() => handleSelectItem(!item.name ? item : item.name)}
          />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

const styles = StyleSheet.create({
  labelText: {
    ...GlobalStyles.text.title,
    paddingVertical: 5,
    color: GlobalStyles.colors.WHITE,
    fontWeight: 'bold',
  },
  customItemStyle: {
    backgroundColor: GlobalStyles.colors.GRAY,
  },
  textStyle: {
    color: GlobalStyles.colors.WHITE,
  },
});

export default DropDownSelect;
