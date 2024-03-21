import { color } from '@tamagui/themes';
import React, { Component } from 'react';
import { StyleSheet, View, Modal, Image, ActivityIndicator } from 'react-native';
import { styled, View as TamaguiView } from 'tamagui';

const StyledActivityIndicator = styled(ActivityIndicator, {
  color: '$text',
});

interface ComponentProps {
  isLoading: boolean;
}

interface ComponentState {
  isLoading: boolean;
}

class Loader extends Component<ComponentProps, ComponentState> {
  constructor(props: { isLoading: boolean }) {
    super(props);
    this.state = {
      isLoading: (this.props as any).isLoading,
    };
  }

  static getDerivedStateFromProps(nextProps: { isLoading: boolean }) {
    return {
      isLoading: nextProps.isLoading,
    };
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={(this.state as any).isLoading}
        style={{ zIndex: 1100 }}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <TamaguiView backgroundColor={'$backgroundShade'} style={styles.activityIndicatorWrapper}>
            <StyledActivityIndicator animating={(this.state as any).isLoading} />

            {/* If you want to image set source here */}
            {/* <Image
              source={require('../assets/images/loader.gif')}
              style={{ height: 80, width: 80 }}
              resizeMode="contain"
              resizeMethod="resize"
            /> */}
          </TamaguiView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
