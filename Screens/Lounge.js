import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors';
import LoungeTopic from './LoungeTopic';

const DATA = [
  {id: '1', text: 'Movies', icon: 'film'},
  {id: '2', text: 'Finance', icon: 'dollar'},
  {id: '3', text: 'Sports', icon: 'vollyball'},
  {id: '4', text: 'Art', icon: 'palette'},
  {id: '5', text: 'Crypto', icon: 'wallet'},
  {id: '6', text: 'Music', icon: 'music'},
  {id: '7', text: 'Food', icon: 'utensils'},
  {id: '8', text: 'Games', icon: 'gamepad'},
  {id: '9', text: 'Tech', icon: 'microchip'},
  {id: '10', text: 'News', icon: 'paper'},
  {id: '11', text: 'Health', icon: 'stethoscope'},
  {id: '12', text: 'Science', icon: 'flask'},
];

// const colors = {primary: '#1081AF'};

const darkModeColors = {text: 'white', background: colors.black};

const Lounge = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const Item = ({text, icon}) => (
    <View
      style={{
        width: '28%',
        height: 100,
        margin: 10,
        backgroundColor: colors.mediumTeal,
        borderRadius: 10,
        marginBottom: 20,
      }}>
      <TouchableOpacity
        style={{
          width: '80%',
          height: 80,
          margin: 10,
        }}>
        <View></View>
      </TouchableOpacity>
      <Text
        style={{
          color: isDarkMode ? 'white' : colors.black,
          alignSelf: 'center',
        }}>
        {text}
      </Text>
    </View>
  );
  const [Mode, setMode] = useState(darkModeColors);
  const renderItem = ({item}) => <Item text={item.text} icon={item.icon} />;

  return (
    <View style={{backgroundColor: isDarkMode ? colors.black : 'white'}}>
      <View
        style={{
          height: '6%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '500',
            color: isDarkMode ? 'white' : colors.black,
          }}>
          {/* Lounge */}
          Upcoming
        </Text>
      </View>
      <View
        style={{
          height: '6%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: isDarkMode ? 'white' : colors.black,
          }}>
          Pick 3 or more interests
        </Text>
      </View>
      <View
        style={{
          height: '68%',
          backgroundColor: isDarkMode ? colors.black : 'white',
          padding: 15,
        }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </View>
      <TouchableOpacity
        style={{
          height: '8%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.mediumTeal,
          width: '80%',
          alignSelf: 'center',
          borderRadius: 20,
        }}
        onPress={() => {
          navigation.navigate('LoungeTopic');
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: 'white',
          }}>
          Continue
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: '8%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: isDarkMode ? 'white' : colors.black,
          }}>
          I"l do it later
        </Text>
      </View>
    </View>
  );
};

export default Lounge;

const styles = StyleSheet.create({});
