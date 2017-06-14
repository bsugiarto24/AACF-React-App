import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles/styles.js')
const { View, StyleSheet, TouchableHighlight, Text, Image, Separator, Alert, } = ReactNative;
import renderIf from '../screens/renderIf';
import Swipeout from 'react-native-swipeout';


class MoiItem extends Component {

  clickButton(){}

  render() {
    return (
        <View style={styles.li}>

          {renderIf(this.props.item.picture != '', 
            <Image
                style={{width: 50, 
                        height: 50,
                        marginRight: 10,
                      }}
                source={{uri: this.props.item.picture}}
              />
          )}

          {/* DEFAULT Announcement Image */}
    		  {renderIf(this.props.item.picture == null || this.props.item.picture == '' , 
                <Image
                    style={{width: 50, 
                            height: 50,
                            marginRight: 10,
                          }}
                    source={{uri: 'http://www.base11.com/wp-content/uploads/2016/09/Bryan-small-251x300.jpg' }}
                />
          )}
         
        <Text> {this.props.item.name} </Text>
        <Text> {this.props.item.date.substring(4)} </Text>
        <Text> {this.props.item.time.substring(0,5)} </Text>

        </View>
    );
  }
}


module.exports = MoiItem;
