import { CloseIcon } from '@chakra-ui/icons';
import { FormControl, FormLabel } from '@chakra-ui/react';
import {
  BaseSelect,
  Box,
  Button,
  Container,
  Divider,
  Input,
  Text,
} from '@saccos/myra/ui';
import React from 'react';

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';

const AddNewAccount = () => {
  return (
    <Container minW="container.md" height="fit-content" mt="5" p="0">
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
          <CloseIcon color="#91979F" />
        </Box>
      </Box>
      <Box
        background="white"
        p={5}
        display="flex"
        flexDirection="column"
        gap={6}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <FormControl flex={1}>
            <FormLabel color="gray.700" fontSize="s3" htmlFor="accountName">
              Account Name
            </FormLabel>
            <Input id="accountName" placeholder="Account Name" />
          </FormControl>
          <FormControl w="30%" ml="s16">
            <FormLabel color="gray.700" fontSize="s3" htmlFor="type">
              Under
            </FormLabel>
            <BaseSelect
              id="type"
              defaultValue="Staff Bonus Fund"
              options={[
                {
                  label: 'Staff Bonus Fund',
                  value: 'Staff Bonus Fund',
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
              variant="outline"
            />
          </FormControl>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
          <FormControl>
            <FormLabel color="gray.700" fontSize="s3" htmlFor="type">
              Account Type
            </FormLabel>
            <BaseSelect
              id="type"
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
              variant="outline"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.700" fontSize="s3" htmlFor="type">
              Account Code
            </FormLabel>
            <Input id="type" placeholder="Account Code" />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.700" fontSize="s3" htmlFor="type">
              Currency
            </FormLabel>
            <BaseSelect
              id="type"
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
              variant="outline"
            />
          </FormControl>
        </Box>

        <Divider />

        <Text>Types of Account</Text>
        <Box display="flex" justifyContent="center" gap={5}>
          <Box flex={1}>
            <FormControl>
              <FormLabel color="gray.700" fontSize="s3" htmlFor="type">
                Bank
              </FormLabel>
              <BaseSelect
                id="type"
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
                variant="outline"
              />
            </FormControl>

            <Box mt="3" display="flex" gap={5} justifyContent="space-around">
              <FormControl w="50%">
                <FormLabel color="gray.700" fontSize="s3" htmlFor="type">
                  Opening Balance
                </FormLabel>
                <Input textAlign="right" id="type" placeholder="0.00" />
              </FormControl>
              <FormControl w="50%">
                <FormLabel color="gray.700" fontSize="s3" htmlFor="type">
                  Bank GL Code
                </FormLabel>
                <Input id="type" placeholder="GL Code" />
              </FormControl>
            </Box>
          </Box>
          <Box w="30%">
            <FormControl>
              <FormLabel color="gray.700" fontSize="s3" htmlFor="type">
                Bank Account Number
              </FormLabel>
              <Input id="type" placeholder="Bank Account Number" />
            </FormControl>
          </Box>
        </Box>

        <Divider />

        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Box>
            <Text color="Gray.700" fontWeight="medium" fontSize="s3">
              Ledger Account
            </Text>
            <Text color="Gray.700" fontWeight="regular" fontSize="s3">
              You can perform transaction in this account. However, you cannot
              create any more accounts under this heading
            </Text>
          </Box>

          <Box justifySelf="flex-end">Switch</Box>
        </Box>

        <Divider />
        <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
          <Box>
            <Text color="Gray.700" fontWeight="medium" fontSize="s3">
              B/S Account
            </Text>
          </Box>

          <Box justifySelf="flex-end">Switch</Box>
        </Box>

        <Divider />
        <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
          <Box>
            <Text color="Gray.700" fontWeight="medium" fontSize="s3">
              Summation Account
            </Text>
          </Box>

          <Box justifySelf="flex-end">Switch</Box>
        </Box>

        <Divider />
        <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
          <Box>
            <Text color="Gray.700" fontWeight="medium" fontSize="s3">
              IBT A/C
            </Text>
          </Box>

          <Box justifySelf="flex-end">Switch</Box>
        </Box>

        <Divider />
        <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
          <Box>
            <Text color="Gray.700" fontWeight="medium" fontSize="s3">
              Intransit A/C
            </Text>
          </Box>

          <Box justifySelf="flex-end">Switch</Box>
        </Box>

        <Divider />
        <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
          <Box>
            <Text color="Gray.700" fontWeight="medium" fontSize="s3">
              P/L Account
            </Text>
          </Box>

          <Box justifySelf="flex-end">Switch</Box>
        </Box>

        <Divider />
        <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
          <Box>
            <Text color="Gray.700" fontWeight="medium" fontSize="s3">
              Allow Free Entry
            </Text>
          </Box>

          <Box justifySelf="flex-end">Switch</Box>
        </Box>

        <Divider />
        <Box display="grid" gridTemplateColumns="repeat(2, 2fr)" gap={5}>
          <Box>
            <Text color="Gray.700" fontWeight="medium" fontSize="s3">
              Allow Transaction
            </Text>
          </Box>

          <Box justifySelf="flex-end">Switch</Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AddNewAccount;

AddNewAccount.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
