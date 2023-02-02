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
  const redirectAccountId = router.query['accountId'];

  return (
    <>
      <GridItem colSpan={2}>
        <FormMemberSelect name="memberId" label="Member Search" />
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
