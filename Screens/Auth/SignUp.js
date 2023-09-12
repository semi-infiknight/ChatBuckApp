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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../config/colors';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import apiLinks from '../../config/apiLinks';

const SignUp = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSelected, setSelection] = useState(false);
  const [saveBlockChainAddress, setsaveBlockChainAddress] = useState('');
  const [savePublicKey, setsavePublicKey] = useState('');
  const [savePrivateKey, setsavePrivateKey] = useState('');
  const [isContinueView, setisContinueView] = useState(false);
  // const [blockchain_address_api, setblockchain_address_api] = useState('');
  // const [public_key_api, setpublic_key_api] = useState('');
  // const [private_key_api, setprivate_key_api] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    let timeout;
    if (showPrompt) {
      timeout = setTimeout(() => {
        setShowPrompt(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [showPrompt]);

  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, []);

  const handleBackButton = () => {
    return true;
  };

  const handleCopyAll = () => {
    const allValues = `Public Key: ${savePublicKey}\nPrivate Key: ${savePrivateKey}\nBlockChain Address: ${saveBlockChainAddress}`;
    Clipboard.setString(allValues);
    setShowPrompt(true);
  };

  const apiCall = async () => {
    try {
      const response = await fetch(`${apiLinks.wallet}/wallet`, {
        method: 'get',
      });
      const json = await response.json();

      const public_key_api = json.public_key;
      const private_key_api = json.private_key;
      const blockchain_address_api = json.blockchain_address;

      // console.log(
      //   'dsfdsf',
      //   blockchain_address_api,
      //   private_key_api,
      //   public_key_api,
      // );

      // setblockchain_address_api(json.blockchain_address);
      // setprivate_key_api(json.private_key);
      // setpublic_key_api(json.public_key);

      // console.log(
      //   'dsfdsf',
      //   blockchain_address_api,
      //   private_key_api,
      //   public_key_api,
      // );

      await AsyncStorage.setItem('public_key', JSON.stringify(public_key_api));
      await AsyncStorage.setItem(
        'private_key',
        JSON.stringify(private_key_api),
      );
      await AsyncStorage.setItem(
        'blockchain_address',
        JSON.stringify(blockchain_address_api),
      );
      setsaveBlockChainAddress(blockchain_address_api);
      setsavePublicKey(public_key_api);
      setsavePrivateKey(private_key_api);

      if (json) {
        setisContinueView(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerHandle = async () => {
    try {
      //   let lowUsername = username.toLowerCase();

      //   setUsername(lowUsername);

      const keys = ['public_key', 'private_key', 'blockchain_address'];
      const results = await AsyncStorage.multiGet(keys);
      const keyMap = new Map(results);
      const isPublicPresent = keyMap.get('public_key') !== null;
      const isPrivatePresent = keyMap.get('private_key') !== null;
      const isBlockPresent = keyMap.get('blockchain_address') !== null;

      if (isPublicPresent && isPrivatePresent && isBlockPresent) {
        console.log(
          'API not called',
          isPublicPresent,
          isPrivatePresent,
          isBlockPresent,
        );
        const PublicPresent = keyMap.get('public_key');
        const parsedPublicKey = JSON.parse(PublicPresent);
        const originalPublicKey = parsedPublicKey.replace(/\\/g, '');

        const PrivatePresent = keyMap.get('private_key');
        const parsedPrivateKey = JSON.parse(PrivatePresent);
        const originalPrivateKey = parsedPrivateKey.replace(/\\/g, '');

        const BlockPresent = keyMap.get('blockchain_address');
        const parsedBA = JSON.parse(BlockPresent);
        const originalBA = parsedBA.replace(/\\/g, '');

        setsaveBlockChainAddress(originalBA);
        setsavePublicKey(originalPublicKey);
        setsavePrivateKey(originalPrivateKey);
        setisContinueView(true);
      } else {
        console.log('API Called');
        apiCall();
      }
      console.log('sfdsf');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{marginBottom: '40%'}}>
      <View style={{padding: 40, paddingTop: 30}}>
        <View style={{marginBottom: 30}}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 17,
              color: isDarkMode ? colors.white : colors.black,
              // marginBottom: 10,
            }}>
            Create Your Account
          </Text>
          <Text style={{color: isDarkMode ? colors.white : colors.black}}>
            Create an account to generate Public Key, Private Key and BlockChain
            Address
          </Text>
        </View>
        <View style={{}}>
          <View style={{}}>
            <TouchableOpacity
              style={{
                height: 65,
                backgroundColor: isDarkMode ? colors.white : colors.black,
                borderRadius: 30,
                justifyContent: 'center',
              }}
              onPress={() => {
                // console.log('fsdf');
                // navigation.navigate('Chat');
                registerHandle();
              }}>
              <Text
                style={{
                  color: isDarkMode ? colors.black : colors.white,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Create an account
              </Text>
            </TouchableOpacity>

            {isContinueView ? (
              <View>
                <View style={{marginTop: 30}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 17,
                        color: isDarkMode ? colors.white : colors.black,
                        // marginBottom: 10,
                      }}>
                      Account details
                    </Text>
                    {showPrompt ? (
                      <Text style={{color: colors.vibrantBlue}}>
                        Copied to clipboard!
                      </Text>
                    ) : null}
                    <TouchableOpacity onPress={handleCopyAll}>
                      <Ionicons
                        name="copy-outline"
                        size={20}
                        style={{
                          color: colors.vibrantBlue,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{color: isDarkMode ? colors.white : colors.black}}>
                    Save these details to login to your account
                  </Text>
                </View>
                <View style={{marginVertical: 20}}>
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 17,
                        color: isDarkMode ? colors.white : colors.black,
                        marginRight: 10,
                      }}>
                      Public Key
                    </Text>
                    <Text
                      style={{
                        color: isDarkMode ? colors.white : colors.black,
                        // flexWrap: 'wrap',
                        paddingRight: 100,
                      }}>
                      {savePublicKey}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 17,
                        color: isDarkMode ? colors.white : colors.black,
                        marginRight: 10,
                      }}>
                      Private Key
                    </Text>
                    <Text
                      style={{
                        color: isDarkMode ? colors.white : colors.black,
                        // flexWrap: 'wrap',
                        paddingRight: 100,
                      }}>
                      {savePrivateKey}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 17,
                          color: isDarkMode ? colors.white : colors.black,
                          marginRight: 10,
                        }}>
                        Blockchain
                      </Text>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 17,
                          color: isDarkMode ? colors.white : colors.black,
                          marginRight: 10,
                        }}>
                        Address
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: isDarkMode ? colors.white : colors.black,
                        // flexWrap: 'wrap',
                        paddingRight: 100,
                      }}>
                      {saveBlockChainAddress}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    height: 65,
                    backgroundColor: isDarkMode ? colors.white : colors.black,
                    borderRadius: 30,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'MainNavigate'}],
                    });
                  }}>
                  <Text
                    style={{
                      color: isDarkMode ? colors.black : colors.white,
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: '700',
                    }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
