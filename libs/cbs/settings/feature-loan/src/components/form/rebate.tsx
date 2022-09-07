import { useFormContext } from 'react-hook-form';

import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import { SubHeadingText, SubText } from '@coop/shared/components';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer } from '../formui';

export const Rebate = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const rebate = watch('isRebateApplicable');

  const enableSwitch = [
    {
      label: t['enable'],
      value: true,
    },
    {
      label: t['disable'],
      value: false,
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
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display={'flex'} justifyContent="space-between">
            <TextBoxContainer>
              <SubHeadingText>{t['loanProductRebate']} </SubHeadingText>
              <SubText>{t['loanProductEnterRebatedetails']} </SubText>
            </TextBoxContainer>
            <FormSwitchTab name="isRebateApplicable" options={enableSwitch} />
          </Box>
          {rebate && (
            <BoxContainer
              p="s16"
              border={'1px solid'}
              borderColor="border.layout"
              borderRadius="br2"
            >
              <InputGroupContainer>
                <FormInput
                  name="rebate.daysBeforeInstallmentDate"
                  type="number"
                  label={t['loanProductDaysafterinstallmentdate']}
                />
                <FormInput
                  name="rebate.rebate"
                  type="number"
                  label={t['loanProductRebate']}
                  textAlign={'right'}
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                />
                <FormInput
                  name="rebate.rebateAmount"
                  type="number"
                  label={t['loanProductRebateAmount']}
                />

                <FormSelect
                  name="penalty.penaltyLedgerMapping"
                  label={t['loanProductPenaltyedgerMapping']}
                  options={coaList}
                />
              </InputGroupContainer>
            </BoxContainer>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
