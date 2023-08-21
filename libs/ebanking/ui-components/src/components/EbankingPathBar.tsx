import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

import { Icon } from '@myra-ui';
import { Breadcrumb } from '@myra-ui/components';

type Path = {
  link?: string;
  label: string;
};

export interface EbankingPathBarProps {
  paths: Path[];
  button?: React.ReactNode;
}

export const EbankingPathBar = ({ paths, button }: EbankingPathBarProps) => {
  const router = useRouter();

  return (
    <Box
      h="3.125rem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px"
      borderColor="border.layout"
      pl="s16"
    >
      <Box display="flex" alignItems="center" gap="s8">
        <Icon
          as={IoArrowBack}
          w="s16"
          cursor="pointer"
          color="gray.800"
          onClick={() => {
            router.back();
          }}
          h="s16"
        />

        {paths?.length && <Breadcrumb paths={paths} />}
      </Box>
      {button}
    </Box>
  );
};

export default EbankingPathBar;
