import { IoCheckmark, IoRepeat } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';

import {
  updateDefaultAccountInCoop,
  useAppDispatch,
  useAppSelector,
  useGetAccountListQuery,
  useSetDefaultAccountMutation,
} from '@coop/ebanking/data-access';
import { Box, Button, Icon, Popover, PopoverContent, PopoverTrigger, Text } from '@coop/shared/ui';

export const DefaultAccountPopover = () => {
  const defaultAccount = useAppSelector((state) => state?.auth?.cooperative?.user?.defaultAccount);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutateAsync: setDefaultAccount } = useSetDefaultAccountMutation({
    onSuccess: () => queryClient.invalidateQueries(['getAccountList']),
  });

  const { data: accountList } = useGetAccountListQuery(
    {
      transactionPagination: { first: 1, after: '' },
    },
    {
      refetchOnMount: true,
      staleTime: 0,
    }
  );

  const accountDetails = accountList?.eBanking?.account?.list?.accounts?.find(
    (account) => account?.id === defaultAccount
  );

  return (
    <Popover placement="bottom-end">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button variant="ghost" gap="s4">
              <Icon as={IoRepeat} color="primary.500" />
              <Text color="gray.800" fontSize="r1" fontWeight="500">
                {accountDetails?.name ?? 'Change Account'}
              </Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent _focus={{}} boxShadow="E0" borderRadius="br1">
            <Box
              display="flex"
              alignItems="center"
              borderBottom="1px"
              px="s12"
              borderBottomColor="border.layout"
              gap="s4"
              h="s60"
            >
              <Text color="gray.800" fontSize="r1" fontWeight="500">
                Accounts
              </Text>
              <Text color="primary.500" fontSize="r1" fontWeight="500">
                ({accountList?.eBanking?.account?.list?.accounts?.length ?? 0})
              </Text>
            </Box>
            <Box maxH="400px" overflowY="auto">
              {accountList?.eBanking?.account?.list?.accounts?.map((account) => (
                <Box
                  key={account?.id}
                  px="s12"
                  py="6px"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={async () => {
                    const response = await setDefaultAccount({ accountId: account?.id as string });
                    const data = response?.eBanking?.account?.setDefaultAccount?.recordId;
                    if (data) {
                      dispatch(updateDefaultAccountInCoop(data));
                    }
                    onClose();
                  }}
                  bg={defaultAccount === account?.id ? 'gray.100' : 'white'}
                  _hover={{ bg: 'gray.100' }}
                >
                  <Box display="flex" flexDir="column" gap="s4">
                    <Text color="primary.500" fontSize="r1" fontWeight="500">
                      {account?.name}
                    </Text>
                    <Text color="gray.600" fontSize="r1" fontWeight="500">
                      {account?.accountNumber}
                    </Text>
                  </Box>

                  {defaultAccount === account?.id && (
                    <Icon as={IoCheckmark} color="primary.500" gap="s4" />
                  )}
                </Box>
              ))}
            </Box>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
