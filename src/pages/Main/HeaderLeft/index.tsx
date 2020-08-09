import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';

interface Props {
  title: string;
  showClose: boolean;
  onClosePress: () => void;
}

export default function HeaderLeft({title, showClose, onClosePress}: Props) {
  return (
    <View style={styles.container}>
      {showClose && (
        <RectButton
          onPress={onClosePress}
          style={styles.headerButton}
          rippleColor="#fff">
          <Icon name="close" size={30} color="#fff" />
        </RectButton>
      )}
      {/* <Text style={styles.title}>{title}</Text> */}
    </View>
  );
}
