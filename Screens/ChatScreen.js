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
  useColorScheme,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import apiLinks from '../config/apiLinks';
import colors from '../config/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function ChatScreen({navigation, route}) {
  const isDarkMode = useColorScheme() === 'dark';
  const {chatID, senderBlockchainAddress} = route.params;
  // const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [threeDotsModal, setthreeDotsModal] = useState(false);
  const [renameModal, setrenameModal] = useState(false);
  const [newdisplayChatID, setnewDisplayChatID] = useState(chatID);
  const [renamedData, setRenamedData] = useState({});

  const openSideModal = () => {
    setthreeDotsModal(true);
  };

  // const chatID = '1';
  // const senderBlockchainAddress = 'sdsd';
  const Me = () => {
    console.log('Ia m');
  };
  useEffect(() => {
    // Fetch messages initially
    // console.log('Displayyyyyyyyyyyyyyy', displayChatID);
    loadChats();

    // Poll for new messages every 5 seconds using setInterval
    const intervalId = setInterval(loadChats, 400);

    return () => {
      // Clean up the interval on component unmount
      clearInterval(intervalId);
    };
  }, []);

  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isScrollUp =
      contentOffset.y < layoutMeasurement.height - contentSize.height;

    setIsScrolledUp(isScrollUp);
  };

  const scrollToBottom = () => {
    // if (isScrolledUp) {
    flatListRef.current?.scrollToEnd({animation: true});
    // }
  };

  // useEffect(() => {
  //   loadChats();
  // }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log('useEffect ', isScrolledUp);
  //     // if (isScrolledUp == false) {
  //     //   // loadChats();
  //     //   console.log('Loaded');
  //     // } else if (isScrolledUp === true) {
  //     //   console.log('Not loaded');
  //     // }
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  // const handleScroll = event => {
  //   const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
  //   const bottomOffset = contentSize.height - layoutMeasurement.height - 20;
  //   // console.log(isAtBottom);

  //   setIsAtBottom(contentOffset.y >= bottomOffset);
  //   // console.log(isAtBottom);

  //   // Call the loadChats() function every 1 second when at the bottom
  //   if (isAtBottom) {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = setInterval(loadChats, 400);
  //     console.log('if ', isAtBottom);
  //   } else {
  //     clearInterval(intervalRef.current);
  //     console.log('else ', isAtBottom);
  //   }
  // };
  // useEffect(() => {
  //   return () => {
  //     // Clear the interval when the component is unmounted
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);

  // const intervalRef = useRef(null);
  function renderItems({item, index}) {
    if (item.sender.includes(senderBlockchainAddress)) {
      return (
        <View style={styles.MainchatViewSender} key={index}>
          <Text style={styles.ChatText}>{item.content}</Text>
          <Text style={styles.ChatTime}>
            {new Date(item.timeStamp).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
            {/* {item.timeStamp} */}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.MainchatViewReciever,
            isDarkMode
              ? {backgroundColor: '#262626'}
              : {backgroundColor: '#efefef'},
          ]}
          key={index}>
          <Text
            style={[
              styles.ChatText,
              isDarkMode ? {color: 'white'} : {color: colors.black},
            ]}>
            {item.content}
          </Text>
          <Text
            style={[
              styles.ChatTime,
              isDarkMode
                ? {color: colors.mediumTeal}
                : {color: colors.mediumTeal},
            ]}>
            {new Date(item.timeStamp).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
            {/* 10:10 AM */}
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
        `${apiLinks.chat}/rooms/${chatID}/messages`,
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

      // const filteredDataSender = chatDataRef.current.filter(item =>
      //   item.sender.includes(senderBlockchainAddress),
      // );
      // const filteredDataReciever = chatDataRef.current.filter(
      //   item => !item.sender.includes(senderBlockchainAddress),
      // );

      // console.log(filteredDataSender);
      // console.log(filteredDataReciever);
    } catch (error) {
      // console.log(error);
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
        `${apiLinks.chat}/rooms/${chatID}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: blockAddSender,
            recipient: 'Recipient Name',
            content: chatText,
            timeStamp: new Date(),
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
      // console.log('Reciever - ', blockAddReciever);
      console.log(
        '///////////////////////////////////////////////////////////////////////////',
      );
      sendChat();
    }
    // console.log(items);
  };

  ////////////////////////////////

  // useEffect(() => {
  //   // Scroll to the bottom of the FlatList when new messages are added
  //   flatListRef.current.scrollToEnd({animated: false});
  // }, [chatData]);
  // const handleScroll = event => {
  //   const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
  //   const isAtEnd =
  //     layoutMeasurement.height + contentOffset.y >= contentSize.height - 150;
  //   setIsScrolledUp(!isAtEnd);
  //   console.log(isScrolledUp);
  // };

  const renambedDataRef = useRef({});

  useEffect(() => {
    const fetchLocalStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('renamedChat');

        // setRenamedData(JSON.parse(data));
        renambedDataRef.current = JSON.parse(data);
        console.log(renambedDataRef.current[chatID]);
      } catch (e) {
        console.log('Error getting data:', e);
      }

      // console.log('sadasd', await AsyncStorage.getItem('renamedChat'));
    };

    fetchLocalStorage();
  }, []);

  // const renameHandle1 = () => {
  //   const newObject = {[chatID]: newdisplayChatID};
  //   renambedDataRef.current = {...renambedDataRef.current, ...newObject};
  //   // setRenamedData(prevData => ({...prevData, ...newObject}));
  //   console.log('logggingggggg', renambedDataRef);
  // };

  const renameHandle = async () => {
    try {
      const newObject = {[chatID]: newdisplayChatID};
      renambedDataRef.current = {...renambedDataRef.current, ...newObject};
      // setRenamedData(prevData => ({...prevData, ...newObject}));
      console.log('logggingggggg', renambedDataRef);
      await AsyncStorage.setItem(
        'renamedChat',
        JSON.stringify(renambedDataRef.current),
      );
      console.log('sadasd', await AsyncStorage.getItem('renamedChat'));
      setrenameModal(false);
    } catch (e) {
      console.log('Error setting data:', e);
    }
  };

  const flatListRef = useRef(null);
  return (
    // <TouchableWithoutFeedback
    //   style={{backgroundColor: 'red', height: windowHeight, width: windowWidth}}
    //   onPress={() => {
    //     setthreeDotsModal(false);
    //   }}>
    <View
      style={[
        {width: windowWidth, height: windowHeight, flex: 1},
        isDarkMode
          ? {backgroundColor: colors.black}
          : {backgroundColor: 'white'},
      ]}>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={threeDotsModal}
        onRequestClose={() => {
          setthreeDotsModal(false);
        }}>
        <TouchableOpacity
          style={{
            // backgroundColor: 'yellow',
            top: windowHeight / 11,
            height: windowHeight,
            width: windowWidth,
          }}
          activeOpacity={1}
          onPressOut={() => {
            setthreeDotsModal(false);
          }}>
          <TouchableWithoutFeedback>
            <TouchableOpacity
              onPress={() => {
                setthreeDotsModal(false);
                setrenameModal(true);
              }}>
              <View
                style={[
                  isDarkMode
                    ? {backgroundColor: colors.black}
                    : {backgroundColor: 'white'},
                  {
                    width: 120,
                    right: 0,
                    position: 'absolute',
                    // top: windowHeight / 11,
                  },
                ]}>
                <Text
                  style={[
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                    {
                      fontSize: 18,
                      alignSelf: 'center',
                      padding: 10,
                      fontWeight: '600',
                    },
                  ]}>
                  Rename
                </Text>
              </View>
            </TouchableOpacity>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <View
        style={[
          styles.MainView,
          isDarkMode
            ? {backgroundColor: colors.black}
            : {backgroundColor: 'white'},
        ]}>
        <Ionicons
          onPress={() => {
            navigation.navigate('MainNavigate');
          }}
          name="chevron-back-outline"
          style={{
            fontSize: 25,
            margin: 10,
            color: isDarkMode ? 'white' : colors.black,
          }}
        />

        {/* <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/close-up-view-amazing-young-dark-skinned-woman-with-long-brunette-hair-clean-perfect-skin-posing-looking-with-lips-slightly-parted-adjusting-her-hairstyle-horizontal-shot_344912-1039.jpg?w=360',
          }}
          style={styles.UserProfImg}
        /> */}
        <Ionicons
          name="person-circle-sharp"
          style={{
            fontSize: 45,
            color: isDarkMode ? colors.vibrantBlue : colors.mediumTeal,
            marginHorizontal: 5,
            marginRight: 10,
          }}
        />
        <Text
          style={[
            styles.NameText,
            isDarkMode ? {color: 'white'} : {color: colors.black},
            {margin: 10},
          ]}>
          {renambedDataRef.current
            ? renambedDataRef.current[chatID] === undefined
              ? chatID
              : renambedDataRef.current[chatID]
            : chatID}
        </Text>
        <Ionicons
          name="call"
          style={{
            fontSize: 25,
            marginRight: 15,
            color: isDarkMode ? 'white' : colors.black,
          }}
        />
        <Ionicons
          name="videocam"
          style={{
            fontSize: 25,
            marginRight: 10,
            color: isDarkMode ? 'white' : colors.black,
          }}
        />
        {/* <TouchableHighlight> */}
        <Ionicons
          name="ellipsis-vertical"
          style={{
            fontSize: 25,
            marginRight: 15,
            color: isDarkMode ? 'white' : colors.black,
          }}
          onPress={() => {
            openSideModal();
          }}
        />
        {/* </TouchableHighlight> */}
      </View>

      {/* <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}> */}
      {/* <View
          style={[
            styles.ChatShowView,
            isDarkMode
              ? {backgroundColor: colors.black}
              : {backgroundColor: 'white'},
          ]}> */}
      {/* <View style={styles.MainchatViewSender}>
            <Text style={styles.ChatText}>I am the chat</Text>
            <Text style={styles.ChatTime}>5:49pm</Text>
          </View>
          <View style={styles.MainchatViewSender}>
            <Text style={styles.ChatText}>Hi</Text>
            <Text style={styles.ChatTime}>5:49pm</Text>
          </View> */}

      {/* ////////////////////////////////  */}

      {/* ////////////////////////////////  */}
      {/* </View> */}
      {/* </KeyboardAvoidingView> */}
      {/* <View style={{flex: 1}}> */}
      {isScrolledUp ? null : ( // </ScrollView> //   </View> //     ))} //       <Text key={index}>{message}</Text> //     {messages.map((message, index) => ( //   <View style={{padding: 20}}> // <ScrollView onScroll={handleScroll}>
        <FlatList
          ref={flatListRef}
          data={chatData}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
          // contentContainerStyle={styles.flatListContent}
          // onContentSizeChange={() =>
          //   flatListRef.current.scrollToEnd({animated: false})
          // }
          // onLayout={() => flatListRef.current.scrollToEnd({animated: false})}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll} // New prop
          // scrollEventThrottle={1} // Adjust the throttle value as needed
          onContentSizeChange={scrollToBottom}
        />
      )}
      {/* </View> */}
      <View>
        <View style={{marginTop: 15}}>
          <TextInput
            placeholder="Enter the message"
            placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
            style={[
              styles.TextInputBox,
              isDarkMode
                ? {backgroundColor: '#262626', color: 'white'}
                : {backgroundColor: '#efefef', color: colors.black},
              {alignSelf: 'center', marginBottom: 15},
            ]}
            value={chatText}
            onChangeText={text => {
              setchatText(text);
              chatTextRef.current = text;
            }}
          />

          <Ionicons
            onPress={() => {
              addItem();
            }}
            name="send"
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 10,
              margin: 10,
              color: colors.mediumTeal,
            }}
          />
        </View>
      </View>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={renameModal}
        onRequestClose={() => {
          setrenameModal(false);
        }}>
        <TouchableOpacity
          style={{
            // backgroundColor: 'yellow',
            top: windowHeight / 11,
            height: windowHeight,
            width: windowWidth,
          }}
          activeOpacity={1}
          onPressOut={() => {
            setrenameModal(false);
          }}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.roomModal,
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
                  Enter New Name
                </Text>
                <Text
                  style={[
                    styles.enterText,
                    isDarkMode ? {color: '#BEBEBE'} : {color: '#808080'},
                  ]}>
                  Please enter the name to change.
                </Text>
              </View>

              <View style={styles.logoNum}>
                <TextInput
                  placeholder="New Name"
                  placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
                  style={{
                    width: 250,
                    color: colors.black,
                    padding: 20,
                  }}
                  value={newdisplayChatID}
                  onChangeText={text => setnewDisplayChatID(text)}></TextInput>

                {newdisplayChatID == '' ? (
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
                      setnewDisplayChatID('');
                    }}
                  />
                )}
              </View>
              <TouchableOpacity
                style={styles.proceed}
                onPress={() => {
                  renameHandle();
                }}>
                <Text style={styles.proceedText}>Change Name</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
    // </TouchableWithoutFeedback>
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
    height: windowHeight / 11,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
  },
  NameText: {
    fontSize: 15,
    fontWeight: '800',
    height: 30,
    textAlignVertical: 'center',
    color: colors.black,
    // borderWidth: 1,
    width: windowWidth / 2.5,
  },
  ChatShowView: {
    // borderWidth: 1,
    height: windowHeight / 1.29,
    backgroundColor: 'white',
  },
  MainchatViewSender: {
    // borderWidth: 1,
    borderRadius: 20,
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    // width: windowWidth / 3,
    alignSelf: 'flex-end',
    margin: 6,
    backgroundColor: colors.mediumTeal,
    marginVertical: 4,
    maxWidth: windowWidth * 0.82,
  },
  MainchatViewReciever: {
    // borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    // width: windowWidth / 3,
    margin: 6,
    backgroundColor: colors.mediumTeal,
    marginVertical: 4,
    alignSelf: 'flex-start',
    maxWidth: windowWidth * 0.82,
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
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    // borderWidth: 1,
    // flex: 1,
    // width: windowWidth,
    backgroundColor: 'white',
    // bottom: 0,
    // height: windowHeight / 11,
    // zIndex: 10
  },
  MsgBox: {
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderRadius: 8,
    marginHorizontal: 10,
  },
  TextInputBox: {
    backgroundColor: 'red',
    width: '95%',
    borderRadius: 20,
    padding: 10,
    paddingRight: 50,
  },
  container: {
    flex: 8,
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
    marginBottom: 420,
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
export default ChatScreen;
