import { PrematurePenaltyDateType, useGetCoaListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const PrematurePenalty = () => {
  const { t } = useTranslation();

  const penaltyDataType = [
    {
      label: t['depositProductEffectiveDaysFromStart'],
      value: PrematurePenaltyDateType.EffectiveDaysFromStart,
    },
    {
      label: t['depositProductRemainingDaystoGetMatured'],
      value: PrematurePenaltyDateType.RemainingDaysToGetMatured,
    },
  ];

  const { data: coa } = useGetCoaListQuery({
    filter: {
      active: true,
    },
  });

  const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  const coaList = coaData?.map((item) => ({
    label: item?.name?.en as string,
    value: item?.id as string,
  }));

  return (
    <FormSection header="depositProductPrematuredPenaltySetup">
      <FormSelect
        name="prematurePenaltySetup.penaltyDateType"
        label={t['depositProductPenaltyDateType']}
        options={penaltyDataType}
      />
      <FormInput name="prematurePenaltySetup.noOfDays" label={t['depositProductNumberofDays']} />
      <FormSelect
        name="prematurePenaltySetup.penaltyLedgerMapping"
        label={t['depositProductPenaltyLedgerMapping']}
        options={coaList}
      />
      <FormInput
        name="prematurePenaltySetup.penaltyAmount"
        type="number"
        label={t['depositProductPenaltyAmount']}
        textAlign="right"
      />
      <FormInput
        name="prematurePenaltySetup.penaltyRate"
        label={t['depositProductPenaltyRate']}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        textAlign="right"
      />
    </FormSection>
  );
};
