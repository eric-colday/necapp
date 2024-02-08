import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';


import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { Link, useRouter } from 'expo-router';
import { useOAuth, useSignIn } from '@clerk/clerk-expo';

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}



const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();

  //login with google
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

  //login with email
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //login with google
  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  //login with email

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      router.back();
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View className="mb-1 ml-2">
        <Text>Email</Text>
      </View>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={[defaultStyles.inputField, { marginBottom: 10 }]}
      />
      <View className="mb-1 ml-2">
        <Text>Mot de passe</Text>
      </View>
      <TextInput
        autoCapitalize="none"
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        style={[defaultStyles.inputField, { marginBottom: 10 }]}
      />

      <TouchableOpacity style={defaultStyles.btn} onPress={onSignInPress}>
        <Text style={defaultStyles.btnText}>Se connecter</Text>
      </TouchableOpacity>
      <Link href="/(modals)/reset"  asChild>
        <Pressable style={styles.button} className="mt-6">
          <Text>Mot de passe oublié?</Text>
        </Pressable>
      </Link>
      <Link href="/(modals)/register" asChild>
        <Pressable style={styles.button}>
          <Text>Créer un compte</Text>
        </Pressable>
      </Link>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>Ou</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }} className="flex-row justify-center">
        <TouchableOpacity className="rounded-2xl border w-16 h-14 flex justify-center items-center" onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="md-logo-apple" size={24} />
        </TouchableOpacity>

        <TouchableOpacity className="rounded-2xl border w-16 h-14 flex justify-center items-center" onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="md-logo-google" size={24} />
        </TouchableOpacity>

        <TouchableOpacity className="rounded-2xl border w-16 h-14 flex justify-center items-center" onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="md-logo-facebook" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 26,
  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  button: {
    margin: 8,
    alignItems: 'center',
  },
});

export default Page