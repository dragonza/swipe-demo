import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Platform,
  Image
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from './Swipe1';
import jobs from './data';

class App extends Component {
  state = {
    likedJobs: 0,
    passedJobs: 0
  };

  handleLikedJob = () => {
    this.setState(({ likedJobs }) => ({
      likedJobs: likedJobs + 1
    }));
  };

  handlePassedJob = () => {
    this.setState(({ passedJobs }) => ({
      passedJobs: passedJobs + 1
    }));
  };

  renderCards(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

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
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More cards">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
        />
      </Card>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.statusStyle}>
          <Text style={{ color: 'red' }}>Passed: {this.state.passedJobs}</Text>
          <Text style={{ color: 'blue' }}>Like: {this.state.likedJobs}</Text>
        </View>
        <Swipe
          onSwipeRight={this.handleLikedJob}
          onSwipeLeft={this.handlePassedJob}
          keyProp="jobkey"
          data={jobs}
          renderCard={this.renderCards}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
});

export default App;
