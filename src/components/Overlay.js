// @flow

import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

type Props = {
  onPress: Function;
  backgroundColor: string;
  opacity: number;
  animationDuration: number;
  showOverlay: bool;
  pointerEvents: string;
}

const DefaultProps = {
  backgroundColor: '#000',
  opacity: 0.5,
  animationDuration: 200,
  showOverlay: false,
};

class Overlay extends Component {
  props: Props;
  static defaultProps = DefaultProps;

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showOverlay !== nextProps.showOverlay) {
      const toValue = nextProps.showOverlay ? nextProps.opacity : 0;
      Animated.timing(this.state.opacity, {
        toValue,
        duration: this.props.animationDuration,
      }).start();
    }
  }

  render() {
    const { onPress, pointerEvents } = this.props;
    const backgroundColor = { backgroundColor: this.props.backgroundColor };
    const opacity = { opacity: this.state.opacity };

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[styles.overlay, backgroundColor, opacity]}
      >
        <TouchableOpacity onPress={onPress} style={[styles.overlay]} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
  },
});

export default Overlay;
