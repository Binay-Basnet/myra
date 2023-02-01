import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { GridItem } from '@myra-ui';

import { ObjState, SavingStatementReportSettings } from '@coop/cbs/data-access';
import { FormAccountSelect, FormMemberSelect } from '@coop/shared/form';

import { ReportDateRange } from '../components';

export const SavingReportInputs = () => {
  const router = useRouter();

  const methods = useFormContext<SavingStatementReportSettings>();

  const memberId = methods.watch('memberId');

  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  const redirectAccountId = router.query['accountId'];

  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  useEffect(() => {
    if (redirectAccountId && memberId) {
      methods.setValue('accountId', String(redirectAccountId));
    }
  }, [memberId, redirectAccountId]);

  return (
    <>
      <GridItem colSpan={2}>
        <FormMemberSelect name="memberId" label="Member Search" isDisabled={!!redirectMemberId} />
      </GridItem>
      <GridItem colSpan={1}>
        <FormAccountSelect
          name="accountId"
          memberId={memberId}
          label="Select Account"
          filterBy={ObjState?.Active}
          isDisabled={!!redirectAccountId}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </>
  );
};
