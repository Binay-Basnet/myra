import { MdOutlineCircle } from 'react-icons/md';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Icon, Text } from '@coop/shared/ui';

import NodeWrapper from './NodeWrapper';
import { CoaTree } from '../../types';

interface ITestProps {
  data: CoaTree;
}
function LeafNode(props: ITestProps) {
  const router = useRouter();

  return (
    <NodeWrapper>
      <Box
        display="flex"
        gap="s8"
        ml="-3px"
        alignItems="center"
        cursor="pointer"
      >
        <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
        <Box display="flex" alignItems="center" gap="s8" role="group">
          <Text fontWeight="bold" fontSize="14px">
            {props.data.accountCode}
          </Text>
          <Text fontWeight="400" fontSize="14px">
            {props.data.name?.en}
          </Text>
          <Button
            variant="link"
            py="0"
            lineHeight="0"
            ml="s24"
            display="none"
            gap="s8"
            _groupHover={{ display: 'flex' }}
            onClick={() =>
              router.push(
                `/settings/general/charts-of-accounts/add-new-account?under=${props.data.id}`
              )
            }
          >
            <Icon as={AddIcon} w="14px" h="14px" />
            Add Account
          </Button>
        </Box>
      </Box>
    </NodeWrapper>
  );
}
export default LeafNode;
