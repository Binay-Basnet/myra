import { useFormContext } from 'react-hook-form';

import { FormCheckbox, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DepositSaving } from './DepositSaving';
import { Land } from './Land';
import { LandAndBuilding } from './LandAndBuilding';
import { Vehicle } from './Vehicle';
import { SubHeadingText } from '../formui';

export const Collateral = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const collateral = watch('isCollateralRequired');
  const land = watch('land');
  const landAndBuilding = watch('landAndBuilding');
  const vehicle = watch('vehicle');
  const depositSaving = watch('depositSaving');

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display={'flex'} flexDirection="column" gap="s16">
          <Box
            display="flex"
            flexDirection={'row'}
            justifyContent="space-between"
          >
            <SubHeadingText>{t['loanProductCollateral']} </SubHeadingText>
            <FormSwitchTab name="isCollateralRequired" options={yesNo} />
          </Box>
          {collateral && (
            <>
              <FormCheckbox name="land" label={t['loanProductLand']} />
              {land && <Land />}
              <FormCheckbox
                name="landAndBuilding"
                label={t['loanProductLandandBuilding']}
              />
              {landAndBuilding && <LandAndBuilding />}
              <FormCheckbox name="vehicle" label={t['loanProductVehicle']} />
              {vehicle && <Vehicle />}
              <FormCheckbox
                name="depositSaving"
                label={t['loanProductDepositSaving']}
              />
              {depositSaving && <DepositSaving />}
              <FormCheckbox name="document" label={t['loanProductDocuments']} />
              <FormCheckbox name="others" label={t['loanProductOthers']} />
            </>
          )}
        </Box>
      </GridItem>
    </FormSection>
  );
};
