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
import DatePicker from 'react-native-datepicker'
const ActionButton = require('../components/ActionButton');
import { MonoText } from '../components/StyledText';

export default class MoiScreen extends React.Component {
  static route = {
    navigationBar: {
      title: "MOIs",
    },
  }
  constructor(props) {
    super(props);
     this.state = {
        date:"2016-05-15",  
        time: '20:00'
      };

  }
 
  render() {
    <StatusBar title="MOIs"/>
    return (
       <View style={styles2.container}>
          <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              
            },
            dateInput: {
              
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
          />

          <DatePicker
            style={{width: 200}}
            date={this.state.time}
            mode="time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={10}
            onDateChange={(time) => {this.setState({time: time});}}
          />


        <ActionButton onPress={this._addItem.bind(this)} title="Add Time" />


      </View>
    );
  }

  _addItem() {
    Alert.alert(
      'Added Time!',
      `Successful in Adding time`,
    );
  }

}




const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
//    color: '#333333',
    marginBottom: 5
  }
});


