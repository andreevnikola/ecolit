import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { styled, View } from 'tamagui';

const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback, {
  backgroundColor: '',
  height: '$20',
});

const DismissKeyboardHOC = (Comp: any) => {
  return ({ children, ...props }: any) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
export const DismissKeyboardView = DismissKeyboardHOC(View);
