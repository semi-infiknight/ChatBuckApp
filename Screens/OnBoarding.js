import {View, Text, Dimensions, useColorScheme, Image} from 'react-native';
import React from 'react';
import colors from '../config/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OnBoarding = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? colors.black : colors.white,
        width: windowWidth,
        height: windowHeight,
      }}>
      <View
        style={{
          height: windowHeight / 3.5,
          width: windowWidth,
          // marginBottom: 100,
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '600',
            padding: 20,
            color: isDarkMode ? colors.white : colors.black,
          }}>
          Start a Fun Communication with Anonymity
        </Text>
      </View>
      <View>
        <Image
          source={require('../Assets/onboarding.png')}
          style={{
            width: windowWidth,
            height: windowHeight / 1.6,
            //   marginHorizontal: -10,
            //   marginTop: -15,
            marginHorizontal: 10,
          }}
        />
      </View>
    </View>
  );
};

export default OnBoarding;
