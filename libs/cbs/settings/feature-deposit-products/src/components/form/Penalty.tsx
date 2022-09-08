import { useFormContext } from 'react-hook-form';

import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
} from '../formui';

export const Penalty = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const penalty = watch('penalty');

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

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display={'flex'} justifyContent="space-between">
            <TextBoxContainer>
              <SubHeadingText>{t['depositProductpenalty']} </SubHeadingText>
              <SubText>{t['depositProductEnterPenaltydetails']} </SubText>
            </TextBoxContainer>
            <FormSwitchTab
              name="penalty"
              defaultValue={'false'}
              options={enableSwitch}
            />
          </Box>
          {penalty && (
            <BoxContainer
              p="s16"
              border={'1px solid'}
              borderColor="border.layout"
              borderRadius="br2"
            >
              <Grid templateColumns="repeat(3,1fr)" gap="s16">
                <FormInput
                  name="penaltyData.dayAfterInstallmentDate"
                  type="number"
                  label={t['depositProductDayaftertheinstallmentdate']}
                />

                <FormInput
                  name="penaltyData.penaltyRate"
                  type="number"
                  label={t['depositProductPenalty']}
                  textAlign={'right'}
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                />

                <FormInput
                  name="penaltyData.penaltyAmount"
                  type="number"
                  label={t['depositProductPenaltyAmount']}
                />
              </Grid>
            </BoxContainer>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
