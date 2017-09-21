import React from 'react';
import { View, ListView, StyleSheet, Text, TouchableHighlight, ActivityIndicator, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class PanelList extends React.Component {
   constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state = {
    // ListView DataSource object
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    // Used for RefreshControl
    isRefreshing: true,
  }
  }

  componentDidMount() {
    this._getTheData()    
    
  };  

  _getTheData = () => {
    fetch('https://jsonblob.com/api/jsonBlob/fc6160dc-9dde-11e7-aa97-5f95ca9ceec6')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          isRefreshing: false,
        });
      }).done();    
  }

  renderRow(rowData, sectionID, rowID) {
    return (  
      <View style={styles.block}>
          <Text style={{fontSize: 20, color: '#fff'}} numberOfLines={1}>{rowData.name}</Text>
          <Text style={{marginLeft: 20, fontSize: 20, color: '#fff'}} numberOfLines={1}>{rowData.temp} °C</Text>
      </View>
    );
  }

  render() {
    var currentView = (this.state.isRefreshing)?<ActivityIndicator/>:<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>

    return(
      <View>
        {currentView}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  block:{
    flex: 1,
    width: width,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4500',
       

  }
})
