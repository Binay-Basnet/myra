import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button } from '@myra-ui';

import { Member, useAddMembersMutation, useGetMemberListQuery } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const GroupMembers = (props: { data: Member[]; allowableServiceCenters: string[] }) => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, allowableServiceCenters } = props;
  const methods = useForm();
  const { setValue, getValues } = methods;

  const { mutateAsync } = useAddMembersMutation();

  const { data: memberData, isFetching } = useGetMemberListQuery(
    {
      pagination: getPaginationQuery(),
      filter: {
        query: searchTerm,
        orConditions: [
          {
            andConditions: [
              { column: 'serviceCenter', comparator: 'IN', value: allowableServiceCenters },
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
    { enabled: !!allowableServiceCenters }
  );

  const memberSearchOptions = memberData?.members?.list?.edges?.map((item) => ({
    label: item?.node?.name?.local,
    value: item?.node?.id,
  }));

  useEffect(() => {
    setValue(
      'memberIds',
      data?.map((item) => ({ memberName: item?.name?.local, id: item?.id }))
    );
  }, [data]);

  const onSubmit = () => {
    const values = getValues();
    asyncToast({
      id: 'add-member',
      msgs: {
        success: 'new members added succesfully',
        loading: 'adding new members',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['groupDetails']);
      },
      promise: mutateAsync({
        input: {
          groupId: router?.query?.['id'] as string,
          memberIds: values?.memberIds?.map(
            (item: { id: string; memberName: { value: string } }) =>
              item?.id || item?.memberName?.value
          ),
        },
      }),
    });
  };

  return (
    <>
      <DetailsPageHeaderBox title="MF Group Members" />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s8">
            <FormEditableTable
              name="memberIds"
              label="MF Group Members"
              hideSN
              canDeleteRow
              searchPlaceholder="Search for Members"
              columns={[
                {
                  accessor: 'memberName',
                  header: 'Member Name',
                  cellWidth: 'auto',
                  fieldType: 'search',
                  searchOptions: memberSearchOptions,
                  searchLoading: isFetching,
                  searchCallback: (newSearch) => {
                    setSearchTerm(newSearch);
                  },
                },
              ]}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={onSubmit}>Save Changes</Button>
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

export default GroupMembers;
