import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

import {
  AddCoaAccountInput,
  CoaTypesOfAccount,
  useAddNewAccountInCoaMutation,
  useGetCoaFullViewQuery,
} from '@coop/cbs/data-access';
import { SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { FormAccountInput, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Button,
  Container,
  Divider,
  FormFooter,
  Grid,
  GridItem,
  Icon,
  Text,
} from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

type FullViewData = {
  id: string;
  name: Record<'en' | 'local' | 'np', string>;
  under?: string;
  accountType: CoaTypesOfAccount;
  accountClass: string;
  accountCode: string;
};

const getNewAccountCode = (coaFullViewData: FullViewData[], under: string) => {
  const foundAccount = coaFullViewData?.find((d) => d.under === under);

  if (!foundAccount) {
    return `${under}.1`;
  }

  const childAccount =
    coaFullViewData
      .filter((d) => d.under === foundAccount.under)
      .sort((a, b) =>
        Number(
          a?.accountCode?.localeCompare(b?.accountCode as string, undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        )
      ) ?? [];

  const accountCode = childAccount[childAccount.length - 1]?.accountCode;
  const accountCodeArray = accountCode.split('.');
  const lastCode = accountCodeArray.pop();

  return `${accountCodeArray.join('.')}.${Number(lastCode) + 1}`;
};

const AddNewAccount = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();

  const list = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  const accountList = [
    { label: t['settingsCoaListCash'], value: CoaTypesOfAccount.Cash },
    { label: t['settingsCoaListJournal'], value: CoaTypesOfAccount.Journal },
    { label: t['settingsCoaListBank'], value: CoaTypesOfAccount.Bank },
  ];

  const methods = useForm<NonNullable<AddCoaAccountInput>>({
    defaultValues: {
      under: (router.query.under as string) ?? null,
      accountType: CoaTypesOfAccount.Cash,
      isAllowFreeEntry: false,
      isLedgerAccount: false,
      isAllowTransaction: false,
      isProfitAndLossAccount: false,
      isSummationAccount: false,
      isBalanceSheetAccount: false,
      isApplicableToAllBranches: false,
      isIbtAccount: false,
      openingBalance: null,
      isInTransitAccount: false,
    },
  });

  const { watch } = methods;

  const accountType = watch('accountType');

  const { mutateAsync: addNewAccount } = useAddNewAccountInCoaMutation();
  const { data: coaFullView } = useGetCoaFullViewQuery();

  const underAccounts = coaFullView?.settings?.chartsOfAccount.fullView.data?.map((d) => ({
    label: d.name.en,
    value: d.accountCode,
  }));

  const coaFullViewData = coaFullView?.settings?.chartsOfAccount.fullView.data;

  const newCode = getNewAccountCode(coaFullViewData, router.query['under'] as string);

  useEffect(() => {
    methods.reset({
      ...methods.getValues(),
      // DID THIS BECAUSE VAlUE WAS NOT CLEARING ON RESET
      openingBalance: '' as unknown as number,
      journalCode: undefined,
      bankAccountNumber: undefined,
      bankGLCode: undefined,
      bankId: undefined,
      accountCode: newCode,
      accountClass: coaFullView?.settings?.chartsOfAccount.fullView.data.find(
        (d) => d.accountCode === router.query['under']
      )?.accountClass,
    });
  }, [accountType, newCode]);

  return (
    <>
      {/* <Form<AddCoaAccountInput> methods={methods}> */}
      <form>
        <Container minW="container.lg" height="fit-content" p="0" pb="55px" background="gray.0">
          <FormProvider {...methods}>
            <form>
              <Box
                height="60px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px="5"
                borderBottom="1px solid"
                borderColor="border.layout"
                position="sticky"
                bg="white"
                zIndex="10"
                top="110px"
              >
                <Text fontSize="r2" fontWeight="600">
                  {t['settingsCoaAddNewAccount']}
                </Text>
                <Box>
                  <CloseIcon cursor="pointer" onClick={() => router.back()} color="#91979F" />
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                p="5"
                background="white"
                borderBottom="1px solid"
                borderColor="border.layout"
                borderTopRadius={5}
              >
                <Grid gap={5} templateColumns="repeat(3,1fr)">
                  <GridItem colSpan={2}>
                    <FormInput type="text" name="name" label={t['settingsCoaAccountName']} />
                  </GridItem>
                  <GridItem>
                    <FormSelect
                      id="accountName"
                      name="under"
                      isDisabled={!!router.query['under']}
                      label={t['settingsCoaUnder']}
                      options={underAccounts}
                    />
                  </GridItem>

                  <GridItem>
                    <FormSelect
                      id="type"
                      name="accountClass"
                      isDisabled={!!router.query['under']}
                      label={t['settingsCoaFormAccountClass']}
                      options={[
                        {
                          label: 'Equity and Liabilities',
                          value: 'EQUITY_AND_LIABILITIES',
                        },
                        {
                          label: 'Assets',
                          value: 'ASSETS',
                        },
                        {
                          label: 'Expenditure',
                          value: 'EXPENDITURE',
                        },
                        {
                          label: 'Income',
                          value: 'INCOME',
                        },
                      ]}
                    />
                  </GridItem>
                  <GridItem>
                    <FormInput
                      isDisabled={!!router.query['under']}
                      id="type"
                      name="accountCode"
                      label={t['settingsCoaFormAccountCode']}
                    />
                  </GridItem>
                  <GridItem>
                    <FormSelect
                      id="type"
                      name="currency"
                      label={t['settingsCoaCurrency']}
                      options={[
                        {
                          label: 'NPR',
                          value: 'NPR',
                        },
                      ]}
                    />
                  </GridItem>
                </Grid>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                gap="s16"
                p="5"
                background="white"
                borderBottom="1px solid"
                borderColor="border.layout"
                borderTopRadius={5}
              >
                <Box mb="5px">
                  <Text fontSize="s2" mb="s4">
                    {t['settingsCoaFormTypeOfAccount']}
                  </Text>
                  <FormSwitchTab name="accountType" options={accountList} />
                </Box>

                <Grid templateColumns="repeat(3,1fr)" gap="s16">
                  {accountType === CoaTypesOfAccount.Bank && (
                    <>
                      <GridItem colSpan={2}>
                        <FormSelect
                          id="type"
                          name="bankId"
                          label={t['settingsCoaBank']}
                          options={[
                            {
                              label: 'Credit Terms',
                              value: 'Credit Terms',
                            },
                            {
                              label: 'Option 2',
                              value: 'option-2',
                            },
                            {
                              label: 'Option 3',
                              value: 'option-3',
                            },
                          ]}
                        />
                      </GridItem>
                      <GridItem>
                        <FormInput
                          id="type"
                          name="bankAccountNumber"
                          label={t['settingsCoaBankAccountNumber']}
                        />
                      </GridItem>
                    </>
                  )}

                  <GridItem>
                    <FormAccountInput
                      name="openingBalance"
                      label={t['settingsCoaOpeningBalance']}
                    />
                  </GridItem>

                  {accountType === CoaTypesOfAccount.Journal && (
                    <GridItem>
                      <FormInput name="journalCode" label={t['settingsCoaJournalCode']} />
                    </GridItem>
                  )}

                  {accountType === CoaTypesOfAccount.Bank && (
                    <GridItem>
                      <FormInput name="bankGLCode" label={t['settingsCoaBankGLCode']} />
                    </GridItem>
                  )}
                </Grid>
              </Box>

              <Box
                p={5}
                display="flex"
                flexDirection="column"
                h="100%"
                alignContent="space-between"
                gap={4}
              >
                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)">
                  <Box>
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaLedgerAccount']}
                    </Text>
                    <Text color="Gray.700" fontWeight="regular" fontSize="s3">
                      {t['settingsCoaYouCan']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isLedgerAccount" options={list} />
                  </Box>
                </Box>

                <Divider />

                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)">
                  <Box>
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaApplicable']}
                    </Text>
                    <Text color="Gray.700" fontWeight="regular" fontSize="s3">
                      {t['settingsCoaApplicableHelper']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isApplicableToAllBranches" options={list} />
                  </Box>
                </Box>

                <Divider />
                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                  <Box>
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaBSAccount']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isBalanceSheetAccount" options={list} />
                  </Box>
                </Box>

                <Divider />
                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                  <Box>
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaSummationAccount']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isSummationAccount" options={list} />
                  </Box>
                </Box>

                <Divider />
                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                  <Box>
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaIBTAC']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isIbtAccount" options={list} />
                  </Box>
                </Box>

                <Divider />
                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                  <Box>
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaIntransitAC']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isInTransitAccount" options={list} />
                  </Box>
                </Box>

                <Divider />
                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                  <Box>
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaPLAccount']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isProfitAndLossAccount" options={list} />
                  </Box>
                </Box>

                <Divider />
                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                  <Box display="flex" flexDirection="column" gap="0">
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaAllowFreeEntry']}
                    </Text>
                    <Text color="Gray.700" fontWeight="regular" fontSize="s3">
                      {t['settingsCoaAllowFreeEntryHelper']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isAllowFreeEntry" options={list} />
                  </Box>
                </Box>

                <Divider />
                <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                  <Box>
                    <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                      {t['settingsCoaAllowTransaction']}
                    </Text>
                  </Box>

                  <Box justifySelf="flex-end">
                    <FormSwitchTab name="isAllowTransaction" options={list} />
                  </Box>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Container>
      </form>
      {/* </Form> */}
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              draftButton={
                <Button type="submit" variant="ghost" shade="neutral">
                  <Icon as={BiSave} />
                  <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                    {t['saveDraft']}
                  </Text>
                </Button>
              }
              mainButtonLabel={t['next']}
              mainButtonHandler={methods.handleSubmit(async (data) => {
                await asyncToast({
                  id: 'add-new-account',
                  promise: addNewAccount({
                    data,
                  }),
                  msgs: {
                    loading: 'Adding New Account',
                    success: 'Added New Account',
                  },
                  onSuccess: () => {
                    queryClient.invalidateQueries(['getCoaFullView']);
                    router.push('/settings/general/charts-of-accounts');
                  },
                });
              })}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddNewAccount;

AddNewAccount.getLayout = function getLayout(page) {
  return <SettingsLayout>{page}</SettingsLayout>;
};
