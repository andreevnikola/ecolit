import { Text } from 'tamagui';
import { XGroup, Image } from 'tamagui';
import useUser from '~/hooks/useUser';

export default function EcoPointsDisplay() {
  const { user, isLoading } = useUser();

  if (isLoading) return <></>;

  return (
    <XGroup
      gap={3}
      padding={6}
      backgroundColor={'rgba(91, 126, 78, 0.5)'}
      borderRadius={5}
      marginTop={-3}
      alignItems="center">
      <Text color={'$text'} fontSize={14} fontWeight={'bold'}>
        {user?.points}
      </Text>
      <Image src={require('~/assets/coin.png')} width={15} height={15} />
    </XGroup>
  );
}
