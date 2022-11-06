import { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoCopyOutline, IoQrCodeOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import {
  EbankingAccount,
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
  account: EbankingAccount;
}

export const AccountLargeCard = ({ isDefault, account }: IAccountCardProps) => {
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
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box
          display="flex"
          flexDir="column"
          cursor="pointer"
          onClick={() => {
            router.push(`/accounts/${account.id}?name=${account.name}`);
          }}
        >
          <TextFields variant="tableHeader" color="primary.500">
            {account.name}{' '}
          </TextFields>
          <Box display="flex" alignItems="center" gap="s8">
            <TextFields variant="bodyRegular" color="gray.500">
              {account.accountNumber}
            </TextFields>
            <Icon
              as={IoCopyOutline}
              _hover={{ color: 'gray.800' }}
              cursor="pointer"
              size="md"
              color="gray.400"
            />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap="s8">
          <Icon
            as={IoQrCodeOutline}
            color="gray.500"
            _hover={{ color: 'gray.800' }}
            cursor="pointer"
          />

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
                                queryClient.invalidateQueries('getAccountDetails');

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
      </Box>

      <Box display="flex" flexDir="column" gap="s8">
        <TextFields variant="formHelper" color="gray.700">
          {account?.accountSubType}
        </TextFields>
        <TextFields variant="formHelper" color="gray.500" textTransform="capitalize">
          {account?.accountType.toLowerCase()}
        </TextFields>
      </Box>

      <Divider />
      <Box display="flex" alignItems="center" justifyContent="space-between" mt="s8">
        <TextFields variant="pageHeader" color="gray.800">
          NRs. {Number(account.balance).toLocaleString('en-IN') ?? '-'}
        </TextFields>

        {account?.isDefault ? (
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

        {/* <TextFields variant="bodyRegular" color="gray.600"> */}
        {/*  Interest Rate: {account?.interestRate?.toFixed(2) ?? 'N/A'}% */}
        {/* </TextFields> */}
      </Box>
    </Box>
  );
};
