import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    marginVertical: 5,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  toTopButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#c62828',
  },
  fetchingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default styles;
