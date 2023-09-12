import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import Call from '../Screens/Call';
import Chat from '../Screens/Chat';
import People from '../Screens/People';
import Wallet from '../Screens/Wallet';
import GroupChat from '../Screens/GroupChat';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStack from './Stack/HomeStack';
import colors from '../config/colors';
import Lounge from './Lounge';
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,
        showIcon: false,

        tabBarStyle: [
          {
            borderTopWidth: 0,
            position: 'absolute',
            elevation: 10,
            backgroundColor: isDarkMode ? colors.black : 'white',
            height: 70,
            ...styles.shadow,
          },
        ],
        activeTintColor: 'pink',
      }}>
      <Tab.Screen
        name="HomeStack"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons
                name="chatbubbles-sharp"
                color={
                  focused
                    ? colors.mediumTeal
                    : isDarkMode
                    ? 'white'
                    : colors.black
                }
                size={22}
              />
              <Text
                style={{
                  color: focused
                    ? colors.mediumTeal
                    : isDarkMode
                    ? 'white'
                    : colors.black,
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                Chats
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons
                name="wallet"
                color={
                  focused
                    ? colors.mediumTeal
                    : isDarkMode
                    ? 'white'
                    : colors.black
                }
                size={22}
              />
              <Text
                style={{
                  color: focused
                    ? colors.mediumTeal
                    : isDarkMode
                    ? 'white'
                    : colors.black,
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                Wallet
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Lounge"
        component={Lounge}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons
                name="people"
                color={
                  focused
                    ? colors.mediumTeal
                    : isDarkMode
                    ? 'white'
                    : colors.black
                }
                size={22}
              />
              <Text
                style={{
                  color: focused
                    ? colors.mediumTeal
                    : isDarkMode
                    ? 'white'
                    : colors.black,
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                Lounge
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Call"
        component={Call}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons
                name="ios-call"
                color={
                  focused
                    ? colors.mediumTeal
                    : isDarkMode
                    ? 'white'
                    : colors.black
                }
                size={22}
              />
              <Text
                style={{
                  color: focused
                    ? colors.mediumTeal
                    : isDarkMode
                    ? 'white'
                    : colors.black,
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                Call
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Group"
        component={GroupChat}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons
                name="people"
                color={focused ? colors.mediumTeal : isDarkMode ? 'white' : colors.black}
                size={22}
              />
              <Text
                style={{
                  color: focused ? colors.mediumTeal : isDarkMode ? 'white' : colors.black,
                  fontFamily: 'SourceSansPro-Regular',
                }}>
                Group
              </Text>
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
