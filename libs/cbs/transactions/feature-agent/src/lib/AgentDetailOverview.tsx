import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import { Alert, asyncToast, Box, Button, DetailPageContentCard, Text } from '@myra-ui';

import {
  useGetAgentAssignedMemberListDataQuery,
  useGetAgentTodayListDataQuery,
  useSetAgentTodayListDataMutation,
} from '@coop/cbs/data-access';
import { AssignedMembersCard } from '@coop/cbs/transactions/ui-components';
import { localizedText } from '@coop/cbs/utils';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AgentDetailOverviewProps {}

type DepositAccountTable = {
  member: string;
  account: string;
  amount: string;
  memberName: string;
};

export const AgentDetailOverview = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { getValues, reset, watch } = methods;

  const [showMemberTable, setShowMemberTable] = useState<boolean>(false);

  const { data: agentTodayListQueryData } = useGetAgentTodayListDataQuery(
    {
      id: id as string,
    },
    { staleTime: 0, enabled: !!id }
  );

  const { data: assignedMemberListQueryData } = useGetAgentAssignedMemberListDataQuery(
    {
      pagination: {
        first: -1,
        after: '',
      },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'agentId',
                comparator: 'EqualTo',
                value: id,
              },
            ],
          },
        ],
      },
    },
    { enabled: !!id, staleTime: 0 }
  );

  const accounts = watch('accounts');

  useEffect(() => {
    if (agentTodayListQueryData?.agent?.listAgentTask?.record?.length) {
      setShowMemberTable(true);

      reset({
        accounts: agentTodayListQueryData?.agent?.listAgentTask?.record?.map((record) => ({
          id: record?.id,
          member: record?.member?.id,
          account: record?.account?.id,
          amount: record?.amount,
        })),
      });
    }
  }, [agentTodayListQueryData]);

  useDeepCompareEffect(() => {
    if (accounts?.length) {
      reset({
        accounts: accounts?.map(
          (record: { id: string; account: string | undefined; member: any; amount: any }) => {
            const account = assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
              (member) => member?.node?.account?.id === record?.account
            );

            return {
              id: record?.id,
              member: record?.member,
              account: record?.account,
              amount: record?.amount || account?.node?.account?.dues?.totalDue,
            };
          }
        ),
      });
    }
  }, [assignedMemberListQueryData]);

  const getMemberAccounts = async (mId: string) =>
    new Promise<{ label: string; value: string }[]>((resolve) => {
      const tempAccountList: { label: string; value: string }[] = [];

      assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.forEach((member) => {
        if (member?.node?.member?.id === mId) {
          tempAccountList.push({
            label: member?.node?.account?.accountName as string,
            value: member?.node?.account?.id as string,
          });
        }
      });

      resolve(tempAccountList);
    });

  const memberListSearchOptions = useMemo(() => {
    const tempMembers: { label: string; value: string }[] = [];
    const tempIds: string[] = [];

    assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.forEach((member) => {
      if (!tempIds.includes(member?.node?.member?.id as string)) {
        tempIds.push(member?.node?.member?.id as string);
        tempMembers.push({
          label: member?.node?.member?.name?.local as string,
          value: member?.node?.member?.id as string,
        });
      }
    });

    return tempMembers;
  }, [assignedMemberListQueryData]);

  const { mutateAsync: setAgentTodayList } = useSetAgentTodayListDataMutation();

  const { refetch } = useGetAgentTodayListDataQuery(
    {
      id: id as string,
    },
    { staleTime: 0, enabled: !!id }
  );

  const handleSaveTodayList = () => {
    asyncToast({
      id: 'set-agent-today-list',
      promise: setAgentTodayList({
        id: id as string,
        data: getValues()['accounts'].map(
          (account: { id: string; member: string; account: string; amount: string }) =>
            account.id
              ? {
                  id: account.id,
                  member: account.member,
                  account: account.account,
                  amount: String(account.amount),
                }
              : {
                  member: account.member,
                  account: account.account,
                  amount: String(account.amount),
                }
        ),
      }),
      msgs: {
        loading: t['agentOverviewAddingTodaysList'],
        success: t['agentOverviewAddedTodaysList'],
      },
      onSuccess: () => refetch(),
    });
  };

  const handleDiscardChanges = () => {
    if (agentTodayListQueryData?.agent?.listAgentTask?.record?.length) {
      reset({
        accounts: agentTodayListQueryData?.agent?.listAgentTask?.record?.map((record) => ({
          member: record?.member?.id,
          account: record?.account?.id,
          amount: record?.amount,
        })),
      });
    } else {
      setShowMemberTable(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <AssignedMembersCard />

      {!showMemberTable && (
        <Alert
          status="info"
          title={t['agentOverviewCreateTodaysList']}
          showUndo
          undoText={t['agentOverviewCreateTodaysList']}
          undoHandler={() => setShowMemberTable(true)}
        />
      )}

      {showMemberTable && (
        <DetailPageContentCard
          header={t['agentOverviewTodaysList']}
          showFooter
          footerButtons={
            <>
              <Button variant="ghost" onClick={handleDiscardChanges}>
                {t['agentOverviewDiscard']}
              </Button>

              <Button onClick={handleSaveTodayList}>{t['agentOverviewSaveChanges']}</Button>
            </>
          }
        >
          <Box p="s16">
            <FormProvider {...methods}>
              <FormEditableTable<DepositAccountTable>
                name="accounts"
                columns={[
                  {
                    accessor: 'member',
                    header: t['agentOverviewMember'],
                    cellWidth: 'auto',
                    fieldType: 'select',
                    selectOptions: memberListSearchOptions,
                    cell: (row) => {
                      const selectedMember =
                        assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
                          (member) => member?.node?.member?.id === row?.member
                        )?.node?.member;

                      return (
                        <Box display="flex" flexDirection="column" py="s4">
                          <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-80">
                            {localizedText(selectedMember?.name)}
                          </Text>
                          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
                            {selectedMember?.code}
                          </Text>
                        </Box>
                      );
                    },
                  },
                  {
                    accessor: 'account',
                    header: t['agentOverviewAccount'],
                    loadOptions: (row) => getMemberAccounts(row?.member),
                    fieldType: 'select',
                    cellWidth: 'auto',
                    cell: (row) => {
                      const selectedMember =
                        assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
                          (member) => member?.node?.account?.id === row?.account
                        )?.node?.account;

                      return (
                        <Box display="flex" flexDirection="column" py="s4">
                          <Text
                            fontSize="r1"
                            fontWeight={500}
                            color="neutralColorLight.Gray-80"
                            maxW="32ch"
                            textOverflow="ellipsis"
                            overflow="hidden"
                          >
                            {selectedMember?.accountName}
                          </Text>
                          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-60">
                            {selectedMember?.id}
                          </Text>
                        </Box>
                      );
                    },
                  },
                  {
                    accessor: 'amount',
                    header: t['agentOverviewAmount'],
                    isNumeric: true,
                  },
                ]}
                canDeleteRow
              />
            </FormProvider>
          </Box>
        </DetailPageContentCard>
      )}
    </Box>
  );
};

export default AgentDetailOverview;
