import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { GridItem } from '@myra-ui';

import { InterestStatementFilter } from '@coop/cbs/data-access';
import { FormDepositWithdrawAccountSelect, FormMemberSelect } from '@coop/shared/form';

import { ReportDateRange } from '../components';

type ReportFilterType = InterestStatementFilter & {
  memberId: string;
};

export const InterestStatementInputs = () => {
  const router = useRouter();

  const methods = useFormContext<ReportFilterType>();

  const memberId = methods.watch('memberId');

  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  const redirectAccountId = router.query['accountId'];

  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId, router]);

  // useEffect(() => {
  //   if (redirectAccountId && memberId) {
  //     methods.setValue('accountId', String(redirectAccountId));
  //   }
  // }, [memberId, redirectAccountId, router]);
  // ('');

  return (
    <>
      <GridItem colSpan={2}>
        <FormMemberSelect name="memberId" label="Member Search" />
      </GridItem>
      <GridItem colSpan={1}>
        <FormDepositWithdrawAccountSelect
          name="accountId"
          isLinkedAccounts
          memberId={memberId}
          label="Select Account"
          isDisabled={!!redirectAccountId}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </>
  );
};
