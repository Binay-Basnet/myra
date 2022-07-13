import { FormProvider, useForm } from 'react-hook-form';

import { FormInput } from '@coop/shared/form';
import { Box, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureDepositTDSProps {}

export function CbsSettingsFeatureDepositTDS(
  props: CbsSettingsFeatureDepositTDSProps
) {
  const { t } = useTranslation();

  const methods = useForm({});

  const {
    control,
    //  handleSubmit, getValues, watch, setError
  } = methods;

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
              {t['settingsDepositTds']}
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
                {t['settingsDepositTdsAgainst']}
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
                    <Box
                      display="flex"
                      columnGap="s8"
                      justifyContent="space-between"
                    >
                      <Text
                        fontSize="s3"
                        fontWeight={500}
                        p="10px 12px"
                        flexBasis="65%"
                      >
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
                      <TextFields
                        variant="bodyRegular"
                        p="7.5px 12px"
                        flexBasis="65%"
                      >
                        {t['settingsDepositIndividual']}
                      </TextFields>
                      <Box flexBasis="35%">
                        <FormInput
                          name="individual"
                          type="text"
                          control={control}
                        />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      columnGap="s8"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextFields
                        variant="bodyRegular"
                        p="7.5px 12px"
                        flexBasis="65%"
                      >
                        {t['settingsDepositInstitutional']}
                      </TextFields>
                      <Box flexBasis="35%">
                        <FormInput
                          name="institutional"
                          type="text"
                          control={control}
                        />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      columnGap="s8"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextFields
                        variant="bodyRegular"
                        p="7.5px 12px"
                        flexBasis="65%"
                      >
                        {t['settingsDepositCooperative']}
                      </TextFields>
                      <Box flexBasis="35%">
                        <FormInput
                          name="cooperative"
                          type="text"
                          control={control}
                        />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      columnGap="s8"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <TextFields
                        variant="bodyRegular"
                        p="7.5px 12px"
                        flexBasis="65%"
                      >
                        {t['settingsDepositCooperativeUnion']}
                      </TextFields>
                      <Box flexBasis="35%">
                        <FormInput
                          name="cooperativeUnion"
                          type="text"
                          control={control}
                        />
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
}

export default CbsSettingsFeatureDepositTDS;
