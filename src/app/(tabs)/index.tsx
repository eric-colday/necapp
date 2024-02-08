import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/src/components/ExploreHeader'
import axios from "axios";
import ListingsBottomSheet from '@/src/components/ListingsBottomSheet';
import HeaderTabs from '@/src/components/HeaderTabs';
import SearchBar from '@/src/components/SearchBar';
import ListingsMap from '@/src/components/ListingsMap';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from '@/src/components/CustomHeader';


const YELP_API_KEY = process.env.EXPO_PUBLIC_YELP_API_KEY;

const Page = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  

  const [city, setCity] = useState<string>("Strasbourg");
  const [activeTab, setActiveTab] = useState<string>("Delivery");

  const [category, setCategory] = useState<string>('Alsatian');

  const onDataChanged = (category: string) => {
    setCategory(category); 
  }

  useEffect(() => {
    const getRestaurantsFromYelp = async () => { 
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
      const apiOptions = {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      };
      axios
        .get(yelpUrl, apiOptions)
        .then((response) => {
          setRestaurantData(response.data.businesses)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRestaurantsFromYelp();
  }, [city, activeTab]);


  //test 
  const [location, setLocation] = useState({
    latitude: 48.6059364,
    longitude: 7.7804396,
    latitudeDelta: 0.5206199232625792,
    longitudeDelta: 1.999997869133935
  });

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      {/* Define pour custom header */}
      <Stack.Screen
        options={{
          header: () => (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
             <StatusBar
                style="dark"
              />
              <View style={styles.container}>
                <View style={{ backgroundColor: "white", padding: 15 }}>
                  <CustomHeader/> 
                  <SearchBar cityHandler={setCity} location={location} setLocation={setLocation} />
                </View> 
                <ExploreHeader onCategoryChanged={onDataChanged} />
              </View>
            </SafeAreaView> 
          ),
        }}
      />
      <ListingsMap listings={restaurantData} location={location}/> 
      <ListingsBottomSheet listings={restaurantData} category={category} city={city}/>
    </View>
  )
}

const styles = {
  container: {
    backgroundColor: '#fff',
    height: 205,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
};

export default Page