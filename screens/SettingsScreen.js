import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';

import {
  ExponentConfigView,
} from '@exponent/samples';

import Swipeout from 'react-native-swipeout';



// Buttons
var swipeoutBtns = [
  {
    text: 'Delete'
  }
]

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'exp.json'
    },
  }

  render() {

    return (
      <Swipeout right={swipeoutBtns}>
        <View>
          <Text>Swipe me left</Text>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
