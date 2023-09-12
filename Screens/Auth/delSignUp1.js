import React from 'react';
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
const windoHeight = Dimensions.get('window').height;
const image = {
  uri: 'https://i.vimeocdn.com/video/1319858265-1bd4f72cdd495d6d9cd02c041e6ffadb63486e6a3a95131d7c3c1e7e81123a65-d_640x360.jpg',
};
import {useEffect, useState} from 'react';
import styles from './delAuthStyle';
import axios, {Axios} from 'axios';
function SignUp({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    setModalVisible(true);
    setModalVisible(true);
  }, []);

  const GetKeys = async () => {
    console.log('Hiii');
    try {
      // const response = await fetch('https://24d5-103-159-45-129.in.ngrok.io/', {
      //     headers: {
      //         "Content-Type": "application/json; charset=utf-8",
      //         "Accept": "application/json"
      //     },
      //     method: 'POST',
      // });
      axios
        .post('https://e5a2-103-175-180-42.in.ngrok.io/', {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json, text/plain, */*',
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      // await fetch('https://24d5-103-159-45-129.in.ngrok.io/', {
      //     method: "post",
      // })
      //     .then((res) => console.log(res, "ooo"))
      //     .catch(e => {
      //         console.log(e)
      //     })
    } catch (error) {
      console.log(error);
    }
  };
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {height: windoHeight / 1.4}]}>
            <View>
              <Text style={[styles.modalText, {fontSize: 30}]}>
                Create Account
              </Text>
            </View>
            <View style={styles.InputView}>
              <Text style={styles.TextLabel}>Name</Text>
              <TextInput
                placeholder="Email"
                style={styles.InputText}
                onChangeText={value => setEmail(value)}
              />
              <Text style={styles.TextLabel}>Password</Text>
              <TextInput
                placeholder="Password"
                style={styles.InputText}
                onChangeText={value => setPassword(value)}
              />
              <Text style={styles.TextLabel}>Confirm Password</Text>
              <TextInput placeholder="Password" style={styles.InputText} />
            </View>
            <TouchableOpacity style={styles.LogInBtn} onPress={GetKeys}>
              <Text style={styles.LogInBtnText}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.ForgotPassView}>
              <Text style={styles.ForgotPassViewText}>Forgot Password?</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.ForgotPassView,
                {marginHorizontal: 60, borderRadius: 7, paddingVertical: 5},
              ]}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={[styles.ForgotPassViewText, {fontSize: 17}]}>
                Go to Sign In?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* </ImageBackground> */}
    </View>
  );
}
export default SignUp;
