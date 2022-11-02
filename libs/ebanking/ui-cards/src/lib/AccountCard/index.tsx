import { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoCopyOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import {
  updateDefaultAccountInCoop,
  useAppDispatch,
  useSetDefaultAccountMutation,
} from '@coop/ebanking/data-access';
import {
  asyncToast,
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
    id: string | undefined;
    name: string | undefined;
    accountNumber: string | undefined;
    balance: string | undefined;
    interestRate: number | undefined;
  };
}

export const AccountCard = ({ isDefault, account }: IAccountCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(isDefault);
  const queryClient = useQueryClient();

  const { mutateAsync: setDefaultAccount } = useSetDefaultAccountMutation();

  useEffect(() => {
    setChecked(isDefault);
  }, [isDefault]);

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
          {({ onClose }) => (
            <>
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
                  <Switch
                    onChange={async (value) => {
                      if (account.id && value.target.checked) {
                        setChecked(value.target.checked);

                        await asyncToast({
                          id: 'default-account-set',
                          msgs: {
                            loading: 'Setting Default Account',
                            success: 'Default Account Changed',
                          },
                          promise: setDefaultAccount({ accountId: account?.id }),
                          onSuccess: (response) => {
                            const data = response?.eBanking?.account?.setDefaultAccount?.recordId;
                            if (data) {
                              queryClient.invalidateQueries('getAccountList');
                              dispatch(updateDefaultAccountInCoop(data));
                              onClose();
                            }
                          },
                        });
                      }
                    }}
                    isChecked={checked}
                  />
                </Box>
              </PopoverContent>
            </>
          )}
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
          NRs. {Number(account.balance).toLocaleString('en-IN') ?? '-'}
        </TextFields>
        <TextFields variant="bodyRegular" color="gray.600">
          Interest Rate: {account?.interestRate?.toFixed(2) ?? 'N/A'}%
        </TextFields>
      </Box>
    </Box>
  );
};
