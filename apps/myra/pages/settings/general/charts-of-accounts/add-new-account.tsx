import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CloseIcon } from '@chakra-ui/icons';
import { FormControl } from '@chakra-ui/react';
import { FormInput } from '@coop/myra/components';
import { KymIndMemberInput } from '@coop/shared/data-access';
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
import { useRouter } from 'next/router';

import SettingsFormLayout from '../../../../components/SettingsLayout/SettingsFormLayout';

const list = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const accountList = [
  { label: 'Cash', value: 'cash' },
  { label: 'Bank', value: 'bank' },
  { label: 'Journal', value: 'journal' },
];

const AddNewAccount = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string | null>('Cash');

  const switchTabsFxn = (data: string) => {
    setSelectedTab(data);
  };

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
            >
              <Text fontSize="r2" fontWeight="600">
                Add New Account
              </Text>
              <Box>
                <Button mr="20px" onClick={() => router.push('/members/list')}>
                  Save Account
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
                    label="Account Name"
                    placeholder="Enter Account Name"
                  />
                </GridItem>

                <GridItem>
                  <TextInput
                    id="accountName"
                    label="Under"
                    placeholder="Staff Bonus Fund"
                  />
                </GridItem>

                <GridItem>
                  <FormControl>
                    <Select
                      id="type"
                      label="Account Type"
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
                      label="Account Code"
                      id="type"
                      placeholder="Account Code"
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <Select
                      id="type"
                      label="Currency"
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
                  Type of Account
                </Text>
                <SwitchTabs onClick={switchTabsFxn} list={accountList} />
              </Box>

              {selectedTab === 'cash' && (
                <Grid templateColumns="repeat(3,1fr)" gap={5}>
                  <GridItem>
                    <AmountInput label="Opening Balance" />
                  </GridItem>
                </Grid>
              )}

              {selectedTab === 'journal' && (
                <Box display="flex" justifyContent="flex-start">
                  <Box w="50%">
                    <Box display="flex" gap={5} justifyContent="space-around">
                      <FormControl>
                        <AmountInput label="Opening Balance" />
                      </FormControl>
                      <FormControl>
                        <TextInput
                          label="Journal Code"
                          placeholder="Accout Number"
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
                        label="Bank"
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
                        <AmountInput label="Opening Balance" />
                      </FormControl>
                      <FormControl w="50%">
                        <TextInput
                          label=" Bank GL Code"
                          placeholder="GL Code"
                        />
                      </FormControl>
                    </Box>
                  </Box>
                  <Box w="30%">
                    <FormControl>
                      <TextInput
                        id="type"
                        label="Bank Account Number"
                        placeholder="Bank Account Number"
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
                    Ledger Account
                  </Text>
                  <Text color="Gray.700" fontWeight="regular" fontSize="s3">
                    You can perform transaction in this account. However, you
                    cannot create any more accounts under this heading
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs list={list} />
                </Box>
              </Box>

              <Divider />
              <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                <Box>
                  <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                    B/S Account
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs list={list} />
                </Box>
              </Box>

              <Divider />
              <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                <Box>
                  <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                    Summation Account
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs list={list} />
                </Box>
              </Box>

              <Divider />
              <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                <Box>
                  <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                    IBT A/C
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs list={list} />
                </Box>
              </Box>

              <Divider />
              <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                <Box>
                  <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                    Intransit A/C
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs list={list} />
                </Box>
              </Box>

              <Divider />
              <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                <Box>
                  <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                    P/L Account
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs list={list} />
                </Box>
              </Box>

              <Divider />
              <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                <Box>
                  <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                    Allow Free Entry
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs list={list} />
                </Box>
              </Box>

              <Divider />
              <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
                <Box>
                  <Text color="Gray.700" fontWeight="medium" fontSize="s3">
                    Allow Transaction
                  </Text>
                </Box>

                <Box justifySelf="flex-end">
                  <SwitchTabs list={list} />
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
          borderTopRadius="br3"
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
  return <SettingsFormLayout>{page}</SettingsFormLayout>;
};
