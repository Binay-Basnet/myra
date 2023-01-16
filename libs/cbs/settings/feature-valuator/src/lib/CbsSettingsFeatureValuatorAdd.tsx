import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Container, FormFooter, FormHeader, Grid, GridItem, Text } from '@myra-ui';

import {
  useGetValuatorQuery,
  useSetValuatorMutation,
  ValuatorInput,
  ValuatorType,
} from '@coop/cbs/data-access';
import { ContainerWithDivider, InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAddress,
  FormDatePicker,
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormPhoneNumber,
  FormSelect,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const CbsSettingsFeatureValuatorAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const methods = useForm();

  const { reset } = methods;

  const { data: editValues } = useGetValuatorQuery(
    { id: router.query['id'] as string },
    { enabled: !!router.query['id'] && router.pathname.includes('edit') }
  );

  const editData = editValues?.settings?.general?.valuator?.formState?.data;

  const { mutateAsync } = useSetValuatorMutation();
  const queryClient = useQueryClient();

  const handleSave = async () => {
    await asyncToast({
      promise: mutateAsync({
        id: router.query['id'] as string,
        data: methods.getValues(),
      }),
      id: 'valutaor-add',
      msgs: {
        success: 'New Valuator Added',
        loading: 'Adding New Valuator',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getValuatorList']);
        queryClient.invalidateQueries(['getValuator']);
        router.push(ROUTES.SETTINGS_GENERAL_LOAN_VALUATOR);
      },
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof ValuatorInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  useEffect(() => {
    if (editData) {
      reset({
        ...editData,
        address: { ...editData?.address, locality: editData?.address?.locality?.local },
      });
    }
  }, [reset, editData, router.query?.['id']]);

  return (
    <>
      <Container height="fit-content" p="0" minW="container.lg">
        <FormProvider {...methods}>
          <form>
            <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
              <FormHeader title={t['settingsGeneralValuatorFormNewValuator']} />
            </Box>

            <Box bg="white" pb="100px">
              <Box px="s20" py="s24">
                <ContainerWithDivider>
                  <Box display="flex" flexDirection="column" gap="s16">
                    <Text variant="tableHeader" color="gray.700">
                      {t['settingsGeneralValuatorFormValuatorSetup']}
                    </Text>
                    <InputGroupContainer>
                      <GridItem colSpan={2}>
                        <FormInput
                          name="valuatorName"
                          label={t['settingsGeneralValuatorFormValuatorName']}
                        />
                      </GridItem>

                      <FormSelect
                        name="valuatorType"
                        label={t['settingsGeneralValuatorFormValuatorType']}
                        options={[
                          {
                            label: t['memberLayoutIndividual'],
                            value: ValuatorType.Individual,
                          },
                          {
                            label: t['settingsOrganization'],
                            value: ValuatorType.Organization,
                          },
                        ]}
                      />

                      <FormInput
                        type="text"
                        name="valuatorId"
                        label={t['settingsGeneralValuatorFormValuatorID']}
                      />

                      <FormSelect
                        name="academicQualification"
                        label={t['settingsGeneralValuatorFormAcademicQualification']}
                        options={[
                          {
                            label: 'SEE',
                            value: 'SEE',
                          },
                          {
                            label: 'High School Graduate',
                            value: 'High School Graduate',
                          },
                          {
                            label: 'Bachelors',
                            value: 'Bachelors',
                          },
                          {
                            label: 'Masters',
                            value: 'Masters',
                          },
                          {
                            label: 'PHD',
                            value: 'PHD',
                          },
                        ]}
                      />

                      <FormInput
                        type="text"
                        name="valuationLicenseNo"
                        label={t['settingsGeneralValuatorFormValuationLicenseNo']}
                      />

                      <FormDatePicker
                        name="renewalDate"
                        label={t['settingsGeneralValuatorFormValuatorLatestRenewalDate']}
                        maxToday
                      />

                      <FormDatePicker
                        name="contractDate"
                        label={t['settingsGeneralValuatorFormValuatorSaccosContractDate']}
                        maxToday
                      />

                      <FormInput
                        name="insurancePremium"
                        type="number"
                        label={t['settingsGeneralValuatorFormInsurancePremiumPercent']}
                        textAlign="right"
                        rightElement={
                          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                            %
                          </Text>
                        }
                      />
                    </InputGroupContainer>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s16">
                    <Text variant="tableHeader" color="gray.700">
                      {t['settingsGeneralValuatorFormContactDetails']}
                    </Text>

                    <InputGroupContainer>
                      <FormPhoneNumber
                        name="mobileNo"
                        label={t['settingsGeneralValuatorFormMobileNo']}
                      />

                      <FormPhoneNumber
                        name="phoneNo"
                        label={t['settingsGeneralValuatorFormPhoneNo']}
                      />

                      <FormEmailInput name="email" label={t['settingsGeneralValuatorFormEmail']} />
                    </InputGroupContainer>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s16">
                    <Text variant="tableHeader" color="gray.700">
                      {t['settingsGeneralValuatorFormAddress']}
                    </Text>
                    <InputGroupContainer>
                      <FormAddress name="address" />
                    </InputGroupContainer>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s16">
                    <Text variant="tableHeader" color="gray.700">
                      {t['settingsGeneralValuatorFormDocumentsDeclaration']}
                    </Text>

                    <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
                      <FormFileInput
                        size="lg"
                        label={t['settingsGeneralValuatorFormDocumentDeclarationLabel']}
                        name="documents"
                      />
                    </Grid>
                  </Box>
                </ContainerWithDivider>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" p="0" height="fit-content">
            <FormFooter draftButton={null} mainButtonHandler={handleSave} mainButtonLabel="Save" />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default CbsSettingsFeatureValuatorAdd;
