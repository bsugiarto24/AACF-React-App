import React from 'react';
import Exponent from 'exponent';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage
} from 'react-native';
const StatusBar = require('../components/StatusBar');

import { MonoText } from '../components/StyledText';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});


export default class LogInScreen extends React.Component {
  static route = {
    navigationBar: {
      title: "MOIs",
    },
  }
  constructor(props) {
    super(props)
  }
 
  render() {
    <StatusBar title="MOIs"/>
    return (
       <View style={styles.container}>
          <Text>
            GET US SOME MOIs
          </Text>
      </View>
    );
  }
}



