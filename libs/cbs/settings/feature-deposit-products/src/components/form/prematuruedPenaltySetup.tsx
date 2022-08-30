// import debounce from 'lodash/debounce';
import {
  PrematurePenaltyDateType,
  useGetCoaListQuery,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const PrematuredPenalty = () => {
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
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductPrematuredPenaltySetup']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormSelect
          name="prematurePenalty.penaltyDateType"
          label={t['depositProductPenaltyDateType']}
          options={penaltyDataType}
        />
        <FormInput
          name="prematurePenalty.noOfDays"
          label={t['depositProductNumberofDays']}
          __placeholder={t['depositProductNoofdays']}
        />
        <FormSelect
          name="prematurePenalty.penaltyLedgerMapping"
          label={t['depositProductPenaltyLedgerMapping']}
          options={coaList}
        />
        <FormInput
          name="prematurePenalty.penaltyAmount"
          type={'number'}
          label={t['depositProductPenaltyRs']}
          textAlign={'right'}
          __placeholder="0"
        />
        <FormInput
          name="prematurePenalty.penaltyRate"
          label={t['depositProductPenaltyRate']}
          __placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          textAlign={'right'}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
