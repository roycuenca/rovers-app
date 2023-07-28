import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import RoverStackNavigation from './src/navigation';
import { RoverPhotosProvider } from './src/context/RoversPhotoContext';

export default function App() {
  return (
    <RoverPhotosProvider>
      <PaperProvider>
        <NavigationContainer>
          <RoverStackNavigation />
        </NavigationContainer>
      </PaperProvider>
    </RoverPhotosProvider>
  );
}
