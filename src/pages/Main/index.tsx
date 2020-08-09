import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './styles';
import PhotoItem, {IPhoto} from './PhotoItem';
import api from '../../services/api';
import SearchInput from './SearchInput';

export default function Main() {
  // const selectedPhotos = useRef<boolean[]>([]);

  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<boolean[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    api.get('/photos').then((response) => {
      setPhotos(response.data);
    });
  }, []);

  const onPhotoItemPress = useCallback((photo: IPhoto, index: number) => {
    // console.log('PRESSING INDEX: ', index);
    setSelectedPhotos((prevState) => {
      if (prevState[index]) {
        delete prevState[index];
      } else {
        prevState[index] = true;
      }
      return [...prevState];
    });
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      // console.log(selectedPhotos);
      return (
        <PhotoItem
          photo={item}
          selected={!!selectedPhotos[index]}
          onPress={() => onPhotoItemPress(item, index)}
        />
      );
    },
    [onPhotoItemPress, selectedPhotos],
  );

  return (
    <View style={styles.container}>
      <SearchInput value={term} onChangeText={setTerm} />
      <FlatList
        data={photos}
        extraData={selectedPhotos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
