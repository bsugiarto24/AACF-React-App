import React, { Component } from 'react';
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
  Button,
  AsyncStorage
} from 'react-native';

import { MonoText } from '../components/StyledText';
import renderIf from './renderIf';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
import Calendar from 'react-native-calendar-component';

const ActionButton = require('../components/ActionButton');
global.calendar = false;

export default class MoiScreen extends React.Component {
  static route = {
   navigationBar: {
     title: 'Moment of Impact (MOI)',
   },
  }
  
  constructor(props) {
   super(props);
   this.itemsRef = firebase.database().ref().child("moi");
   end = new Date();
   end.setMinutes(end.getMinutes() + 20);

   this.state = {  datestring: new Date().toDateString(),
              time: new Date().toTimeString(),
              endtime: end.toTimeString(),
              date: new Date()
            };
  }

  handleNextButtonPress() {
        const date = new Date(this.state.date);
        date.setMonth(date.getMonth() + 1);
        this.setState({
            date
        });
  }

  handlePrevButtonPress() {
        const date = new Date(this.state.date);
        date.setMonth(date.getMonth() - 1);
        this.setState({
            date
        });
    }

  handleDateSelect(date) {
        alert('clicked: ${this.state.date.toString()}');
    }

  toggleCal() {
    global.calendar = true;
    this.forceUpdate();
  }

  render() {
   return (
    <View style={styles.container}>
       <View style={styles.welcomeContainer}>
        {renderIf(global.calendar == true, 
          <View>
           <Text> Add Time You Can MOI </Text>

           <Text> Date </Text>
           <DatePicker
            style={{width: 200}}
            //date={this.state.date}
            mode="date"
            placeholder= {this.state.datestring}
            format="MM-DD-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {},
              dateInput: {}
            }}
            onDateChange={(date2) => {this.setState({datestring: date2.toDateString()});}}
            />
           
           <Text>Start Time</Text>
           <DatePicker
            style={{width: 200}}
            date={this.state.time}
            mode="time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={10}
            onDateChange={(time) => {
              this.setState({time: time});
              temp = new Date('2017','1','20',time.substring(0,2), time.substring(3));
              temp.setMinutes(temp.getMinutes() + 20);
              this.setState({endtime: temp.toTimeString()});
            }}
            />

           <Text>End Time</Text>
           <DatePicker
            style={{width: 200}}
            date={this.state.endtime}
            mode="time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={10}
            onDateChange={(time) => {
              this.setState({endtime: time});
            }}
            />

           <ActionButton onPress={this._addTime.bind(this)} title="Add Time" />
           <Text style={{marginBottom: 0}}> </Text>
           <ActionButton onPress={this._cancel.bind(this)} title="Back" />
          </View>
        )}

       {renderIf(global.calendar != true, 
         <View>
          <View>
           <Calendar
            date={this.state.date}
            onPrevButtonPress={() => this.handlePrevButtonPress()}
            onNextButtonPress={() => this.handleNextButtonPress()} />
          </View>
          <View 
           style={{marginTop: 140}}>
           <ActionButton onPress={this.toggleCal.bind(this)} title="Add Time" />
          </View>

         </View>
       )}
       </View>
   </View>
   );
  }


  _addTime() {

   // USER NOT LOGGED IN
   if(global.username == "anonymous"){
    Alert.alert(  'Not Logged in!',
              `Please Login!`);
   }
   else {
    pushRef = this.itemsRef.child(global.username);
    //epoch = this.date.getTime();
    epoch = "epoch";
    pushRef.push({  name: global.username,
               date: this.state.date,
               time: this.state.time.substring(0,8),
               endtime: this.state.endtime.substring(0,8),
               epoch: epoch
              });
    global.calendar = false;
    this.forceUpdate();

    Alert.alert(
      'Added Time',
      `Successfully Added Time`,
    );
   }
  }



  _cancel() {
   global.calendar = false;
   this.forceUpdate();
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
   marginTop: global.window.height/12,
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