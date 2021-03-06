import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ListView,
  Alert,
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
const AnnounceItem = require('../components/AnnounceItem');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});


import renderIf from './renderIf';


export default class AnnouncementScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        searchString: '',
        isLoading: false,
        message: '',
        jsonData: '',
        dataSource: ds.cloneWithRows([])
    };
  }

  listenForItems() {
    firebase.database().ref().child("announce").on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
            title: child.val().text,
            _key: child.key,
            url: child.val().url,
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

  deletefunc(item){
    if(global.admins.includes(global.id))
      Alert.alert(
      'Delete',
      'Are you sure you want to delete this announcement?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
        {text: 'OK', onPress: () => this.announceRef.child(item._key).remove()},
      ],
      { cancelable: false }
      );
  }


  static route = {
    navigationBar: {
      title: 'Announcements',
    },
  }

  render() {
    return (
      <View style={styles.container}>
      <Prompt
        title="Create Annoucement Format: <announcement>*<picture url>"
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
            onPress: global.announceRef.push({
              text: value.substring(0,value.indexOf('*')),
              url: value.substring(value.indexOf('*') + 1)
            })
          })
        }/>

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        enableEmptySections={true}/>

      {renderIf(global.admins.includes(global.id), 
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
    if(global.admins.includes(global.id))
      Alert.alert(
      'Delete',
      'Are you sure you want to delete this announcement?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
        {text: 'OK', onPress: () => this.announceRef.child(item._key).remove()},
      ],
      { cancelable: false }
      );
    };

    return (
      <AnnounceItem item={item} onPress={onPress} deletefunc={this._deletefunc}  />
    );
  }
}

