import { useCallback, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, View, Text, Image, XGroup } from 'tamagui';
import { useBottomSheetStore } from '~/stores/bottomSheetStore';
import UserProfileSheetContent from './UserProfileSheetContent';
import { getAvatar } from '~/utils/auth/getAvatar';

export default function UserProfileIcon({
  avatarUrl,
  email,
}: {
  avatarUrl: string;
  email: string;
}) {
  const openSheet = useBottomSheetStore((store) => store.openSheet);

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
          <Avatar.Fallback bc="$backgroundTint">
            <Image width={35} height={35} src={{ uri: getAvatar(email) }} />
          </Avatar.Fallback>
        </Avatar>
      </TouchableOpacity>
    </View>
  );
}
