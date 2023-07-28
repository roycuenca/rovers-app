import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { useFavoriteSearches } from '../../utils/hooks/useFavoriteSearches';
import { formattedDate } from '../../utils/helpers/Helpers';
import { filtersData } from '../../utils/const/filterValues/FilterDataValues';
import { GlobalStyles } from '../../utils/const/globalStyles/GlobalStylesValues';
import DropDownSelect from '../Dropdown/Dropdown';
import DatePicker from '../DatePicker/DatePicker';
import TextInput from '../TextInput/TextInput';
import ButtonApp from '../Button/Button';
import { cameras, rovers } from '../../utils/const/rovers/Rovers';

interface FormFilterProps {
  onFilter: (formData: {
    roverName: string;
    cameraName: string;
    earthDate: string;
    solDate: string;
  }) => void;
}

const FormFilter: React.FC<FormFilterProps> = ({ onFilter }) => {
  const { saveOnFavorites } = useFavoriteSearches();

  const defaultRover = rovers.CURIOSITY;

  const [selectedRover, setSelectedRover] = useState<string>(defaultRover);
  const [selectedCamera, setSelectedCamera] = useState<string>(cameras.FHAZ);
  const [selectedEarthDate, setSelectedEarthDate] = useState<Date>(new Date());
  const [selectedSolDate, setSelectedSolDate] = useState<string>('0');

  const [expandedRover, setExpandedRover] = useState<boolean>(false);
  const [expandedCamera, setExpandedCamera] = useState<boolean>(false);

  const handleRoverSelect = (roverName: string) => {
    setSelectedRover(roverName);
    setSelectedCamera(cameras.FHAZ);
    setExpandedRover(false);
    setExpandedCamera(false);
  };

  const handleCameraSelect = (cameraName: string) => {
    setSelectedCamera(cameraName);
    setExpandedRover(false);
    setExpandedCamera(false);
  };

  const handleEarthDate = (date: Date) => {
    setSelectedEarthDate(date);
  };

  const handleSolDate = (date: string) => {
    const numericOnly = date.replace(/[^0-9]/g, '');
    const truncated = numericOnly.slice(0, 4);

    setSelectedSolDate(truncated);
  };

  const handleFormSubmit = () => {
    onFilter({
      roverName: selectedRover,
      cameraName: selectedCamera,
      earthDate: formattedDate(selectedEarthDate),
      solDate: selectedSolDate,
    });
  };

  const addToFavorites = () => {
    saveOnFavorites({
      roverName: selectedRover,
      cameraName: selectedCamera,
      earthDate: formattedDate(selectedEarthDate),
      solDate: selectedSolDate,
    });
  };

  return (
    <View style={styles.container}>
      <DropDownSelect
        label="Select Rover:"
        selectedValue={selectedRover}
        filtersData={filtersData}
        expanded={expandedRover}
        handleExpanded={() => setExpandedRover(!expandedRover)}
        handleSelectItem={handleRoverSelect}
      />

      <DropDownSelect
        label="Select Specific Camera:"
        selectedValue={selectedCamera || 'Select Camera'}
        filtersData={
          filtersData.find((rover) => rover.name === selectedRover)?.cameras
        }
        expanded={expandedCamera}
        handleExpanded={() => setExpandedCamera(!expandedCamera)}
        handleSelectItem={handleCameraSelect}
      />

      <View style={styles.datePickerContent}>
        <DatePicker
          label="Select Earth date:"
          date={new Date(selectedEarthDate)}
          mode="date"
          onConfirm={handleEarthDate}
        />
      </View>
      <View style={styles.datePickerContent}>
        <TextInput
          label="Select Sol date:"
          value={selectedSolDate}
          placeholder="Exp: 1000"
          containerStyles={styles.margin}
          keyboardType="numeric"
          onChangeText={handleSolDate}
        />
      </View>

      <ButtonApp
        text="Apply filter"
        onPressButton={() => handleFormSubmit()}
        customStyles={styles.applyButton}
      />

      <ButtonApp
        mode="elevated"
        text="Save on Favorites"
        onPressButton={() => addToFavorites()}
        customStyles={styles.margin}
        labelStyles={styles.saveButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
  datePickerContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  margin: {
    marginVertical: 10,
  },
  applyButton: {
    backgroundColor: GlobalStyles.colors.PRIMARY,
    marginVertical: 10,
  },
  saveButton: {
    color: GlobalStyles.colors.PRIMARY,
  },
});

export default FormFilter;
