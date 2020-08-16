import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

export default function PhotosNotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Nenhuma foto encontrada</Text>
    </View>
  );
}
