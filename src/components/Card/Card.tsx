import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard, Title, Caption } from 'react-native-paper';
import { GlobalStyles } from '../../utils/const/globalStyles/GlobalStylesValues';

interface CardProps {
  imageUrl: string;
  title: string;
  earthDate: string;
  roverName: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  earthDate,
  roverName,
}) => {
  return (
    <PaperCard style={{ backgroundColor: GlobalStyles.colors.BLUE }}>
      <PaperCard.Cover source={{ uri: imageUrl }} />
      <PaperCard.Content>
        <Title style={[style.textColor, style.marginTop]}>
          Rover: {roverName}
        </Title>
        <Caption style={style.textColor}>Earth Date: {earthDate}</Caption>
        <Caption style={style.textColor}>Camera: {title}</Caption>
      </PaperCard.Content>
    </PaperCard>
  );
};

const style = StyleSheet.create({
  textColor: {
    color: GlobalStyles.colors.WHITE,
  },
  marginTop: {
    marginTop: 10,
  },
});

export default Card;
