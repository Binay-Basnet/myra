import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import { asyncToast, Box, FormSection, GridItem, MemberCard, Text } from '@myra-ui';

import {
  useGetIndividualMemberDetails,
  useGetMemberLoanAccountsQuery,
  useMakeMemberDormantMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAccountSelect,
  FormCheckboxGroup,
  FormFileInput,
  FormInput,
  FormLayout,
  FormRadioGroup,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';

const transactionOptions = [
  { label: 'Saving Transaction', value: 'saving' },
  { label: 'Loan Transaction', value: 'loan' },
  { label: 'Share Transaction', value: 'share' },
];

const reasonOptions = [
  { label: 'AML', value: 'AML' },
  { label: 'Banking Crime', value: 'Banking Crime' },
  { label: 'Court Cases', value: 'Court Cases' },
  { label: 'Government Instructions', value: 'Government Instructions' },
  { label: 'KYM Expiry', value: 'KYM Expiry' },
  { label: 'Loan Black List', value: 'Loan Black List' },
  { label: 'Others', value: 'Others' },
];

export const MemberDormantForm = () => {
  const router = useRouter();

  const memberId = router.query?.['id'];

  const { memberDetailData, memberCitizenshipUrl } = useGetIndividualMemberDetails({
    memberId: memberId as string,
  });

  const methods = useForm();

  const reason = methods.watch('reason');
  const blockTransactions = methods.watch('blockTransactions');

  const { data, isFetching } = useGetMemberLoanAccountsQuery(
    {
      memberId: memberId as string,
    },
    { enabled: !!memberId }
  );

  const loanAccountOptions = data?.loanAccount?.memberDisbursedLoanAccounts?.map((mem) => ({
    label: mem?.name as string,
    value: mem?.id as string,
  }));

  const { mutateAsync: makeDormant } = useMakeMemberDormantMutation();

  const handleMakeDormant = () => {
    const values = methods.getValues();

    const filteredValues = {
      ...omit(values, ['blockTransactions', 'specificReason']),
      blockSavingTransaction: values.blockTransactions?.includes('saving'),
      blockLoanTransaction: values.blockTransactions?.includes('loan'),
      blockShareTransaction: values.blockTransactions?.includes('share'),
      reason: values.reason === 'Others' ? values.specificReason : values.reason,
    };

    asyncToast({
      id: 'make-member-dormant',
      msgs: {
        loading: 'Making member dormant',
        success: 'Member made dormant',
      },
      promise: makeDormant({ memberId: memberId as string, data: filteredValues }),
      onSuccess: () => router.push(ROUTES.CBS_MEMBER_LIST),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Member Dormant Form" />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box px="s20">
            <FormSection>
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  code: memberDetailData?.code,
                  memberID: memberDetailData?.id,
                  gender: memberDetailData?.gender,
                  age: memberDetailData?.age,
                  maritalStatus: memberDetailData?.maritalStatus,
                  dateJoined: memberDetailData?.dateJoined,
                  // branch: 'Basantapur',
                  phoneNo: memberDetailData?.contact,
                  email: memberDetailData?.email,
                  address: memberDetailData?.address,
                }}
                // notice="KYM needs to be updated"
                citizenshipPath={memberCitizenshipUrl}
                isInline
              />
            </FormSection>

            <FormSection header="Block Transactions" templateColumns={1}>
              <FormCheckboxGroup
                name="blockTransactions"
                list={transactionOptions}
                orientation="column"
              />
            </FormSection>

            {(blockTransactions?.includes('saving') || blockTransactions?.includes('loan')) && (
              <FormSection templateColumns={1}>
                {blockTransactions?.includes('saving') && (
                  <Box display="flex" flexDirection="column" gap="s8">
                    <Box display="flex" flexDirection="column" gap="s4">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Saving Account
                      </Text>
                      <Text fontSize="s2" fontWeight={400} color="gray.700">
                        The member shall be made dormant against the selected saving account.
                      </Text>
                    </Box>
                    <FormAccountSelect name="savingAccountId" memberId={memberId as string} />
                  </Box>
                )}
                {blockTransactions?.includes('loan') && (
                  <Box display="flex" flexDirection="column" gap="s8">
                    <Box display="flex" flexDirection="column" gap="s4">
                      <Text fontSize="r1" fontWeight={500} color="gray.700">
                        Loan Account
                      </Text>
                      <Text fontSize="s2" fontWeight={400} color="gray.700">
                        The member shall be made dormant against the selected loan account.
                      </Text>
                    </Box>
                    <FormSelect
                      name="loanAccountId"
                      isLoading={isFetching}
                      options={loanAccountOptions}
                    />
                  </Box>
                )}
              </FormSection>
            )}

            <FormSection header="Reason for Dormant" templateColumns={3}>
              <GridItem colSpan={3}>
                <FormRadioGroup name="reason" options={reasonOptions} direction="row" />
              </GridItem>

              {reason === 'Others' && <FormInput name="specificReason" label="Specify Reason" />}
            </FormSection>

            <FormSection>
              <FormFileInput name="documents" label="File Upload" />
            </FormSection>

            <FormSection templateColumns={1} divider={false}>
              <FormTextArea name="notes" label="Notes" rows={3} />
            </FormSection>
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Confirm" mainButtonHandler={handleMakeDormant} />
    </FormLayout>
  );
};

export default MemberDormantForm;
