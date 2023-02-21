import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, GridItem } from '@myra-ui';

import { ObjState, useGetAccountDetailsDataQuery } from '@coop/cbs/data-access';
import { FormAccountSelect, FormAmountInput } from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type AmountType = {
  totalAmount: number;
};

export const Account = ({ totalAmount }: AmountType) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch } = methods;

  const memberId = watch('memberId');
  const accountId = watch('account.accountId');

  const { data: accountDetailQueryData } = useGetAccountDetailsDataQuery(
    { id: accountId as string },
    { enabled: !!accountId }
  );

  const availableBalance = useMemo(
    () => accountDetailQueryData?.account?.accountDetails?.data?.availableBalance,
    [accountDetailQueryData]
  );

  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormAccountSelect
          isRequired
          name="account.accountId"
          memberId={memberId}
          label={t['sharePurchaseSelectAccount']}
          filterBy={ObjState.Active}
          isLinkedAccounts
        />
        {availableBalance && (
          <Box mt="s8">
            <Alert
              status="info"
              title={`${t['sharePurchaseAvailableBalance']} ${amountConverter(
                availableBalance ?? 0
              )}`}
              showUndo={false}
            />
          </Box>
        )}
      </GridItem>

      <GridItem colSpan={1}>
        <FormAmountInput
          type="number"
          name="accountAmount"
          label={t['sharePurchaseAccountAmount']}
          defaultValue={totalAmount ?? 0}
          isDisabled
        />
      </GridItem>
    </FormSection>
  );
};
