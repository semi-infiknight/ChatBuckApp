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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const cheerio = require('cheerio');
import React, {useEffect, useState} from 'react';
import styles from './delAuthStyle';
const image = {
  uri: 'https://i.vimeocdn.com/video/1319858265-1bd4f72cdd495d6d9cd02c041e6ffadb63486e6a3a95131d7c3c1e7e81123a65-d_640x360.jpg',
};
function SignIn({navigation}) {
  const [modalVisible, setModalVisible] = useState(true);
  useEffect(() => {
    setModalVisible(true);
  }, []);

  ////////////////////////////////
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (password === '' || email === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [email, password]);

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
  const checkLocal = async () => {
    try {
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
        navigation.navigate('MainNavigate');
      } else {
        console.log('API Called');
        apiCall();
        navigation.navigate('MainNavigate');
      }
    } catch (error) {
      console.log(error);
    }
  };
  ////////////////////////////////
  return (
    <View style={styles.MainView}>
      {/* <ImageBackground source={image} style={styles.BackGImg} > */}
      <View style={styles.LogoView}>
        <Image
          source={{
            uri: 'https://chatbuck.com/wp-content/uploads/2023/02/cropped-CHATBUCK-LOGOS-16-150x150.png',
          }}
          style={styles.LogoImage}
        />
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(modalVisible);
        }}> */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.modalText}>Login</Text>
          </View>
          <View style={styles.InputView}>
            <Text style={styles.TextLabel}>Email</Text>
            <TextInput
              placeholder="Email"
              style={styles.InputText}
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.TextLabel}>Password</Text>
            <TextInput
              placeholder="Password"
              style={styles.InputText}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity
            style={styles.LogInBtn}
            disabled={buttonDisabled}
            onPress={() => {
              checkLocal();
            }}>
            <Text style={styles.LogInBtnText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ForgotPassView}
            onPress={() => {
              navigation.navigate('Forgot');
            }}>
            <Text style={styles.ForgotPassViewText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </Modal> */}
      {/* </ImageBackground> */}
    </View>
  );
}
export default SignIn;
