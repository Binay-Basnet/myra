import React from 'react';
import { IoCheckmark, IoRepeat } from 'react-icons/io5';

import { useGetAccountListQuery } from '@coop/ebanking/data-access';
import { Box, Button, Icon, Popover, PopoverContent, PopoverTrigger, Text } from '@myra-ui';
import { amountConverter } from '@coop/shared/utils';

type Account = {
  id: string;
  accountNumber: string;
  name: string;
  balance: string;
};

export const AccountPopover = ({
  id,
  selectedAccount,
  setSelectedAccount,
}: {
  id?: string;
  selectedAccount?: Account | null;
  setSelectedAccount?: React.Dispatch<React.SetStateAction<Account | null>>;
}) => {
  const { data: accountList } = useGetAccountListQuery(
    {
      transactionPagination: { first: 1, after: '' },
    },
    {
      refetchOnMount: true,
      staleTime: 0,
      onSuccess: (response) => {
        if (!selectedAccount) {
          const accounts = response?.eBanking?.account?.list?.accounts;

          if (id) {
            const foundAccount = accounts?.find((account) => account?.id === id);

            setSelectedAccount &&
              setSelectedAccount({
                id: foundAccount?.id as string,
                name: foundAccount?.name as string,
                accountNumber: foundAccount?.accountNumber as string,
                balance: foundAccount?.balance
                  ? (amountConverter(foundAccount?.balance) as string)
                  : '-',
              });
          }
          setSelectedAccount &&
            setSelectedAccount({
              id: accounts?.[0]?.id as string,
              name: accounts?.[0]?.name as string,
              accountNumber: accounts?.[0]?.accountNumber as string,
              balance: accounts?.[0]?.balance
                ? (amountConverter(accounts?.[0]?.balance) as string)
                : '-',
            });
        }
      },
    }
  );

  return (
    <Popover placement="bottom-end">
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button variant="ghost" gap="s4">
              <Icon as={IoRepeat} color="primary.500" />
              Switch Account
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
              h="60px"
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
                  onClick={() => {
                    setSelectedAccount &&
                      setSelectedAccount({
                        id: account?.id as string,
                        balance: account?.balance
                          ? (amountConverter(account?.balance) as string)
                          : '-',
                        name: account?.name as string,
                        accountNumber: account?.accountNumber as string,
                      });
                    onClose();
                  }}
                  bg={selectedAccount?.id === account?.id ? 'gray.100' : 'white'}
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

                  {selectedAccount?.id === account?.id && (
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
