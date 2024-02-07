import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsThreeDots } from 'react-icons/bs';
import { IoCopyOutline, IoQrCodeOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Modal,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Text,
} from '@myra-ui';

import {
  Adbs,
  EbankingAccount,
  updateDefaultAccountInCoop,
  useAppDispatch,
  useAppSelector,
  useSavingPdfExportMutation,
  useSetDefaultAccountMutation,
} from '@coop/ebanking/data-access';
import { FormEbankingDatePicker } from '@coop/shared/form';

import { AccountQRModal } from '../AccountQRModal';

interface IAccountCardProps {
  isDefault: boolean;
  account: EbankingAccount;
}

export const AccountLargeCard = ({ isDefault, account }: IAccountCardProps) => {
  const router = useRouter();
  const { onClose: modalOnClose, isOpen, onToggle } = useDisclosure();
  const coopUser = useAppSelector((state) => state.auth.cooperative.user);

  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(isDefault);
  const queryClient = useQueryClient();

  const { mutateAsync: setDefaultAccount } = useSetDefaultAccountMutation();

  const {
    isOpen: isStatementModalOpen,
    onClose: onStatementModalClose,
    onToggle: onStatementModalToggle,
  } = useDisclosure();

  useEffect(() => {
    setChecked(isDefault);
  }, [isDefault]);

  return (
    <>
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
            <Text variant="tableHeader" color="primary.500">
              {account.name}{' '}
            </Text>
            <Box display="flex" alignItems="center" gap="s8">
              <Text variant="bodyRegular" color="gray.500">
                {account.accountNumber}
              </Text>
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
              onClick={onToggle}
            />

            <AccountQRModal
              account={{
                name: account.name,
                accountNo: account.accountNumber,
                phoneNo: coopUser?.memberMobileNo ?? 'N/A',
              }}
              open={isOpen}
              onClose={modalOnClose}
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
                    <Box display="flex" flexDirection="column" gap="s4">
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
                                  const data =
                                    response?.eBanking?.account?.setDefaultAccount?.recordId;
                                  if (data) {
                                    queryClient.invalidateQueries(['getAccountList']);
                                    queryClient.invalidateQueries(['getAccountDetails']);

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

                      {account?.accountType === 'SAVING' && (
                        <Box
                          px="s16"
                          py="s8"
                          _hover={{ bg: 'gray.100' }}
                          cursor="pointer"
                          onClick={onStatementModalToggle}
                        >
                          <Text fontSize="r1" color="gray.900">
                            Download Statement
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </PopoverContent>
                </>
              )}
            </Popover>
          </Box>
        </Box>
        <Box display="flex" flexDir="column" gap="s8">
          <Text variant="formHelper" color="gray.700">
            {account?.accountSubType}
          </Text>
          <Text variant="formHelper" color="gray.500" textTransform="capitalize">
            {account?.accountType.toLowerCase()}
          </Text>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" justifyContent="space-between" mt="s8">
          <Text variant="pageHeader" color="gray.800">
            NRs. {Number(account.balance).toLocaleString('en-IN') ?? '-'}
          </Text>

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
              <Text variant="bodySmall" color="primary.500">
                Default Account
              </Text>
            </Box>
          ) : (
            <Box h="s24" />
          )}

          {/* <Text variant="bodyRegular" color="gray.600"> */}
          {/*  Interest Rate: {account?.interestRate?.toFixed(2) ?? 'N/A'}% */}
          {/* </Text> */}
        </Box>
      </Box>

      <DownloadCertificateModal
        isOpen={isStatementModalOpen}
        onClose={onStatementModalClose}
        accountId={account?.accountNumber}
      />
    </>
  );
};

interface IDownloadCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
}

export const DownloadCertificateModal = ({
  isOpen,
  onClose,
  accountId,
}: IDownloadCertificateModalProps) => {
  const methods = useForm();

  const user = useAppSelector((state) => state?.auth?.user);

  const { mutateAsync } = useSavingPdfExportMutation();

  const handleSave = async () => {
    const values = methods.getValues();
    asyncToast({
      id: 'ebanking-saving-account-statement-download',
      msgs: {
        loading: 'Fetching account statement',
        success: 'Account statement fetched',
      },
      promise: mutateAsync({
        data: {
          preferredDate: user?.preference?.date as Adbs,
          data: {
            accountId,
            period: {
              from: values?.['from'],
              to: values?.['to'],
            },
          },
        },
      }),
      onSuccess: (res) => {
        window.open(res?.eBanking?.account?.savingPDFExport?.url as string, '_blank');
      },
    });
  };

  const handleClose = () => {
    methods.reset({ date: '' });
    onClose();
  };

  return isOpen ? (
    <Modal
      title="Account Statement"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Generate"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
          <FormEbankingDatePicker name="from" id="fromDate" label="From" />
          <FormEbankingDatePicker name="to" id="toDate" label="To" />
        </Grid>
      </FormProvider>
    </Modal>
  ) : null;
};
