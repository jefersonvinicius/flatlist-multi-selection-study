import React from 'react';
import {View, FlatList} from 'react-native';
import PhotoItem, {IPhoto} from './PhotoItem';

interface IPhotoList {
  photos: IPhoto[];
}

export default function PhotoList({photos}: IPhotoList) {
  return (
    <View>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return <PhotoItem photo={item} />;
        }}
      />
    </View>
  );
}
