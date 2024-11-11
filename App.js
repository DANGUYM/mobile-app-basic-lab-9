import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const App = () => {
  const [bike, setBike] = useState([]);
  const [filteredBikeData, setFilteredBikeData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://6731ce1c7aaf2a9aff12318a.mockapi.io/demo')
      .then(response => response.json())
      .then(data => {
        setBike(data);
        applyFilter(data, filter);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const applyFilter = (bikes, filter) => {
    let filteredBikes = bikes;
    if (filter === 'roadbike') {
      filteredBikes = bikes.filter(bike => bike.name.toLowerCase().includes('road'));
    } else if (filter === 'mountain') {
      filteredBikes = bikes.filter(bike => bike.name.toLowerCase().includes('mountain'));
    }
    setFilteredBikeData(filteredBikes);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    applyFilter(bike, newFilter);
  };

  const renderItem = ({ item }) => (
    <View style={styles.bikeItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.bikeImage}
        resizeMode="cover"
      />
      <View style={styles.bikeInfo}>
        <Text style={styles.bikeName}>{item.name}</Text>
        <Text style={styles.bikePrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleScreen}>The World’s Best Bike</Text>
      </View>

      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}
          onPress={() => handleFilterChange('all')}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'roadbike' && styles.activeFilterButton]}
          onPress={() => handleFilterChange('roadbike')}
        >
          <Text style={styles.filterButtonText}>Roadbike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'mountain' && styles.activeFilterButton]}
          onPress={() => handleFilterChange('mountain')}
        >
          <Text style={styles.filterButtonText}>Mountain</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.bikeList}
        data={filteredBikeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleScreen: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    minWidth: '28%',
  },
  activeFilterButton: {
    backgroundColor: 'red',
  },
  filterButtonText: {
    fontSize: 16,
    color: 'black',
  },
  bikeList: {
    paddingHorizontal: 10,
  },
  bikeItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
    width:"50%"
  },
  bikeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  bikeInfo: {
    marginLeft: 15,
  },
  bikeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bikePrice: {
    fontSize: 16,
    color: 'green',
  },
});

export default App;