import { AiOutlinePlus } from 'react-icons/ai';
import { IoCheckmarkDone } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import {
  AccountTypeFilter,
  NatureOfDepositProduct,
  useGetAccountInactiveCheckQuery,
  useGetMemberAccountsQuery,
  useGetMemberInactiveCheckQuery,
  useGetNewIdMutation,
  useInactivateMemberMutation,
} from '@coop/cbs/data-access';
import {
  asyncToast,
  Box,
  Button,
  Container,
  Divider,
  FormFooter,
  FormHeader,
  Icon,
  Text,
  VStack,
} from '@coop/shared/ui';

import { NumberStatus } from './CbsMembersFeatureActivations';

export const CbsMemberFeatureInactivations = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = router.query['id'] as string;

  const { mutateAsync: inactivateMember } = useInactivateMemberMutation();
  const { data } = useGetMemberInactiveCheckQuery(
    { memberId: id },
    { enabled: !!id, staleTime: 0 }
  );

  const { data: memberAccountsData } = useGetMemberAccountsQuery(
    { memberId: id },
    { enabled: !!id }
  );
  const accounts = [
    ...(memberAccountsData?.members?.getAllAccounts?.data?.depositAccount ?? []),
    ...(memberAccountsData?.members?.getAllAccounts?.data?.loanAccount ?? []),
  ];

  const isAllAccountsClosed = data?.members?.inactivateMember?.inactivateCheck?.isAccountClosed;
  const isShareReturned = data?.members?.inactivateMember?.inactivateCheck?.isShareReturned;

  return (
    (<Container p={0} minWidth="container.lg" bg="white" minH="calc(100vh - 110px)">
      <Box position="sticky" top="110px">
        <FormHeader title="Member Inactive" />
      </Box>
      <Box minH="calc(100vh - 220px)" p="s16" display="flex" flexDir="column" gap="s16">
        <Box py="s16">
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            In order to make the member inactive, following steps must be completed:
          </Text>
        </Box>
        <Box display="flex" gap="s16">
          <NumberStatus active={!isAllAccountsClosed} number={1} />
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
                  {accounts?.map((account, index) => (
                    <AccountRow index={index + 1} account={account} />
                  ))}
                </VStack>

                {isAllAccountsClosed ? (
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
                ) : null}
              </Box>
            ) : null}
          </Box>
        </Box>
        <Divider />
        <Box display="flex" gap="s16">
          <NumberStatus active={!isShareReturned && !!isAllAccountsClosed} number={2} />
          <Box display="flex" flexDir="column" gap="s16">
            <Box display="flex" flexDir="column" gap="s4">
              <Text fontSize="r1" fontWeight="600" color="gray.800">
                Return all Shares
              </Text>
              <Text fontSize="r1" color="gray.800">
                Share must be issued for a member to be active.
              </Text>
            </Box>
            {isShareReturned ? (
              <Box display="flex" gap="s4">
                <Icon color="primary.500" as={IoCheckmarkDone} />
                <Text
                  fontSize="s3"
                  fontWeight="SemiBold"
                  color="neutralColorLight.Gray-70"
                  lineHeight="150%"
                >
                  Share Return
                </Text>
              </Box>
            ) : (
              <Box>
                <Button
                  {...(!isAllAccountsClosed ? { shade: 'neutral', disabled: true } : {})}
                  leftIcon={<Icon as={AiOutlinePlus} />}
                  onClick={() =>
                    router.push(`/share/share-return?redirect=${router.asPath}&memberId=${id}`)
                  }
                >
                  Share Return
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box position="sticky" bottom={0} zIndex="11">
        <FormFooter
          mainButtonLabel="Inactivate Member"
          mainButtonHandler={async () => {
            await asyncToast({
              id: 'member-inactivate',
              promise: inactivateMember({ memberId: id }),
              msgs: {
                loading: 'Making Member Inactive',
                success: 'Member Inactivated',
              },
              onSuccess: () => {
                router.push('/members/list');
                queryClient.invalidateQueries(['getMemberList']);
              },
            });
          }}
          dangerButton
          isMainButtonDisabled={!isAllAccountsClosed || !isShareReturned}
        />
      </Box>
    </Container>)
  );
};

interface AccountRowProps {
  account: {
    id: string;
    accountName?: string | null | undefined;
    product: {
      nature?: NatureOfDepositProduct;
      isMandatorySaving?: boolean | null | undefined;
      productName: string;
    };
  } | null;

  index: number;
}

const AccountRow = ({ account, index }: AccountRowProps) => {
  const router = useRouter();
  const memberId = router.query['id'] as string;
  const { mutateAsync } = useGetNewIdMutation();

  const { data } = useGetAccountInactiveCheckQuery(
    {
      accountId: String(account?.id),
      memberId,
      accountType: account?.product?.nature ? AccountTypeFilter.Deposit : AccountTypeFilter.Loan,
    },
    {
      staleTime: 0,
      enabled: !!memberId && !!account?.id,
    }
  );

  const isAccountClosed = data?.members?.inactivateMember?.accountCloseCheck;

  return (
    <Box minH="s60" w="100%" display="flex">
      <Box w="6%" h="100%" display="flex" alignItems="center" justifyContent="center">
        {index}
      </Box>
      <Box px="s8" w="80%" h="100%" display="flex" alignItems="center">
        <Box display="flex" flexDir="column" lineHeight="20px" textTransform="capitalize">
          <Text fontSize="r1" color="gray.800">
            {account?.accountName ?? 'Account'}
          </Text>
          <Text fontSize="r1" color="gray.500">
            {account?.product?.productName}
          </Text>
        </Box>
      </Box>

      <Box px="s16" w="20%" h="100%" display="flex" alignItems="center" justifyContent="end">
        {isAccountClosed ? (
          <Box display="flex" gap="s4">
            <Icon color="primary.500" as={IoCheckmarkDone} />
            <Text
              fontSize="s3"
              fontWeight="SemiBold"
              color="neutralColorLight.Gray-70"
              lineHeight="150%"
            >
              Account Closed
            </Text>
          </Box>
        ) : (
          <Box
            onClick={async () => {
              const response = await mutateAsync({});

              router.push(
                `/accounts/account-close/add/${response?.newId}?redirect=${router.asPath}&memberId=${memberId}&accountId=${account?.id}`
              );
            }}
          >
            <Button leftIcon={<Icon as={AiOutlinePlus} />} variant="ghost">
              Close Account
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
