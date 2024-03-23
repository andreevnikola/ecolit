import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from 'tamagui';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';

const BottomSheetLib = () => {
  const theme = useTheme();

  const isOpened = useBottomSheetStore((store) => store.isOpened);
  const content = useBottomSheetStore((store) => store.content);
  const snapPoints = useBottomSheetStore((store) => store.snapPoints);

  const onExit = useBottomSheetStore((store) => store.onExit);

  const hide = useBottomSheetStore((store) => store.hideSheet);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  if (!isOpened) return <></>;

  return (
    <BottomSheet
      onClose={() => {
        hide();
        onExit();
      }}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: theme.backgroundTint.get() }}
      handleIndicatorStyle={{ backgroundColor: theme.backgroundShade.get() }}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}>
      <BottomSheetView style={styles.contentContainer}>{content}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
  },
});

export default BottomSheetLib;
