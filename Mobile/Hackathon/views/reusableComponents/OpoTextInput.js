import React from 'react';
import {TextInput, View} from 'react-native';

export default class OpoTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
    
  render() {
    return (
      <View>
            <TextInput
                style={[{ borderWidth: 1, borderColor: '#C4C4C4', padding: 8,borderRadius: 8},this.props.style]}
          onChangeText={(text) => this.props.onChangeText(text)}
          placeholder="test"></TextInput>
      </View>
    );
  }
}
