import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  useColorScheme,
  Linking,
} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import colors from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Profile = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? colors.black : colors.white,
        height: windowHeight,
        width: windowWidth,
      }}>
      <View
        style={{
          height: windowHeight / 3.5,
          backgroundColor: colors.mediumTeal,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          width: windowWidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons
          name="person-circle-sharp"
          style={{
            fontSize: 200,
            // marginLeft: 5,
            color: colors.white,

            // backgroundColor: 'red',
          }}
        />
      </View>
      <View style={{marginTop: 100}}>
        <TouchableOpacity
          style={{
            width: '85%',
            height: 50,
            backgroundColor: colors.mediumTeal,
            alignSelf: 'center',
            borderRadius: 18,
            marginVertical: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              fontWeight: '600',
              color: colors.white,
              marginLeft: '5%',
            }}>
            My Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '85%',
            height: 50,
            backgroundColor: colors.mediumTeal,
            alignSelf: 'center',
            borderRadius: 18,
            marginVertical: 10,
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '85%',
              height: 50,
            }}>
            <Ionicons
              name="help-circle-outline"
              style={{
                fontSize: 30,
                // marginLeft: 5,
                color: colors.white,
                marginLeft: 30,
                // backgroundColor: 'red',
              }}
            />
            {/* <View style={{flexDirection: 'row'}}> */}
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                fontWeight: '600',
                color: colors.white,
                // backgroundColor: 'yellow',
                marginHorizontal: '18%',
              }}>
              About Us
            </Text>
            {/* </View> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '85%',
            height: 50,
            backgroundColor: colors.mediumTeal,
            alignSelf: 'center',
            borderRadius: 18,
            marginVertical: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '85%',
              height: 50,
            }}>
            <Ionicons
              name="share-social-outline"
              style={{
                fontSize: 30,
                // marginLeft: 5,
                color: colors.white,
                marginLeft: 30,
                // backgroundColor: 'red',
              }}
            />
            {/* <View style={{flexDirection: 'row'}}> */}
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                fontWeight: '600',
                color: colors.white,
                // backgroundColor: 'yellow',
                marginHorizontal: '18%',
              }}>
              Share
            </Text>
            {/* </View> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '85%',
            height: 50,
            backgroundColor: colors.mediumTeal,
            alignSelf: 'center',
            borderRadius: 18,
            marginVertical: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '85%',
              height: 50,
            }}>
            {/* <FontAwesome
              name="lightheadset"
              style={{
                fontSize: 30,
                // marginLeft: 5,
                color: colors.white,
                marginLeft: 30,
                // backgroundColor: 'red',
              }}
            /> */}
            <Image
              source={require('../Assets/icons/support.png')}
              style={{
                width: 100,
                height: 100,
                // marginRight: 30,
              }}
            />
            {/* <View style={{flexDirection: 'row'}}> */}
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                fontWeight: '600',
                color: colors.white,
                // backgroundColor: 'yellow',
                marginHorizontal: '5%',
              }}>
              Support
            </Text>
            {/* </View> */}
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: '10%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Text
            onPress={() =>
              Linking.openURL('https://chatbuck.com/index.php/privacy-policy/')
            }
            style={{
              marginVertical: 5,
              fontFamily: 'SourceSansPro-Bold',
              fontSize: 15,
              color: 'grey',
            }}>
            Privacy Policy
          </Text>
          <Text
            onPress={() =>
              Linking.openURL(
                'https://chatbuck.com/index.php/terms-and-conditions/',
              )
            }
            style={{
              marginVertical: 5,
              fontFamily: 'SourceSansPro-Bold',
              fontSize: 15,
              color: 'grey',
            }}>
            Terms and Conditions
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({});
