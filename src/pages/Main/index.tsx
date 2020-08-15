import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import {View, FlatList, StatusBar, Alert} from 'react-native';
import styles from './styles';
import PhotoItem, {IPhoto} from './PhotoItem';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import HeaderRight from './HeaderRight';
import useLayoutAnimation from '../../hooks/useLayoutAnimation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RectButton} from 'react-native-gesture-handler';

function getScreenTitle(amount: number) {
  return amount === 0
    ? 'Fotos'
    : `${amount} foto${amount > 1 ? 's' : ''} selecionada${
        amount > 1 ? 's' : ''
      }`;
}

export default function Main() {
  const navigation = useNavigation();

  const listRef = useRef<FlatList<IPhoto> | null | undefined>(null);
  const photosHolder = useRef<IPhoto[]>([]);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [amountSelected, setAmountSelected] = useState(0);
  const [toTopButtonVisible, setToTopButtonVisible] = useState(false);

  const configureNextAnimation = useLayoutAnimation();

  const onHeaderTrashPress = useCallback(() => {
    function deleteSelectedPhotos() {
      configureNextAnimation('easeInEaseOut');
      setPhotos((prevState) => prevState.filter((photo) => !photo.selected));
      setAmountSelected(0);
    }
    Alert.alert(
      'Aviso',
      `Tem certeza que deseja excluir ${amountSelected} foto${
        amountSelected > 1 ? 's' : ''
      }?`,
      [{text: 'Cancelar'}, {text: 'Excluir', onPress: deleteSelectedPhotos}],
    );
  }, [amountSelected, configureNextAnimation]);

  const onHeaderClosePress = useCallback(() => {
    for (const photo of photos) {
      photo.selected = false;
    }
    setAmountSelected(0);
  }, [photos]);

  const onHeaderSearch = useCallback((value: string) => {
    if (value.length > 0) {
      setPhotos((prevState) => {
        return prevState.filter((photo) => {
          return photo.title.toLowerCase().includes(value.toLowerCase());
        });
      });
    } else {
      setPhotos(photosHolder.current.filter((photo) => !photo.selected));
    }
  }, []);

  useLayoutEffect(() => {
    configureNextAnimation('easeInEaseOut');
    navigation.setOptions({
      title: getScreenTitle(amountSelected),
      headerRight: () => (
        <HeaderRight
          showTrash={amountSelected > 0}
          showClose={amountSelected > 0}
          showSearch={amountSelected === 0}
          onTrashPress={onHeaderTrashPress}
          onClosePress={onHeaderClosePress}
          onSearch={onHeaderSearch}
        />
      ),
    });
  }, [
    navigation,
    onHeaderSearch,
    amountSelected,
    onHeaderTrashPress,
    configureNextAnimation,
    onHeaderClosePress,
  ]);

  useEffect(() => {
    api.get('/photos').then((response) => {
      photosHolder.current = response.data;
      setPhotos(response.data);
    });
  }, []);

  const onPhotoItemPress = useCallback((photo: IPhoto) => {
    if (photo.selected) {
      photo.selected = false;
      setAmountSelected((prevState) => prevState - 1);
    } else {
      photo.selected = true;
      setAmountSelected((prevState) => prevState + 1);
    }
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <PhotoItem
          photo={item}
          selected={!!item.selected}
          onPress={() => onPhotoItemPress(item)}
        />
      );
    },
    [onPhotoItemPress],
  );

  const onScroll = useCallback(
    (event) => {
      configureNextAnimation('opacity');
      if (event.nativeEvent.contentOffset.y > 500) {
        setToTopButtonVisible(true);
      } else {
        setToTopButtonVisible(false);
      }
    },
    [configureNextAnimation],
  );

  const onToTopPress = useCallback(() => {
    listRef.current?.scrollToOffset({offset: 0, animated: true});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#212121" />
      <FlatList
        ref={(ref) => (listRef.current = ref)}
        data={photos}
        extraData={amountSelected}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
        scrollEventThrottle={50}
        onScroll={onScroll}
      />
      {toTopButtonVisible && (
        <RectButton style={styles.toTopButton} onPress={onToTopPress}>
          <Icon name="arrow-up" color="#fff" size={20} />
        </RectButton>
      )}
    </View>
  );
}
