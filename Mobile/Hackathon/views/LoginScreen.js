import React from 'react';
import {View, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button, Text} from 'native-base';
import {iOSUIKit} from 'react-native-typography';
import OpoTextInput from './reusableComponents/OpoTextInput';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }

  tx(text) {
    console.log(text);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        <Image
          style={{
            marginTop: 20,
            position: 'absolute',
            top: 0,
            resizeMode: 'contain',
            height: 800,
          }}
          source={require('../img/loginbg.png')}></Image>
        <Image
          style={[
            iOSUIKit.title3Emphasized,
            {
              marginLeft: -5,
              marginTop: 20,
              height: 50,
              resizeMode: 'contain',
            },
          ]}
          source={require('../img/point.png')}></Image>
        <Text style={[{marginTop: 20}, iOSUIKit.largeTitleEmphasized]}>
          INNY TEKST
        </Text>
        <Text
          style={[
            iOSUIKit.largeTitleEmphasized,
            {marginTop: 20, fontSize: 25, color: '#FF135D'},
          ]}>
          Health | Relaxing |
        </Text>
        <Text
          style={[
            iOSUIKit.caption2,
            {margin: 40, marginTop: 20, lineHeight: 25, textAlign: 'center'},
          ]}>
          unlimited access to the thousands of online videos {'\n'} and 24*7
          support lorem ipusm doller sit with lazy dog jumps {'\n'} over the
          fox. unlimited access to the thousands {'\n'} of online videos and
          24*7 support lorem ipusm doller sit with lazy dog jumps over the fox.
        </Text>
        <Button
          onPress={() => {
            console.log(this.props.route.params.logCallback());
          }}
          style={{
            backgroundColor: '#5653FD',
            width: 280,
            marginLeft: 45,
            height: 50,
          }}>
          <Text
            style={[
              iOSUIKit.body,
              {
                color: 'white',
                textAlign: 'center',
                marginLeft: 20,
                fontWeight: 'bold',
              },
            ]}>
            Połącz z Microsoft Teams
          </Text>
        </Button>
        <Image
          style={{width: 150, marginTop: 10, resizeMode: 'contain'}}
          source={require('../img/msteams.png')}></Image>
      </SafeAreaView>
    );
  }
}
