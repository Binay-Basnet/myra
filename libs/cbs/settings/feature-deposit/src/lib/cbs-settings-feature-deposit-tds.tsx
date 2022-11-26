import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { useGetDepositSettingsTdsQuery, useSetDepositTdsMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Text, TextFields } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureDepositTDSProps {}

export const CbsSettingsFeatureDepositTDS = () => {
  const { t } = useTranslation();

  const methods = useForm({});
  const router = useRouter();

  const { mutate } = useSetDepositTdsMutation();

  const { data: editValues, refetch } = useGetDepositSettingsTdsQuery();

  const { control, watch, reset } = methods;

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
      const editValueData = editValues?.settings?.general?.deposit?.tdsFormState?.data;
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
            <TextFields variant="pageHeader" color="neutralColorLight.Gray-80">
              {t['settingsDepositTds']}
            </TextFields>
          </Box>
          <Box mt="s12">
            <Box pl="s12" py="s12" border="1px" borderColor="border.layout" w="100%">
              <TextFields variant="tableHeader" color="neutralColorLight.Gray-80">
                {t['settingsDepositTdsAgainst']}
              </TextFields>
            </Box>
            <Box p="s12" border="1px" borderColor="border.layout" w="100%">
              <FormProvider {...methods}>
                <form>
                  <Box display="flex" flexDirection="column" rowGap="s16" padding="s12">
                    <Box display="flex" columnGap="s8" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={500} p="10px 12px" flexBasis="65%">
                        {t['settingsDepositMemberType']}
                      </Text>
                      <Text
                        fontSize="s3"
                        fontWeight={500}
                        textAlign="left"
                        py="10px"
                        flexBasis="35%"
                      >
                        {t['settingsDepositTdsPercent']}
                      </Text>
                    </Box>
                    <Box display="flex" columnGap="s8" alignItems="center">
                      <TextFields variant="bodyRegular" p="7.5px 12px" flexBasis="65%">
                        {t['settingsDepositIndividual']}
                      </TextFields>
                      <Box flexBasis="35%">
                        <FormInput name="individual" type="text" control={control} />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      columnGap="s8"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextFields variant="bodyRegular" p="7.5px 12px" flexBasis="65%">
                        {t['settingsDepositInstitutional']}
                      </TextFields>
                      <Box flexBasis="35%">
                        <FormInput name="institution" type="text" control={control} />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      columnGap="s8"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextFields variant="bodyRegular" p="7.5px 12px" flexBasis="65%">
                        {t['settingsDepositCooperative']}
                      </TextFields>
                      <Box flexBasis="35%">
                        <FormInput name="cooperative" type="text" control={control} />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      columnGap="s8"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextFields variant="bodyRegular" p="7.5px 12px" flexBasis="65%">
                        {t['settingsDepositCooperativeUnion']}
                      </TextFields>
                      <Box flexBasis="35%">
                        <FormInput name="coopUnion" type="text" control={control} />
                      </Box>
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

export default CbsSettingsFeatureDepositTDS;
