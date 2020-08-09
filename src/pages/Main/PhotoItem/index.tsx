import React from 'react';
import {Image, Text} from 'react-native';
import styles from './styles';
import {RectButton} from 'react-native-gesture-handler';

export interface IPhoto {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  selected: boolean | undefined;
}

export interface Props {
  photo: IPhoto;
  selected: boolean;
  onPress: () => void;
}

function PhotoItem({photo, selected, onPress}: Props) {
  console.log('REDERING ITEM: ', photo.id);

  return (
    <RectButton
      style={[styles.container, {opacity: selected ? 0.5 : 1}]}
      rippleColor="#fff"
      onPress={onPress}>
      <Image
        style={styles.image}
        source={{uri: photo.thumbnailUrl}}
        resizeMode="cover"
      />
      <Text style={styles.title}>{photo.title}</Text>
    </RectButton>
  );
}

export default React.memo(PhotoItem, (prev, next) => {
  return prev.selected === next.selected;
});
