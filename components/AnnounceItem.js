import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles/styles.js')
const { View, StyleSheet, TouchableHighlight, Text, Image, Separator, Alert} = ReactNative;
import renderIf from '../screens/renderIf';
import Swipeout from 'react-native-swipeout';

// Buttons
var swipeoutBtns = [
   
]

class AnnouncementItem extends Component {

  clickButton(){}

  render() {
    return (
        <View style={styles.li}>

          {renderIf(this.props.item.url != '', 
            <Image
                style={{width: 50, 
                        height: 50,
                        marginRight: 10,
                      }}
                source={{uri: this.props.item.url}}
              />
          )}

          {/* DEFAULT Announcement Image */}
    		  {renderIf(this.props.item.url == '', 
                <Image
                    style={{width: 50, 
                            height: 50,
                            marginRight: 10,
                          }}
                    source={{uri: 'http://www.base11.com/wp-content/uploads/2016/09/Bryan-small-251x300.jpg' }}
                />
          )}


          {renderIf(global.admins.includes(global.id),
          <Swipeout 
            right={[{
              text: 'Delete',
              backgroundColor: 'red',
              onPress: () => { 
                  Alert.alert(
                  'Delete',
                  'Are you sure you want to delete this announcement?',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
                    {text: 'OK', onPress: () => global.announceRef.child(this.props.item._key).remove()},
                  ],
                  { cancelable: false }
                  );
               }
            }]}
            autoClose={true}>
              <View
              style={{backgroundColor:'white', height:50, width: global.window.width - 70}}>
                <View>
                  <Text> {this.props.item.title} </Text>
                </View>
              </View>
          </Swipeout>
          )}
          {renderIf(!global.admins.includes(global.id),
            <View style={{backgroundColor:'white', height:50, width: global.window.width - 70}}>
              <View>
                <Text> {this.props.item.title} </Text>
              </View>
            </View>
          )}

        </View>
    );
  }
}

class ListItem2 extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = AnnouncementItem;
