import { Alert, FormSection, GridItem, Text } from '@myra-ui';

import { FormAmountInput, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const WithdrawPenalty = () => {
  const { t } = useTranslation();

  // const { data: coa } = useGetCoaListQuery({
  //   filter: {
  //     active: true,
  //   },
  // });

  // const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  // const coaList = coaData?.map((item) => ({
  //   label: item?.name?.en as string,
  //   value: item?.id as string,
  // }));

  return (
    <FormSection header="depositProductWithdrawPenaltySetup">
      <FormInput
        isRequired
        name="withdrawPenalty.penaltyRate"
        label={t['depositProductPenaltyRate']}
        textAlign="right"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        type="number"
      />
      <FormAmountInput
        type="number"
        name="withdrawPenalty.penaltyAmount"
        label={t['depositProductPenaltyAmount']}
      />

      {/* <FormSelect
        name="withdrawPenalty.penaltyLedgerMapping"
        label={t['depositProductPenaltyedgerMapping']}
        options={coaList}
      /> */}
      <GridItem colSpan={3}>
        <Alert status="warning">
          <Text fontWeight="Medium" fontSize="r1">
            {t['penaltyAlert']}
          </Text>
        </Alert>
      </GridItem>
    </FormSection>
  );
};
