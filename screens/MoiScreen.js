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

import { MonoText } from '../components/StyledText';
import renderIf from './renderIf';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';

const ActionButton = require('../components/ActionButton');


global.calendar = true;

export default class MoiScreen extends React.Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  }
  constructor(props) {
    super(props);
    this.itemsRef = firebase.database().ref().child("moi");
    this.state = {date: new Date()};
  }

  toggleCal() {
      global.calendar = !global.calendar;
      this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            {renderIf(global.calendar == true, 
              <TouchableOpacity>
                <Text> Add Time You Can MOI </Text>

                 <DatePicker
                  style={{width: 200}}
                  //date={this.state.date}
                  mode="date"
                  placeholder= {this.date}
                  format="MM-DD-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {},
                    dateInput: {}
                  }}
                  onDateChange={(date) => {this.setState({date: date});}}
               />
                 <DatePicker
                  style={{width: 200}}
                  //date={this.state.time}
                  mode="time"
                  format="HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  minuteInterval={10}
                  onDateChange={(time) => {this.setState({time: time});}}
                />

              <ActionButton onPress={this._addItem.bind(this)} title="Add Time" />
              </TouchableOpacity>
            )}

          {renderIf(global.calendar != true, 
            <TouchableOpacity onPress={this.toggleCal.bind(this)}>
              <Text>Calendar</Text>  
              <Text style={{backgroundColor: 'blue', color: 'white', padding: 20}}>
                ADD TIME
              </Text>
            </TouchableOpacity>
          )}
          </View>
    </View>
    );
  }


  _addItem() {


    //not logged in
    if(global.username != "anonymous"){
      Alert.alert(
        'Not Logged in!',
        `Please Login!`,
      );
    }
    else {

      pushRef = this.itemsRef.child(global.username);
      pushRef.push({text: "yessss",
                  name: global.username});

      global.calendar = false;


      Alert.alert(
        'Added Time',
        `Successfully Added Time`,
      );


      this.forceUpdate();
    }

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 50,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 20,
    height: 200,
  },
  welcomeImage: {
    width: 250,
    height: 200,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

