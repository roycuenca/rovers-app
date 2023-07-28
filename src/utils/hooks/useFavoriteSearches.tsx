import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateRandomId } from '../helpers/Helpers';

export type FavoriteSearch = {
  id?: string;
  roverName: string;
  cameraName: string;
  earthDate: string;
  solDate: string;
};

export const useFavoriteSearches = () => {
  const [favorites, setFavorites] = useState<FavoriteSearch[]>([]);

  const storeFavorites = async (favorites: FavoriteSearch[]) => {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem('@favorites', jsonValue);
    } catch (error) {
      console.error('Error storing favorites:', error);
    }
  };

  const loadFavoritesFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites');
      if (jsonValue !== null) {
        const parsedFavorites: FavoriteSearch[] = JSON.parse(jsonValue);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  const saveOnFavorites = (newFavorite: FavoriteSearch) => {
    const id = generateRandomId();
    newFavorite.id = id;
    setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
    storeFavorites([...favorites, newFavorite]);
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    storeFavorites(updatedFavorites);
  };

  const getAllFavorites = () => favorites;

  return { favorites, saveOnFavorites, removeFromFavorites, getAllFavorites };
};
