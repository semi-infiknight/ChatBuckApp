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
import React, {useEffect, useState} from 'react';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
import MembersModal from './MembersModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../config/colors';
const People = ({navigation}) => {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [roomName, setroomName] = useState('');

  const startChat = () => {
    if (roomName) {
      setCreateRoomModal(false);
      console.log(roomName);
      navigation.navigate('RoomChatScreen', {
        roomName: roomName,
        senderBlockchainAddress: senderBlockchainAddress,
      });
      console.log('Group ', senderBlockchainAddress);
    }
  };

  const [senderBlockchainAddress, setsenderBlockchainAddress] = useState('');
  useEffect(() => {
    const fetchLocalStorage = async () => {
      setsenderBlockchainAddress(
        await AsyncStorage.getItem('blockchain_address'),
      );
      console.log(senderBlockchainAddress);
    };

    fetchLocalStorage();
  }, []);
  return (
    <View style={styles.MainView}>
      <View style={styles.TopView}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
          }}
          style={styles.ImageHead}
        />
        <Text style={styles.WalletText}>Room</Text>
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
      <View style={styles.ImageCameraView}>
        <Image
          source={{uri: 'https://cdn-icons-png.flaticon.com/128/45/45010.png'}}
          style={styles.ImageCamera}
        />
      </View>
      <View style={styles.RoomView}>
        <Text style={styles.Roomtext}>Room Name</Text>
        <Text style={styles.Roomtext}>Room Description</Text>
      </View>
      <View style={styles.CreateView}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/748/748113.png',
          }}
          style={styles.ImgePlus}
        />
        <Text style={styles.ImgePlusText}>Add Participant</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={createRoomModal}
        onRequestClose={() => {
          setCreateRoomModal(false);
        }}>
        <View style={styles.roomModal}>
          <View>
            <Text style={styles.enter}>Enter Group ID</Text>
            <Text style={styles.enterText}>
              Please enter the Group ID to start the conversation anonymously.
            </Text>
          </View>

          <View style={styles.logoNum}>
            <Ionicons
              name="key"
              style={{fontSize: 40, color: colors.mediumTeal, marginLeft: 5}}
            />
            <TextInput
              placeholder="Group ID"
              style={{width: 250}}
              value={roomName}
              onChangeText={text => setroomName(text)}></TextInput>

            {roomName == '' ? (
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
                  setroomName('');
                }}
              />
            )}
          </View>
          <TouchableOpacity style={styles.proceed} onPress={startChat}>
            <Text style={styles.proceedText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity>
        <Ionicons
          name="add-circle-sharp"
          style={{
            fontSize: 60,
            color: colors.mediumTeal,
            position: 'absolute',
            right: 20,
            bottom: 120,
          }}
          onPress={() => {
            setCreateRoomModal(true);
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
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
  ImageCamera: {
    width: 100,
    height: 100,
  },
  ImageCameraView: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: windoHeight / 4,
  },
  Roomtext: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.black,
    marginVertical: 20,
  },
  RoomView: {
    marginHorizontal: 30,
    paddingVertical: 20,
    // borderWidth: 1
  },
  ImgePlus: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  CreateView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    // borderWidth: 1,
    marginHorizontal: 30,
  },
  ImgePlusText: {
    fontSize: 16,
    color: colors.black,
  },
  roomModal: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 25,
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
export default People;
