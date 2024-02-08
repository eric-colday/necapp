import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Layout = () => {
    return (
        <BottomSheetModalProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors.primary,
                    tabBarLabelStyle: {
                        fontFamily: 'mon-sb',
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Accueil',
                        tabBarLabel: 'Accueil',
                        tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="basket"
                    options={{
                        // headerShown: false,
                        title: 'Panier',
                        tabBarLabel: 'Commandes',
                        tabBarIcon: ({ size, color }) => <Ionicons name="cart" size={size} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="location"
                    options={{
                        title: 'Localisation',
                        tabBarLabel: 'Localisation',
                        tabBarIcon: ({ size, color }) => <Ionicons name="location" size={size} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profil',
                        tabBarLabel: 'Profil',
                        tabBarIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="success"
                    options={{
                        headerShown: false,
                        href: null,
                    }}
                />
            </Tabs>
        </BottomSheetModalProvider>
    )
}

export default Layout