import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
  BackHandler,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import MembersModal from './MembersModal';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function RoomChatScreen({navigation, route}) {
  const [profileModalVis, setprofileModalVis] = useState(false);
  const {roomName, senderBlockchainAddress} = route.params;
  //   const roomName = '1';
  //   const senderBlockchainAddress = 'sdsd';
  const Me = () => {
    console.log('Ia m');
  };

  useEffect(() => {
    console.log(roomName);
    console.log(senderBlockchainAddress);
    loadChats();
  }, []);

  function renderItems({item, index}) {
    if (item.sender.includes(senderBlockchainAddress)) {
      return (
        <View style={styles.MainchatViewSender} key={index}>
          <Text style={styles.ChatText}>{item.content}</Text>
          <Text style={styles.ChatTime}>
            {/* {item.time.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })} */}
            10:10 AM
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={[styles.MainchatViewReciever, {width: windowWidth / 2}]}
          key={index}>
          <Text style={{color: 'white'}}>{item.sender}</Text>
          <Text style={styles.ChatText}>{item.content}</Text>
          <Text style={styles.ChatTime}>
            {/* {item.time.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })} */}
            10:10 AM
          </Text>
        </View>
      );
    }
  }

  const [items, setItems] = useState([]);
  const chatDataRef = useRef([]);
  const [chatData, setchatData] = useState([]);
  const chatTextRef = useRef('');

  ////////////////////////////////

  const [blockAddSender, setblockAddSender] = useState('');

  const blockAddReciever = '1GpRw2ohxDmjBvwXsFsEYZgSH5XyVRANM5';

  useEffect(() => {
    getLocalAddress();
  }, []);

  const getLocalAddress = async () => {
    const keys = ['blockchain_address'];
    const results = await AsyncStorage.multiGet(keys);
    const keyMap = new Map(results);
    setblockAddSender(keyMap.get('blockchain_address'));
  };

  const loadChats = async () => {
    try {
      const response = await fetch(
        `https://02ba-103-175-180-42.in.ngrok.io/rooms/${roomName}/messages`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await response.json();
      chatDataRef.current = json;
      setchatData(chatDataRef.current);
      console.log(chatData);
      console.log('Status-- ', response.status);

      const filteredDataSender = chatDataRef.current.filter(item =>
        item.sender.includes(senderBlockchainAddress),
      );
      const filteredDataReciever = chatDataRef.current.filter(
        item => !item.sender.includes(senderBlockchainAddress),
      );

      // console.log(filteredDataSender);
      // console.log(filteredDataReciever);
    } catch (error) {
      console.log(error);
    }
  };

  const sendChat = async () => {
    // console.log(
    //   blockAddSender,
    //   '----',
    //   blockAddReciever,
    //   '-----',
    //   chatText,
    //   '-----',
    //   new Date(),
    // );
    try {
      const response = await fetch(
        `https://02ba-103-175-180-42.in.ngrok.io/rooms/${roomName}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: blockAddSender,
            recipient: 'Recipient Name',
            content: chatText,
            timestamp: new Date(),
          }),
        },
      );
      loadChats();
      console.log('Status-- ', response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const [chatText, setchatText] = useState('');

  const addItem = () => {
    if (chatText.trim() !== '') {
      setItems([...items, {chatText: chatText, time: new Date()}]);

      setchatText('');
      console.log('Sender - ', blockAddSender);
      console.log('Reciever - ', blockAddReciever);
      console.log(
        '///////////////////////////////////////////////////////////////////////////',
      );
      sendChat();
    }
    // console.log(items);
  };

  ////////////////////////////////
  return (
    <View style={{width: windowWidth, height: windowHeight, flex: 1}}>
      <Modal
        transparent={true}
        visible={profileModalVis}
        onRequestClose={() => {
          setprofileModalVis(false);
        }}>
        <MembersModal roomName={roomName} blockAddSender={blockAddSender} />
      </Modal>
      <View style={styles.MainView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MainNavigate');
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3114/3114883.png',
            }}
            style={styles.UserProfImg1}
          />
        </TouchableOpacity>

        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/close-up-view-amazing-young-dark-skinned-woman-with-long-brunette-hair-clean-perfect-skin-posing-looking-with-lips-slightly-parted-adjusting-her-hairstyle-horizontal-shot_344912-1039.jpg?w=360',
          }}
          style={styles.UserProfImg}
        />
        <Text
          style={styles.NameText}
          onPress={() => {
            setprofileModalVis(true);
          }}>
          {roomName}
        </Text>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
          }}
          style={styles.UserProfImg1}
        />
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/4945/4945907.png',
          }}
          style={styles.UserProfImg1}
        />
      </View>
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.ChatShowView}>
          {/* <View style={styles.MainchatViewSender}>
            <Text style={styles.ChatText}>I am the chat</Text>
            <Text style={styles.ChatTime}>5:49pm</Text>
          </View>
          <View style={styles.MainchatViewSender}>
            <Text style={styles.ChatText}>Hi</Text>
            <Text style={styles.ChatTime}>5:49pm</Text>
          </View> */}

          {/* ////////////////////////////////  */}

          <FlatList
            data={chatDataRef.current}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
          />

          {/* ////////////////////////////////  */}
        </View>
      </KeyboardAvoidingView>
      <View style={styles.InputBox}>
        <View style={styles.MsgBox}>
          <TextInput
            placeholder="Enter the message"
            style={styles.TextInputBox}
            value={chatText}
            onChangeText={text => {
              setchatText(text);
              chatTextRef.current = text;
            }}
          />
          <TouchableOpacity
            onPress={() => {
              addItem();
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/4024/4024582.png',
              }}
              style={styles.UserProfImg1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  UserProfImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    marginLeft: 1,
  },
  UserProfImg1: {
    width: 30,
    height: 30,
    // borderRadius: 20,
    marginHorizontal: 5,
  },
  MainView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: windowHeight / 11,
    backgroundColor: 'white',
  },
  NameText: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
    // borderWidth: 1,
    width: windowWidth / 2.1,
  },
  ChatShowView: {
    // borderWidth: 1,
    height: windowHeight / 1.3,
    backgroundColor: 'white',
  },
  MainchatViewSender: {
    // borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: windowWidth / 3,
    alignSelf: 'flex-end',
    margin: 6,
    backgroundColor: '#1081AF',
    marginVertical: 4,
  },
  MainchatViewReciever: {
    // borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: windowWidth / 3,
    margin: 6,
    backgroundColor: '#1081AF',
    marginVertical: 4,
  },
  ChatText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '700',
  },
  ChatTime: {
    color: 'lightgrey',
    fontSize: 10,
  },
  InputBox: {
    // position: "absolute",
    // borderWidth: 1,
    flex: 1,
    width: windowWidth,
    backgroundColor: 'white',
    // bottom: 0,
    // height: windowHeight / 11,
    // zIndex: 10
  },
  MsgBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  TextInputBox: {
    // borderWidth: 1,
    width: windowWidth / 1.25,
  },
  container: {
    flex: 8,
  },
});
export default RoomChatScreen;
