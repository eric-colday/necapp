import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import useBasketStore from '@/store/basketStore';
import { router } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Link, useNavigation, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

const success = () => {
    const stopCheckout = () => {
        router.replace('/(tabs)/');
    }

    return (
        <>
            <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fallSpeed={2500} fadeOut={true} autoStart={true} />
            <View className="flex-1 justify-center items-center p-2">
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Nous vous remercions pour votre commande!</Text>
                <Link href={'/'} asChild>
                    <TouchableOpacity style={styles.orderBtn} onPress={() => stopCheckout()}>
                        <Text style={styles.footerText}>Retour à l'Accueil</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        gap: 20,
        alignItems: 'center',
    },
    section: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
    },
    total: {
        fontSize: 18,
        color: Colors.medium,
    },
    footer: {
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 20,
    },
    fullButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 50,
    },
    footerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    orderBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        width: 250,
        height: 50,
        justifyContent: 'center',
        marginTop: 20,
    },
});


export default success