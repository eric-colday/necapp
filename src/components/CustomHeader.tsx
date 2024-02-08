import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './BottomSheet';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';

const CustomHeader = () => {
  const { user } = useUser();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <View>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <Link href={'/(modals)/location-search'} asChild>
          <TouchableOpacity style={styles.titleContainer}
          // onPress={openModal}
          >
            <Text style={styles.title}>Livraison · Maintenant</Text>
            <View style={styles.locationName}>
              <Text style={styles.subtitle}>{
                // locationName
              }</Text>
              <Ionicons name="chevron-down" size={20} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </Link>
        {user ? (
          <Link href={'/(tabs)/profile'} asChild>
            <TouchableOpacity>
              <Image source={{ uri: user?.imageUrl }} className="rounded-full w-[35px] h-[35px]" />
            </TouchableOpacity>
          </Link>
        ) : (
          <Link href={'/(modals)/login'} asChild>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-outline" size={25} color={Colors.primary} />
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    height: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bike: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.dark2,
  },
  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: Colors.grey,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
  },
  searchContainer: {
    height: 60,
    backgroundColor: '#fff',
  },
  searchSection: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.grey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    color: Colors.dark2,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
});

export default CustomHeader