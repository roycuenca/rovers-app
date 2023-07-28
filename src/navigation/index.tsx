import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GlobalStyles } from '../utils/const/globalStyles/GlobalStylesValues';
import { Routes } from '../utils/routes/Routes';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';

const Stack = createStackNavigator();

const RoverStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.HOME}
        component={Home}
        options={{
          title: 'Rovers App',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: GlobalStyles.colors.DARK_BLUE,
          },
          headerTitleStyle: {
            color: GlobalStyles.colors.WHITE,
          },
        }}
      />
      <Stack.Screen
        name={Routes.FAVORITES}
        component={Favorites}
        options={{
          title: Routes.FAVORITES,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: GlobalStyles.colors.DARK_BLUE,
          },
          headerTitleStyle: {
            color: GlobalStyles.colors.WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RoverStackNavigation;
