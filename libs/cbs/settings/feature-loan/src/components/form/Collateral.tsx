import { useFormContext } from 'react-hook-form';

import {
  Collateral,
  LoanProductInput,
  useGetLoanGeneralSettingsQuery,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { Vehicle } from './Vehicle';
import { SubHeadingText } from '../formui';

export const CollateralForm = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<LoanProductInput>();

  const isCollateral = watch('isCollateralRequired');
  const collateralTypes = watch('collateralTypes');

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  const { data } = useGetLoanGeneralSettingsQuery();

  const collateralList = data?.settings?.general?.loan?.general?.collateralList;

  const landFilterValue = collateralList && collateralList?.filter((item) => item?.name === 'Land');

  const landOption = landFilterValue?.map((item) => ({
    label: item?.name as string,
    value: item?.id as string,
  }));

  const landandBuildFilterValue =
    collateralList && collateralList?.filter((item) => item?.name === 'Land And Buildings');

  const landAndBuildingOption = landandBuildFilterValue?.map((item) => ({
    label: item?.name as string,
    value: item?.id as string,
  }));

  const vehicleFilterValue =
    collateralList && collateralList?.filter((item) => item?.name === 'Vehicle');

  const vehicleOption = vehicleFilterValue?.map((item) => ({
    label: item?.name as string,
    value: item?.id as string,
  }));

  // const landOp = collateralList && collateralList?.filter((item) => item?.name === 'Land');

  // const landOption = landOp?.map((item) => ({
  //   label: item?.name,
  //   value: item?.id,
  // }));

  // console.log('data', collateralList);

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s16">
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <SubHeadingText>{t['loanProductCollateral']} </SubHeadingText>
            <FormSwitchTab name="isCollateralRequired" options={yesNo} />
          </Box>
          {isCollateral && (
            <>
              <FormCheckboxGroup name="collateralTypes" list={landOption} />

              {/* {collateralTypes?.includes(landOption[0]?.value) && <Land landOption={landOption} />} */}

              <FormCheckboxGroup name="collateralTypes" list={landAndBuildingOption} />

              {/* {collateralTypes?.includes(landAndBuildingOption[0]?.value) && (
                <LandAndBuilding landAndBuildingOption={landAndBuildingOption} />
              )} */}

              <FormCheckboxGroup name="collateralTypes" list={vehicleOption} />

              {collateralTypes?.includes(Collateral.Vehicle) && <Vehicle />}

              {/* <FormCheckboxGroup name="collateralTypes" list={depositSavingOption} /> */}

              {/* {collateralTypes?.includes(Collateral.DepositOrSaving) && <DepositSaving />} */}

              {/* <FormCheckboxGroup name="collateralTypes" list={documentOption} />
              <FormCheckboxGroup name="collateralTypes" list={otherOption} /> */}
            </>
          )}
        </Box>
      </GridItem>
    </FormSection>
  );
};
