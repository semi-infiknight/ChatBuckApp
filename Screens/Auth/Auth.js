import {
  View,
  Text,
  Dimensions,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SwitchSelector from 'react-native-switch-selector';
import colors from '../../config/colors';

import SignUp from './SignUp';
import SignIn from './SignIn';

const Auth = ({navigation}) => {
  const options = [
    {label: 'Login', value: 'login'},
    {label: 'Register', value: 'register'},
  ];

  const [LoginOrRegister, setLoginOrRegister] = useState('login');
  const isDarkMode = useColorScheme() === 'dark';

  const windoWidth = Dimensions.get('window').width;
  const windoHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? colors.black : 'white',
        height: '100%',
      }}>
      <View
        style={{
          backgroundColor: isDarkMode ? colors.vibrantBlue : colors.black,
          height: windoHeight / 4.5,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            padding: 15,
            height: windoHeight / 9,
            // backgroundColor: 'red',
          }}>
          {LoginOrRegister === 'login' ? (
            <Text
              style={{
                fontSize: 25,
                fontWeight: '800',
                color: isDarkMode ? colors.black : 'white',
                // fontFamily: 'Nexa',
              }}>
              Welcome back!
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 25,
                fontWeight: '800',
                color: isDarkMode ? colors.black : 'white',
              }}>
              New User?
            </Text>
          )}

          {LoginOrRegister === 'login' ? (
            <Text
              style={{
                fontSize: 21,
                fontWeight: '600',
                color: isDarkMode ? colors.black : 'white',
              }}>
              Please sign in to continue.
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 21,
                fontWeight: '600',
                color: isDarkMode ? colors.black : 'white',
              }}>
              Start your journey with us
            </Text>
          )}
        </View>
        <View
          style={{
            width: '80%',
            alignSelf: 'center',
            marginVertical: 15,
          }}>
          <SwitchSelector
            initial={0}
            onPress={value => setLoginOrRegister(value)}
            textColor={colors.black} //'#7a44cf'
            selectedColor={'white'}
            buttonColor={colors.mediumTeal}
            // borderColor={'purple'}
            hasPadding
            options={options}
            testID="login-register-selector"
            accessibilityLabel="login-register-selector"
            height={54}
            text
            textStyle={{fontWeight: '700', fontSize: 16}}
            selectedTextStyle={{fontWeight: '700', fontSize: 16}}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: isDarkMode ? colors.black : 'white',
          height: '100%',
        }}>
        {LoginOrRegister == 'login' ? (
          <SignIn navigation={navigation} />
        ) : (
          <SignUp navigation={navigation} />
        )}
      </View>
    </View>
  );
};

export default Auth;
