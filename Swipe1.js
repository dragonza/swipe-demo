import React, { Component } from 'react';
import {
  View,
  Text, Image
} from 'react-native';
import { Card } from 'react-native-elements';
class Swipe extends Component {
  renderCardItem = (job) => {
    return (
      <Card title={job.jobtitle} titleStyle={{ fontSize: 14 }}>
        <View style={{ height: 200 }}>
          <Image
            source={require('./assets/image.jpg')}
            style={{ width: '100%', height: 200 }}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text numberOfLines={4}>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
        </Text>
      </Card>
    )
  };


  renderCards = () => {
    return this.props.data.map(this.renderCardItem)
  };


  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Swipe;
