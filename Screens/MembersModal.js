import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

const MembersModal = ({roomName, blockAddSender}) => {
  return (
    <View
      style={{
        backgroundColor: '#F2F2F2',
        left: '40%',
        width: '60%',
        height: '100%',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        flex: 1,
        justifyContent: 'space-between',
        elevation: 5,
      }}>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          left: '1%',
          top: '1%',
          paddingTop: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{left: '1%', width: 120}}>
          <Text style={{fontWeight: '700', fontSize: 25}}>{roomName}</Text>
          <Text style={{color: 'grey', fontSize: 15, flexWrap: 'wrap'}}>
            @{blockAddSender}
          </Text>
        </View>
        <Ionicons
          name="person-sharp"
          style={{
            fontSize: 45,
            color: colors.mediumTeal,
            top: '1%',
            right: '10%',
          }}
          onPress={() => {}}
        />
      </View>
      {/* <View style={{ backgroundColor: colors.primary, height: 0.1 }}></View> */}
      <View style={{flex: 0.8}}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
          }}>
          <Ionicons
            name="people-sharp"
            style={{
              fontSize: 35,
              color: colors.mediumTeal,
            }}
            onPress={() => {}}
          />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              marginTop: 5,
              fontWeight: '500',
            }}>
            Members
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 20,
          }}>
          <Ionicons
            name="call-outline"
            style={{
              fontSize: 35,
              color: colors.mediumTeal,
            }}
            onPress={() => {}}
          />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              marginTop: 5,
              fontWeight: '500',
            }}>
            Help
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: colors.mediumTeal, height: 0.1}}></View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Ionicons
          name="log-out-outline"
          style={{
            fontSize: 35,
            color: colors.mediumTeal,
            margin: 10,
          }}
          onPress={() => {}}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: colors.mediumTeal,
          }}>
          Logout
        </Text>
      </View>
    </View>
  );
};

export default MembersModal;
