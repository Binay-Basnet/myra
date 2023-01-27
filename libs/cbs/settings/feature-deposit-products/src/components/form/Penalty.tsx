import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import { FormAmountInput, FormInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubHeadingText, SubText, TextBoxContainer } from '../formui';

export const Penalty = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const penalty = watch('penalty');

  const router = useRouter();

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
              <SubHeadingText>{t['depositProductpenalty']} </SubHeadingText>
              <SubText>{t['depositProductEnterPenaltydetails']} </SubText>
            </TextBoxContainer>
            <FormSwitchTab name="penalty" options={enableSwitch} />
          </Box>
          {penalty && (
            <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
              <Grid templateColumns="repeat(3,1fr)" gap="s16">
                <FormInput
                  name="penaltyData.dayAfterInstallmentDate"
                  type="number"
                  label={t['depositProductDayaftertheinstallmentdate']}
                  isDisabled={router?.asPath?.includes('/edit')}
                />

                <FormInput
                  name="penaltyData.penaltyRate"
                  type="number"
                  label={t['depositProductPenaltyRate']}
                  textAlign="right"
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                  isDisabled={router?.asPath?.includes('/edit')}
                />

                <FormAmountInput
                  type="number"
                  name="penaltyData.penaltyAmount"
                  label={t['depositProductPenaltyAmount']}
                  isDisabled={router?.asPath?.includes('/edit')}
                />
                {/* <FormSelect
                  name="penaltyData.penaltyLedgerMapping"
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
              </Grid>
            </BoxContainer>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
