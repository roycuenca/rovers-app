import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../utils/const/globalStyles/GlobalStylesValues';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    fontSize: 16,
    color: GlobalStyles.colors.WHITE,
  },
});

export default EmptyState;
