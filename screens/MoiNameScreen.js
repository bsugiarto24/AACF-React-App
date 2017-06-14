import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  ListView
} from 'react-native';

import {
  ExponentConfigView,
} from '@exponent/samples';

import Swipeout from 'react-native-swipeout';
import * as firebase from 'firebase';
import renderIf from './renderIf';


const MoiNameItem = require('../components/MoiNameItem');

var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })

// Buttons
var swipeoutBtns = [
  {
    text: 'Delete'
  }
]

export default class MoiNameScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'MOIs By Name'
    },
  }

  constructor(props) {
     super(props);
     global.moibynameRef = firebase.database().ref().child("moibyname");
     global.moiRef = firebase.database().ref().child("moi");

     this.itemsRef = firebase.database().ref().child("moibyname");
     this.state = { 
                dataSource: ds.cloneWithRows([]),
                currentDate: new Date()
            };
  }


  listenForItems() {
    this.itemsRef.on('value', (snap) => {
    
      var items = [];
      
      snap.forEach((child) => {
        var name = child.key;
        var data = [];
        var picture = '';

        this.itemsRef.child(name).orderByChild("epoch").on('value', (snap2) => {
          snap2.forEach((child2) => {

            if(child2.val().picture != null || child2.val().picture.length > 0)
              picture = child2.val().picture;
            data.push({
              title: child2.key,
              _key: child2.key,
              time: child2.val().time,
              date: child2.val().date,
              epoch: child2.val().epoch,
              name: name,
              endtime: child2.val().endtime,
              picture: child2.val().picture,
              key: child2.val().key
            });
          });
        });

        items.push({name: name, data: data, picture: picture});

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
      <View>
        {renderIf(this.state.dataSource == [], 
           <View><Text>'Empty' </Text></View>
        )}

        <ListView
          style={{height: global.window.height - 100, width:global.window.width}}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}/>
      </View>
    );
  }


   _renderItem(item) {


    return (
      <MoiNameItem item={item}/>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
