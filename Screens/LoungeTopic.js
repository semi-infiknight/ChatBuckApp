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
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

const LoungeTopics = [
  {
    id: '1',
    icon: 'film',
    topic: 'Movies',
    subtopics: [
      'Documentary',
      'Superheros',
      'Star Wars',
      'Actors',
      'Horror',
      'Foreign Films',
      'Mystery',
      'Romance',
      'Thriller',
      'Drama',
    ],
  },
  {id: '2', icon: 'dollar', topic: 'Finance', subtopics: []},
  {
    id: '3',
    icon: 'vollyball',
    topic: 'Sports',
    subtopics: ['Baseball', 'NBA', 'NCAA', 'Climbing', 'Cricket'],
  },
  {
    id: '4',
    icon: 'vollyball',
    topic: 'Art',
    subtopics: ['NFT', 'Painting', 'Drawing', 'Illustration', 'Graphic Design'],
  },
  {id: '5', icon: 'vollyball', topic: 'Crypto', subtopics: []},
  {id: '6', icon: 'vollyball', topic: 'Music', subtopics: []},
  {id: '7', icon: 'vollyball', topic: 'Food', subtopics: []},
  {id: '8', icon: 'vollyball', topic: 'Games', subtopics: []},
  {id: '9', icon: 'vollyball', topic: 'Tech', subtopics: []},
  {id: '10', icon: 'vollyball', topic: 'News', subtopics: []},
  {id: '11', icon: 'vollyball', topic: 'Health', subtopics: []},
  {id: '12', icon: 'vollyball', topic: 'Science', subtopics: []},
];

// const colors = {primary: colors.mediumTeal};
const lightModeColors = {text: colors.black, background: 'white'};
const darkModeColors = {text: 'white', background: colors.black};

const LoungeTopic = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const Item = ({topic, icon, subtopics}) => (
    <View
      style={{
        width: '95%',
        margin: 10,
        backgroundColor: isDarkMode ? colors.black : 'white',
        borderRadius: 10,
        marginBottom: 20,
      }}>
      <View
        style={{
          width: '100%',
          //   height: 80,
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text>Icon</Text>
        <Text
          style={{
            color: colors.mediumTeal,
            fontWeight: '600',
            marginLeft: 10,
            fontSize: 17,
          }}>
          {topic}
        </Text>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {subtopics.map((item, index) => (
          <TouchableOpacity
            style={{
              backgroundColor: colors.mediumTeal,
              height: 42,
              justifyContent: 'center',
              borderColor: 'white',
              borderWidth: 1,
              margin: 3.5,
              padding: 8,
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 15,
              }}
              key={index}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  const [Mode, setMode] = useState(lightModeColors);
  const renderItem = ({item}) => (
    <Item topic={item.topic} icon={item.icon} subtopics={item.subtopics} />
  );

  return (
    <View style={{backgroundColor: isDarkMode ? colors.black : 'white'}}>
      {/* <View
        style={{
          height: '6%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '500',
            color: Mode.text,
          }}>
          Lounge
        </Text>
      </View> */}
      <View
        style={{
          height: '12%',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Ionicons
          name="chevron-back-sharp"
          onPress={() => {
            // navigation.navigate('Lounge');
          }}
          style={{
            fontSize: 40,
            color: isDarkMode ? 'white' : colors.black,
            marginLeft: 5,
            width: '10%',
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: isDarkMode ? 'white' : colors.black,
            width: '80%',
            textAlign: 'center',
          }}>
          Pick 4 or more topics
        </Text>
      </View>
      <View
        style={{
          height: '68%',
          backgroundColor: isDarkMode ? colors.black : 'white',
          padding: 15,
        }}>
        <FlatList
          data={LoungeTopics}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
          height: '12%',
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

export default LoungeTopic;

const styles = StyleSheet.create({});
