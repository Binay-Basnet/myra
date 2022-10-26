import { useRouter } from 'next/router';

import { Box, Text } from '@coop/shared/ui';

interface IProductSelectCardProps {
  label: string;
  link: string;
}

export const ProductSelectCard = ({ label, link }: IProductSelectCardProps) => {
  const router = useRouter();

  return (
    <Box
      cursor="pointer"
      p="s16"
      borderRadius="br2"
      border="1px"
      borderColor="border.layout"
      _hover={{ bg: 'background.500' }}
      onClick={() => router.push(link)}
    >
      <Text fontSize="r1" color="gray.800" fontWeight="600">
        {label}
      </Text>
    </Box>
  );
};
