import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ListView,
  Alert
} from 'react-native';

import {
  ExponentLinksView,
} from '@exponent/samples';

import Prompt from 'react-native-prompt';
import { MonoText } from '../components/StyledText';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import ReactNative from 'react-native';

var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })

const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const ListItem = require('../components/ListItem');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});



export default class PrayerScreen extends React.Component {

  constructor(props) {
    super(props);

    this.itemsRef = firebase.database().ref().child("prayer");
    this.state = {
        searchString: '',
        isLoading: false,
        message: '',
        jsonData: '',
        dataSource: ds.cloneWithRows([])
    };
  }

  getRef() {
    return firebase.ref().child("prayer");
  }

  listenForItems() {
    firebase.database().ref().child("prayer").on('value', (snap) => {

      // get children as an array
      var items = [];
      
      snap.forEach((child) => {

        var pname = 'anonymous';
        if(child.val().name != null){
          pname = child.val().name;
        }

        items.push({
            title: child.val().text + " by " + pname,
            _key: child.key,
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

  fetchData(){
    fetch("asdf")
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          this.setState({
            dataSource: ds.cloneWithRows(responseData),
          });
        }
      })
      .done();
  }

  static route = {
    navigationBar: {
      title: 'Prayer Requests',
    },
  }


  render() {

     <StatusBar title="Prayer Requests"/>

        return (
          <View style={styles.container}>
    
          <Prompt
            title="Prayer Request"
            placeholder="Start typing"
            defaultValue="Pray for "
            visible={ this.state.promptVisible }
            onCancel={ () => this.setState({
              promptVisible: false,
              message: "You cancelled"
            }) }
            onSubmit={ 
              (value) => this.setState({
                promptVisible: false,
                message: `You said "${value}"`,
                onPress: this.itemsRef.push(
                  { text: value,
                    name: global.username,
                    picture: global.id
                  })
              })
           }/>


          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}/>

          <ActionButton onPress={this._addItem.bind(this)} title="Add" />
          </View>
        );
  }

   _addItem() {
      this.setState({
        promptVisible: true,
        message: "addd"
      });
  }


  delete(item){
      this.itemsRef.child(item._key).remove()
  }

  // this.itemsRef.child(item._key).remove()

  _renderItem(item) {
    

    const onPress = () => {

      if(global.id == item.picture){
        Alert.alert(
          'Delete',
          'Are you sure you want to delete this prayer?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.delete(item)},
          ],
          { cancelable: false }
        );
      }

      if(global.admins.includes(global.id))
          Alert.alert(
          'Delete',
          'Are you sure you want to delete this prayer?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.delete(item)},
          ],
          { cancelable: false }
      );
    
    };


    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
}
