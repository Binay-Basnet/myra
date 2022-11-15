import { BsFillCaretRightFill } from 'react-icons/bs';
import { MdOutlineCircle } from 'react-icons/md';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';

import { Box, Button, Icon } from '@coop/shared/ui';

import { useAccordion } from './Accordion';
import { CoaTree } from '../../types';

interface ITreeHeaderProps {
  data: CoaTree;
}

const TreeHeader = ({ data }: ITreeHeaderProps) => {
  const { isOpen } = useAccordion();

  const router = useRouter();

  return (
    <Box display="flex" gap="s8" ml="-3px" alignItems="center">
      {data.children.length !== 0 ? (
        <Icon
          size="sm"
          as={BsFillCaretRightFill}
          color="gray.500"
          transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
          transition="0.4s all ease"
        />
      ) : (
        <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
      )}

      <Box display="flex" alignItems="center" gap="s8" role="group">
        <Text fontWeight="bold" fontSize="14px">
          {data.accountCode}
        </Text>
        <Text fontWeight="400" fontSize="14px" color="gray.800">
          {data?.name?.local}
        </Text>

        <Button
          variant="link"
          py="0"
          lineHeight="0"
          ml="s24"
          display={isOpen ? 'flex' : 'none'}
          gap="s8"
          _groupHover={{ display: 'flex' }}
          onClick={() =>
            router.push(
              `/settings/general/charts-of-accounts/add-new-account?under=${data.accountCode}`
            )
          }
        >
          <Icon as={AddIcon} w="14px" h="14px" />
          Add Account
        </Button>
      </Box>
    </Box>
  );
};

export default TreeHeader;
