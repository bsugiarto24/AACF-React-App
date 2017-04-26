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
global.moilist = false;

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

        global.moilist = true;
        alert('clicked: ${this.state.date.toString()}');
        this.forceUpdate();
    }

  toggleCal() {
    global.calendar = true;
    this.forceUpdate();
  }

  toggleMoiList(){
    global.moilist = false;
    this.forceUpdate();
  }

  render() {
   return (
    <View style={styles.container}>
       <View style={styles.welcomeContainer}>
        {renderIf(global.calendar == true && global.moilist == false, 
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

       {renderIf(global.calendar != true && global.moilist == false, 
         <View>
          <View>
           <Calendar
            date={this.state.date}
            onPrevButtonPress={() => this.handlePrevButtonPress()}
            onNextButtonPress={() => this.handleNextButtonPress()} 
            onDateSelect={() => this.handleDateSelect()} />
          </View>
          <View 
           style={{marginTop: 140}}>
           <ActionButton onPress={this.toggleCal.bind(this)} title="Add Time" />
          </View>
         </View>
       )}


      {renderIf(global.moilist == true, 
         <View>
          <Text> list mois </Text>
          <ActionButton onPress={this.toggleMoiList.bind(this)} title="Back" />
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
  welcomeContainer: {
   alignItems: 'center',
   marginTop: global.window.height/12,
   marginBottom: 20,
   height: 200,
  }
});