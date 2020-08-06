import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import PhotoList from './PhotoList';
import {IPhoto} from './PhotoList/PhotoItem';
import api from 'src/services/api';

export default function Main() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    api.get('/photos').then((response) => {
      setPhotos(response.data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <PhotoList photos={photos} />
    </View>
  );
}
