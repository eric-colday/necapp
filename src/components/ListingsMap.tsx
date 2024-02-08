import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
// import MapView from 'react-native-map-clustering';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as Location from 'expo-location';
import { markers } from '@/assets/markets';
import listingsData from '@/assets/data/data.json';

interface Props {
    listings: Array<any>;
    location: any;
}

interface Listing {
    alias: string;
    categories: {
        alias: string;
        title: string;
    }[];
    coordinates: {
        latitude: number;
        longitude: number;
    };
    display_phone: string;
    distance: number;
    id: string;
    image_url: string;
    is_closed: boolean;
    location: {
        address1: string;
        address2: string;
        address3: string;
        city: string;
        country: string;
        display_address: string[];
        state: string;
        zip_code: string;
    };
    name: string;
    phone: string;
    price: string;
    rating: number;
    review_count: number;
    transactions: string[];
    url: string;
}

const INITIAL_REGION = {
    latitude: 48.6059364,
    longitude: 7.7804396,
    latitudeDelta: 0.5206199232625792,
    longitudeDelta: 1.999997869133935
};

const ListingsMap = ({ listings, location }: Props) => {
    const router = useRouter();
    const mapRef = useRef<any>(null);
    const navigation = useNavigation();

    // const listings = useMemo(() => listingsData as any, []);


    // When the component mounts, locate the user
    useEffect(() => {
        onLocateMe();
    }, []);


    // Focus the map on the user's location
    const onLocateMe = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        };

        mapRef.current?.animateToRegion(region);
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={focusMap}>
                    <View style={{ padding: 10 }}>
                        <Text>Focus</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }, []);

    const focusMap = () => {
        const GreenBayStadium = {
            latitude: 44.5013,
            longitude: -88.0622,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        };
        // mapRef.current?.animateToRegion(GreenBayStadium);

        // Or change the camera with a duration
        mapRef.current?.animateCamera({ center: GreenBayStadium, zoom: 10 }, { duration: 2000 });
    };

    const onRegionChange = (region: Region) => {
        // console.log(region);

    };

    const onMarkerSelected = (marker: Listing) => {
        console.log(marker.id);
        // router.push(`/listing/${marker.id}`);
    };

    const calloutPressed = (ev: any) => {
        console.log(ev);
    };



    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                // initialRegion={INITIAL_REGION}
                showsUserLocation={true}
                showsMyLocationButton
                // provider={PROVIDER_GOOGLE}
                ref={mapRef}
                onRegionChangeComplete={onRegionChange}
                region={location}
            >
                {listings?.map((marker: Listing, index: number) => (
                    <Marker
                        key={index}
                        title={marker.name}
                        coordinate={marker.coordinates}
                        onPress={() => onMarkerSelected(marker)}
                    >
                        <Callout onPress={calloutPressed}>
                            <TouchableOpacity className="p-2 flex items-center justify-center gap-2"
                            >
                                <Image source={{ uri: marker.image_url }} className="w-32 h-20" />
                                <Text style={{ fontSize: 14 }}>{marker.name}</Text>
                            </TouchableOpacity>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
                <Ionicons name="navigate" size={24} color={Colors.dark2} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
      },
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
    locateBtn: {
        position: 'absolute',
        top: 150,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
});

export default ListingsMap