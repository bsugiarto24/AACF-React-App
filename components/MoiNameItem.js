import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles/styles.js')
const { View, StyleSheet, TouchableHighlight, Text, Image, Separator, Alert, ListView} = ReactNative;
import renderIf from '../screens/renderIf';
import Swipeout from 'react-native-swipeout';
var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
const MiniMoiItem = require('../components/MiniMoiItem');


class MoiNameItem extends Component {

    constructor(props) {
     super(props);

     this.state = { 
                dataSource: ds.cloneWithRows([]),
                showData: false
            };
    }


  toggleData(){
      this.state.showData = !this.state.showData;
      this.forceUpdate();
  }


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

  _renderItem(item) {
    return (
      <MiniMoiItem item={item} />
    );
  }

  checkIfActive(name){
    date = new Date().toDateString();
    ret = false;
    i = 0;

    while(i < this.props.item.data.length) {
      endTime = this.props.item.data[i].date;
      if(date === endTime){
        return true;
      }
      i++;
    }


    return ret;

  }

  render() {

    this.state.dataSource = ds.cloneWithRows(this.props.item.data);
    return (
        <View>
          <TouchableHighlight
                onPress={this.toggleData.bind(this)}>
            <View style={styles.li}>
               {renderIf(this.checkIfActive(this.props.item.name), 
                  <Image
                    style={{width: 20, 
                            height: 20,
                            marginRight: 10,
                            justifyContent: 'center',
                            marginTop: 15 
                          }}
                    source={{uri:'https://fthmb.tqn.com/MdXju0d78SWOuxJRhGepHMS2v_s=/1280x843/filters:no_upscale():fill(FFCC00,1)/about/GreenCircle-56a87e193df78cf7729e54d9.jpg'}}
                  /> 
              )}


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
              </View>
            </View>
         </TouchableHighlight>


        {renderIf(this.state.showData, 
            <ListView
              style={{margin: 0, width:global.window.width}}
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
              enableEmptySections={true}/>
        )}
      </View>
    );
  }
}


module.exports = MoiNameItem;

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