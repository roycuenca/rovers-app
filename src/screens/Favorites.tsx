import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import FavoriteList from '../components/FavoriteList/FavoriteList';
import {
  FavoriteSearch,
  useFavoriteSearches,
} from '../utils/hooks/useFavoriteSearches';
import RoverPhotosContext from '../context/RoversPhotoContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../utils/const/globalStyles/GlobalStylesValues';
import { Routes } from '../utils/routes/Routes';

const Favorites = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();
  const { favorites, removeFromFavorites } = useFavoriteSearches();

  const { filterFromFavorite } = useContext(RoverPhotosContext);

  const getSearchToFilter = (search: FavoriteSearch) => {
    filterFromFavorite(
      search.roverName,
      search.cameraName,
      search.earthDate,
      search.solDate
    );
    navigate(Routes.HOME);
  };

  const deleteFromFavorites = (id: string | undefined) => {
    id && removeFromFavorites(id);
  };

  return (
    <View style={styles.container}>
      <FavoriteList
        favorites={favorites}
        onPressCard={getSearchToFilter}
        onRemoveFavorite={deleteFromFavorites}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.DARK_BLUE,
  },
});
