import { FormProvider, useForm } from 'react-hook-form';

import { Box, Divider } from '@coop/shared/ui';

// import { useTranslation } from '@coop/shared/utils';
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
        </form>
      </FormProvider>
    </Box>
  );
}

export default CbsSettingsFeatureProductType;
