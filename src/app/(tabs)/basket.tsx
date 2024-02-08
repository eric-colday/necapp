import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import useBasketStore from '@/store/basketStore';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwipeableRow from '@/src/components/SwipeableRow';
import { Link, router } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import LottieView from 'lottie-react-native';
import { useStripe } from '@stripe/stripe-react-native';

const BASE_URL = 'https://server-restop-app.onrender.com';
// const BASE_URL='http://localhost:5500';


const EXPO_STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  console.log(user);



  useEffect(() => {
    useBasketStore.persist.rehydrate();
  }, []);

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const onCheckout = async () => {
    // 1. Create a payment intent
    const response = await fetch(`${BASE_URL}/api/orders/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products,
        amount: total + FEES.service + FEES.delivery,
        status: "En preparation !",
        emailAddress: user?.emailAddresses[0].emailAddress,
      }),
      
    });

    const data = await response.json();
    console.log(data);
		if (data.error) {
		  Alert.alert('Une erreur s\'est produite');
		  return;
		}

    // 2. Initialize the Payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'restoAppNecDev',
      returnURL: 'restoAppNecDev://stripe-redirect',
      paymentIntentClientSecret: data.paymentIntent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Une erreur s\'est produite');
      return;
    }

    // 3. Present the Payment Sheet from Stripe
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Le paiement a été annulé...`,
        paymentResponse.error.message
      );
      return;
    }

    // 4. If payment ok -> create the order
    startCheckout();
  };

  const startCheckout = async () => {
    if (!isSignedIn) {
      router.replace('/(modals)/login') 
    } else {
      try {
        setOrder(true);
        const res = await fetch(`${BASE_URL}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user?.id}`,
          },
          body: JSON.stringify({
            products,
            amount: total + FEES.service + FEES.delivery,
            status: "En preparation !",
            emailAddress: user?.emailAddresses[0].emailAddress,
          }),
        });
        const data = await res.json();
        console.log(data);
        clearCart();
        router.replace(`/(tabs)/success`);

      } catch (error) {
        console.log(error);
      }
    }
  };




  return (
    <>
      {total > 0 ? (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={<Text style={styles.section}>Produits</Text>}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => reduceProduct(item)}>
                <View style={styles.row}>
                  <Text style={{ color: Colors.primary, fontSize: 18 }}>{item.quantity}x</Text>
                  <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ fontSize: 18 }}>{item.price * item.quantity}€</Text>
                </View>
              </SwipeableRow>
            )}
            ListFooterComponent={
              <View>
                <View style={{ height: 1, backgroundColor: Colors.grey }}></View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Sous total</Text>
                  <Text style={{ fontSize: 18 }}>{total}€</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Frais de service</Text>
                  <Text style={{ fontSize: 18 }}>{FEES.service}€</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Frais de livraison</Text>
                  <Text style={{ fontSize: 18 }}>{FEES.delivery}€</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Total de la commande</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{(total + FEES.service + FEES.delivery).toFixed(2)}€</Text>
                </View>
              </View>
            }
          />
          <View style={styles.footer}>
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff' }}>
              {isSignedIn ? (
                <TouchableOpacity style={styles.fullButton} onPress={onCheckout}>
                  <Text style={styles.footerText}>Commandez maintenant</Text>
                </TouchableOpacity>
              ) : (
                <Link href={'/(modals)/login'} asChild>
                  <TouchableOpacity style={styles.fullButton}>
                    <Text style={styles.footerText}>Commandez maintenant</Text>
                  </TouchableOpacity>
                </Link>
              )}
            </SafeAreaView>
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center items-center ">
          <LottieView
            source={require('@/assets/images/animation/empty.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />
          <Text className="text-2xl font-semibold ">Votre panier est encore vide</Text>
        </View>
      )}
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

export default basket