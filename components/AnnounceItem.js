import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles/styles.js')
const { View, StyleSheet, TouchableHighlight, Text, Image } = ReactNative;
import renderIf from '../screens/renderIf';


class AnnouncementItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
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

    		  {renderIf(this.props.item.url == '', 
                <Image
                    style={{width: 50, 
                            height: 50,
                            marginRight: 10,
                          }}
                    source={{uri: 'http://www.base11.com/wp-content/uploads/2016/09/Bryan-small-251x300.jpg' }}
                />
          )}
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
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
