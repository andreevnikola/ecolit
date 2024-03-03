import { useCallback, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, View, Text, Image } from 'tamagui';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';
import UserProfileSheetContent from './UserProfileSheetContent';

export default function UserProfileIcon({ avatarUrl }: { avatarUrl: string }) {
  const openSheet = useBottomSheetStore((store) => store.openSheet);

  console.log(avatarUrl);

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          openSheet({
            content: <UserProfileSheetContent />,
            snapPoints: ['50%'],
          })
        }>
        <Avatar circular size="$3" mt={-5} mr={7}>
          <Avatar.Image src={avatarUrl} width={50} height={50} />
          <Avatar.Fallback bc="$backgroundTint" />
        </Avatar>
      </TouchableOpacity>
    </View>
  );
}
