import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import LottieView from "lottie-react-native";
import { Link, router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import Colors from "@/constants/Colors";

const ViewCart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signOut, isSignedIn } = useAuth();

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const addOrderToBd = async (e) => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setModalVisible(false);
        router.push("/order");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },

    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },

    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },

    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalUSD}</Text>
            </View>
            <View
              style={{
                flexDirection: "",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => {
                  addOrderToBd();
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, marginRight: 100 }}
                >
                  Checkout
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    right: 80,
                    color: "white",
                    fontSize: 15,
                    top: 17,
                  }}
                >
                  {total ? totalUSD : ""}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 130,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={() => setModalVisible(true)}
            >
              {isSignedIn ? (
                <>
                  <Image
                    source={require("../../assets/images/cats/shopping-bag.png")}
                    style={{ width: 30, height: 30 }}
                  />

                  <Text style={{ color: "white", fontSize: 20 }}>
                    View Cart
                  </Text>
                  <Text style={{ color: "white", fontSize: 20 }}>
                    {totalUSD}
                  </Text>
                </>
              ) : (
                <Link href={"/(modals)/login"} asChild>
                  <Button title="Log In" color="white" />
                </Link>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.9,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 900,
          }}
        >
          <LottieView
            autoPlay
            loop
            style={{
              height: 200,
              width: 200,
            }}
            source={require("../../assets/images/animation/check-mark.json")}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;
