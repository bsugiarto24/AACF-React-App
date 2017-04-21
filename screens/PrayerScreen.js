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
import renderIf from './renderIf';

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
            title: child.val().text + "\nby " + pname,
            _key: child.key,
            picture: child.val().picture,
            id: child.val().id
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
                  picture: global.id,
                })
            })
          }/>

        {/* anonymous prayer */}
        <Prompt
          title="Anonymous Prayer Request"
          placeholder="Start typing"
          defaultValue="Pray for "
          visible={ this.state.promptVisible2 }
          onCancel={ () => this.setState({
            promptVisible2: false,
            message: "You cancelled"
          }) }
          onSubmit={ 
            (value) => this.setState({
              promptVisible2: false,
              message: `You said "${value}"`,
              onPress: this.itemsRef.push(
                { text: value,
                  name: 'anonymous',
                  picture: '',
                  id: global.id,
                  aname: global.username
                })
            })
          }/>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}/>

        {renderIf(global.id != '', 
          <View style={{flexDirection:'row'}}>
            <View style={{width:global.window.width/2}}>
              <ActionButton style={{width:global.window.width/2}} onPress={this._addItem.bind(this)} title="Add" />
            </View>
            <View style={{width:global.window.width/2}}>
              <ActionButton style={{width:global.window.width/2}} onPress={this._addAnonymous.bind(this)} title="Add Anonymously" />
            </View>
          </View>
        )}
      </View>
    );
  }

   _addItem() {
      this.setState({
        promptVisible: true,
        message: "add"
      });
  }

   _addAnonymous() {
    this.setState({
      promptVisible2: true,
      message: "add"
    });
  }


  _delete(item){
      this.itemsRef.child(item._key).remove()
  }

  _renderItem(item) {
    const onPress = () => {
      // delete if own prayer
      if((global.id == item.id || global.id == item.picture) && global.id != ''){
        Alert.alert(
          'Delete',
          'Are you sure you want to delete this prayer?',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this._delete(item)},
          ],
          { cancelable: false }
        );
      }

      // delete if you are admin
      else if(global.admins.includes(global.id)){
        Alert.alert(
        'Delete',
        'Are you sure you want to delete this prayer?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this._delete(item)},
        ],
        { cancelable: false }
       );
      }
    };

    return (<ListItem item={item} onPress={onPress} />);
  }
}
