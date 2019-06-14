import React, { Component } from 'react';
import { View, Text, PanResponder, Dimensions, Animated } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        this.position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (evt, gesture) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      }
    });

    this.state = { index: 0 }
  }

  getCardStyle() {
    const { position } = this;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }


  renderCardItem = item => {
    if (!this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return (
      <Animated.View
        style={this.getCardStyle()}
        key={item.jobId}
        {...this._panResponder.panHandlers}
      >
        {this.props.renderCard(item)}
      </Animated.View>
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
  }
};

export default Swipe;
