import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Card, IconButton } from 'react-native-paper';
import { FavoriteSearch } from '../../utils/hooks/useFavoriteSearches';
import { GlobalStyles } from '../../utils/const/globalStyles/GlobalStylesValues';

interface CardFavoriteProps {
  item: FavoriteSearch;
  onPressCard: (item: FavoriteSearch) => void;
  onPressDelete?: (id: string | undefined) => void;
}

const CardFavorite: React.FC<CardFavoriteProps> = ({
  item,
  onPressCard,
  onPressDelete,
}) => {
  return (
    <Card style={styles.cardContainer} onPress={() => onPressCard(item)}>
      <View style={styles.actions}>
        <View style={styles.header}>
          <Text style={styles.title}>{`Rover: ${item?.roverName}`}</Text>
          <Text style={styles.subtitle}>{`Camera: ${item?.cameraName}`}</Text>
        </View>
        <IconButton
          icon="delete"
          onPress={() => onPressDelete && onPressDelete(item.id)}
          iconColor={GlobalStyles.colors.WHITE}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>{`Earth Date: ${item?.earthDate}`}</Text>
        <Text style={styles.text}>{`Sol Date: ${item?.solDate}`}</Text>
      </View>
    </Card>
  );
};

export default CardFavorite;

const styles = StyleSheet.create({
  cardContainer: {
    height: 130,
    width: '90%',
    margin: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: GlobalStyles.colors.BLUE,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    ...GlobalStyles.text.title,
    fontWeight: 'bold',
    marginBottom: 10,
    color: GlobalStyles.colors.WHITE,
  },
  subtitle: {
    ...GlobalStyles.text.normal,
    fontWeight: 'bold',
    marginBottom: 10,
    color: GlobalStyles.colors.WHITE,
  },
  content: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    ...GlobalStyles.text.normal,
    fontWeight: 'bold',
    marginBottom: 10,
    color: GlobalStyles.colors.WHITE,
  },
});
