import { useState } from 'react';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { MdOutlineCircle } from 'react-icons/md';
import { Text } from '@chakra-ui/react';

import { Box, Icon } from '@myra-ui';

import { CoaCategory } from '@coop/cbs/data-access';

import { useAccordion } from './Accordion';
import { AddGroup, ConfigureGroup } from './LeafNode';
import { CoaTree } from '../../types';

interface ITreeHeaderProps {
  data: CoaTree;
}

const TreeHeader = ({ data }: ITreeHeaderProps) => {
  const { isOpen } = useAccordion();
  const [clickedAccount, setClickedAccount] = useState<CoaTree | null>(null);

  return (
    <Box
      display="flex"
      gap="s8"
      ml="-3px"
      alignItems="center"
      _hover={{
        px: 's4',
        bg: 'highlight.500',
      }}
    >
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

      <Box
        display="flex"
        alignItems="center"
        gap="s8"
        role="group"
        py="s4"
        w="100%"
        color={data?.category === CoaCategory.UserDefined ? 'info.500' : 'inherit'}
      >
        <Text fontWeight="bold" fontSize="14px">
          {data.accountCode}
        </Text>
        <Text fontWeight="400" fontSize="14px">
          {data?.name?.local}
        </Text>

        <AddGroup
          data={data}
          clickedAccount={clickedAccount}
          setClickedAccount={setClickedAccount}
        />

        <ConfigureGroup
          data={data}
          clickedAccount={clickedAccount}
          setClickedAccount={setClickedAccount}
        />
      </Box>
    </Box>
  );
};

export default TreeHeader;
