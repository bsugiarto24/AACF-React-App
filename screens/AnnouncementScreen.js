import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ListView,
  AlertIOS,
  AppRegistry
} from 'react-native';

{/*import {
  Button, CheckBox
} from 'react-native-elements';*/}

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

const firebaseConfig = {
    apiKey: "AIzaSyDxe3Adw94y0kEaoyUckhJRPYV8kaHLQ8o",
    authDomain: "aacf2-dc0b9.firebaseapp.com",
    databaseURL: "https://aacf2-dc0b9.firebaseio.com",
    storageBucket: "aacf2-dc0b9.appspot.com",
    messagingSenderId: "874313332955"
};

firebase.initializeApp(firebaseConfig);

import renderIf from './renderIf';


export default class AnnouncementScreen extends React.Component {

  constructor(props) {
    super(props);

    this.itemsRef = firebase.database().ref().child("announce");
    this.state = {
        searchString: '',
        isLoading: false,
        message: '',
        jsonData: '',
        dataSource: ds.cloneWithRows([])
    };
  }

  getRef() {
    return firebase.ref();
  }

  listenForItems() {
    firebase.database().ref().child("announce").on('value', (snap) => {

      // get children as an array
      var items = [];
      
      snap.forEach((child) => {

        items.push({
            title: child.val().text,
            _key: child.key
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
      title: 'Annoucements',
    },
  }


  render() {


     <StatusBar title="Annoucements"/>
        return (
          <View style={styles.container}>
          <Prompt
            title="Create Annoucement!"
            placeholder="Start typing"
            defaultValue="Hello AACF, "
            visible={ this.state.promptVisible }
            onCancel={ () => this.setState({
              promptVisible: false,
              message: "You cancelled"
            }) }
            onSubmit={ 
              (value) => this.setState({
                promptVisible: false,
                message: `You said "${value}"`,
                onPress: this.itemsRef.push({text: value})
              })
            }/>

         {/*<Button
           raised
           icon={{name: 'cached'}}
           title='RAISED WITH ICON' />*/}

          <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}/>

          {renderIf(global.username == 'Bryan Sugiarto', 
                    <ActionButton onPress={this._addItem.bind(this)} title="Add" />
          )}

          </View>
        );
      

  }

   _addItem() {
      this.setState({
        promptVisible: true,
        message: "addd"
      });
  }

  _renderItem(item) {
    const onPress = () => {

        if(global.username == 'Bryan Sugiarto')
          this.itemsRef.child(item._key).remove()
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }


}

