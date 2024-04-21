import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  alertContainer: {
    backgroundColor: 'rgba(230, 255, 230, 0.9)',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#rgba(0, 100, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;