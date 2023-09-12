import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignUp from './Auth/SignUp';
// import SignIn from './Auth/SignIn';
// import ForgotPassword from './Auth/ForgotPassword';
import Chat from '../Chat';
import Call from '../Call';
import Profile from '../Profile';
import chatScreen from '../ChatScreen';
import ChatScreen from '../ChatScreen';
const Stack = createNativeStackNavigator();
function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Profile" component={Profile} />
            {/* <Stack.Screen name="ChatScreen" component={ChatScreen} /> */}
        </Stack.Navigator>
    );
}
export default HomeStack;