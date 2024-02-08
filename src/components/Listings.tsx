import { View, Text, StyleSheet, TouchableOpacity, ListRenderItem } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import { Link, useNavigation } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

interface Props {
    listings: any[];
    city: string;
    refresh: number;
    category: string;
}

const Listings = ({ listings: items, city, refresh, category }: Props) => {
    const listRef = useRef<BottomSheetFlatListMethods>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Update the view to scroll the list back top
    useEffect(() => {
        if (refresh) {
            scrollListTop();
        }
    }, [refresh]);

    const scrollListTop = () => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    // Use for "updating" the views data after category changed
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    // Render one listing row for the FlatList
    const renderRow: ListRenderItem<any> = ({ item }) => (
        <Link href={`/listing/${item.id}?city=${city}`} asChild>
            <TouchableOpacity>
                <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Animated.Image source={{ uri: item.image_url }} style={styles.image} />
                    <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
                        <Ionicons name="heart-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', gap: 4 }}>
                            <Ionicons name="star" size={16} />
                            <Text style={{ fontFamily: 'mon-sb' }}>{item.rating}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text style={{ fontFamily: 'mon-sb' }}>Reviews : {item.review_count}</Text>
                    </View>
                    <Text style={{ fontFamily: 'mon' }}>Categories : {item.categories
                        .map((category: any) => category.title)
                        .join(', ')
                    }</Text>
                    <Text style={{ fontFamily: 'mon' }}>Locatlisation : {item.location.city}, {item.location.country}</Text>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={defaultStyles.container}>
            <BottomSheetFlatList
                renderItem={renderRow}
                data={loading ? [] : items}
                ref={listRef}
                ListHeaderComponent={<Text style={styles.info}>{items.length} restaurants</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    info: {
        textAlign: 'center',
        fontFamily: 'mon-sb',
        fontSize: 16,
        marginTop: 4,
    },
});

export default Listings