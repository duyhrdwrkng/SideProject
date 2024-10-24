import React, { useState, useEffect } from 'react';
import { View, Button, Modal, TextInput, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './AppStyles'; // Import styles from AppStyles.js

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [commentsHistory, setCommentsHistory] = useState([]);
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 16.0583,
    longitude: 108.2115,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [path, setPath] = useState([]);
  const [activeTab, setActiveTab] = useState('comment');

  const events = [
    { id: 1, description: '2 girls kidnapped on 12/3/2023', details: 'This incident occurred in the downtown area.' },
    { id: 2, description: '1 girl kidnapped on 20/7/2021', details: 'The victim was taken while walking home from school.' },
    { id: 3, description: '3 girls kidnapped on 7/6/2019', details: 'Multiple witnesses saw suspicious activity.' },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 10000,
        },
        (loc) => {
          setLocation(loc.coords);
          setMapRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setPath((prevPath) => [...prevPath, loc.coords]);
        }
      );
      setLocationSubscription(subscription);
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const handleCommentSubmit = () => {
    if (rating === 0) {
      Alert.alert("Please select a rating before submitting.");
      return;
    }

    setRatings([...ratings, rating]);
    setCommentsHistory([...commentsHistory, { comment, rating }]);
    setComment('');
    setRating(0);
    setModalVisible(false);
  };

  const calculateAverageRating = () => {
    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    return ratings.length ? total / ratings.length : 0;
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
        <MaterialIcons
          name="star"
          size={30}
          color={index < rating ? '#FFD700' : '#ddd'}
        />
      </TouchableOpacity>
    ));
  };

  const renderHistory = () => {
    return commentsHistory.map((entry, index) => (
      <View key={index} style={styles.historyItem}>
        <Text>{`"${entry.comment}" - ${entry.rating} star${entry.rating > 1 ? 's' : ''}`}</Text>
      </View>
    ));
  };

  const renderEvents = () => {
    return events.map(event => (
      <View key={event.id} style={styles.eventItem}>
        <Text style={styles.eventTitle}>{event.description}</Text>
        <Text style={styles.eventDetails}>{event.details}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aurashield</Text>
      </View>

      <MapView style={styles.map} region={mapRegion}>
        {location && (
          <>
            <Marker coordinate={location} title="Your Location" />
            <Polyline coordinates={path} strokeColor="red" strokeWidth={3} />
            <Marker coordinate={mapRegion} title="Average Area Rating" pinColor="blue">
              <Callout>
                <Text>Average Rating: {calculateAverageRating().toFixed(2)} stars</Text>
              </Callout>
            </Marker>
          </>
        )}
      </MapView>

      <TouchableOpacity style={styles.reportButton} onPress={() => setReportModalVisible(true)}>
        <Text style={styles.buttonText}>Report</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Leave a Comment</Text>
      </TouchableOpacity>

      {/* Report Modal */}
      <Modal animationType="slide" transparent={true} visible={reportModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submit a Report</Text>
            <TextInput style={styles.input} placeholder="Title" />
            <TextInput style={styles.input} placeholder="Main Story" multiline />
            <Button title="Submit Report" onPress={() => setReportModalVisible(false)} />
            <Button title="Cancel" onPress={() => setReportModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Comment Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Leave a Comment</Text>
            <TouchableOpacity onPress={() => setActiveTab('comment')} style={styles.tabButton}>
              <Text style={activeTab === 'comment' ? styles.activeTab : styles.inactiveTab}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('events')} style={styles.tabButton}>
              <Text style={activeTab === 'events' ? styles.activeTab : styles.inactiveTab}>Events</Text>
            </TouchableOpacity>

            {activeTab === 'comment' ? (
              <>
                <Text style={styles.averageRating}>
                  Average Rating: {calculateAverageRating().toFixed(2)} stars
                </Text>
                <ScrollView style={styles.historyContainer}>
                  {renderHistory()}
                </ScrollView>
                <TextInput style={styles.input} placeholder="Your comment..." value={comment} onChangeText={setComment} />
                <View style={styles.starsContainer}>
                  {renderStars()}
                </View>
                <Button title="Submit Comment" onPress={handleCommentSubmit} />
              </>
            ) : (
              <ScrollView style={styles.eventsContainer}>
                {renderEvents()}
              </ScrollView>
            )}

            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
