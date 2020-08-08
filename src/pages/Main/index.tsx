import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './styles';
import PhotoItem, {IPhoto} from './PhotoItem';
import api from '../../services/api';

export default function Main() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    api.get('/photos').then((response) => {
      setPhotos(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedPhotos}
        renderItem={({item}) => {
          return (
            <PhotoItem
              photo={item}
              onPress={() => {
                item.title = 'Mudou';
                setSelectedPhotos([...selectedPhotos, item]);
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
