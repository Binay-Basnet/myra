import { Dispatch, SetStateAction, useState } from 'react';
import { AiFillCheckCircle, AiOutlinePlus } from 'react-icons/ai';
import { IoCheckmarkDone } from 'react-icons/io5';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

import {
  NatureOfDepositProduct,
  useGetAccountCheckQuery,
  useGetMemberAccountsQuery,
  useGetMemberCheckQuery,
} from '@coop/cbs/data-access';
import { Alert, Button, Container, Divider, FormFooter, Icon, Text, VStack } from '@coop/shared/ui';

import { MembershipPayment } from '../components/MembershipPayment';

export const CbsMembersFeatureActivate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = router.query['id'] as string;
  const [mode, setMode] = useState<'details' | 'payment'>('details');

  const [hasAccountUpdated, setHasAccountUpdated] = useState(false);

  const { data } = useGetMemberCheckQuery({ memberID: id }, { enabled: !!id });
  const { data: memberAccountsData } = useGetMemberAccountsQuery(
    { memberId: id },
    { enabled: !!id }
  );

  const hasPaidMemberFee = data?.members?.activateMember?.memberActivateChecks?.isFeePaid;
  const hasShareIssued = data?.members?.activateMember?.memberActivateChecks?.isShareIssued;
  const accounts = memberAccountsData?.members?.getAllAccounts?.data?.depositAccount;

  return (
    <>
      <Box display={mode === 'payment' ? 'block' : 'none'}>
        <MembershipPayment setMode={setMode} />
      </Box>
      <Container
        display={mode === 'details' ? 'block' : 'none'}
        p={0}
        minWidth="container.lg"
        bg="white"
        minH="calc(100vh - 110px)"
      >
        <Box minH="calc(100vh - 170px)" p="s16" display="flex" flexDir="column" gap="s32">
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
              <NumberStatus active={!hasPaidMemberFee} number={1} />

              <Box display="flex" flexDir="column" gap="s16">
                <Box display="flex" flexDir="column" gap="s4">
                  <Text fontSize="r1" fontWeight="600" color="gray.800">
                    Membership Payment
                  </Text>
                  <Text fontSize="r1" color="gray.800">
                    In order to activate the member, please follow the steps below:
                  </Text>
                </Box>
                {hasPaidMemberFee ? (
                  <Box display="flex" gap="s4">
                    <Icon color="primary.500" as={IoCheckmarkDone} />
                    <Text
                      fontSize="s3"
                      fontWeight="SemiBold"
                      color="neutralColorLight.Gray-70"
                      lineHeight="150%"
                    >
                      Paid for Membership
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    <Button onClick={() => setMode('payment')}>Pay for Membership</Button>
                  </Box>
                )}
              </Box>
            </Box>
            <Divider />
            <Box display="flex" gap="s16">
              <NumberStatus active={!hasShareIssued && !!hasPaidMemberFee} number={2} />
              <Box display="flex" flexDir="column" gap="s16">
                <Box display="flex" flexDir="column" gap="s4">
                  <Text fontSize="r1" fontWeight="600" color="gray.800">
                    Share Issue
                  </Text>
                  <Text fontSize="r1" color="gray.800">
                    Share must be issued for a member to be active
                  </Text>
                </Box>
                {hasShareIssued ? (
                  <Box display="flex" gap="s4">
                    <Icon color="primary.500" as={IoCheckmarkDone} />
                    <Text
                      fontSize="s3"
                      fontWeight="SemiBold"
                      color="neutralColorLight.Gray-70"
                      lineHeight="150%"
                    >
                      Share Issued
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      {...(!hasPaidMemberFee ? { shade: 'neutral', disabled: true } : {})}
                      leftIcon={<Icon as={AiOutlinePlus} />}
                      onClick={() =>
                        router.push(`/share/share-issue?redirect=${router.asPath}&memberId=${id}`)
                      }
                    >
                      New Share Issue
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            <Divider />

            <Box display="flex" gap="s16">
              <NumberStatus
                active={!!hasShareIssued && !!hasPaidMemberFee && !hasAccountUpdated}
                number={3}
              />
              <Box w="100%" display="flex" flexDir="column" gap="s16">
                <Box display="flex" flexDir="column" gap="s4">
                  <Text fontSize="r1" fontWeight="600" color="gray.800">
                    Update Account Details
                  </Text>
                  <Text fontSize="r1" color="gray.800">
                    Some of the accounts are mandatory for all the users. Update account details
                    below to activate your membership{' '}
                  </Text>
                </Box>

                {accounts && accounts?.length !== 0 ? (
                  <Box w="100%" display="flex" flexDir="column" gap="s8">
                    <VStack
                      divider={<Divider />}
                      spacing={0}
                      alignItems="normal"
                      border="1px"
                      borderColor="border.layout"
                      borderRadius="br2"
                    >
                      {accounts?.map((account) => (
                        <AccountRow setHasAccountUpdated={setHasAccountUpdated} account={account} />
                      ))}
                    </VStack>

                    {!hasAccountUpdated ? (
                      <Box>
                        <Button variant="ghost" onClick={() => setHasAccountUpdated(true)}>
                          Skip for now
                        </Button>
                      </Box>
                    ) : (
                      <Box display="flex" gap="s4" py="s16">
                        <Icon color="primary.500" as={IoCheckmarkDone} />
                        <Text
                          fontSize="s3"
                          fontWeight="SemiBold"
                          color="neutralColorLight.Gray-70"
                          lineHeight="150%"
                        >
                          Completed
                        </Text>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box display="flex" gap="s4">
                    <Icon color="primary.500" as={IoCheckmarkDone} />
                    <Text
                      fontSize="s3"
                      fontWeight="SemiBold"
                      color="neutralColorLight.Gray-70"
                      lineHeight="150%"
                    >
                      Completed
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
            {/**
             *  <Divider />
             *             <Box display="flex" gap="s16">
             *               <NumberStatus active={false} number={4} />
             *               <Box display="flex" flexDir="column" gap="s16">
             *                 <Box display="flex" flexDir="column" gap="s4">
             *                   <Text fontSize="r1" fontWeight="600" color="gray.800">
             *                     Add Nepali Transaltion
             *                   </Text>
             *                   <Text fontSize="r1" color="gray.800">
             *                     Nepali translation makes it easy for reporting and viewing data in Nepali
             *                   </Text>
             *                 </Box>
             *                 <Box display="flex" alignItems="center" gap="s8">
             *                   <Button variant="outline">Add Translation</Button>
             *                   <Button variant="ghost">Skip for now</Button>
             *                 </Box>
             *               </Box>
             *             </Box>
             * */}
          </Box>
        </Box>
        <Box position="sticky" bottom={0} zIndex="11">
          <FormFooter
            mainButtonLabel="Done"
            mainButtonHandler={() => {
              queryClient.invalidateQueries('getMemberList');
              router.push('/members/list');
            }}
          />
        </Box>
      </Container>
    </>
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

interface AccountRowProps {
  account: {
    id: string;
    accountName?: string | null | undefined;
    product: {
      nature: NatureOfDepositProduct;
      isMandatorySaving?: boolean | null | undefined;
      productName: string;
    };
  } | null;

  setHasAccountUpdated: Dispatch<SetStateAction<boolean>>;
}

export const AccountRow = ({ account, setHasAccountUpdated }: AccountRowProps) => {
  const showAlert =
    (account?.product?.isMandatorySaving &&
      account?.product?.nature === NatureOfDepositProduct.RecurringSaving) ||
    account?.product?.nature === NatureOfDepositProduct.Saving;

  const router = useRouter();
  const memberId = router.query['id'] as string;

  const { data } = useGetAccountCheckQuery(
    { accountId: String(account?.id), memberId },
    {
      enabled: !!memberId && !!account?.id,
      onSuccess: () => setHasAccountUpdated(true),
    }
  );

  const hasFilledDetails = data?.members?.activateMember?.accountUpdateCheck;

  return (
    <Box minH="s60" w="100%" display="flex">
      <Box w="6%" h="100%" display="flex" alignItems="center" justifyContent="center">
        1
      </Box>
      <Box px="s8" w="80%" h="100%" display="flex" alignItems="center">
        <Box display="flex" flexDir="column" gap="s16" py="s16">
          <Box display="flex" flexDir="column" lineHeight="20px" textTransform="capitalize">
            <Text fontSize="r1" color="gray.800">
              {account?.accountName}
            </Text>
            <Text fontSize="r1" color="gray.500">
              {account?.product?.productName}
            </Text>
          </Box>

          {showAlert && (
            <Alert
              hideCloseIcon
              status="warning"
              title="Update deposit frequency and deposit amount for this account."
            />
          )}
        </Box>
      </Box>

      <Box px="s16" w="20%" h="100%" display="flex" alignItems="center" justifyContent="end">
        {hasFilledDetails ? (
          <Box display="flex" gap="s4">
            <Icon color="primary.500" as={IoCheckmarkDone} />
            <Text
              fontSize="s3"
              fontWeight="SemiBold"
              color="neutralColorLight.Gray-70"
              lineHeight="150%"
            >
              Details Updated
            </Text>
          </Box>
        ) : (
          <Box
            onClick={() =>
              router.push(`/accounts/account-open/edit/${account?.id}?redirect=${router.asPath}`)
            }
          >
            <Button variant="ghost">Update Details</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};