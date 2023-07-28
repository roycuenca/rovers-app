import React from 'react';
import { StyleSheet, ActivityIndicator as AI } from 'react-native';

interface AIProps {
  size: number | 'small' | 'large';
}

const ActivityIndicator: React.FC<AIProps> = ({ size }) => {
  return <AI size={size} />;
};

export default ActivityIndicator;

const styles = StyleSheet.create({});
