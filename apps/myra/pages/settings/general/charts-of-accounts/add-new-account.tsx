import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import { FormControl } from '@chakra-ui/react';

import { SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { KymIndMemberInput } from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
import {
  AmountInput,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Select,
  SwitchTabs,
  Text,
  TextInput,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';


const AddNewAccount = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('Cash');

  const switchTabsFxn = (data: string) => {
    setSelectedTab(data);
  };

  console.log(selectedTab);

  const list = [
    { label: t['yes'], value: 'yes' },
    { label: t['no'], value: 'no' },
  ];

  const accountList = [
    { label: t['settingsCoaListCash'], value: 'cash' },
    { label: t['settingsCoaListBank'], value: 'bank' },
    { label: t['settingsCoaListJournal'], value: 'journal' },
  ];

  const methods = useForm<KymIndMemberInput>();
  return (
    <>
      <Container
        minW="container.xl"
        height="fit-content"
        p="0"
        pb="55px"
        background="white"
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
                <Button mr="20px" onClick={() => router.push('/members/list')}>
                  {t['settingsCoaAddSaveAccount']}
                </Button>
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
              <Grid
                gap={5}
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(3,1fr)"
              >
                <GridItem colSpan={2}>
                  <FormInput
                    type="text"
                    name="name"
                    label={t['settingsCoaAccountName']}
                    placeholder={t['settingsCoaEnterAccountName']}
                  />
                </GridItem>

                <GridItem>
                  <TextInput
                    id="accountName"
                    label={t['settingsCoaUnder']}
                    placeholder={t['settingsCoaStaffBonusFund']}
                  />
                </GridItem>

                <GridItem>
                  <FormControl>
                    <Select
                      id="type"
                      label={t['settingsCoaFormAccountType']}
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
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <TextInput
                      label={t['settingsCoaFormAccountCode']}
                      id="type"
                      placeholder={t['settingsCoaFormAccountCode']}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <Select
                      id="type"
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
                  </FormControl>
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
                <SwitchTabs options={accountList} />
              </Box>

              {selectedTab === 'cash' && (
                <Grid templateColumns="repeat(3,1fr)" gap={5}>
                  <GridItem>
                    <AmountInput label={t['settingsCoaOpeningBalance']} />
                  </GridItem>
                </Grid>
              )}

              {selectedTab === 'journal' && (
                <Box display="flex" justifyContent="flex-start">
                  <Box w="50%">
                    <Box display="flex" gap={5} justifyContent="space-around">
                      <FormControl>
                        <AmountInput label={t['settingsCoaOpeningBalance']} />
                      </FormControl>
                      <FormControl>
                        <TextInput
                          label={t['settingsCoaJournalCode']}
                          placeholder={t['settingsCoaAccoutNumber']}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              )}

              {selectedTab === 'bank' && (
                <Box display="flex" justifyContent="center" gap={5}>
                  <Box flex={1}>
                    <FormControl>
                      <Select
                        id="type"
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
                    </FormControl>

                    <Box
                      mt="3"
                      display="flex"
                      gap={5}
                      justifyContent="space-around"
                    >
                      <FormControl w="50%">
                        <AmountInput label={t['settingsCoaOpeningBalance']} />
                      </FormControl>
                      <FormControl w="50%">
                        <TextInput
                          label={t['settingsCoaBankGLCode']}
                          placeholder={t['settingsCoaGLCode']}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box w="30%">
                    <FormControl>
                      <TextInput
                        id="type"
                        label={t['settingsCoaBankAccountNumber']}
                        placeholder={t['settingsCoaBankAccountNumber']}
                      />
                    </FormControl>
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
                  <SwitchTabs options={list} />
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
                  <SwitchTabs options={list} />
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
                  <SwitchTabs options={list} />
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
                  <SwitchTabs options={list} />
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
                  <SwitchTabs options={list} />
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
                  <SwitchTabs options={list} />
                </Box>
              </Box>

              <Divider />
              <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                <Box>
                  <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                    {t['settingsCoaAllowFreeEntry']}
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs options={list} />
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
                  <SwitchTabs options={list} />
                </Box>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Container>

      {/* <Container minW="container.xl" height="fit-content" p="0">
        <Box
          bottom={0}
          bg="gray.0"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="s20"
          py="s16"
          boxShadow="0px -4px 60px rgba(52, 60, 70, 0.2)"
          
        >
          <Text
            alignSelf="center"
            color="gray.600"
            fontWeight="Regular"
            fontSize="r1"
          >
            Form details saved to draft 09:41 AM
          </Text>

          <Button onClick={() => router.push('/members/list')}>
            Save Account
          </Button>
        </Box>
      </Container> */}
    </>
  );
};

export default AddNewAccount;

AddNewAccount.getLayout = function getLayout(page) {
  return <SettingsLayout>{page}</SettingsLayout>;
};
