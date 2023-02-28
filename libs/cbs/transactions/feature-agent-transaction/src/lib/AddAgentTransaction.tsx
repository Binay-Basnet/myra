import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Container, FormFooter, FormHeader, Text } from '@myra-ui';

import {
  useGetAgentAssignedMemberListDataQuery,
  useGetAgentTodayListDataQuery,
  useSetAgentTodayDepositDataMutation,
} from '@coop/cbs/data-access';
import { BoxContainer } from '@coop/cbs/transactions/ui-containers';
import { FormAgentSelect, FormEditableTable } from '@coop/shared/form';
import { featureCode, getRouterQuery } from '@coop/shared/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AddAgentTransactionProps {}

type DepositAccountTable = {
  member: string;
  account: string;
  amount: string;
  memberName?: string;
  paid: boolean;
};

export const AddAgentTransaction = () => {
  const router = useRouter();

  const methods = useForm();

  const { watch, getValues } = methods;

  const agentId: string = watch('agentId');

  const { data: assignedMemberListQueryData } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: {
        first: -1,
        after: '',
      },
      filter: {
        agentId: agentId as string,
      },
    },
    { enabled: !!agentId, staleTime: 0 }
  );

  const getMemberAccounts = async (mId: string) =>
    new Promise<{ label: string; value: string }[]>((resolve) => {
      const tempAccountList: { label: string; value: string }[] = [];

      assignedMemberListQueryData?.transaction?.assignedMemberList?.edges?.forEach((member) => {
        if (member?.node?.member?.id === mId) {
          tempAccountList.push({
            label: member?.node?.product?.productName as string,
            value: member?.node?.account?.id as string,
          });
        }
      });

      resolve(tempAccountList);
    });

  const { data: agentTodayListQueryData } = useGetAgentTodayListDataQuery(
    {
      id: agentId,
    },
    { staleTime: 0, enabled: !!agentId }
  );

  const todaysList = useMemo(
    () =>
      agentTodayListQueryData?.transaction?.listAgentTask?.record?.map((record) => ({
        member: record?.member?.id as string,
        account: record?.account?.id as string,
        amount: record?.amount,
        paid: Boolean(record?.paid),
      })),
    [agentTodayListQueryData]
  );

  const { data: memberListQueryData } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        agentId,
      },
    },
    { enabled: !!agentId }
  );

  const memberListSearchOptions = useMemo(
    () =>
      memberListQueryData?.transaction?.assignedMemberList?.edges?.map((member) => ({
        label: member?.node?.member?.name?.local as string,
        value: member?.node?.member?.id as string,
      })) ?? [],
    [memberListQueryData]
  );

  const { mutateAsync: setAgentTodayList } = useSetAgentTodayDepositDataMutation();

  const handleSaveTodayList = () => {
    asyncToast({
      id: 'set-agent-today-transaction-confirm',
      promise: setAgentTodayList({
        id: agentId,
        data: getValues()['accounts'].map(
          (account: { member: string; account: string; amount: string; paid: boolean }) => ({
            member: account.member,
            account: account.account,
            amount: String(account.amount),
            paid: account.paid,
          })
        ),
      }),
      msgs: {
        loading: 'Adding Agent Todays Transaction',
        success: 'Added Agent Todays Transaction',
      },
      onSuccess: () => router.back(),
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`New Market Representative Transaction - ${featureCode?.newMarketRepresentativeTransaction}`}
            // closeLink="/transactions/market-representative-transaction/list"
            buttonHandler={() => router.back()}
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <Box
                  p="s16"
                  pb="100px"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap="s32"
                >
                  <Box display="flex" flexDirection="column" gap="s16">
                    <Text>Market Representative Transaction</Text>

                    <FormAgentSelect isRequired name="agentId" label="Market Representative" />
                  </Box>

                  {agentId && (
                    <BoxContainer>
                      <Text fontSize="r1" fontWeight={600} color="gray.800">
                        Assigned Member List
                      </Text>

                      <FormEditableTable<DepositAccountTable>
                        name="accounts"
                        columns={[
                          {
                            accessor: 'member',
                            header: 'Member',
                            cellWidth: 'auto',
                            fieldType: 'search',
                            searchOptions: memberListSearchOptions,
                            cell: (row) => (
                              <Box display="flex" flexDirection="column" py="s4">
                                <Text
                                  fontSize="r1"
                                  fontWeight={500}
                                  color="neutralColorLight.Gray-80"
                                >
                                  {
                                    (row?.member as unknown as { label: string; value: string })
                                      ?.label
                                  }
                                </Text>
                                <Text
                                  fontSize="s3"
                                  fontWeight={500}
                                  color="neutralColorLight.Gray-60"
                                >
                                  {
                                    (row?.member as unknown as { label: string; value: string })
                                      ?.value
                                  }
                                </Text>
                              </Box>
                            ),
                          },
                          {
                            accessor: 'account',
                            header: 'Account',
                            loadOptions: (row) =>
                              getMemberAccounts(
                                (row?.member as unknown as { label: string; value: string })?.value
                              ),
                            fieldType: 'select',
                            cellWidth: 'lg',
                          },
                          {
                            accessor: 'amount',
                            header: 'Amount',
                            isNumeric: true,
                          },
                          {
                            accessor: 'paid',
                            header: 'Payment Confirm',
                            fieldType: 'checkbox',
                          },
                        ]}
                        defaultData={todaysList}
                        searchPlaceholder="Search or add member"
                        canDeleteRow
                      />
                    </BoxContainer>
                  )}
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButtonLabel="Save Transaction"
              mainButtonHandler={handleSaveTodayList}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddAgentTransaction;
