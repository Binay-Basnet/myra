import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

import { AddCoaAccountInput, CoaTypesOfAccount } from '@coop/cbs/data-access';
import { SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Form } from '@coop/myra/components';
import {
  FormAccountInput,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  Divider,
  FormFooter,
  Grid,
  GridItem,
  Icon,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const AddNewAccount = () => {
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

  const methods = useForm<AddCoaAccountInput>();

  const { watch } = methods;

  const accountType = watch('accountType');

  return (
    <>
      <Form<AddCoaAccountInput>
        methods={methods}
        onChange={() => {
          console.log("Hello")
        }}
        onSubmit={(data) => {
          console.log("Data")
        }}
      >
        <form>
          <Container
            minW="container.lg"
            height="fit-content"
            p="0"
            pb="55px"
            background="gray.0"
          >
            <FormProvider {...methods}>
              <form>
                <Box
                  height="60px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems={'center'}
                  px="5"
                  borderBottom="1px solid #E6E6E6"
                  position="sticky"
                  bg="white"
                  zIndex="10"
                  top="110px"
                >
                  <Text fontSize="r2" fontWeight="600">
                    {t['settingsCoaAddNewAccount']}
                  </Text>
                  <Box>
                    <CloseIcon
                      cursor="pointer"
                      onClick={() => router.back()}
                      color="#91979F"
                    />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  p="5"
                  background="white"
                  borderBottom="1px solid #E6E6E6"
                  borderTopRadius={5}
                >
                  <Grid gap={5} templateColumns="repeat(3,1fr)">
                    <GridItem colSpan={2}>
                      <FormInput
                        type="text"
                        name="name"
                        label={t['settingsCoaAccountName']}
                        placeholder={t['settingsCoaEnterAccountName']}
                      />
                    </GridItem>
                    <GridItem>
                      <FormSelect
                        id="accountName"
                        name="parentId"
                        label={t['settingsCoaUnder']}
                        placeholder={t['settingsCoaStaffBonusFund']}
                        options={[
                          {
                            label: 'Tree',
                            value: 'Tree',
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
                      <FormSelect
                        id="type"
                        name="classId"
                        label={t['settingsCoaFormAccountClass']}
                        options={[
                          {
                            label: 'Liabilities',
                            value: 'Liabilities',
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
                        name="code"
                        label={t['settingsCoaFormAccountCode']}
                        placeholder={t['settingsCoaFormAccountCode']}
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
                  </Grid>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  gap="s16"
                  p="5"
                  background="white"
                  borderBottom="1px solid #E6E6E6"
                  borderTopRadius={5}
                >
                  <Box mb="5px">
                    <Text fontSize="s2" mb="s4">
                      {t['settingsCoaFormTypeOfAccount']}
                    </Text>
                    <FormSwitchTab name="accountType" options={accountList} />
                  </Box>

                  {accountType === CoaTypesOfAccount.Cash && (
                    <Grid templateColumns="repeat(3,1fr)" gap={5}>
                      <GridItem>
                        <FormAccountInput
                          name="openingBalance"
                          label={t['settingsCoaOpeningBalance']}
                        />
                      </GridItem>
                    </Grid>
                  )}

                  {accountType === CoaTypesOfAccount.Journal && (
                    <Grid templateColumns="repeat(3,1fr)">
                      <GridItem colSpan={2}>
                        <Grid templateColumns="repeat(2,1fr)" gap={5}>
                          <GridItem>
                            <FormAccountInput
                              name="openingBalance"
                              label={t['settingsCoaOpeningBalance']}
                            />
                          </GridItem>
                          <GridItem>
                            <FormInput
                              name="journalCode"
                              label={t['settingsCoaJournalCode']}
                              placeholder={t['settingsCoaAccoutNumber']}
                            />
                          </GridItem>
                        </Grid>
                      </GridItem>
                    </Grid>
                  )}

                  {accountType === CoaTypesOfAccount.Bank && (
                    <Box display="flex" justifyContent="center" gap={5}>
                      <Box flex={1}>
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

                        <Box
                          mt="3"
                          display="flex"
                          gap={5}
                          justifyContent="space-around"
                        >
                          <Box w="50%">
                            <FormAccountInput
                              name="openingBalance"
                              label={t['settingsCoaOpeningBalance']}
                            />
                          </Box>
                          <Box w="50%">
                            <FormInput
                              name="bankGLCode"
                              label={t['settingsCoaBankGLCode']}
                              placeholder={t['settingsCoaGLCode']}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box w="30%">
                        <FormInput
                          id="type"
                          name="bankAccountNumber"
                          label={t['settingsCoaBankAccountNumber']}
                          placeholder={t['settingsCoaBankAccountNumber']}
                        />
                      </Box>
                    </Box>
                  )}
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
                      <FormSwitchTab name="ledgerAccount" options={list} />
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
                      <FormSwitchTab name="allicableAllBranch" options={list} />
                    </Box>
                  </Box>

                  <Divider />
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 2fr)"
                    gap={5}
                  >
                    <Box>
                      <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                        {t['settingsCoaBSAccount']}
                      </Text>
                    </Box>

                    <Box justifySelf="flex-end">
                      <FormSwitchTab
                        name="balanceSheetAccount"
                        options={list}
                      />
                    </Box>
                  </Box>

                  <Divider />
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 2fr)"
                    gap={5}
                  >
                    <Box>
                      <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                        {t['settingsCoaSummationAccount']}
                      </Text>
                    </Box>

                    <Box justifySelf="flex-end">
                      <FormSwitchTab name="summationAccount" options={list} />
                    </Box>
                  </Box>

                  <Divider />
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 2fr)"
                    gap={5}
                  >
                    <Box>
                      <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                        {t['settingsCoaIBTAC']}
                      </Text>
                    </Box>

                    <Box justifySelf="flex-end">
                      <FormSwitchTab name="ibtAccount" options={list} />
                    </Box>
                  </Box>

                  <Divider />
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 2fr)"
                    gap={5}
                  >
                    <Box>
                      <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                        {t['settingsCoaIntransitAC']}
                      </Text>
                    </Box>

                    <Box justifySelf="flex-end">
                      <FormSwitchTab name="inTransitAccount" options={list} />
                    </Box>
                  </Box>

                  <Divider />
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 2fr)"
                    gap={5}
                  >
                    <Box>
                      <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                        {t['settingsCoaPLAccount']}
                      </Text>
                    </Box>

                    <Box justifySelf="flex-end">
                      <FormSwitchTab
                        name="profitAndLossAccount"
                        options={list}
                      />
                    </Box>
                  </Box>

                  <Divider />
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 2fr)"
                    gap={5}
                  >
                    <Box display={'flex'} flexDirection="column" gap="0">
                      <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                        {t['settingsCoaAllowFreeEntry']}
                      </Text>
                      <Text color="Gray.700" fontWeight="regular" fontSize="s3">
                        {t['settingsCoaAllowFreeEntryHelper']}
                      </Text>
                    </Box>

                    <Box justifySelf="flex-end">
                      <FormSwitchTab name="allowFreeEntry" options={list} />
                    </Box>
                  </Box>

                  <Divider />
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(2, 2fr)"
                    gap={5}
                  >
                    <Box>
                      <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                        {t['settingsCoaAllowTransaction']}
                      </Text>
                    </Box>

                    <Box justifySelf="flex-end">
                      <FormSwitchTab name="allowTransaction" options={list} />
                    </Box>
                  </Box>
                </Box>
              </form>
            </FormProvider>
          </Container>
        </form>
      </Form>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                  <Text as="i" fontSize="r1">
                    09:41 AM
                  </Text>
                </Box>
              }
              draftButton={
                <Button type="submit" variant="ghost">
                  <Icon as={BiSave} color="primary.500" />
                  <Text
                    alignSelf="center"
                    color="primary.500"
                    fontWeight="Medium"
                    fontSize="s2"
                    ml="5px"
                  >
                    {t['saveDraft']}
                  </Text>
                </Button>
              }
              mainButtonLabel={t['next']}
              mainButtonHandler={() => router.push(`/members/translation`)}
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
