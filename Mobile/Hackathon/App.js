/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './views/LoginScreen';
import HomeScreen from './views/HomeScreen';

import {ActivityIndicator, SafeAreaView, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      focused1: true,
      focused2: false,
      focused3: false,
      t: null
    };
  }

  componentDidMount() {}

  logIn() {
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    if (this.state.loggedIn == null) {
      return (
        <SafeAreaView
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            style={{width: 20, height: 20}}></ActivityIndicator>
        </SafeAreaView>
      );
    } else if (this.state.loggedIn == false) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
                tabBarVisible: false,
                gestureEnabled: false,
              }}
              name="LoginScreen"
              component={LoginScreen}
              initialParams={{logCallback: () => this.logIn()}}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={'HomeScreen'}
            tabBarOptions={{
              activeBackgroundColor: '#5653FD',
              activeTintColor: '#FFFFFF',
              inactiveTintColor: '#000000',
              labelStyle: {
                marginBottom: 30,
              },
              style: {
                position: 'absolute',
                left: 0,
                bottom: -50,
                height: 140,
                paddingBottom: 50,
                right: 0,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              },
            }}>
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, t }) => {
                  console.log(focused)
                  return (
                    <Image
                      style={{ marginBottom: -15, height: 22, width: 22 }}
                      source={focused ? require('./img/home.png') : require('./img/homein.png')}
                    />
                  )
                },
              }}
              name="Pulpit"
              component={HomeScreen}></Tab.Screen>
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, t }) => (
                  <Image
                    style={{marginBottom: -15, height: 22, width: 42}}
                    source={focused ? require('./img/usersin.png') : require('./img/users.png')}
                  />
                ),
              }}
              name="Uczestnicy"
              component={HomeScreen}></Tab.Screen>
            <Tab.Screen
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, t }) => (
                  <Image
                    style={{marginBottom: -15, height: 25, width: 25}}
                    source={focused ? require('./img/bellin.png') : require('./img/bell.png')}
                  />
                ),
              }}
              name="Spotkania"
              component={HomeScreen}></Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
  }
}
