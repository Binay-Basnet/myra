import { Box } from '@coop/shared/ui';

interface IDetailPageTopCard {
  children: React.ReactNode;
}

export const DetailPageTopCard = ({ children }: IDetailPageTopCard) => {
  return (
    <Box
      zIndex="10"
      w="100%"
      top="110px"
      position="sticky"
      display="grid"
      // justifyContent="space-between"
      gridTemplateColumns="repeat(3,1fr)"
      p="s16"
      gap="s10"
      borderRadius="br2"
      bg="gray.0"
    >
      {children}
    </Box>
  );
};
