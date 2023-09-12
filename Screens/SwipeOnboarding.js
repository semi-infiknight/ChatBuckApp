import {View, Text} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import OnBoarding from './OnBoarding';
import GetStarted from './GetStarted';

const SwipeOnboarding = ({navigation}) => {
  return (
    <Swiper loop={false}>
      <OnBoarding />
      <GetStarted navigation={navigation} />
    </Swiper>
  );
};

export default SwipeOnboarding;
