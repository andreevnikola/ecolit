import { Main, ScrollView, View } from 'tamagui';
import CategoryPicker from '~/components/CategoryPicker';
import { Container } from '~/tamagui.config';

export default function RecyclePage() {
  return (
    <View flex={1}>
      <CategoryPicker />
      <ScrollView flexGrow={1} backgroundColor={'$background'}>
        <Container padding={10} paddingTop={20}>
          <Title fontSize={40} marginBottom={20} color={'$textShade'}>
            Рециклирай
          </Title>
        </Container>
      </ScrollView>
    </View>
  );
}
