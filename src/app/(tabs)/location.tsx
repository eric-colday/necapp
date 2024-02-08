import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CustomHeader from '@/src/components/CustomHeader'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const Page = () => {
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
                                    <CustomHeader />
                                </View> 
                            </View>
                        </SafeAreaView>
                    ),
                }}
            />
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