import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { asyncToast, Box, Button, DetailPageContentCard, Grid, Icon, Text } from '@myra-ui';

import {
  useGetAgentAssignedMemberListDataQuery,
  useListAgentTemplateQuery,
  useSetAgentTemplateMutation,
} from '@coop/cbs/data-access';
import { localizedText } from '@coop/cbs/utils';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type DepositAccountTable = {
  memberId: string;
  accountId: string;
  amount: string;
};

export const Templates = () => {
  const [showTemplateTable, setShowTemplateTable] = useState(false);

  const methods = useForm();

  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const { data: agentTemplateData, refetch } = useListAgentTemplateQuery({
    agentId: id as string,
  });

  useEffect(() => {
    if (agentTemplateData?.agent?.listAgentTemplate?.record?.length) {
      setShowTemplateTable(true);
    }
  }, [agentTemplateData]);

  useEffect(() => {
    if (agentTemplateData?.agent?.listAgentTemplate?.record?.length) {
      setShowTemplateTable(true);

      methods.setValue(
        'accounts',
        agentTemplateData?.agent?.listAgentTemplate?.record?.map((record) => ({
          memberId: record?.member?.id,
          accountId: record?.account?.id,
          amount: record?.amount,
        }))
      );
    }
  }, [agentTemplateData]);

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

  const { mutateAsync: setAgentTemplate } = useSetAgentTemplateMutation();

  const handleSaveTodayList = () => {
    asyncToast({
      id: 'set-agent-template',
      promise: setAgentTemplate({
        agentId: id as string,
        data: methods
          .getValues()
          ['accounts'].map((account: { memberId: string; accountId: string; amount: string }) => ({
            memberId: account.memberId,
            accountId: account.accountId,
            amount: String(account.amount),
          })),
      }),
      msgs: {
        loading: 'Setting default template',
        success: 'Default template set',
      },
      onSuccess: () => refetch(),
    });
  };

  return (
    <Box display="flex" flexDir="column" gap="s16" bg="background.500">
      <Text fontSize="r3" fontWeight="600" color="gray.800">
        Collection List
      </Text>

      {!showTemplateTable && (
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            bg="white"
            borderRadius="br2"
            gap="s12"
            h="58px"
            pl="s16"
            cursor="pointer"
            boxShadow="E0"
            onClick={() => setShowTemplateTable(true)}
          >
            <Icon color="primary.500" as={IoAddOutline} />

            <Text fontWeight="500" fontSize="s3">
              Create Collection List
            </Text>
          </Box>
        </Grid>
      )}

      {showTemplateTable && (
        <DetailPageContentCard
          header="Available Template"
          showFooter
          footerButtons={<Button onClick={handleSaveTodayList}>Set as Default Template</Button>}
        >
          <Box p="s16">
            <FormProvider {...methods}>
              <FormEditableTable<DepositAccountTable>
                name="accounts"
                columns={[
                  {
                    accessor: 'memberId',
                    header: t['agentOverviewMember'],
                    cellWidth: 'auto',
                    fieldType: 'select',
                    selectOptions: memberListSearchOptions,
                    cell: (row) => {
                      const selectedMember =
                        assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
                          (member) => member?.node?.member?.id === row?.memberId
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
                    accessor: 'accountId',
                    header: t['agentOverviewAccount'],
                    loadOptions: (row) => getMemberAccounts(row?.memberId),
                    fieldType: 'select',
                    cellWidth: 'auto',
                    cell: (row) => {
                      const selectedMember =
                        assignedMemberListQueryData?.agent?.assignedMemberList?.edges?.find(
                          (member) => member?.node?.account?.id === row?.accountId
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
                    header: 'Amount',
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
