import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Button, FormSection } from '@myra-ui';

import { Member, useAddMembersMutation } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';
import { FormEditableTable, FormLayout } from '@coop/shared/form';

export const GroupMembers = (props: { data: Member[] }) => {
  const router = useRouter();
  const { data } = props;
  const methods = useForm();
  const { setValue, getValues } = methods;

  const { mutateAsync } = useAddMembersMutation();

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
      onSuccess: () => {},
      promise: mutateAsync({
        input: {
          groupId: router?.query?.['id'] as string,
          memberIds: values?.memberIds?.map((item: { id: string }) => item?.id),
        },
      }),
    });
  };

  return (
    <>
      <DetailsPageHeaderBox title="Group Members" />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <FormLayout methods={methods}>
          <FormLayout.Header title="Group Member List" />
          <FormLayout.Content>
            <FormLayout.Form>
              <FormSection templateColumns={1} divider={false}>
                <FormEditableTable
                  name="memberIds"
                  label=""
                  canAddRow={false}
                  hideSN
                  canDeleteRow
                  columns={[
                    {
                      accessor: 'memberName',
                      header: 'Member Name',
                      getDisabled: () => true,
                      cellWidth: 'auto',
                    },
                  ]}
                />
                <Box display="flex" justifyContent="flex-end">
                  <Button onClick={onSubmit}>Save Changes</Button>
                </Box>
              </FormSection>
            </FormLayout.Form>
          </FormLayout.Content>
        </FormLayout>
      </Box>
    </>
  );
};

export default GroupMembers;
