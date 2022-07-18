import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// import debounce from 'lodash/debounce';
import { Box, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AccountServicesCharge } from '../components';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureLoanProductsProps {}

export function CbsSettingsFeatureLoanProducts(
  props: CbsSettingsFeatureLoanProductsProps
) {
  const router = useRouter();
  const { t } = useTranslation();
  const methods = useForm();
  const { control, handleSubmit, getValues, watch, setError } = methods;

  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} flexDirection="row" h="fit-content">
        <Box p="s16" flex={1}>
          <Box
            borderBottom={'1px'}
            borderBottomColor="border.layout"
            py="s8"
            w="100%"
          >
            <TextFields variant="pageHeader" color="neutralColorLight.Gray-80">
              Insurance Scheme Setup
            </TextFields>
          </Box>
          <Box mt="s12">
            <Box
              pl="s12"
              py="s12"
              border={'1px'}
              borderColor="border.layout"
              w="100%"
            >
              <TextFields
                variant="tableHeader"
                color="neutralColorLight.Gray-80"
              >
                Setup insurance scheme setup
              </TextFields>
            </Box>
            <Box p="s12" border={'1px'} borderColor="border.layout" w="100%">
              <FormProvider {...methods}>
                <form>
                  <Box
                    display="flex"
                    flexDirection="column"
                    rowGap="s16"
                    padding="s12"
                  >
                    <AccountServicesCharge />
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CbsSettingsFeatureLoanProducts;
