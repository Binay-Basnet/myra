import { Control } from 'react-hook-form';

import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormSelect, FormInput } from '@coop/shared/form';
import { Box, Grid, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];
type Props = {
  control: Control<any>;
};

interface IOptions {
  label: string;
  value: string;
}

const useAdminsitration = () => {
  const { status, data } = useAllAdministrationQuery();

  if (status === 'loading') return null;

  if (data) {
    const provinceOptions = data.administration.all.map(({ id, name }) => ({
      label: name,
      value: id,
    }));

    const allProvinces = data.administration.all;

    const districtsOptions = allProvinces.reduce((obj, curr) => {
      return {
        ...obj,
        [curr.id]: curr.districts.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
      };
    }, {} as { [key: string]: Array<IOptions> });
    const municipalitiesOptions = allProvinces.reduce((obj, curr) => {
      return {
        ...obj,
        [curr.id]: curr.districts.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
      };
    }, {} as { [key: string]: Array<IOptions> });

    return { provinces: provinceOptions, districts: districtsOptions };
  }
};

export const AddressOrganization = ({ control }: Props) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        <GridItem>
          {' '}
          <FormSelect
            label={t['settingsOrgAddressProvince']}
            options={options}
            control={control}
            name="organizationProvince"
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormSelect
            label={t['settingsOrgAddressDistrict']}
            options={options}
            control={control}
            name="organizationDistrict"
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormSelect
            label={t['settingsOrgAddressLocalLevel']}
            options={options}
            control={control}
            name="organizationVDC"
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormInput
            label={t['settingsOrgAddressWardNo']}
            placeholder={t['settingsOrgAddressEnterWard']}
            control={control}
            name={'organizationWard'}
          />
        </GridItem>
        <GridItem>
          {' '}
          <FormInput
            label={t['settingsOrgAddressLocality']}
            placeholder={t['settingsOrgAddressLocality']}
            control={control}
            name={'organizationLocality'}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
