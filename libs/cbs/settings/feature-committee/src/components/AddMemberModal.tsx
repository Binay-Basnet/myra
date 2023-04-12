import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal } from '@myra-ui';

import {
  CommitteeMemberInput,
  useGetCommitteeMemberListQuery,
  useGetMemberListQuery,
  useSetCommitteeMemberAddMutation,
} from '@coop/cbs/data-access';
import { localizedText } from '@coop/cbs/utils';
import { FormEditableTable, FormMemberSelect } from '@coop/shared/form';

interface IUpdateBalanceProps {
  isOpen: boolean;
  onClose: () => void;
}

type CashTransferTableType = {
  memberId: string;
  position: string;
};

type CustomCommitteeMemberInput = {
  chairman?: string | null;
  data?: {
    memberId: string;
    position: string;
  }[];
} & CommitteeMemberInput[];

export const AddMembersModal = ({ isOpen, onClose }: IUpdateBalanceProps) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const router = useRouter();
  const methods = useForm({});
  const { data: memberList, isFetching } = useGetMemberListQuery(
    {
      pagination: {
        first: 20,
        after: '',
        order: {
          arrange: 'ASC',
          column: 'ID',
        },
      },
      filter: {
        query: searchTerm,
        orConditions: [
          {
            andConditions: [
              {
                column: 'objState',
                comparator: 'EqualTo',
                value: 'APPROVED',
              },
            ],
          },
        ],
      },
    },
    {
      staleTime: 0,
    }
  );
  const memberListData = memberList?.members?.list?.edges;

  const memberSearchOptions = useMemo(
    () =>
      memberListData?.map((mem) => ({
        label: localizedText(mem?.node?.name) as string,
        value: mem?.node?.id as string,
      })),
    [memberListData]
  );
  const queryClient = useQueryClient();

  const { mutateAsync: setTax } = useSetCommitteeMemberAddMutation();

  const id = router?.query['id'];

  const handleSave = () => {
    const values = methods.getValues() as CustomCommitteeMemberInput;
    const dataTable = values?.data as CashTransferTableType[];
    const chairman = values?.chairman;
    const chairmanObj = [
      {
        committeeId: chairman ? id : null,
        memberId: chairman ?? null,
        position: chairman ? 'Chairman' : null,
      },
    ];

    const otherMembersData =
      dataTable?.map((data) => ({
        committeeId: id,
        memberId: data?.memberId,
        position: data?.position,
      })) || [];

    const combinedArray = [...chairmanObj, ...otherMembersData];
    asyncToast({
      id: 'add-committee',

      promise: setTax({
        data: combinedArray as CommitteeMemberInput[],
      }),
      msgs: {
        loading: 'Adding New Members',
        success: 'New Members Added',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getCommitteeMemberList']);
        onClose();
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  const committeeMemberList = useGetCommitteeMemberListQuery({
    committeeID: id as string,
  });

  const committeeMemberData =
    committeeMemberList?.data?.settings?.general?.organization?.committeeMembers;

  return (
    <Modal
      title="Add New Members"
      open={isOpen}
      onClose={onClose}
      primaryButtonLabel="Save"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s24" py="s40">
          {!committeeMemberData && <FormMemberSelect name="chairman" label="Chairman" />}
          <FormEditableTable<CashTransferTableType>
            name="data"
            columns={[
              {
                accessor: 'memberId',
                header: 'Select Member',
                cellWidth: 'auto',
                fieldType: 'search',
                searchOptions: memberSearchOptions,
                searchLoading: isFetching,
                searchCallback: (newSearch) => {
                  setSearchTerm(newSearch);
                },
              },
              {
                accessor: 'position',
                header: 'Position',
              },
            ]}
          />
        </Box>
      </FormProvider>
    </Modal>
  );
};
