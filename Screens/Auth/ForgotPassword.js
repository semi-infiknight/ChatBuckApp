import {
  View,
  Text,
  Dimensions,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../config/colors';

const ForgotPassword = ({setForgotPass}) => {
  const resetPassword = () => {
    console.log('Reset Password');
    try {
      // let lowUsername = username.toLowerCase();

      // setUsername(setUsername(lowUsername));

      console.log(username);
    } catch (error) {
      console.log(error);
    }
  };
  const [username, setUsername] = useState('');
  const [errorLine, seterrorLine] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (username == '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [username]);
  return (
    <View style={{padding: 40}}>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 17,
            color: isDarkMode ? 'white' : colors.black,
            marginBottom: 10,
          }}>
          Forgot Password
        </Text>
        <Text style={{color: isDarkMode ? 'white' : colors.black}}>
          Enter your details to send password reset link
        </Text>
      </View>
      <View style={{}}>
        <View style={{}}>
          <View style={{}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 15,
                color: isDarkMode ? 'white' : colors.black,
                marginBottom: 10,
              }}>
              Username
            </Text>
            <View>
              <TextInput
                placeholder="Enter user name"
                placeholderTextColor={isDarkMode ? '#808080' : '#8e8e8e'}
                style={{
                  borderWidth: 1,
                  borderRadius: 25,
                  borderColor: colors.mediumTeal,
                  padding: 13,
                  paddingRight: 50,
                  color: isDarkMode ? 'white' : colors.black,
                }}
                value={username}
                onChangeText={setUsername}
              />
              {username == '' ? null : (
                <Ionicons
                  name="close"
                  style={{
                    fontSize: 20,
                    color: isDarkMode ? 'white' : colors.black,
                    position: 'absolute',
                    top: '30%',
                    right: '5%',
                  }}
                  onPress={() => {
                    setUsername('');
                  }}
                />
              )}
            </View>
          </View>

          <Text style={{color: 'red', marginLeft: 10}}>{errorLine}</Text>

          <TouchableOpacity
            style={{
              height: 65,
              backgroundColor: isDarkMode ? 'white' : colors.black,
              borderRadius: 30,
              justifyContent: 'center',
              marginTop: 20,
            }}
            disabled={buttonDisabled}
            onPress={() => {
              resetPassword();
            }}>
            <Text
              style={{
                color: isDarkMode ? colors.black : 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '700',
              }}>
              Send Link
            </Text>
          </TouchableOpacity>
          <Text
            onPress={() => {
              setForgotPass(false);
            }}
            style={{
              fontWeight: '500',
              fontSize: 16,
              color: isDarkMode ? 'white' : colors.black,
              marginTop: 20,
              textAlign: 'center',
            }}>
            Back to Sign In?
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
