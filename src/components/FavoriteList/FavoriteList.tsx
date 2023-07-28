import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { generateRandomId } from '../../utils/helpers/Helpers';
import { FavoriteSearch } from '../../utils/hooks/useFavoriteSearches';
import CardFavorite from '../CardFavorite/CardFavorite';
import EmptyState from '../Empty/Empty';

interface FavoriteListProps {
  favorites: FavoriteSearch[];
  onPressCard: (item: FavoriteSearch) => void;
  onRemoveFavorite: (id: string | undefined) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  favorites,
  onPressCard,
  onRemoveFavorite,
}) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <CardFavorite
            item={item}
            onPressCard={onPressCard}
            onPressDelete={onRemoveFavorite}
          />
        )}
        keyExtractor={(item) => item.id ?? generateRandomId()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={[styles.listContainer, styles.centerContent]}>
            <EmptyState message="No favorites added" />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
  },
  centerContent: {
    marginVertical: 40,
  },
});

export default FavoriteList;
