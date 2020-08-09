import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './styles';
import PhotoItem, {IPhoto} from './PhotoItem';
import api from '../../services/api';
import SearchInput from './SearchInput';

export default function Main() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<IPhoto[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    api.get('/photos').then((response) => {
      setPhotos(response.data);
    });
  }, []);

  function onPhotoItemPress(photo: IPhoto) {
    console.log(photo);
  }

  return (
    <View style={styles.container}>
      <SearchInput value={term} onChangeText={setTerm} />
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <PhotoItem photo={item} onPress={() => onPhotoItemPress(item)} />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
