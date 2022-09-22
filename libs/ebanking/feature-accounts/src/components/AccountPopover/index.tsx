import { IoCheckmark, IoRepeat } from 'react-icons/io5';

import { useGetAccountListQuery } from '@coop/ebanking/data-access';
import { Box, Button, Icon, Popover, PopoverContent, PopoverTrigger, Text } from '@coop/shared/ui';

export const AccountPopover = () => {
  const { data: accountList } = useGetAccountListQuery();

  return (
    <Popover placement="bottom-end">
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
          h="s60"
        >
          <Text color="gray.800" fontSize="r1" fontWeight="500">
            Accounts
          </Text>
          <Text color="primary.500" fontSize="r1" fontWeight="500">
            (7)
          </Text>
        </Box>
        <Box>
          {accountList?.eBanking?.account?.list?.edges?.map((account) => (
            <Box
              key={account.node.id}
              px="s12"
              py="6px"
              cursor="pointer"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bg={account.node.isDefault ? 'gray.100' : 'white'}
              _hover={{ bg: 'gray.100' }}
            >
              <Box display="flex" flexDir="column" gap="s4">
                <Text color="primary.500" fontSize="r1" fontWeight="500">
                  {account.node.name}
                </Text>
                <Text color="gray.600" fontSize="r1" fontWeight="500">
                  {account.node.accountNumber}
                </Text>
              </Box>

              {account.node.isDefault && <Icon as={IoCheckmark} color="primary.500" gap="s4" />}
            </Box>
          ))}
        </Box>
      </PopoverContent>
    </Popover>
  );
};
