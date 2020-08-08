import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import styles from './styles';
import {RectButton} from 'react-native-gesture-handler';

export interface IPhoto {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Props {
  photo: IPhoto;
  onPress: () => void;
}

function PhotoItem({photo, onPress}: Props) {
  console.log('REDERING ITEM: ', photo.id);

  // useEffect(() => {
  //   console.log(photo.title);
  // }, [photo.title]);

  return (
    <RectButton style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{uri: photo.thumbnailUrl}} />
      <Text style={styles.title}>{photo.title}</Text>
    </RectButton>
  );
}

export default React.memo(PhotoItem);
