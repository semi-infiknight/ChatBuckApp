import {
  View,
  Text,
  Dimensions,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForgotPassword from './ForgotPassword';
import colors from '../../config/colors';

const SignIn = ({navigation}) => {
  const apiCall = async () => {
    try {
      const response = await fetch(
        'https://e5a2-103-175-180-42.in.ngrok.io/wallet',
        {
          method: 'get',
        },
      );
      const json = await response.json();
      const public_key_api = json.public_key;
      const private_key_api = json.private_key;
      const blockchain_address_api = json.blockchain_address;

      await AsyncStorage.setItem('public_key', JSON.stringify(public_key_api));
      await AsyncStorage.setItem(
        'private_key',
        JSON.stringify(private_key_api),
      );
      await AsyncStorage.setItem(
        'blockchain_address',
        JSON.stringify(blockchain_address_api),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandle = async () => {
    try {
      //   let lowUsername = username.toLowerCase();

      //   setUsername(lowUsername);
      console.log(publicKey, '  ', privateKey, '   ', blockchainAddress);
      await AsyncStorage.setItem('public_key', publicKey);
      await AsyncStorage.setItem('private_key', privateKey);
      await AsyncStorage.setItem('blockchain_address', blockchainAddress);

      // const keys = ['public_key', 'private_key', 'blockchain_address'];
      // const results = await AsyncStorage.multiGet(keys);
      // const keyMap = new Map(results);
      // const isPublicPresent = keyMap.get('public_key') !== null;
      // const isPrivatePresent = keyMap.get('private_key') !== null;
      // const isBlockPresent = keyMap.get('blockchain_address') !== null;

      // if (isPublicPresent && isPrivatePresent && isBlockPresent) {
      //   console.log(
      //     'API not called',
      //     isPublicPresent,
      //     isPrivatePresent,
      //     isBlockPresent,
      //   );
      //   navigation.navigate('MainNavigate');
      // } else {
      //   console.log('API Called');
      //   apiCall();
      //   navigation.navigate('MainNavigate');
      // }
      navigation.navigate('MainNavigate');
    } catch (error) {
      console.log(error);
    }
  };

  const [ForgotPass, setForgotPass] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const [secPass, setsecPass] = useState(true);
  const [secPassEye, setsecPassEye] = useState('eye-off');
  const [errorLine, seterrorLine] = useState('');
  const [publicKey, setpublicKey] = useState('');
  const [privateKey, setprivateKey] = useState('');
  const [blockchainAddress, setblockchainAddress] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    if (blockchainAddress === '' || privateKey === '' || publicKey === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [publicKey, privateKey, blockchainAddress]);

  return (
    <View>
      {ForgotPass ? null : ( // <ForgotPassword setForgotPass={setForgotPass} />
        <ScrollView>
          <View style={{padding: 40}}>
            <View style={{marginBottom: 30}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 17,
                  color: isDarkMode ? colors.white : colors.black,
                  marginBottom: 10,
                }}>
                Sign in to your account
              </Text>
              <Text style={{color: isDarkMode ? colors.white : colors.black}}>
                Enter your details to sign in
              </Text>
            </View>
            <View style={{}}>
              <View style={{}}>
                <View style={{}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 15,
                      color: isDarkMode ? colors.white : colors.black,
                      marginBottom: 10,
                    }}>
                    Public Key
                  </Text>
                  <View>
                    <TextInput
                      placeholder="Enter your public key"
                      placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
                      style={{
                        borderWidth: 1,
                        borderRadius: 25,
                        borderColor: colors.mediumTeal,
                        padding: 13,
                        paddingRight: 50,
                        marginBottom: 15,
                        color: isDarkMode ? colors.white : colors.black,
                      }}
                      value={publicKey}
                      onChangeText={setpublicKey}
                    />
                    {publicKey == '' ? null : (
                      <Ionicons
                        name="close"
                        style={{
                          fontSize: 20,
                          color: isDarkMode ? colors.white : colors.black,
                          position: 'absolute',
                          top: '25%',
                          right: '5%',
                        }}
                        onPress={() => {
                          setpublicKey('');
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 15,
                      color: isDarkMode ? colors.white : colors.black,
                      marginBottom: 10,
                    }}>
                    Private Key
                  </Text>
                  <View>
                    <TextInput
                      placeholder="Enter your private key"
                      placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
                      style={{
                        borderWidth: 1,
                        borderRadius: 25,
                        borderColor: colors.mediumTeal,
                        padding: 13,
                        paddingRight: 50,
                        marginBottom: 15,
                        color: isDarkMode ? colors.white : colors.black,
                      }}
                      value={privateKey}
                      onChangeText={setprivateKey}
                    />
                    {privateKey == '' ? null : (
                      <Ionicons
                        name="close"
                        style={{
                          fontSize: 20,
                          color: isDarkMode ? colors.white : colors.black,
                          position: 'absolute',
                          top: '25%',
                          right: '5%',
                        }}
                        onPress={() => {
                          setprivateKey('');
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 15,
                      color: isDarkMode ? colors.white : colors.black,
                      marginBottom: 10,
                    }}>
                    Blockchain Address
                  </Text>
                  <View>
                    <TextInput
                      placeholder="Enter your blockchain address"
                      placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
                      style={{
                        borderWidth: 1,
                        borderRadius: 25,
                        borderColor: colors.mediumTeal,
                        padding: 13,
                        paddingRight: 50,
                        marginBottom: 15,
                        color: isDarkMode ? colors.white : colors.black,
                      }}
                      value={blockchainAddress}
                      onChangeText={setblockchainAddress}
                    />
                    {blockchainAddress == '' ? null : (
                      <Ionicons
                        name="close"
                        style={{
                          fontSize: 20,
                          color: isDarkMode ? colors.white : colors.black,
                          position: 'absolute',
                          top: '25%',
                          right: '5%',
                        }}
                        onPress={() => {
                          setblockchainAddress('');
                        }}
                      />
                    )}
                  </View>
                  {/* <View>
                  <TextInput
                    placeholder="Enter password"
                    secureTextEntry={secPass}
                    placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
                    style={{
                      borderWidth: 1,
                      borderRadius: 25,
                      borderColor: colors.mediumTeal,
                      padding: 13,
                      paddingRight: 50,
                      marginBottom: 15,
                      color: isDarkMode ? colors.white : 'grey',
                    }}
                    value={password}
                    onChangeText={setPassword}
                  />
                  {password == '' ? null : (
                    <Ionicons
                      name={secPassEye}
                      style={{
                        fontSize: 25,
                        color: colors.mediumTeal,
                        position: 'absolute',
                        top: '20%',
                        right: '5%',
                      }}
                      onPress={() => {
                        secPass == true ? setsecPass(false) : setsecPass(true);
                        secPass == true
                          ? setsecPassEye('eye')
                          : setsecPassEye('eye-off');
                      }}
                    />
                  )}
                </View> */}
                </View>

                <Text style={{color: 'red', marginLeft: 10}}>{errorLine}</Text>

                <TouchableOpacity
                  style={{
                    height: 65,
                    backgroundColor: isDarkMode ? colors.white : colors.black,
                    borderRadius: 30,
                    justifyContent: 'center',
                    marginTop: 20,
                  }}
                  disabled={buttonDisabled}
                  onPress={() => {
                    loginHandle();
                  }}>
                  <Text
                    style={{
                      color: isDarkMode ? colors.black : colors.white,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    Log In
                  </Text>
                </TouchableOpacity>
                {/* <Text
                onPress={() => {
                  setForgotPass(true);
                }}
                style={{
                  fontWeight: '500',
                  fontSize: 16,
                  color: isDarkMode ? colors.white : colors.black,
                  marginTop: 20,
                  textAlign: 'center',
                }}>
                Forgot Password?
              </Text> */}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SignIn;
