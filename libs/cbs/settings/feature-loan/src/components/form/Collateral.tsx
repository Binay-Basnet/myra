import { useFormContext } from 'react-hook-form';

import { LoanProductInput, useGetLoanGeneralSettingsQuery } from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { DepositSaving } from './DepositSaving';
import { Document } from './Document';
import { Land } from './Land';
import { LandAndBuilding } from './LandAndBuilding';
import { Others } from './Others';
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

  const colValue = data?.settings?.general?.loan?.general?.collateralList;

  const collateralList = colValue?.map((item) => ({
    label: item?.name as string,
    value: item?.id,
    enable: item?.enabled as boolean,
  }));

  const switchCase = (label: string) => {
    switch (label) {
      case 'Land':
        return <Land />;
      case 'Land and Building':
        return <LandAndBuilding />;
      case 'Vehicle':
        return <Vehicle />;
      case 'Deposit / Saving':
        return <DepositSaving />;
      case 'Documents':
        return <Document />;
      case 'Others':
        return <Others />;
      default:
        return null;
    }
  };

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s16">
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <SubHeadingText>{t['loanProductCollateral']} </SubHeadingText>
            <FormSwitchTab name="isCollateralRequired" options={yesNo} />
          </Box>
          {isCollateral &&
            collateralList?.map((item) => (
              <>
                {item?.enable && <FormCheckboxGroup name="collateralTypes" list={[item]} />}

                {collateralTypes?.includes(item.value) && switchCase(item.label)}
              </>
            ))}
        </Box>
      </GridItem>
    </FormSection>
  );
};
