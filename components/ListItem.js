import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles/styles.js')
const { View, StyleSheet, TouchableHighlight, Text, Image, Alert} = ReactNative;
import renderIf from '../screens/renderIf';
import Swipeout from 'react-native-swipeout';


class ListItem extends Component {
  render() {


    var bool = global.admins.includes(global.id) || ((global.id == this.props.item.id || global.id == this.props.item) && global.id != '');

    return (
        <View style={styles.li}>

          {renderIf(this.props.item.picture != '', 
            <Image
                style={{width: 50, 
                        height: 50,
                        marginRight: 10,
                      }}
                source={{uri: "http:/graph.facebook.com/"+ this.props.item.picture +"/picture?type=large" }}
              />
          )}
		      {renderIf(this.props.item.picture == '', 
            <Image
                style={{width: 50, 
                        height: 50,
                        marginRight: 10,
                      }}
                source={{uri: global.empty }}
              />
          )}
          

          {renderIf(bool,
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
                      {text: 'OK', onPress: () => global.itemsRef.child(this.props.item._key).remove()},
                    ],
                    { cancelable: false }
                    );
                 }
              }]}
              autoClose={true}>
                <View
                style={{backgroundColor:'white', height:50, width: global.window.width - 70}}>
                  <View>
                    <Text style={styles.liText}>{this.props.item.title}</Text>
                  </View>
                </View>
            </Swipeout>
          )}





          {renderIf(!bool,
            <View style={{backgroundColor:'white', height:50, width: global.window.width - 70}}>
              <View>
                <Text style={styles.liText}>{this.props.item.title}</Text>
              </View>
            </View>
          )}

        </View>
    );
  }
}


module.exports = ListItem;
