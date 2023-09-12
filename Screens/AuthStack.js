import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import ForgotPassword from './Auth/ForgotPassword';
const Stack = createNativeStackNavigator();
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Forgot" component={ForgotPassword} />
        </Stack.Navigator>
    );
}
export default AuthStack;