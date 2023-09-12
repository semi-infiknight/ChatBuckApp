import React, {useContext, useEffect, useState, useRef} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchSelector from 'react-native-switch-selector';
import colors from '../config/colors';

const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const GroupChat = ({navigation, searchText}) => {
  const [groupgroupChatList, setgroupgroupChatList] = useState([]);

  const [CreateGroupModal, setCreateGroupModal] = useState(false);

  const [groupID, setgroupID] = useState('');

  const startGroup = async () => {
    if (groupID) {
      await updateValue(groupID);
      setgroupID('');
      setCreateGroupModal(false);
      console.log(groupID);
      navigation.navigate('GroupChatScreen', {
        groupID: groupID,
        senderBlockchainAddress: senderBlockchainAddress,
      });
      console.log('Group ', senderBlockchainAddress);
    }
  };

  const updateValue = async newValue => {
    const newValues = [...groupgroupChatList];
    const index = newValues.indexOf(newValue);
    if (index !== -1) {
      newValues.splice(index, 1);
    }
    newValues.unshift(newValue);
    setgroupgroupChatList(newValues);

    try {
      await AsyncStorage.setItem(
        'groupgroupChatList',
        JSON.stringify(newValues),
      );
    } catch (e) {
      console.log('Error setting data:', e);
    }
  };

  const [senderBlockchainAddress, setsenderBlockchainAddress] = useState('');
  useEffect(() => {
    const fetchLocalStorage = async () => {
      setsenderBlockchainAddress(
        await AsyncStorage.getItem('blockchain_address'),
      );
      try {
        const data = await AsyncStorage.getItem('groupgroupChatList');
        if (data !== null) {
          setgroupgroupChatList(JSON.parse(data));
        }
      } catch (e) {
        console.log('Error getting data:', e);
      }

      console.log(senderBlockchainAddress);
    };

    fetchLocalStorage();
  }, []);
  const options = [
    {label: 'Chat', value: 'chat'},
    {label: 'Group', value: 'group'},
  ];
  const isDarkMode = useColorScheme() === 'dark';
  const [chatOrGroup, setchatOrGroup] = useState('group');

  const filteredData = groupgroupChatList.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase()),
  );

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

  return (
    <View
      style={[
        styles.MainView,
        isDarkMode
          ? {backgroundColor: colors.black}
          : {backgroundColor: 'white'},
      ]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={CreateGroupModal}
        onRequestClose={() => {
          setCreateGroupModal(false);
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
              Enter Group ID
            </Text>
            <Text
              style={[
                styles.enterText,
                isDarkMode ? {color: '#BEBEBE'} : {color: '#808080'},
              ]}>
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
              placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
              style={{width: 250, color: colors.black}}
              value={groupID}
              onChangeText={text => setgroupID(text)}></TextInput>

            {groupID == '' ? (
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
                  setgroupID('');
                }}
              />
            )}
          </View>
          <TouchableOpacity style={styles.proceed} onPress={startGroup}>
            <Text style={styles.proceedText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <View
        style={[
          styles.MainViewTop,
          isDarkMode ? {backgroundColor: colors.black} : {backgroundColor: 'white'},
        ]}>
        <Text
          style={[
            styles.ChatBucktext,
            isDarkMode ? {color: 'white'} : {color: colors.black},
          ]}>
          Group
        </Text>

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
      </View> */}
      {/* <View
        style={{
          backgroundColor: isDarkMode ? colors.black : 'white',
          width: '80%',
          alignSelf: 'center',
          marginVertical: 30,
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
      </View> */}

      <View style={{marginBottom: 245}}>
        <ScrollView
          style={[
            styles.ChatView,
            isDarkMode
              ? {backgroundColor: colors.black}
              : {backgroundColor: 'white'},
            {height: '100%'},
          ]}>
          {filteredData.map((items, index) => (
            <TouchableOpacity
              key={index}
              style={styles.UserProCol}
              onPress={() =>
                navigation.navigate('GroupChatScreen', {
                  groupID: items,
                  senderBlockchainAddress: senderBlockchainAddress,
                })
              }>
              <Ionicons
                name="people-circle-sharp"
                style={{
                  fontSize: 45,
                  color: isDarkMode ? colors.vibrantBlue : colors.mediumTeal,
                  marginHorizontal: 5,
                  marginRight: 10,
                }}
              />
              <View style={{justifyContent: 'center'}}>
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
                </Text>
                {/* <Text style={styles.UserStatus}>
                  Hey i am using the chatbuck
                </Text> */}
              </View>
            </TouchableOpacity>
          ))}
          {/* <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbj
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              // source={{
              //   uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              // }}
              style={styles.Groups}
            />
          </View> */}
          {/* <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbj
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View>
          <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbj
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View>
          <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbj
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View>
          <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbj
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View>
          <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbj
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View>
          <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbj
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View>
          <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbjsa
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View>
          <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbj
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View>
          <View style={styles.UserProCol}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
              }}
              style={styles.UserProfImg}
            />
            <View style={styles.GroupWidth}>
              <Text
                style={[
                  styles.UserName,
                  isDarkMode ? {color: 'white'} : {color: colors.black},
                ]}>
                Secbjsasa
              </Text>
              <Text style={styles.UserStatus}>hey i am using the chatbuck</Text>
            </View>
            <Image
              //source={{
              //             uri: 'https://cdn-icons-png.flaticon.com/128/483/483947.png',
              //         }}
              style={styles.Groups}
            />
          </View> */}
        </ScrollView>
        <TouchableOpacity>
          <Ionicons
            name="add-circle-sharp"
            style={{
              fontSize: 60,
              color: colors.mediumTeal,
              position: 'absolute',
              right: 20,
              bottom: 10,
            }}
            onPress={() => {
              setCreateGroupModal(true);
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupChat;
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
    marginBottom: 10,
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
    marginVertical: 12,
    height: 40,
    // backgroundColor: 'red',
    textAlignVertical: 'bottom',
  },
  ImageTopHead: {
    // borderWidth: 1,
    marginHorizontal: 10,
  },

  ChatView: {
    // borderWidth: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 0,
    // marginBottom: 100,
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
  Groups: {
    width: 25,
    height: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  GroupWidth: {
    width: windoWidth / 1.6,
    // borderWidth: 1
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
