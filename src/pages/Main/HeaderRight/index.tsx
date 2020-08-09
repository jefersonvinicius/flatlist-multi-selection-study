import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';

interface Props {
  showTrash: boolean;
  showSearch: boolean;
  onTrashPress: () => void;
}

export default function HeaderRight({
  showTrash = true,
  showSearch = true,
  onTrashPress,
}: Props) {
  return (
    <View style={styles.container}>
      {showSearch && (
        <RectButton style={styles.headerButton} rippleColor="#fff">
          <Icon name="search" size={30} color="#fff" />
        </RectButton>
      )}
      {showTrash && (
        <RectButton
          onPress={onTrashPress}
          style={styles.headerButton}
          rippleColor="#ef9a9a">
          <Icon name="delete" size={30} color="#ef5350" />
        </RectButton>
      )}
    </View>
  );
}
