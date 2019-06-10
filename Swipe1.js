import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  state = {
    index: 0
  };

  renderCardItem = (item) => {
    if (! this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return (
      <View key={item.jobId}>
        {this.props.renderCard(item)}
      </View>
    );
  };

  renderCards = () => {
    return this.props.data.map(this.renderCardItem);
  };

  render() {
    return <View>{this.renderCards()}</View>;
  }
}


const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  },
};

export default Swipe;
