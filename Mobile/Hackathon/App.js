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

import {ActivityIndicator, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(() => {
      if (auth().currentUser == null) {
        this.setState({
          loggedIn: false,
        });
      } else {
        this.setState({
          loggedIn: true
        })
      }
    });
  }

  LoggedNavigation() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}></Tab.Screen>
      </Tab.Navigator>
    );
  }

  render() {
    console.log('render' + this.state.loggedIn);
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
              component={LoginScreen}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return <NavigationContainer>
        <Stack.Navigator initialRouteName={'HomeScreen'}>
          <Stack.Screen
            options={{headerShown: false}}
            name="HomeScreen"
            component={this.LoggedNavigation}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>;
    }
  }
}
