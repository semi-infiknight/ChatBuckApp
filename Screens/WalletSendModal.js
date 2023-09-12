import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../config/colors';
import apiLinks from '../config/apiLinks';

const WalletSendModal = ({privateKey, publicKey, BlockchainAddress}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [blockchainAddress, setblockchainAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [errorLine, seterrorLine] = useState('');

  // const [senderPublicKey, setsenderPublicKey] = useState('');
  // const [senderPrivateKey, setsenderPrivateKey] = useState('');
  //   const [senderBlockchainAddress, setsenderBlockchainAddress] = useState('');

  const submitHandler = async () => {
    console.log(blockchainAddress, '           ', amount);
    if (blockchainAddress == '' && amount == '') {
      seterrorLine(
        `Please enter reciever's blockchain address and amount to send.`,
      );
    } else if (blockchainAddress == '') {
      seterrorLine(`Please enter the reciever's blockchain address.`);
    } else if (amount == '') {
      seterrorLine('Please enter the amount to send.');
    } else {
      seterrorLine('');
      try {
        const keys = ['public_key', 'private_key', 'blockchain_address'];
        const results = await AsyncStorage.multiGet(keys);
        const keyMap = new Map(results);
        const senderPublicKey = keyMap.get('public_key');
        const parsedPublicKey = JSON.parse(senderPublicKey);
        const originalPublicKey = parsedPublicKey.replace(/\\/g, '');

        const senderPrivateKey = keyMap.get('private_key');
        const parsedPrivateKey = JSON.parse(senderPrivateKey);
        const originalPrivateKey = parsedPrivateKey.replace(/\\/g, '');

        const senderBlockchainAddress = keyMap.get('blockchain_address');

        // const senderPublicKey = await AsyncStorage.getItem('public_key');
        // const senderPrivateKey = await AsyncStorage.getItem('private_key');
        // const senderBlockchainAddress = await AsyncStorage.getItem(
        //   'blockchain_address',
        // );

        // setsenderPublicKey(keyMap.get('public_key'));
        // setsenderPrivateKey(keyMap.get('private_key'));
        // setsenderBlockchainAddress(keyMap.get('blockchain_address'));

        // const senderPublicKey =
        //   '8e3d7f7a64c95a7cf573b5803ca5c76632dfd2aec2f052288dd18d36ede9e937be6aacb9045e6fd20fe3d514193a8da7d897f8450751e788b040c655fb841485';
        // const senderPrivateKey =
        //   '2533967b5876714ce008dc76cee3718766eb23453a9f824d27f95d48764469ee';
        // const senderBlockchainAddress = '1Jm3aTY74XNnCQVLtRAAMtTZCGHAthNTjx';

        // const sendDetails = {
        //   sender_private_key: senderPrivateKey,
        //   sender_blockchain_address: senderBlockchainAddress,
        //   recipient_blockchain_address: blockchainAddress,
        //   sender_public_key: senderPublicKey,
        //   value: amount,
        // };

        console.log(senderPublicKey, originalPublicKey);
        console.log(senderPrivateKey);
        console.log(senderBlockchainAddress);

        //backend code

        const response = await fetch(
          // 'https://e5a2-103-175-180-42.in.ngrok.io/transaction',
          `${apiLinks.wallet}/transaction`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sender_private_key: originalPrivateKey,
              sender_blockchain_address: senderBlockchainAddress,
              recipient_blockchain_address: blockchainAddress,
              // '1Bzk2CZQoKGZ7BGVjWvU4yjqkfqLGwJvfe',
              sender_public_key: originalPublicKey,
              value: amount,
            }),
          },
        );

        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View
      style={[
        styles.sendModal,
        isDarkMode
          ? {backgroundColor: colors.black}
          : {backgroundColor: 'white'},
      ]}>
      <View>
        <Text
          style={[
            styles.enter,
            isDarkMode ? {color: 'white'} : {color: colors.black},
          ]}>
          Enter Reciever Details
        </Text>
        <Text
          style={[
            styles.enterText,
            isDarkMode ? {color: '#BEBEBE'} : {color: '#808080'},
          ]}>
          Please enter reciever's blockchain address and amount to send.
        </Text>
      </View>

      <View style={styles.logoNum}>
        <Ionicons
          name="link"
          style={{fontSize: 40, color: colors.mediumTeal, marginLeft: 5}}
        />
        <TextInput
          placeholder="Blockchain Address"
          style={{width: 250, color: isDarkMode ? colors.black : 'white'}}
          value={blockchainAddress}
          placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
          onChangeText={text => setblockchainAddress(text)}></TextInput>

        {blockchainAddress == '' ? (
          <View></View>
        ) : (
          <Ionicons
            name="close"
            style={{
              fontSize: 20,
              color: colors.mediumTeal,
              position: 'absolute',
              right: '5%',
            }}
            onPress={() => {
              setblockchainAddress('');
            }}
          />
        )}
      </View>
      {/* <View style={styles.logoNum}>
        <Ionicons
          name="key"
          style={{fontSize: 40, color: colors.mediumTeal, marginLeft: 5}}
        />
        <TextInput
          placeholder="Public Key"
          style={{width: 250}}
          value={senderPublicKey}
          onChangeText={text => setsenderPublicKey(text)}></TextInput>

        {senderPublicKey == '' ? (
          <View></View>
        ) : (
          <Ionicons
            name="close"
            style={{
              fontSize: 20,
              color: colors.mediumTeal,
              position: 'absolute',
              right: '5%',
            }}
            onPress={() => {
              setsenderPublicKey('');
            }}
          />
        )}
      </View>
      <View style={styles.logoNum}>
        <Ionicons
          name="key"
          style={{fontSize: 40, color: colors.mediumTeal, marginLeft: 5}}
        />
        <TextInput
          placeholder="Private Key"
          style={{width: 250}}
          value={senderPrivateKey}
          onChangeText={text => setsenderPrivateKey(text)}></TextInput>

        {senderPrivateKey == '' ? (
          <View></View>
        ) : (
          <Ionicons
            name="close"
            style={{
              fontSize: 20,
              color: colors.mediumTeal,
              position: 'absolute',
              right: '5%',
            }}
            onPress={() => {
              setsenderPrivateKey('');
            }}
          />
        )}
      </View> */}
      <View style={styles.logoNum}>
        <Ionicons
          name="wallet"
          style={{fontSize: 40, color: colors.mediumTeal, marginLeft: 5}}
        />
        <TextInput
          numeric
          keyboardType="numeric"
          placeholder="Amount"
          style={{width: 250, color: isDarkMode ? colors.black : 'white'}}
          value={amount}
          onChangeText={text => setAmount(text)}
          placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}></TextInput>
      </View>
      <Text style={{color: 'red', marginLeft: 10}}>{errorLine}</Text>

      <TouchableOpacity style={styles.proceed} onPress={submitHandler}>
        <Text style={styles.proceedText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalletSendModal;

const styles = StyleSheet.create({
  sendModal: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 25,
    elevation: 10,
  },
  enter: {
    fontWeight: '800',
    fontSize: 25,
    paddingBottom: 10,
  },
  enterText: {
    color: '#808080',
    fontSize: 15,
    fontWeight: '400',
    paddingBottom: 40,
  },
  logoNum: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    height: 60,
  },
  proceed: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 15,
    height: 62,
    backgroundColor: colors.mediumTeal,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedText: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 20,
  },
});
