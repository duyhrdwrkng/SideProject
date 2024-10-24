import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#90EE90',
    padding: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  reportButton: {
    position: 'absolute',
    bottom: 130,
    left: '60%',
    transform: [{ translateX: -50 }],
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    position: 'absolute',
    bottom: 90,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#90EE90',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  averageRating: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  historyContainer: {
    maxHeight: 100,
    marginBottom: 15,
  },
  historyItem: {
    marginVertical: 2,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  inactiveTab: {
    color: '#555',
  },
  eventsContainer: {
    maxHeight: 100,
    marginBottom: 15,
  },
  eventItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  eventDetails: {
    marginTop: 5,
    color: '#555',
  },
});

export default styles;
