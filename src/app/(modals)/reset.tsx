import { View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Text } from 'react-native';

const PwReset = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result?.createdSessionId });
      router.back();
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <View className="mb-1 ml-2">
            <Text>Email</Text>
          </View>
          <TextInput autoCapitalize="none" placeholder="email" value={emailAddress} onChangeText={setEmailAddress} style={[defaultStyles.inputField, { marginBottom: 10 }]} />
          <TouchableOpacity style={defaultStyles.btn} onPress={onRequestReset}>
            <Text style={defaultStyles.btnText}>Envoyer un e-mail de réinitialisation</Text>
          </TouchableOpacity>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <View className="mb-1 ml-2">
              <Text>Email</Text>
            </View>
            <TextInput value={code} placeholder="Code..." style={[defaultStyles.inputField, { marginBottom: 10 }]} onChangeText={setCode} />
            <TextInput placeholder="Nouveau mot de passe" value={password} onChangeText={setPassword} secureTextEntry style={[defaultStyles.inputField, { marginBottom: 10 }]} />
          </View>
          <TouchableOpacity style={defaultStyles.btn} onPress={onReset}>
            <Text style={defaultStyles.btnText}>Definir un nouveau mot de passe</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default PwReset;
