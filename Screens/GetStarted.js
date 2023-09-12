import {
  View,
  Text,
  Dimensions,
  useColorScheme,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../config/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GetStarted = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        backgroundColor: isDarkMode ? colors.black : colors.white,
      }}>
      <View
        style={{
          backgroundColor: colors.vibrantBlue,
          width: windowWidth,
          height: windowHeight / 2.3,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Image
          source={require('../Assets/getstarted.png')}
          style={{
            width: windowWidth,
            height: windowHeight / 2.4,
            // marginHorizontal: 20,
            // marginTop: -15,
            // opacity: 0.2,
            marginBottom: -5,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '800',
            padding: 20,
            color: isDarkMode ? colors.white : colors.black,
            // marginBottom: 10,
          }}>
          Stay connected with your friends and family
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../Assets/secured.png')}
            style={{
              width: 24,
              height: 26,
              // marginHorizontal: 20,
              // marginTop: -15,
              // opacity: 0.2,
              marginLeft: 20,
              marginRight: 10,
              marginVertical: 22,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              paddingVertical: 20,
              color: isDarkMode ? colors.white : colors.black,
              // marginBottom: 50,
            }}>
            Secure, private messaging
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 65,
            backgroundColor: isDarkMode ? colors.white : colors.black,
            borderRadius: 30,
            justifyContent: 'center',
            marginTop: 20,
            width: '80%',
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.navigate('Auth');
          }}>
          <Text
            style={{
              color: isDarkMode ? colors.black : colors.white,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;
