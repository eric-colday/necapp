import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack, router } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.back();
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
        <View className="mb-1 ml-2">
            <Text>Email</Text>
          </View>
          <TextInput autoCapitalize="none" placeholder="email" value={emailAddress} onChangeText={setEmailAddress} style={[defaultStyles.inputField, { marginBottom: 10 }]} />
          <View className="mb-1 ml-2">
            <Text>Mot de passe</Text>
          </View>
          <TextInput placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry style={[defaultStyles.inputField, { marginBottom: 10 }]} />
          <TouchableOpacity style={defaultStyles.btn} onPress={onSignUpPress}>
            <Text style={defaultStyles.btnText}>S'inscrire</Text>
          </TouchableOpacity>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput value={code} placeholder="Code..." style={[defaultStyles.inputField, { marginBottom: 10 }]} onChangeText={setCode} />
          </View>
          <TouchableOpacity style={defaultStyles.btn} onPress={onPressVerify}>
            <Text style={defaultStyles.btnText}>Vérifier l'email</Text>
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

export default Register;