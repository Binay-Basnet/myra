import React, { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { FormControl } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {
  AmountInput,
  Box,
  Button,
  Divider,
  Select,
  SwitchTabs,
  Text,
  TextInput,
  GridItem,
  Grid,
} from '@saccos/myra/ui';
import { useRouter } from 'next/router';

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';
import { FormInput } from '@saccos/myra/components';

const list = ['Yes', 'No'];
const accountList = ['Cash', 'Journal', 'Bank'];

const AddNewAccount = () => {
  const { control } = useForm();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string | null>('Cash');

  const switchTabsFxn = (data: string) => {
    setSelectedTab(data);
  };

  return (
    <Box width="full" borderBottom="1px" borderBottomColor="border.layout">
      <Box
        height="60px"
        display="flex"
        justifyContent="space-between"
        alignItems={'center'}
        px="5"
        background="white"
        borderBottom="1px solid #E6E6E6"
        borderTopRadius={5}
      >
        <Text fontSize="r2" fontWeight="600">
          Add New Account
        </Text>
        <Box>
          <Button mr="5">Save Account </Button>
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
              control={control}
              type="text"
              name="name"
              label="Account Name"
              placeholder="Enter Account Name"
            />
          </GridItem>

          <GridItem>
            <TextInput
              id="accountName"
              label="Account Name"
              placeholder="Account Name"
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
        p="5"
        background="white"
        borderBottom="1px solid #E6E6E6"
        borderTopRadius={5}
      >
        <Box mb="5px">
          <Text mb="5px">Type of Account</Text>
          <SwitchTabs onclick={switchTabsFxn} list={accountList} />
        </Box>

        {selectedTab === 'Cash' && (
          <Box display="flex" justifyContent="flex-start">
            <FormControl w="35%">
              <AmountInput label="Opening Balance" />
            </FormControl>
          </Box>
        )}

        {selectedTab === 'Journal' && (
          <Box display="flex" justifyContent="flex-start">
            <Box w="70%">
              <Box display="flex" gap={5} justifyContent="space-around">
                <FormControl>
                  <AmountInput label="Opening Balance" />
                </FormControl>
                <FormControl>
                  <TextInput label="Journal Code" placeholder="Accout Number" />
                </FormControl>
              </Box>
            </Box>
          </Box>
        )}

        {selectedTab === 'Bank' && (
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

              <Box mt="3" display="flex" gap={5} justifyContent="space-around">
                <FormControl w="50%">
                  <AmountInput label="Opening Balance" />
                </FormControl>
                <FormControl w="50%">
                  <TextInput label=" Bank GL Code" />
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
              You can perform transaction in this account. However, you cannot
              create any more accounts under this heading
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
    </Box>
  );
};

export default AddNewAccount;

AddNewAccount.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
