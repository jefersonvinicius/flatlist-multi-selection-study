import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 3,
    marginRight: 5,
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serchInput: {
    borderRadius: 5,
    width: 150,
    fontSize: 15,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
});

export default styles;
