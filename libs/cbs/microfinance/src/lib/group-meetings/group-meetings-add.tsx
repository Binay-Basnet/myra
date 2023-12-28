import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  MfMeetingInput,
  useListGroupMemberQuery,
  useListGroupQuery,
  useListMfCenterQuery,
  useUpsertMeetingMutation,
} from '@coop/cbs/data-access';
import { advancedTimeConvertor, ROUTES } from '@coop/cbs/utils';
import {
  FormDatePicker,
  FormEditableTable,
  FormInput,
  FormLayout,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const GroupMeetingsAdd = () => {
  const methods = useForm();
  const router = useRouter();
  const { getValues, watch, setValue } = methods;

  const centerIdWatch = watch('centerId');

  const { mutateAsync } = useUpsertMeetingMutation();

  const { data: centerListData } = useListMfCenterQuery({
    pagination: getPaginationQuery(),
  });

  const { data: groupListData } = useListGroupQuery({
    pagination: getPaginationQuery(),
    filter: {
      orConditions: [
        {
          andConditions: [{ column: 'centerId', comparator: 'EqualTo', value: centerIdWatch }],
        },
      ],
    },
  });

  const groupIdWatch = watch('groupId');

  const { data: groupMembersData } = useListGroupMemberQuery(
    {
      pagination: getPaginationQuery(),
      groupID: groupIdWatch,
    },
    { enabled: !!groupIdWatch }
  );
  const groupMember = groupMembersData?.microFinance?.group?.listGroupMembers?.edges;
  useEffect(() => {
    const groupMembersArray = groupMember?.map((item) => ({
      id: item?.node?.id,
      memberName: item?.node?.name?.local,
    }));

    setValue('memberIds', groupMembersArray);
  }, [groupMember]);

  const submitForm = () => {
    const values = getValues();
    asyncToast({
      id: 'add-group-meetings',
      msgs: {
        success: 'new group meetings added succesfully',
        loading: 'adding new group meetings',
      },
      onSuccess: () => {
        router.push(ROUTES?.CBS_MICRO_FINANCE_GROUP_MEETINGS_LIST);
      },
      promise: mutateAsync({
        id: null,
        data: {
          ...values,
          startTime: advancedTimeConvertor(values?.startTime),
          endTime: advancedTimeConvertor(values?.endTime),
          memberIds: values?.memberIds?.map((item: { id: string; invited: boolean }) => ({
            id: item?.id,
            invited: item?.invited || false,
            attended: false,
            sendSms: false,
          })),
        } as MfMeetingInput,
      }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof MfMeetingInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Microfinance Group Meetings" />
      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={2} divider={false}>
            <GridItem colSpan={2}>
              <FormSelect
                label="Select Center"
                name="centerId"
                options={
                  centerListData?.microFinance?.center?.listMFCenter?.edges?.map((item) => ({
                    label: item?.node?.name,
                    value: item?.node?.id,
                  })) as { value: string; label: string }[]
                }
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormSelect
                label="Select Group"
                name="groupId"
                options={
                  groupListData?.microFinance?.group?.listGroup?.edges.map((item) => ({
                    label: item?.node?.groupName,
                    value: item?.node?.id,
                  })) as { value: string; label: string }[]
                }
              />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={2}>
            <GridItem colSpan={2}>
              {' '}
              <FormEditableTable
                name="memberIds"
                label="Members"
                canAddRow={false}
                hideSN
                canDeleteRow={false}
                columns={[
                  {
                    accessor: 'memberName',
                    header: 'Member Name',
                    getDisabled: () => true,
                    cellWidth: 'auto',
                  },
                  {
                    accessor: 'invited',
                    header: 'Invite',
                    fieldType: 'checkbox',
                  },
                ]}
              />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={2}>
            <FormInput label="Agenda" name="agenda" />
            <FormDatePicker label="Date" name="date" />
            <FormInput type="time" label="Start Time" name="startTime" />
            <FormInput type="time" label="End Time" name="endTime" />
          </FormSection>
          <FormSection templateColumns={1} divider={false}>
            <FormTextArea label="Description" name="notes" />
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default GroupMeetingsAdd;
