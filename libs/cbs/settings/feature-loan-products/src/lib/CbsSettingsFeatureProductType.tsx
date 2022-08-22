import { FormProvider, useForm } from 'react-hook-form';

import { SettingsPageFooter } from '@coop/cbs/settings/ui-layout';
import { Box, Divider } from '@coop/shared/ui';

// import { getRouterQuery, useTranslation } from '@coop/shared/utils';
import {
  NatureOfProductTable,
  ProductSubTypeTable,
  ProductTypeTable,
} from '../components';

export function CbsSettingsFeatureProductType() {
  // const { t } = useTranslation();
  const methods = useForm();

  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <FormProvider {...methods}>
        <form>
          <Box display="flex" flexDirection="column" rowGap="s32" padding="s16">
            <ProductTypeTable />
            <Divider />
            <ProductSubTypeTable />
            <Divider />
            <NatureOfProductTable />
          </Box>
          <SettingsPageFooter />
        </form>
      </FormProvider>
    </Box>
  );
}

export default CbsSettingsFeatureProductType;
