import { InputGroupContainer } from '@coop/accounting/ui-components';
import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubHeadingText, TextBoxContainer } from '../formui';

export const WithdrawPenalty = () => {
  const { t } = useTranslation();

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
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>
            {t['depositProductWithdrawPenaltySetup']}
          </SubHeadingText>
        </TextBoxContainer>
      </Box>
      <InputGroupContainer>
        <FormInput
          name="withdrawPenalty.penaltyAmount"
          label={t['depositProductPenaltyAmount']}
        />
        <FormInput
          name="withdrawPenalty.penaltyRate"
          label={t['depositProductPenaltyRate']}
          textAlign={'right'}
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          type={'number'}
        />
        <FormSelect
          name="withdrawPenalty.penaltyLedgerMapping"
          label={t['depositProductPenaltyedgerMapping']}
          options={coaList}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
