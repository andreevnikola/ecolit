import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { ScrollView, Text, View, XGroup, styled } from 'tamagui';
import { getTypeDataFromName, storeTypesList, useStoreTypeStore } from '~/stores/storeTypeStore';

const StyledIonicons = styled(Ionicons, {
  color: '$textShade',
  name: 'add',
});

export default function CategoryPicker() {
  const type = useStoreTypeStore((state) => state.type);
  const icon = useStoreTypeStore((state) => state.icon);
  const setType = useStoreTypeStore((state) => state.setType);

  return (
    <View height={53}>
      <ScrollView padding={7} backgroundColor={'$background'} borderRadius={0} horizontal>
        <XGroup gap={5}>
          {storeTypesList.map((name) => {
            const data = getTypeDataFromName(name);
            return (
              <TouchableOpacity onPress={() => setType(data.type)} key={data.type}>
                <XGroup
                  padding={10}
                  paddingRight={13}
                  borderRadius={5}
                  backgroundColor={
                    type === data.type ? `rgba(${data.color}, 0.6)` : `rgba(${data.color}, 0.25)`
                  }
                  gap={5}
                  alignItems="center">
                  <StyledIonicons name={data.icon as any} />
                  <Text
                    fontWeight={type === data.type ? 'bold' : 'normal'}
                    color={'$text'}
                    fontSize={15}>
                    {data.type}
                  </Text>
                </XGroup>
              </TouchableOpacity>
            );
          })}
        </XGroup>
      </ScrollView>
    </View>
  );
}
