import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  DocumentInsertInput,
  MfGroupInput,
  useAddMfGroupMutation,
  useCenterDetailsQuery,
  useGetMemberListQuery,
  useListMfCenterQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormFileInput, FormInput, FormLayout, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const documentMap = [
  'agm/bod-decision-document',
  'registered-certificate',
  'moa/aoa',
  'pan-certificate',
  'tax-clearance',
  'latest-audit-report',
  'logo',
  'minute-of-central-rep',
];

export const GroupAdd = () => {
  const methods = useForm();
  const router = useRouter();
  const { getValues, watch } = methods;
  const { mutateAsync } = useAddMfGroupMutation();

  const { data: centerListData } = useListMfCenterQuery({
    pagination: getPaginationQuery(),
  });

  const centerIdWatch = watch('centerId');
  const { data: centerDetails } = useCenterDetailsQuery(
    { centerId: centerIdWatch },
    { enabled: !!centerIdWatch }
  );
  const allowedBranches =
    centerDetails?.microFinance?.center?.centerDetail?.overview?.allowedBranches;
  const { data: memberData } = useGetMemberListQuery(
    {
      pagination: getPaginationQuery(),
      filter: {
        orConditions: [
          {
            andConditions: [
              { column: 'serviceCenter', comparator: 'IN', value: allowedBranches },
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
    { enabled: !!allowedBranches }
  );

  const submitForm = () => {
    const values = getValues();
    asyncToast({
      id: 'add-group',
      msgs: {
        success: 'new group added succesfully',
        loading: 'adding new group',
      },
      onSuccess: () => {
        router.push(ROUTES?.CBS_MICRO_FINANCE_GROUP_LIST);
      },
      promise: mutateAsync({
        input: {
          ...values,
          documents: values?.documents?.map((item: DocumentInsertInput, index: number) => ({
            fieldId: documentMap[index],
            identifiers: item?.identifiers || [],
          })),
        } as MfGroupInput,
      }),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Microfinance Group" />
      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={2}>
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
            <FormInput label="MF Group Name" name="groupName" />
            <FormInput label="MF Group ID" name="groupCode" />
            <FormInput type="number" label="Minimum No of Members Allowed" name="minMembers" />
            <FormInput type="number" label="Maximum No. of Members Allowed" name="maxMembers" />
          </FormSection>
          <FormSection header="MF Group Coordinator" divider={false}>
            <GridItem colSpan={3}>
              <FormSelect
                label="Select Member"
                name="coordinatorId"
                options={
                  memberData?.members?.list?.edges?.map((item) => ({
                    label: item?.node?.name?.local,
                    value: item?.node?.id,
                  })) as { label: string; value: string }[]
                }
              />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={2} header="Document Declarations">
            <FormFileInput name="documents.0.identifiers" label="AGM/BOD Decision Document" />
            <FormFileInput name="documents.1.identifiers" label="Registered Certificate" />
            <FormFileInput name="documents.2.identifiers" label="MOA/AOA" />
            <FormFileInput name="documents.3.identifiers" label="PAN Certificate" />
            <FormFileInput name="documents.3.identifiers" label="Tax Clearance" />
            <FormFileInput name="documents.3.identifiers" label="Latest Audit Report" />
            <FormFileInput name="documents.3.identifiers" label="Logo" />
            <FormFileInput name="documents.3.identifiers" label="Minute of Central Rep" />
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default GroupAdd;
