import { FormProvider, useForm } from 'react-hook-form';

import { FormInput } from '@coop/shared/form';
import { Box, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureDepositIROSetupProps {}

export function CbsSettingsFeatureDepositIROSetup(
  props: CbsSettingsFeatureDepositIROSetupProps
) {
  const { t } = useTranslation();

  const methods = useForm({});

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
              {t['settingsDepositIro']}
            </TextFields>
            <Text
              variant="formInput"
              fontSize="r1"
              fontWeight="400"
              color="gray.400"
            >
              {t['settingsDepositIroSetup']}
            </Text>
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
                {t['settingsDepositIro']}
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
                    <Box>
                      <FormInput
                        name="individual"
                        type="text"
                        control={control}
                        label={t['settingsDepositIroName']}
                        placeholder={t['settingsDepositIroName']}
                      />
                    </Box>
                    <Box display="flex" columnGap="s16" alignItems="center">
                      <FormInput
                        name="iroAddress"
                        type="text"
                        control={control}
                        label={t['settingsDepositIroAddress']}
                        placeholder={t['settingsDepositIroAddress']}
                        w="100%"
                      />
                      <FormInput
                        name="iroCode"
                        type="text"
                        control={control}
                        label={t['settingsDepositIroCode']}
                        placeholder={t['settingsDepositIroCode']}
                        w="100%"
                      />
                    </Box>
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

export default CbsSettingsFeatureDepositIROSetup;
