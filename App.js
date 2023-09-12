import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Call from './Screens/Call';
import MainNavigation from './Screens/MainNavigation';
// import ForgotPassword from './Screens/Auth/ForgotPassword';
import Chat from './Screens/Chat';
import Profile from './Screens/Profile';
import ChatScreen from './Screens/ChatScreen';
import Wallet from './Screens/Wallet';
import GroupChatScreen from './Screens/GroupChatScreen';
import LoungeChatScreen from './Screens/LoungeChatScreen';
import Lounge from './Screens/Lounge';
import LoungeTopic from './Screens/LoungeTopic';
import GroupChat from './Screens/GroupChat';
import Auth from './Screens/Auth/Auth';
import OnBoarding from './Screens/OnBoarding';
import GetStarted from './Screens/GetStarted';
import SwipeOnboarding from './Screens/SwipeOnboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [User, setUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogIn = async () => {
    try {
      const loggedInValue = await AsyncStorage.getItem('loggedIn');
      if (loggedInValue === 'true') {
        console.log(isLoggedIn);
        setIsLoggedIn(true);
        console.log(isLoggedIn);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogIn();
  }, []);

  return (
    <>
      {/* <SwipeOnboarding /> */}
      {/* <OnBoarding /> */}
      {/* <GetStarted /> */}
      {/* <ChatScreen /> */}
      {/* <Wallet /> */}
      {/* <SignIn /> */}
      {/* <Lounge /> */}
      {/* <LoungeTopic /> */}
      {/* <Chat /> */}
      {/* <GroupChat /> */}
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName='Bottomtab' screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Bottomtab' compoment={SignUp} />
          <Stack.Screen name='tab' compoment={Call} />
        </Stack.Navigator>
      </NavigationContainer> */}

      {
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName={InitialRouteName}
            screenOptions={{
              headerShown: false,
            }}>
            {/* <> */}
            {isLoggedIn ? (
              <Stack.Screen name="MainNavigation" component={MainNavigation} />
            ) : (
              <>
                <Stack.Screen
                  name="SwipeOnboarding"
                  component={SwipeOnboarding}
                />
                <Stack.Screen name="Auth" component={Auth} />
              </>
            )}

            <Stack.Screen name="MainNavigate" component={MainNavigation} />
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
            {/* <Stack.Screen name="Forgot" component={ForgotPassword} /> */}

            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
            <Stack.Screen
              name="LoungeChatScreen"
              component={LoungeChatScreen}
            />
            <Stack.Screen name="Lounge" component={Lounge} />
            <Stack.Screen name="LoungeTopic" component={LoungeTopic} />
            {/* </> */}
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
