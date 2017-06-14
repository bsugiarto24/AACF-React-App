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
  AsyncStorage,
  ListView
} from 'react-native';

import { MonoText } from '../components/StyledText';
import renderIf from './renderIf';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
import Calendar from 'react-native-calendar-component';

const ActionButton = require('../components/ActionButton');
global.calendar = false;
global.moilist = false;
const MoiItem = require('../components/MoiItem');

var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })


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
              date: new Date(),
              dataSource: ds.cloneWithRows([]),
              currentDate: new Date()
          };
  }




  handleNextButtonPress() {
        const date = new Date(this.state.currentDate);
        date.setMonth(date.getMonth() + 1);
        this.setState({
            currentDate: date
        });
  }

  handlePrevButtonPress() {
        const date = new Date(this.state.currentDate);
        date.setMonth(date.getMonth() - 1);
        this.setState({
            currentDate: date
        });
  }

  handleDateSelect(in_date) {
        global.moilist = true;
        this.itemsRef.child(in_date.toDateString()).on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push({
              title: child.val().date,
              _key: child.key,
              time: child.val().time,
              date: child.val().date,
              name: child.val().name,
              picture: child.val().picture
          });
          });
          this.setState({
            dataSource: ds.cloneWithRows(items)
          });
        });
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

 listenForItems() {
    this.itemsRef.child(this.state.datestring).on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
            title: child.val().date,
            _key: child.key,
            time: child.val().time,
            date: child.val().date,
            name: child.val().name,
            picture: child.val().picture
        });
      });
      this.setState({
        dataSource: ds.cloneWithRows(items)
      });
    });
  }

  componentWillMount() {
    this.listenForItems();
  }


  render() {
   return (
    <View style={styles.container}>
        

        {renderIf(global.calendar == true && global.moilist == false, 
         <View style={styles.welcomeContainer}>
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
            onDateChange={(date2) => {
              this.setState({
                date: new Date(date2.substring(6), date2.substring(0,2) - 1, date2.substring(3,5), 0, 0, 0, 0),
                datestring: new Date(date2.substring(6), date2.substring(0,2) - 1, date2.substring(3,5), 0, 0, 0, 0).toDateString()});
            }}
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
          </View>
        )}




       {renderIf(global.calendar != true && global.moilist == false, 
         <View>
          <View>
           <Calendar
            date={this.state.currentDate}
            onPrevButtonPress={() => this.handlePrevButtonPress()}
            onNextButtonPress={() => this.handleNextButtonPress()} 
            onDateSelect={(date) => this.handleDateSelect(date)} />
          </View>
          <View 
           style={styles.footer}>
           <ActionButton onPress={this.toggleCal.bind(this)} title="Add Time" />
          </View>
         </View>
       )}




      {renderIf(global.moilist == true, 
         <View>
          <ListView
            style={{height: global.window.height -100, width:global.window.width}}
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}/>


          <ActionButton 
            style={{height: 100, width:global.window.width}} 
            onPress={this.toggleMoiList.bind(this)} title="Back" />
         </View>
       )}
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

      alert(this.state.date);
      pushRef = this.itemsRef.child(this.state.datestring);
      //epoch = this.date.getTime();
      epoch = "epoch";
      pushRef.push({  
              name: global.username,
              date: this.state.date.toDateString(),
              time: this.state.time.substring(0,8),
              endtime: this.state.endtime.substring(0,8),
              epoch: epoch,
              picture: global.picture
            });
      global.calendar = false;
      this.forceUpdate();

      Alert.alert(
        'Added Time',
        `Successfully Added Time`,);
    }
  }


   _renderItem(item) {

    const onPress = () => {
      Alert.alert(
      'Delete',
      'Are you sure you want to delete this announcement?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
        {text: 'OK', onPress: () => this.itemsRef.child(item._key).remove()},
      ],
      { cancelable: false }
      );
    };

    return (
      <MoiItem item={item} onPress={onPress} />
    );
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
  },
  footer: {
    top: 40,
    left: 0, 
    justifyContent: 'flex-end', 
    width: global.window.width,
 }
});