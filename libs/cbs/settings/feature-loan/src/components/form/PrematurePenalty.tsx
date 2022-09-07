import {
  PrematurePenaltyDateType,
  useGetCoaListQuery,
} from '@coop/cbs/data-access';
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

  const coaList = coaData?.map((item) => {
    return {
      label: item?.name?.en as string,
      value: item?.id as string,
    };
  });

  return (
    <FormSection header="depositProductPrematuredPenaltySetup">
      <FormSelect
        name="prematurePenalty.penaltyDateType"
        label={t['depositProductPenaltyDateType']}
        options={penaltyDataType}
      />
      <FormInput
        name="prematurePenalty.noOfDays"
        label={t['depositProductNumberofDays']}
      />
      <FormSelect
        name="prematurePenalty.penaltyLedgerMapping"
        label={t['depositProductPenaltyLedgerMapping']}
        options={coaList}
      />
      <FormInput
        name="prematurePenalty.penaltyAmount"
        type={'number'}
        label={t['depositProductPenaltyAmount']}
        textAlign={'right'}
      />
      <FormInput
        name="prematurePenalty.penaltyRate"
        label={t['depositProductPenaltyRate']}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        textAlign={'right'}
      />
    </FormSection>
  );
};
