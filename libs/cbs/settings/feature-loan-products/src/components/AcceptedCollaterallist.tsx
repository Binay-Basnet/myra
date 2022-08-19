import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormCheckboxGroup } from '@coop/shared/form';
// import debounce from 'lodash/debounce';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureLoanProductsProps {}

export const AcceptedCollateral = () => {
  const { t } = useTranslation();
  const Vehicle = [{ label: t['settingsLoanVehicle'], value: 'vehicle' }];
  const Land = [{ label: t['settingsLoanLand'], value: 'land' }];
  const House = [{ label: t['settingsLoanHouse'], value: 'house' }];
  const LiveStock = [{ label: t['settingsLoanLivestock'], value: 'livestock' }];
  const Building = [{ label: t['settingsLoanLivestock'], value: 'building' }];

  const DepositAcc = [{ label: t['settingsLoanDeposit'], value: 'depositAcc' }];

  const Equipment = [{ label: t['settingsLoanEquipment'], value: 'equipment' }];

  const Goods = [{ label: t['settingsLoanGoods'], value: 'goods' }];
  return (
    <Box display="flex" flexDirection={'column'} gap="s16">
      <Box display="flex" flexDirection={'column'} gap="s4">
        <Text fontSize="r1" fontWeight="500">
          {t['settingsLoanAccepted']}
        </Text>
        <Text fontSize="s2" fontWeight="400">
          {t['settingsLoanChecklist']}
          Checklist is configured from Document Master
        </Text>
      </Box>
      <InputGroupContainer>
        <FormCheckboxGroup name="vehicleCollateral" list={Vehicle} />
        <FormCheckboxGroup name="landCollateral" list={Land} />
        <FormCheckboxGroup name="houseCollateral" list={House} />
        <FormCheckboxGroup name="livestockCollateral" list={LiveStock} />
        <FormCheckboxGroup name="buildingCollateral" list={Building} />
        <FormCheckboxGroup name="depositaccCollateral" list={DepositAcc} />
        <FormCheckboxGroup name="equipmentCollateral" list={Equipment} />
        <FormCheckboxGroup name="goodsCollateral" list={Goods} />
      </InputGroupContainer>
    </Box>
  );
};
