import React, {useState, useCallback} from 'react';
import styles from './styles';
import {View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RectButton} from 'react-native-gesture-handler';
import useLayoutAnimation from '../../../hooks/useLayoutAnimation';

interface Props {
  showTrash: boolean;
  showSearch: boolean;
  showClose: boolean;
  onTrashPress: () => void;
  onClosePress: () => void;
  onSearch: (term: string) => void;
}

export default function HeaderRight({
  showTrash = true,
  showSearch = true,
  showClose = false,
  onTrashPress,
  onClosePress,
  onSearch,
}: Props) {
  const [showInput, setShowInput] = useState(false);
  const [term, setTerm] = useState('');

  const configureNextAnimation = useLayoutAnimation();

  const onSearchIconPress = useCallback(() => {
    configureNextAnimation('easeInEaseOut');
    setShowInput((prevState) => !prevState);
  }, [configureNextAnimation]);

  const onChangeSearchText = useCallback(
    (value) => {
      setTerm(value);
      onSearch(value);
    },
    [onSearch],
  );

  return (
    <View style={styles.container}>
      {showSearch && (
        <View style={styles.searchContainer}>
          {showInput && (
            <TextInput
              value={term}
              onChangeText={onChangeSearchText}
              placeholder="Pesquisar..."
              style={styles.serchInput}
              autoFocus
            />
          )}
          <RectButton
            style={styles.headerButton}
            rippleColor="#fff"
            onPress={onSearchIconPress}>
            <Icon
              name={showInput ? 'close' : 'search'}
              size={30}
              color="#fff"
            />
          </RectButton>
        </View>
      )}
      {showTrash && (
        <RectButton
          onPress={onTrashPress}
          style={styles.headerButton}
          rippleColor="#ef9a9a">
          <Icon name="delete" size={30} color="#ef5350" />
        </RectButton>
      )}
      {showClose && (
        <RectButton
          onPress={onClosePress}
          style={styles.headerButton}
          rippleColor="#eee">
          <Icon name="close" size={30} color="#fff" />
        </RectButton>
      )}
    </View>
  );
}
