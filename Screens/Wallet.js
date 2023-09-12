import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  LogBox,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../config/colors';
import WalletSendModal from './WalletSendModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiLinks from '../config/apiLinks';
// const cheerio = require('cheerio');

const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const Wallet = ({navigation}) => {
  const [TransactionData, setTransactionData] = useState('');

  const [publicKey, setpublicKey] = useState('');
  const [privateKey, setprivateKey] = useState('');
  const [BlockchainAddress, setBlockchainAddress] = useState('');

  ////////////////////////////////

  const [walletSendModal, setwalletSendModal] = useState(false);
  useEffect(() => {
    GetTransactionDataInterval();
  }, []);

  const GetTransactionData = async () => {
    try {
      const response = await fetch(
        `${apiLinks.wallet}/wallet/amount?blockchain_address=${BlockchainAddress}`,
        {
          method: 'get',
        },
      );
      const json = await response.json();
      let Newdata = json.amount;
      console.log(Newdata);
      setTransactionData(Newdata);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTransactionDataInterval = async () => {
    // Loads Wallet Amount after interval of every 3000ms

    setprivateKey(await AsyncStorage.getItem('private_key'));
    setpublicKey(await AsyncStorage.getItem('public_key'));
    setBlockchainAddress(await AsyncStorage.getItem('blockchain_address'));
    GetTransactionData();
    setInterval(GetTransactionData, 3000);
  };

  ////////////////////////////////

  // const GetTransactionData = async () => {
  //   try {
  //     const response = await fetch('https://e5a2-103-175-180-42.in.ngrok.io/', {
  //       method: 'get',
  //     });
  //     const html = await response.text();
  //     const $ = cheerio.load(html);

  //     // Retrieve the value of an element using its ID
  //     const Newdata = $('#wallet_amount').text();
  //     console.log(Newdata);
  //     setTransactionData(Newdata);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={[
        styles.MainView,
        isDarkMode
          ? {backgroundColor: colors.black}
          : {backgroundColor: 'white'},
      ]}>
      <View style={styles.TopView}>
        <Ionicons
          name="arrow-back-sharp"
          style={{
            fontSize: 40,
            color: isDarkMode ? 'white' : colors.black,
            marginLeft: 5,
          }}
        />
        <Text
          style={[
            styles.WalletText,
            isDarkMode ? {color: 'white'} : {color: colors.black},
          ]}>
          Wallet
        </Text>
        <TouchableOpacity
          style={styles.ImageTopHead}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/236/236831.png',
            }}
            style={styles.ImageHead}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={walletSendModal}
        onRequestClose={() => {
          setwalletSendModal(false);
        }}>
        <WalletSendModal
          privateKey={privateKey}
          publicKey={publicKey}
          BlockchainAddress={BlockchainAddress}
        />
      </Modal>
      <View style={[styles.WalletAmount]}>
        {/* {
TransactionData==""?<ActivityIndicator color="blue" size={22} />
        } */}

        <Text
          style={[
            styles.WalletAmoountText,
            isDarkMode ? {color: 'white'} : {color: colors.black},
          ]}>
          {TransactionData}
        </Text>
      </View>
      <View style={styles.BtnView}>
        <TouchableOpacity style={styles.Btns}>
          <Text style={styles.TextBtn}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Btns}
          onPress={() => {
            setwalletSendModal(true);
          }}>
          <Text style={styles.TextBtn}>Send</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.WallView}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
          }}
          style={styles.ImageMan}
        />
        <Text
          style={[
            styles.WallViewText,
            isDarkMode ? {color: 'white'} : {color: colors.black},
          ]}>
          Sebriaqn
        </Text>
        <Text
          style={[
            styles.WallViewText,
            isDarkMode ? {color: 'white'} : {color: colors.black},
          ]}>
          $149
        </Text>
      </View> */}
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  MainView: {
    width: windoWidth,
    height: windoHeight,
    backgroundColor: 'white',
  },
  ImageHead: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
  },
  TopView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 1,
    height: windoHeight / 13,
  },
  WalletText: {
    // borderWidth: 1,
    width: windoWidth / 1.6,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: '800',
    color: colors.black,
  },
  WalletAmount: {
    height: windoHeight / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
  },
  WalletAmoountText: {
    fontSize: 50,
    color: colors.black,
    fontWeight: '800',
  },
  BtnView: {
    // borderWidth: 1,
    // height: windoHeight / 7,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  Btns: {
    // borderWidth: 1,
    backgroundColor: colors.mediumTeal,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginHorizontal: 20,
    width: windoWidth / 3,
  },
  TextBtn: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  ImageMan: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
  },
  WallView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  WallViewText: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '900',
    marginHorizontal: 10,
    width: windoWidth / 2,
  },
});
