import { MdOutlineCircle } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

import { useDeleteCoaMutation } from '@coop/cbs/data-access';
import { asyncToast, Box, Button, Icon, Text } from '@myra-ui';

import NodeWrapper from './NodeWrapper';
import { CoaTree } from '../../types';

interface ITestProps {
  data: CoaTree;
}

const LeafNode = ({ data }: ITestProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteCOA } = useDeleteCoaMutation();

  return (
    <NodeWrapper>
      <Box display="flex" gap="s8" ml="-3px" alignItems="center" cursor="pointer">
        <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
        <Box display="flex" alignItems="center" gap="s8" role="group">
          <Text fontWeight="bold" fontSize="14px">
            {data.accountCode}
          </Text>
          <Text fontWeight="400" fontSize="14px">
            {data.name?.local}
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
                `/settings/general/charts-of-accounts/add-new-account?under=${data.accountCode}`
              )
            }
          >
            <Icon as={AddIcon} w="14px" h="14px" />
            Add Account
          </Button>
          {data?.category === 'USER_DEFINED' ? (
            <Button
              variant="link"
              py="0"
              lineHeight="0"
              shade="danger"
              gap="s8"
              display="none"
              _groupHover={{ display: 'flex' }}
              onClick={async () => {
                await asyncToast({
                  id: 'delete-coa',
                  msgs: {
                    loading: 'Deleting',
                    success: 'Deleted Successfully',
                  },
                  promise: deleteCOA({ id: data?.id as string }),
                  onSuccess: () => queryClient.invalidateQueries(['getCoaFullView']),
                });
              }}
            >
              <Icon as={DeleteIcon} w="14px" h="14px" />
              Delete Account
            </Button>
          ) : null}
        </Box>
      </Box>
    </NodeWrapper>
  );
};

export default LeafNode;
