import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import { InputGroupContainer } from '@coop/cbs/settings/ui-containers';
import { SubHeadingText, SubText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer } from '../formui';

export const Rebate = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const { watch } = useFormContext();
  const rebate = watch('isRebateApplicable');

  const enableSwitch = [
    {
      label: t['enable'],
      value: true,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['disable'],
      value: false,
      isDisabled: router?.asPath?.includes('/edit'),
    },
  ];

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
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display="flex" justifyContent="space-between">
            <TextBoxContainer>
              <SubHeadingText>{t['loanProductRebate']} </SubHeadingText>
              <SubText>{t['loanProductEnterRebatedetails']} </SubText>
            </TextBoxContainer>
            <FormSwitchTab name="isRebateApplicable" options={enableSwitch} />
          </Box>
          {rebate && (
            <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
              <InputGroupContainer>
                <FormInput
                  name="rebate.dayBeforeInstallmentDate"
                  type="number"
                  label={t['loanProductDaysafterinstallmentdate']}
                  isDisabled={router?.asPath?.includes('/edit')}
                />
                <FormInput
                  name="rebate.rebateRate"
                  type="number"
                  label={t['loanProductRebateRate']}
                  textAlign="right"
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                  isDisabled={router?.asPath?.includes('/edit')}
                />
                <FormInput
                  name="rebate.rebateAmount"
                  type="number"
                  label={t['loanProductRebateAmount']}
                  isDisabled={router?.asPath?.includes('/edit')}
                />
                {/* 
                <FormSelect
                  name="rebate.rebateLedgerMapping"
                  label={t['loanProductloanLedgerMapping']}
                  options={coaList}
                /> */}
                <GridItem colSpan={3}>
                  <Alert status="warning">
                    <Text fontWeight="Medium" fontSize="r1">
                      {t['rebateAlert']}
                    </Text>
                  </Alert>
                </GridItem>
              </InputGroupContainer>
            </BoxContainer>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
