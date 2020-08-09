import React from 'react';

import styles from './styles';
import {View, TextInput, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  onSearchPress: () => void;
}

export default function SearchInput({
  value,
  onChangeText,
  onSearchPress,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Pesquisar foto..."
      />
      <RectButton style={styles.searchButton} onPress={onSearchPress}>
        <Text style={styles.searchIcon}>{'>'}</Text>
      </RectButton>
    </View>
  );
}
