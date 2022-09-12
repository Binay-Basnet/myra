import { useFormContext } from 'react-hook-form';

import { Collateral } from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DepositSaving } from './DepositSaving';
import { Land } from './Land';
import { LandAndBuilding } from './LandAndBuilding';
import { Vehicle } from './Vehicle';
import { SubHeadingText } from '../formui';

export const CollateralForm = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const collateral = watch('isCollateralRequired');
  const collateralTypes = watch('collateralTypes');

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  const landOption = [{ label: t['loanProductLand'], value: Collateral.Land }];
  const landAndBuildingOption = [
    {
      label: t['loanProductLandandBuilding'],
      value: Collateral.LandAndBuilding,
    },
  ];
  const vehicleOption = [
    { label: t['loanProductVehicle'], value: Collateral.Vehicle },
  ];
  const depositSavingOption = [
    { label: t['loanProductDepositSaving'], value: Collateral.DepositOrSaving },
  ];
  const docOption = [
    { label: t['loanProductDocuments'], value: Collateral.Documents },
  ];
  const otherOption = [
    { label: t['loanProductOthers'], value: Collateral.Others },
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
              <FormCheckboxGroup name="collateralTypes" list={landOption} />

              {collateralTypes?.includes(Collateral.Land) && <Land />}

              <FormCheckboxGroup
                name="collateralTypes"
                list={landAndBuildingOption}
              />

              {collateralTypes?.includes(Collateral.LandAndBuilding) && (
                <LandAndBuilding />
              )}

              <FormCheckboxGroup name="collateralTypes" list={vehicleOption} />

              {collateralTypes?.includes(Collateral.Vehicle) && <Vehicle />}

              <FormCheckboxGroup
                name="collateralTypes"
                list={depositSavingOption}
              />

              {collateralTypes?.includes(Collateral.DepositOrSaving) && (
                <DepositSaving />
              )}

              <FormCheckboxGroup name="collateralTypes" list={docOption} />
              <FormCheckboxGroup name="collateralTypes" list={otherOption} />
            </>
          )}
        </Box>
      </GridItem>
    </FormSection>
  );
};
