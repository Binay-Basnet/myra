import { useFormContext } from 'react-hook-form';

import { Alert, Box, DEFAULT_PAGE_SIZE, FormSection, GridItem } from '@myra-ui';

import { ObjState, useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { FormAccountSelect, FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type AmountType = {
  totalAmount: number;
};

export const Account = ({ totalAmount }: AmountType) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch } = methods;

  const memberId = watch('memberId');
  const accountId = watch('account.accountId');

  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const availableBalance = accountListData?.account?.list?.edges?.filter(
    (item) => item?.node?.id === accountId
  );

  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormAccountSelect
          name="account.accountId"
          memberId={memberId}
          label={t['sharePurchaseSelectAccount']}
          filterBy={ObjState.Active}
          isLinkedAccounts
        />
        {availableBalance && availableBalance?.length > 0 && (
          <Box mt="s8">
            <Alert
              status="info"
              title={`${t['sharePurchaseAvailableBalance']} ${
                (availableBalance && availableBalance[0]?.node?.balance) ?? 0
              }`}
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
