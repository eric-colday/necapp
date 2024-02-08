import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';


const categories = [
    {
        image: require("../../assets/images/cats/shopping-bag.png"),
        name: "Pick-up",
    },
    {
        image: require("../../assets/images/cats/soft-drink.png"),
        name: "Soft Drinks",
    },
    {
        image: require("../../assets/images/cats/bread.png"),
        name: "Bakery Items",
    },
    {
        image: require("../../assets/images/cats/fast-food.png"),
        name: "Fast Foods",
    },
    {
        image: require("../../assets/images/cats/deals.png"),
        name: "Deals",
    },
    {
        image: require("../../assets/images/cats/coffee.png"),
        name: "Coffee & Tea",
    },
    {
        image: require("../../assets/images/cats/desserts.png"),
        name: "Desserts",
    },
];

interface Props {
    onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(categories[index].name);
    };

    return (
        <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                alignItems: 'center',
                gap: 20,
                paddingHorizontal: 16,
            }}>
            {categories.map((item, index) => (
                <TouchableOpacity
                    ref={(el) => (itemsRef.current[index] = el)}
                    key={index}
                    style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                    onPress={() => selectCategory(index)}>
                    <Image
                        source={item.image}
                        style={{
                            width: 50,
                            height: 40,
                            resizeMode: "contain",
                        }}
                    />
                    <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
   
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },

    searchBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        width: 280,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});

export default ExploreHeader