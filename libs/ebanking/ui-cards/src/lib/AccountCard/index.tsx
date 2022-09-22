import { BsThreeDots } from 'react-icons/bs';
import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Divider,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Text,
  TextFields,
} from '@coop/shared/ui';

interface IAccountCardProps {
  isDefault: boolean;
  account: {
    id: string;
    name: string;
    accountNumber: string;
    amount: number;
    interestRate: number;
  };
}

export const AccountCard = ({ isDefault, account }: IAccountCardProps) => {
  const router = useRouter();
  return (
    <Box p="s16" display="flex" flexDir="column" gap="s8" bg="white" borderRadius="br2">
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        {isDefault ? (
          <Box
            h="s24"
            bg="primary.100"
            borderRadius="br2"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="s4"
          >
            <TextFields variant="bodySmall" color="primary.500">
              Default Account
            </TextFields>
          </Box>
        ) : (
          <Box h="s24" />
        )}
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button variant="unstyled" p="0" minW="0" h="auto">
              <Icon
                as={BsThreeDots}
                size="md"
                color="gray.400"
                _hover={{ color: 'gray.800' }}
                cursor="pointer"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            _focus={{}}
            borderRadius="br2"
            border="none"
            px="s16"
            py="s12"
            boxShadow="E0"
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Text fontSize="r1" color="gray.900">
                Set as Default Account
              </Text>
              <Switch defaultChecked={isDefault} />
            </Box>
          </PopoverContent>
        </Popover>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb="s8">
        <Box
          cursor="pointer"
          onClick={() => {
            router.push(`/accounts/${account.id}?name=${account.name}`);
          }}
        >
          <TextFields variant="tableHeader" color="gray.800">
            {account.name}{' '}
          </TextFields>
          <TextFields variant="bodyRegular" color="gray.700">
            {account.accountNumber}
          </TextFields>
        </Box>
        <Icon
          as={IoCopyOutline}
          _hover={{ color: 'gray.800' }}
          cursor="pointer"
          size="md"
          color="gray.400"
        />
      </Box>

      <Divider />
      <Box display="flex" alignItems="center" justifyContent="space-between" mt="s8">
        <TextFields variant="pageHeader" color="gray.800">
          NRs. {account.amount.toLocaleString('en-IN')}
        </TextFields>
        <TextFields variant="bodyRegular" color="gray.600">
          Interest Rate: {account.interestRate.toFixed(2)}%
        </TextFields>
      </Box>
    </Box>
  );
};
