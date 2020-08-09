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

function getScreenTitle(amount: number) {
  return amount === 0
    ? 'Fotos'
    : `${amount} foto${amount > 1 ? 's' : ''} selecionada${
        amount > 1 ? 's' : ''
      }`;
}

export default function Main() {
  // const selectedPhotos = useRef<boolean[]>([]);

  const navigation = useNavigation();

  const photosHolder = useRef<IPhoto[]>([]);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [amountSelected, setAmountSelected] = useState(0);

  const configureNextAnimation = useLayoutAnimation();

  const onHeaderTrashPress = useCallback(() => {
    function deleteSelectedPhotos() {
      configureNextAnimation('easeInEaseOut');
      setPhotos((prevState) => prevState.filter((photo) => !photo.selected));
      setAmountSelected(0);
    }
    Alert.alert(
      'Aviso',
      `Tem certeza que deseja excluir ${amountSelected} fotos?`,
      [{text: 'Cancelar'}, {text: 'Excluir', onPress: deleteSelectedPhotos}],
    );
  }, [amountSelected, configureNextAnimation]);

  const onHeaderClosePress = useCallback(() => {
    for (const photo of photos) {
      photo.selected = false;
    }
    setAmountSelected(0);
  }, [photos]);

  useLayoutEffect(() => {
    configureNextAnimation('easeInEaseOut');
    navigation.setOptions({
      title: getScreenTitle(amountSelected),
      headerRight: () => (
        <HeaderRight
          showTrash={amountSelected > 0}
          showSearch={amountSelected === 0}
          onTrashPress={onHeaderTrashPress}
        />
      ),
    });
  }, [
    navigation,
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
    console.log(photo);

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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#212121" />
      <FlatList
        data={photos}
        extraData={amountSelected}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
