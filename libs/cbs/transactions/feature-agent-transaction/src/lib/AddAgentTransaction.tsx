import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  useGetAccountTableListQuery,
  useGetAgentAssignedMemberListDataQuery,
  useGetAgentTodayListDataQuery,
  useSetAgentTodayListDataMutation,
} from '@coop/cbs/data-access';
import { AgentSelect } from '@coop/cbs/transactions/ui-components';
import { BoxContainer } from '@coop/cbs/transactions/ui-containers';
import { FormEditableTable } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Container,
  DEFAULT_PAGE_SIZE,
  FormFooter,
  FormHeader,
  Text,
} from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

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
  const methods = useForm();

  const { watch, getValues } = methods;

  const agentId: string = watch('agentId');

  const [memberId, setMemberId] = useState<string>('');

  const { refetch } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId },
    },
    {
      enabled: !!memberId,
    }
  );

  // const router = useRouter();
  const getMemberAccounts = async (id: string) => {
    setMemberId(id);

    const response = await refetch();

    return new Promise<{ label: string; value: string }[]>((resolve) => {
      resolve(
        response?.data?.account?.list?.edges?.map((account) => ({
          label: account?.node?.product?.productName,
          value: account?.node?.id,
        })) as { label: string; value: string }[]
      );
    });
  };

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

  const { mutateAsync: setAgentTodayList } = useSetAgentTodayListDataMutation();

  const handleSaveTodayList = () => {
    asyncToast({
      id: 'set-agent-today-list-confirm',
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
        loading: 'Adding Agent Todays List',
        success: 'Added Agent Todays List',
      },
      onSuccess: () => null,
    });
  };

  // const accounts = watch('accounts');

  // console.log({ accounts });

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="New Agent Transaction"
            closeLink="/transactions/agent-transaction/list"
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

                    <AgentSelect name="agentId" label="Market Representative" />
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
                            cell: (row) => {
                              const memberName = memberListSearchOptions?.find(
                                (member) => member.value === row.member
                              )?.label;

                              return (
                                <Box display="flex" flexDirection="column" py="s4">
                                  <Text
                                    fontSize="r1"
                                    fontWeight={500}
                                    color="neutralColorLight.Gray-80"
                                  >
                                    {memberName}
                                  </Text>
                                  <Text
                                    fontSize="s3"
                                    fontWeight={500}
                                    color="neutralColorLight.Gray-60"
                                  >
                                    {row?.member}
                                  </Text>
                                </Box>
                              );
                            },
                          },
                          {
                            accessor: 'account',
                            header: 'Account',
                            loadOptions: (row) => getMemberAccounts(row?.member),
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
              // status={
              //   <Box display="flex" gap="s32">
              //     <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
              //       Total Deposit Amount
              //     </Text>
              //     <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
              //       ---
              //     </Text>
              //   </Box>
              // }
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
