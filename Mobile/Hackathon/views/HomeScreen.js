import React from 'react';
import {SafeAreaView, View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth'
import { material } from 'react-native-typography'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        <Text style={material.caption}>Logged in!</Text>
        <Button
          onPress={() => {
            auth().signOut();
          }}
          title="LOG OUT"></Button>
      </SafeAreaView>
    );
  }
}
