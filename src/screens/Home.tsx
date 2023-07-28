import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../utils/const/globalStyles/GlobalStylesValues';
import { Routes } from '../utils/routes/Routes';
import RoverPhotosContext from '../context/RoversPhotoContext';
import ActivityIndicator from '../components/ActivcityIndicator/ActivityIndicator';
import FormFilter from '../components/FormFilter/FormFilter';
import EmptyState from '../components/Empty/Empty';
import AppModal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';

const HomeScreen: React.FC = () => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  const [isModalActive, setIsModalActive] = useState(false);

  const {
    photos,
    loading,
    loadMorePhotos,
    filterFetchByEarthDate,
    fetchRoverPhotos,
    filterFetchBySolDate,
    page,
  } = useContext(RoverPhotosContext);

  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const getValues = (values: {
    roverName: string;
    cameraName: string;
    earthDate: string;
    solDate: string;
  }) => {
    if (Number(values.solDate) === 0) {
      filterFetchByEarthDate(
        values.roverName,
        values.cameraName,
        values.earthDate
      );
    } else {
      filterFetchBySolDate(
        values.roverName,
        values.cameraName,
        values.earthDate,
        values.solDate
      );
    }

    setIsModalActive(false);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  const handleEndReached = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      loadMorePhotos();
    }
  };

  const redirectToFavorite = () => navigate(Routes.FAVORITES);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContent}>
        <Button
          text="Select Rover"
          onPressButton={() => setIsModalActive(true)}
          customStyles={{ backgroundColor: GlobalStyles.colors.PRIMARY }}
        />
        <View style={styles.buttonGroup}>
          <Button
            text="Clear filter"
            onPressButton={() => fetchRoverPhotos()}
            customStyles={{ backgroundColor: GlobalStyles.colors.PRIMARY }}
          />
          <Button
            text="Favorites"
            onPressButton={() => redirectToFavorite()}
            customStyles={{ backgroundColor: GlobalStyles.colors.PRIMARY }}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          {photos.length === 0 && !loading ? (
            <>
              <EmptyState message="photos not found" />
            </>
          ) : (
            <FlatList
              data={photos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardWrapper}>
                    <Card
                      imageUrl={item.img_src}
                      title={item.camera.full_name}
                      earthDate={String(item.earth_date)}
                      roverName={item.rover.name}
                    />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
              extraData={page}
            />
          )}
        </>
      )}

      <AppModal
        isModalOpen={isModalActive}
        childComponent={
          <ScrollView style={styles.formContainer}>
            <FormFilter onFilter={getValues} />
          </ScrollView>
        }
        handlerModalStatus={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.DARK_BLUE,
    paddingHorizontal: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    marginVertical: 10,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: GlobalStyles.colors.BLUE,
  },
  buttonContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default HomeScreen;
