import React from 'react';
import {View, Image, Text} from 'react-native';

export interface IPhoto {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
}

export interface Props {
  photo: IPhoto;
}

export default function PhotoItem({photo}: Props) {
  return (
    <View>
      <Image source={{uri: photo.thumbnail}} />
      <Text>{photo.title}</Text>
    </View>
  );
}
