import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { Box, Text } from '@myra-ui';

import { useGetDepositSettingsIroQuery, useSetDepositIroMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureDepositIROSetupProps {}

export const CbsSettingsFeatureDepositIROSetup = () => {
  const { t } = useTranslation();

  const methods = useForm({});
  const router = useRouter();

  const { control, watch, reset } = methods;

  const { mutate } = useSetDepositIroMutation();
  const { data: editValues, refetch } = useGetDepositSettingsIroQuery();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ data });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    refetch();
    if (editValues) {
      const editValueData = editValues?.settings?.general?.deposit?.iroFormState?.data;
      reset({
        ...editValueData,
      });
    }
  }, [editValues, router.asPath, refetch]);

  return (
    <Box pb="s20" width="full" display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" h="fit-content">
        <Box p="s16" flex={1}>
          <Box borderBottom="1px" borderBottomColor="border.layout" py="s8" w="100%">
            <Text variant="pageHeader" color="neutralColorLight.Gray-80">
              {t['settingsDepositIro']}
            </Text>
            <Text variant="formInput" fontSize="r1" fontWeight="400" color="gray.400">
              {t['settingsDepositIroSetup']}
            </Text>
          </Box>
          <Box mt="s12">
            <Box pl="s12" py="s12" border="1px" borderColor="border.layout" w="100%">
              <Text variant="tableHeader" color="neutralColorLight.Gray-80">
                {t['settingsDepositIro']}
              </Text>
            </Box>
            <Box p="s12" border="1px" borderColor="border.layout" w="100%">
              <FormProvider {...methods}>
                <form>
                  <Box display="flex" flexDirection="column" rowGap="s16" padding="s12">
                    <Box>
                      <FormInput
                        name="iroName"
                        type="text"
                        control={control}
                        label={t['settingsDepositIroName']}
                        __placeholder={t['settingsDepositIroName']}
                      />
                    </Box>
                    <Box display="flex" columnGap="s16" alignItems="center">
                      <FormInput
                        name="iroAddress"
                        type="text"
                        control={control}
                        label={t['settingsDepositIroAddress']}
                        __placeholder={t['settingsDepositIroAddress']}
                        w="100%"
                      />
                      <FormInput
                        name="iroCode"
                        type="text"
                        control={control}
                        label={t['settingsDepositIroCode']}
                        __placeholder={t['settingsDepositIroCode']}
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
};

export default CbsSettingsFeatureDepositIROSetup;
