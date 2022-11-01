import { AiFillCheckCircle, AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

import { Alert, Button, Container, Divider, FormFooter, Icon, Text, VStack } from '@coop/shared/ui';

export const CbsMembersFeatureActivate = () => {
  const router = useRouter();

  const id = router.query['id'] as string;

  return (
    <Container p={0} minWidth="container.lg" bg="white" minH="calc(100vh - 110px)">
      <Box p="s16" display="flex" flexDir="column" gap="s32">
        <Box
          display="flex"
          bg="background.500"
          flexDir="column"
          justifyContent="center"
          borderRadius="br2"
          alignItems="center"
          py="s32"
          px="s16"
          gap="s16"
        >
          <Icon as={AiFillCheckCircle} size="xl" color="primary.500" />
          <Text fontSize="r2" color="gray.800" fontWeight="600">
            Member
            <Text as="span" color="primary.500">
              #{id}
            </Text>{' '}
            Created Successfully
          </Text>
        </Box>

        <Box px="s16">
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            In order to activate the member, please follow the steps below:
          </Text>
        </Box>

        <Box px="s16" display="flex" flexDir="column" gap="s24">
          <Box display="flex" gap="s16">
            <NumberStatus active number={1} />

            <Box display="flex" flexDir="column" gap="s16">
              <Box display="flex" flexDir="column" gap="s4">
                <Text fontSize="r1" fontWeight="600" color="gray.800">
                  Membership Payment
                </Text>
                <Text fontSize="r1" color="gray.800">
                  In order to activate the member, please follow the steps below:
                </Text>
              </Box>
              <Box>
                <Button>Pay for Membership</Button>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box display="flex" gap="s16">
            <NumberStatus active={false} number={2} />
            <Box display="flex" flexDir="column" gap="s16">
              <Box display="flex" flexDir="column" gap="s4">
                <Text fontSize="r1" fontWeight="600" color="gray.800">
                  Share Issue
                </Text>
                <Text fontSize="r1" color="gray.800">
                  Share must be issued for a member to be active
                </Text>
              </Box>
              <Box>
                <Button shade="neutral" disabled leftIcon={<Icon as={AiOutlinePlus} />}>
                  New Share Issue
                </Button>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box display="flex" gap="s16">
            <NumberStatus active={false} number={3} />
            <Box w="100%" display="flex" flexDir="column" gap="s16">
              <Box display="flex" flexDir="column" gap="s4">
                <Text fontSize="r1" fontWeight="600" color="gray.800">
                  Update Account Details
                </Text>
                <Text fontSize="r1" color="gray.800">
                  Some of the accounts are mandatory for all the users. Update account details below
                  to activate your membership{' '}
                </Text>
              </Box>

              <Box w="100%" display="flex" flexDir="column" gap="s8">
                <VStack
                  divider={<Divider />}
                  spacing={0}
                  alignItems="normal"
                  border="1px"
                  borderColor="border.layout"
                  borderRadius="br2"
                >
                  <Box minH="s60" w="100%" display="flex">
                    <Box w="6%" h="100%" display="flex" alignItems="center" justifyContent="center">
                      1
                    </Box>
                    <Box px="s8" w="80%" h="100%" display="flex" alignItems="center">
                      <Box display="flex" flexDir="column" gap="s16" py="s16">
                        <Box display="flex" flexDir="column" lineHeight="20px">
                          <Text fontSize="r1" color="gray.800">
                            Sahakari Bikash Khata
                          </Text>
                          <Text fontSize="r1" color="gray.500">
                            Reccuring Saving Account
                          </Text>
                        </Box>
                        <Alert
                          hideCloseIcon
                          status="warning"
                          title="Update deposit frequency and deposit amount for this account."
                        />
                      </Box>
                    </Box>
                    <Box
                      px="s8"
                      w="20%"
                      h="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="end"
                    >
                      <Button variant="ghost">Update Details</Button>
                    </Box>
                  </Box>
                  <Box h="s60" display="flex">
                    <Box w="6%" h="100%" display="flex" alignItems="center" justifyContent="center">
                      2
                    </Box>
                    <Box px="s8" w="80%" h="100%" display="flex" alignItems="center">
                      <Box display="flex" flexDir="column" lineHeight="20px">
                        <Text fontSize="r1" color="gray.800">
                          Regular Savings Account
                        </Text>
                        <Text fontSize="r1" color="gray.500">
                          Saving Account
                        </Text>
                      </Box>
                    </Box>
                    <Box
                      px="s8"
                      w="20%"
                      h="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="end"
                    >
                      <Button variant="ghost">Update Details</Button>
                    </Box>
                  </Box>
                </VStack>

                <Box>
                  <Button variant="ghost">Skip for now</Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box display="flex" gap="s16">
            <NumberStatus active={false} number={4} />
            <Box display="flex" flexDir="column" gap="s16">
              <Box display="flex" flexDir="column" gap="s4">
                <Text fontSize="r1" fontWeight="600" color="gray.800">
                  Add Nepali Transaltion
                </Text>
                <Text fontSize="r1" color="gray.800">
                  Nepali translation makes it easy for reporting and viewing data in Nepali
                </Text>
              </Box>
              <Box display="flex" alignItems="center" gap="s8">
                <Button variant="outline">Add Translation</Button>
                <Button variant="ghost">Skip for now</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box position="sticky" bottom={0} zIndex="11">
        <FormFooter mainButtonLabel="Done" mainButtonHandler={() => router.push('/members/list')} />
      </Box>
    </Container>
  );
};

interface INumberStatusProps {
  active: boolean;
  number: number | string;
}

export const NumberStatus = ({ number, active }: INumberStatusProps) => (
  <Box
    w="s20"
    h="s20"
    display="flex"
    alignItems="center"
    justifyContent="center"
    fontSize="s2"
    fontWeight="600"
    borderRadius="100%"
    bg={active ? 'primary.500' : 'gray.500'}
    color="white"
  >
    {number}
  </Box>
);
