import React from 'react';

import styles from './styles';
import {View, TextInput} from 'react-native';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
}

export default function SearchInput({value, onChangeText}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
