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
import SwitchSelector from 'react-native-switch-selector';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GroupChat from './GroupChat';
import colors from '../config/colors';
import {not} from 'cheerio/lib/api/traversing';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Chat = ({navigation}) => {
  const [toggleSearch, settoggleSearch] = useState(false);
  const [searchText, setsearchText] = useState('');
  const textInputRef = useRef(null);
  // const [displayChatID, setDisplayChatID] = useState('');
  const [renamedData, setRenamedData] = useState({});

  useEffect(() => {
    const fetchLocalStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('renamedChat');

        setRenamedData(JSON.parse(data));
        console.log(renamedData);
      } catch (e) {
        console.log('Error getting data:', e);
      }

      // console.log('sadasd', await AsyncStorage.getItem('renamedChat'));
    };

    fetchLocalStorage();
  }, []);

  useEffect(() => {
    if (toggleSearch && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [toggleSearch]);

  const setLogIn = async () => {
    try {
      await AsyncStorage.setItem('loggedIn', 'true');
      console.log('User is now logged in!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLogIn();
  }, []);
  const [chatList, setchatList] = useState([]);
  const options = [
    {label: 'Chat', value: 'chat'},
    {label: 'Group', value: 'group'},
  ];

  const [chatOrGroup, setchatOrGroup] = useState('chat');

  const isDarkMode = useColorScheme() === 'dark';

  const [senderBlockchainAddress, setsenderBlockchainAddress] = useState('');
  useEffect(() => {
    const fetchLocalStorage = async () => {
      setsenderBlockchainAddress(
        await AsyncStorage.getItem('blockchain_address'),
      );
      // await AsyncStorage.setItem('chatList', JSON.stringify([1, 5, 10, 6]));
      try {
        const data = await AsyncStorage.getItem('chatList');
        if (data !== null) {
          setchatList(JSON.parse(data));
        }
      } catch (e) {
        console.log('Error getting data:', e);
      }

      console.log('sadasd', await AsyncStorage.getItem('chatList'));
      console.log(senderBlockchainAddress);
    };

    fetchLocalStorage();
  }, []);
  const [CreateChatModal, setCreateChatModal] = useState(false);
  const [chatID, setchatID] = useState('');

  const updateValue = async newValue => {
    const newValues = [...chatList];
    const index = newValues.indexOf(newValue);
    if (index !== -1) {
      newValues.splice(index, 1);
    }
    newValues.unshift(newValue);
    setchatList(newValues);

    try {
      await AsyncStorage.setItem('chatList', JSON.stringify(newValues));
    } catch (e) {
      console.log('Error setting data:', e);
    }
  };

  const startChat = async () => {
    if (chatID) {
      // if (chatID in chatList) {
      await updateValue(chatID);
      setchatID('');
      // setDisplayChatID('');
      // }
      setCreateChatModal(false);
      console.log('Chat started');
      // console.log('sdasdsa', navigation);
      navigation.navigate('ChatScreen', {
        chatID: chatID,
        senderBlockchainAddress: senderBlockchainAddress,
        // displayChatID: displayChatID,
      });
      console.log('Chat ', senderBlockchainAddress);
      // console.log('DCID', displayChatID);
    }
  };

  const filteredData = chatList.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View
      style={[
        styles.MainView,
        isDarkMode
          ? {backgroundColor: colors.black}
          : {backgroundColor: 'white'},
      ]}>
      {!toggleSearch ? (
        <View
          style={[
            styles.MainViewTop,
            isDarkMode
              ? {backgroundColor: colors.black}
              : {backgroundColor: 'white'},
          ]}>
          {/* <Text style={[styles.ChatBucktext]}>ChatBuck</Text> */}
          <View>
            <Image
              source={require('../Assets/CHATBUCK_LOGOS_16.png')}
              style={{
                width: 100,
                height: 100,
                marginHorizontal: 10,
                marginTop: -15,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
              marginVertical: 20,
              // backgroundColor: 'red',
              height: 50,
            }}>
            <View style={[styles.ImageTopHead]}>
              <Ionicons
                name="search"
                onPress={() => {
                  settoggleSearch(true);
                }}
                style={{
                  fontSize: 30,
                  color: '#fff',
                  marginLeft: 5,
                  color: isDarkMode ? 'white' : colors.black,
                }}
              />
            </View>
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
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Ionicons
              name="chevron-back-circle-sharp"
              onPress={() => {
                settoggleSearch(false);
                setsearchText('');
              }}
              style={{
                fontSize: 35,
                color: '#fff',
                marginLeft: 5,
                color: colors.mediumTeal,
              }}
            />
            <TextInput
              ref={textInputRef}
              autoFocus={true}
              placeholder="Search..."
              value={searchText}
              onChangeText={text => setsearchText(text)}
              placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
              style={{
                width: '80%',
                padding: 10,
                color: isDarkMode ? colors.white : colors.black,
              }}></TextInput>
          </View>
        </View>
      )}

      <View
        style={{
          backgroundColor: isDarkMode ? colors.black : 'white',
          width: '80%',
          alignSelf: 'center',
          marginVertical: 15,
        }}>
        <SwitchSelector
          initial={0}
          onPress={value => setchatOrGroup(value)}
          textColor={colors.black} //'#7a44cf'
          selectedColor={'white'}
          buttonColor={colors.mediumTeal}
          // borderColor={'purple'}
          hasPadding
          options={options}
          testID="chat-group-selector"
          accessibilityLabel="chat-group-selector"
          height={54}
          text
          textStyle={{fontWeight: '700', fontSize: 16}}
          selectedTextStyle={{fontWeight: '700', fontSize: 16}}
        />
      </View>

      {chatOrGroup === 'chat' ? (
        <View style={{marginBottom: 300}}>
          <View
            style={[
              styles.MidView,
              isDarkMode
                ? {backgroundColor: colors.black}
                : {backgroundColor: 'white'},
            ]}>
            <View style={styles.MidViewStatus}>
              <Text
                style={[
                  styles.MidViewStatusText,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Moments
              </Text>
            </View>
            <ScrollView horizontal={true} style={{marginHorizontal: 20}}>
              <View style={styles.ScrollView}>
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
                  }}
                  style={styles.StatusView}
                />
                <Text
                  style={[
                    styles.StatusText,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Upcoming
                </Text>
              </View>
              <View style={styles.ScrollView}>
                <Image
                  source={{
                    uri: 'https://c8.alamy.com/comp/ENG5YR/close-up-of-face-of-mixed-race-woman-ENG5YR.jpg',
                  }}
                  style={styles.StatusView}
                />
                <Text
                  style={[
                    styles.StatusText,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Upcoming
                </Text>
              </View>
              <View style={styles.ScrollView}>
                <Image
                  source={{
                    uri: 'https://api.time.com/wp-content/uploads/2014/03/happily-surprised.jpg',
                  }}
                  style={styles.StatusView}
                />
                <Text
                  style={[
                    styles.StatusText,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Upcoming
                </Text>
              </View>
              <View style={styles.ScrollView}>
                <Image
                  source={{
                    uri: 'https://t4.ftcdn.net/jpg/02/32/98/33/360_F_232983351_z5CAl79bHkm6eMPSoG7FggQfsJLxiZjY.jpg',
                  }}
                  style={styles.StatusView}
                />
                <Text
                  style={[
                    styles.StatusText,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Upcoming
                </Text>
              </View>
              <View style={styles.ScrollView}>
                <Image
                  source={{
                    uri: 'https://c8.alamy.com/comp/ENG5YR/close-up-of-face-of-mixed-race-woman-ENG5YR.jpg',
                  }}
                  style={styles.StatusView}
                />
                <Text
                  style={[
                    styles.StatusText,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Upcoming
                </Text>
              </View>
              <View style={styles.ScrollView}>
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
                  }}
                  style={styles.StatusView}
                />
                <Text
                  style={[
                    styles.StatusText,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Upcoming
                </Text>
              </View>
            </ScrollView>
          </View>

          <ScrollView
            style={[
              styles.ChatView,

              isDarkMode
                ? {backgroundColor: colors.black}
                : {backgroundColor: 'white'},
              {bottom: -1, height: '80%'},
            ]}>
            {filteredData.map((items, index) => (
              <TouchableOpacity
                key={index}
                style={styles.UserProCol}
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    chatID: items,
                    // displayChatID: items,
                    senderBlockchainAddress: senderBlockchainAddress,
                  })
                }>
                <Ionicons
                  name="person-circle-sharp"
                  style={{
                    fontSize: 45,
                    color: isDarkMode ? colors.vibrantBlue : colors.mediumTeal,
                    marginHorizontal: 5,
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text
                    style={[
                      styles.UserName,
                      isDarkMode ? {color: 'white'} : {color: colors.black},
                    ]}>
                    {renamedData
                      ? renamedData[items] === undefined
                        ? items
                        : renamedData[items]
                      : items}
                    {/* {items} */}
                  </Text>
                  <Text style={styles.UserStatus}>
                    Hey i am using the chatbuck
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {/* <TouchableOpacity
              style={styles.UserProCol}
              onPress={() => {
                // navigation.navigate('ChatScreen');
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbj
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </TouchableOpacity> */}
            {/* <View style={styles.UserProCol}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4_aEmBmAKJKQso7GX85CFptfmKmPqgWKWjFDF8Y&s',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbj
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </View>
            <View style={styles.UserProCol}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbj
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </View>
            <View style={styles.UserProCol}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4_aEmBmAKJKQso7GX85CFptfmKmPqgWKWjFDF8Y&s',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbj
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </View>
            <View style={styles.UserProCol}>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-photo/close-up-view-amazing-young-dark-skinned-woman-with-long-brunette-hair-clean-perfect-skin-posing-looking-with-lips-slightly-parted-adjusting-her-hairstyle-horizontal-shot_344912-1039.jpg?w=360',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbj
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </View>
            <View style={styles.UserProCol}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4_aEmBmAKJKQso7GX85CFptfmKmPqgWKWjFDF8Y&s',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbj
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </View>
            <View style={styles.UserProCol}>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-photo/close-up-view-amazing-young-dark-skinned-woman-with-long-brunette-hair-clean-perfect-skin-posing-looking-with-lips-slightly-parted-adjusting-her-hairstyle-horizontal-shot_344912-1039.jpg?w=360',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbj
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </View>
            <View style={styles.UserProCol}>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-photo/close-up-view-amazing-young-dark-skinned-woman-with-long-brunette-hair-clean-perfect-skin-posing-looking-with-lips-slightly-parted-adjusting-her-hairstyle-horizontal-shot_344912-1039.jpg?w=360',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbj
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </View>
            <View style={styles.UserProCol}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn4_aEmBmAKJKQso7GX85CFptfmKmPqgWKWjFDF8Y&s',
                }}
                style={styles.UserProfImg}
              />
              <View>
                <Text
                  style={[
                    styles.UserName,
                    isDarkMode ? {color: 'white'} : {color: colors.black},
                  ]}>
                  Secbjsdasd
                </Text>
                <Text style={styles.UserStatus}>
                  hey i am using the chatbuck
                </Text>
              </View>
            </View> */}
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={CreateChatModal}
            onRequestClose={() => {
              setCreateChatModal(false);
            }}>
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
                  Enter Chat ID
                </Text>
                <Text
                  style={[
                    styles.enterText,
                    isDarkMode ? {color: '#BEBEBE'} : {color: '#808080'},
                  ]}>
                  Please enter the Chat ID to start the conversation
                  anonymously.
                </Text>
              </View>

              <View style={styles.logoNum}>
                <Ionicons
                  name="key"
                  style={{
                    fontSize: 40,
                    color: colors.mediumTeal,
                    marginLeft: 5,
                  }}
                />
                <TextInput
                  placeholder="Chat ID"
                  placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
                  style={{
                    width: 250,
                    color: colors.black,
                  }}
                  value={chatID}
                  onChangeText={text => {
                    setchatID(text);
                    // setDisplayChatID(text);
                  }}></TextInput>

                {chatID == '' ? (
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
                      setchatID('');
                      // setDisplayChatID('');
                    }}
                  />
                )}
              </View>
              <TouchableOpacity style={styles.proceed} onPress={startChat}>
                <Text style={styles.proceedText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View>
            <TouchableOpacity>
              <Ionicons
                name="add-circle-sharp"
                style={{
                  fontSize: 60,
                  color: colors.mediumTeal,
                  position: 'absolute',
                  right: 20,
                  top: -90,
                }}
                onPress={() => {
                  setCreateChatModal(true);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <GroupChat navigation={navigation} searchText={searchText} />
      )}
    </View>
  );
};
export default Chat;
const styles = StyleSheet.create({
  MainView: {
    height: windoHeight,
    backgroundColor: colors.mediumTeal,
  },
  MainViewTop: {
    // borderWidth: 1,
    height: windoHeight / 11,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    // alignItems: "center"
  },
  ImageHead: {
    width: 30,
    height: 30,
    marginHorizontal: 6,
  },
  ChatBucktext: {
    fontSize: 25,
    fontWeight: '800',
    color: 'white',
    // borderWidth: 1,
    width: windoWidth / 1.4,
    paddingHorizontal: 20,
  },
  ImageTopHead: {
    // borderWidth: 1,
    marginHorizontal: 10,
  },
  MidView: {
    backgroundColor: 'white',
    height: windoHeight / 5.35,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomColor: '#8e8e8e',
    // borderBottomWidth: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  MidViewStatus: {
    // borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  MidViewStatusText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.black,
  },
  StatusView: {
    width: 60,
    height: 60,
    alignItems: 'center',
    borderRadius: 30,
  },
  ScrollView: {
    // borderWidth: 1,
    width: windoWidth / 5,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 20,
    height: windoHeight / 7,
  },
  StatusText: {
    fontSize: 13,
    color: colors.black,
    marginVertical: 5,
  },
  ChatView: {
    // borderWidth: 1,
    backgroundColor: 'white',
    // marginBottom: '100%',
  },
  UserProCol: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    // borderWidth: 1,
    marginVertical: 10,
    // borderBottomWidth: 0.3,
    borderBottomColor: '#cacccf',
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  UserProfImg: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 25,
  },
  UserName: {
    fontWeight: '700',
    color: colors.black,
    fontSize: 18,
  },
  UserStatus: {
    color: 'grey',
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
