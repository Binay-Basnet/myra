import React from 'react';
import { useForm } from 'react-hook-form';
import { CloseIcon } from '@chakra-ui/icons';
import { Form } from '@saccos/myra/components';
import { IPurchaseFormValues } from '@saccos/myra/types';
import {
  Avatar,
  BaseSelect,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  GridItem,
  Input,
  MainLayout,
  Navbar,
  RadioGroup,
  TabMenu,
  Text,
} from '@saccos/myra/ui';

const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const SharePurchase = () => {
  const methods = useForm<IPurchaseFormValues>();
  const { getValues } = methods;

  return (
    <Form<IPurchaseFormValues>
      methods={methods}
      onChange={() => {
        console.log('getValues', getValues());
      }}
      onSubmit={(data) => {
        console.log('data', data);
      }}
    >
      <Box
        position="fixed"
        width="100%"
        top={0}
        zIndex={2}
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Header />
      </Box>
      <Container
        minW="container.xl"
        height="fit-content"
        mt="130"
        p="0"
        pb="55px"
      >
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
            New Share Return
          </Text>
          <CloseIcon />
        </Box>
        <Box display="flex" width="100%">
          <Box w="100%">
            <Box background="white" p={5}>
              <Text fontSize="14px" mb="8px">
                Member ID
              </Text>
              <Input w="25%" placeholder="Enter Member ID" />

              <Divider mt="4" mb="4" />

              <Text fontSize="16px" fontWeight="bold" mb="8px">
                Shares
              </Text>
              <Checkbox spacing="10px">
                <Text fontSize="14px">Select All Shares</Text>
              </Checkbox>

              <br />
              <br />
              <Text color="#636972" fontSize="14px" mb="8px">
                No of Shares to Return
              </Text>
              <Input w="25%" placeholder="No of Shares" />

              <br />
              <br />
              <Text color="#636972" mb="8px">
                Withdraw Amount
              </Text>
              <Text fontWeight="bold" mb="8px">
                Rs. 0.00
              </Text>

              <br />
              <Text color="#636972" mb="8px">
                Remaining Share
              </Text>
              <Text fontWeight="bold" mb="8px">
                20
              </Text>

              <br />
              <Text color="#636972" mb="8px">
                Remaining Share Value
              </Text>
              <Text fontWeight="bold" mb="8px">
                2000
              </Text>

              <Divider mt="4" mb="4" />
              <Text fontWeight="bold">Payment Mode</Text>

              <br />
              <RadioGroup
                spacing={6}
                size="md"
                direction="row"
                radioList={['Bank Voucher', 'Account', 'Cash']}
              />
              <br />
              <Box p={2} w="25%">
                <Text>Available balance</Text>
                <Text color="accent.800">Rs. 12,342</Text>
              </Box>

              <br />
              <Text>Select Account</Text>
              <BaseSelect
                w="30%"
                placeholder="Select Account"
                options={[
                  {
                    label: 'Option 1',
                    value: 'option-1',
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
              <br />
              <Button>Complete Share Return</Button>
            </Box>
          </Box>

          <Box w={320} p={2} minHeight="100%" bg="white">
            <Text fontWeight="bold">Member Profile</Text>

            <Box mt="2" w={250} p={2} bg="white">
              <Grid
                templateRows="repeat(2, 1fr)"
                justifyContent="center"
                alignContent="center"
              >
                <GridItem>
                  <Avatar
                    src="https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png"
                    size="lg"
                    name="John Doe"
                    border="1px solid gray.0"
                  />
                </GridItem>
                <GridItem mt="2">
                  <Box>
                    <Text ml="3" color="#636972" fontSize="15px">
                      ID: 1234
                    </Text>
                    <Text color="#636972" fontSize="20px">
                      Ajit Nepal
                    </Text>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
            <Divider m="2" />
            <Box w={250} p={2} bg="white">
              <Text fontSize="12px">
                Membership Date: &nbsp;&nbsp;&nbsp;&nbsp; 2078/10/04
              </Text>
              <Text fontSize="12px">
                Phone No: &nbsp;&nbsp;&nbsp;&nbsp; 981234567
              </Text>
              <Text fontSize="12px">
                Address: &nbsp; Kathmandu, Tokha Municipality-10
              </Text>
              <Text fontSize="12px">
                Branch Name: &nbsp;&nbsp;&nbsp;&nbsp; Main Branch
              </Text>
              <Text fontSize="12px">
                Father’s Name: &nbsp;&nbsp;&nbsp;&nbsp; Elex Nepal
              </Text>
              <Text fontSize="12px">
                No of Shares: &nbsp;&nbsp;&nbsp;&nbsp; 3230
              </Text>
              <Text fontSize="12px">
                Total Amount: &nbsp;&nbsp;&nbsp;&nbsp; 323000
              </Text>
            </Box>
          </Box>
        </Box>
        <br />
      </Container>
    </Form>
  );
};

SharePurchase.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SharePurchase;
