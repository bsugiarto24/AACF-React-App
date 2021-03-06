import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles/styles.js')
const { View, StyleSheet, TouchableHighlight, Text, Image, Separator, Alert, } = ReactNative;
import renderIf from '../screens/renderIf';
import Swipeout from 'react-native-swipeout';


class MoiItem extends Component {

  convertTo12Hour(input_string){

    if(input_string == null){
      return input_string;
    }

    ispm = 'am';
    hour = parseInt(input_string.substring(0,2));
    if (hour > 12){
      hour -= 12;
      ispm = 'pm';
    }else if (hour ==0){
      hour =  12;
    }

    return (hour + input_string.substring(2,5) + ispm);
  }

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
           <View>
            <Text style={styles2.title}> {this.props.item.name} </Text>
            <Text style={styles2.detail}>{'  From '} {this.convertTo12Hour(this.props.item.time)} 
              {' to '} {this.convertTo12Hour(this.props.item.endtime)}</Text>
          </View>
        </View>
    );
  }
}


module.exports = MoiItem;

const styles2 = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
  },
  welcomeContainer: {
   alignItems: 'center',
   marginTop: global.window.height/12,
   marginBottom: 20,
   height: 200,
  },
  footer: {
    top: 40,
    left: 0, 
    justifyContent: 'flex-end', 
    width: global.window.width,
 },
 title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left'
  },
 detail: {
  fontSize: 13,
  textAlign: 'left'
  }
});