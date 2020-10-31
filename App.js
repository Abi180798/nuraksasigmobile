import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/src/home/index'
import Wisata from './app/src/wisata/index'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Maps from './app/src/maps';
import Event from './app/src/event';
import * as Font from 'expo-font';
import * as Location from 'expo-location';
import "native-base/Fonts/Roboto_medium.ttf"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(props) {
  // console.log(props)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
 const [state,setState] = useState(false)
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    (async () => {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setState(true);
    })();
  },[]);
  // console.log("lokasi",state)
  return (
    state===true&&
    <NavigationContainer>
        {/* <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Wisata"
            component={Wisata}
          />
        </Stack.Navigator> */}
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Wisata') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'Event') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar';
            } else if (route.name === 'Maps') {
              iconName = focused ? 'ios-map' : 'ios-map';
            }
{/* <ion-icon name="calendar-outline"></ion-icon> */}
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Wisata" component={Wisata} />
        <Tab.Screen name="Event" component={Event} />
        <Tab.Screen name="Maps" component={Maps} />
      </Tab.Navigator>
      </NavigationContainer>
  );
}


