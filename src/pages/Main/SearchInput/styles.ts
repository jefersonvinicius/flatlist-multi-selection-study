import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  input: {
    elevation: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 5,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5c6bc0',
  },
  searchIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default styles;
