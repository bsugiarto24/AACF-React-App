import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles/styles.js')
const { View, StyleSheet, TouchableHighlight, Text, Image } = ReactNative;
import renderIf from '../screens/renderIf';


class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
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
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}


module.exports = ListItem;
