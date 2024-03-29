import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, SettingsFooter, Text, toast } from '@myra-ui';

import {
  TypeOfShare,
  useGetSettingsShareGeneralDataQuery,
  useSetSettingsShareGeneralMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormCheckbox, FormInput } from '@coop/shared/form';
import { featureCode, useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsGeneralPage = () => {
  const { t } = useTranslation();
  const methods = useForm();
  const router = useRouter();

  const { getValues, reset, watch } = methods;

  // const shareIssueAuthorityOpt = [
  //   {
  //     label: t['shareHeadOffice'],
  //     value: BranchCategory?.HeadOffice,
  //   },
  //   {
  //     label: t['shareRegionalOffice'],
  //     value: BranchCategory?.RegionalOffice,
  //   },
  //   {
  //     label: t['shareServiceCenterBranch'],
  //     value: BranchCategory?.ServiceCenter,
  //   },
  //   {
  //     label: t['shareContactOffice'],
  //     value: BranchCategory?.ContactOffice,
  //   },
  //   {
  //     label: t['shareOther'],
  //     value: BranchCategory?.BranchOffice,
  //   },
  // ];
  const { mutateAsync } = useSetSettingsShareGeneralMutation();
  const { data, refetch } = useGetSettingsShareGeneralDataQuery();
  const settingsGeneralData = data?.settings?.general?.share?.general;
  useEffect(() => {
    if (settingsGeneralData) {
      reset(settingsGeneralData);
    }
  }, [settingsGeneralData]);
  const typeWatch = watch('typeOfShare');

  const handleSubmit = () => {
    const values = getValues();
    const typeValue = typeWatch ? TypeOfShare?.PaidUp : null;
    asyncToast({
      id: 'share-settings-general-id',
      msgs: {
        success: 'Saved',
        loading: 'Saving Changes ',
      },
      onSuccess: () => router.push(ROUTES.SETTINGS_GENERAL_SHARE),
      promise: mutateAsync(
        {
          data: {
            ...values,
            typeOfShare: typeValue,
          },
        },
        { onSuccess: () => refetch() }
      ),
    });
  };
  const handleDiscard = () => {
    router.reload();
    toast({
      message: 'Changes have been discarded',
      id: 'Discard-settings-Sharegeneral',
      type: 'info',
    });
  };

  return (
    <FormProvider {...methods}>
      <form>
        <Box p="s16" pb="80px" display="flex" flexDir="column" gap="s16">
          {' '}
          <ShareSettingsHeader
            title={`${t['settingsShareGeneral']} - ${featureCode.generalShareSetting}`}
          />
          <ShareSettingsCard title={t['shareTypesOfShare']} subtitle={t['shareChooseTypeOfShare']}>
            <Box display="flex" flexDir="column" gap="s16">
              <FormCheckbox
                name="typeOfShare"
                label={t['sharePaidUpShare']}
                value={TypeOfShare?.PaidUp}
              />
            </Box>
          </ShareSettingsCard>
          <ShareSettingsCard title={t['shareIssueQuantity']}>
            <Box display="flex" flexDir="column" width="100%" gap="s16">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text fontSize="r1" color="gray.800">
                  {t['shareMultiplicityFactor']}
                </Text>
                <Box>
                  <FormInput name="multiplicityFactor" size="sm" __placeholder="50" />
                </Box>
              </Box>
              <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                <Text fontSize="r1" color="gray.800">
                  {t['shareTransactableMinimumQuantityOfShareThatCanBeIssued']}
                </Text>
                <Box>
                  <FormInput name="minimumQuantityOfShare" size="sm" __placeholder="100" />
                </Box>
              </Box>
              <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                <Text fontSize="r1" color="gray.800">
                  {t['shareMaximumQuantityOfShareThatCanBeIssued']}
                </Text>
                <Box>
                  <FormInput name="maximumQuantityOfShare" size="sm" __placeholder="200" />
                </Box>
              </Box>
            </Box>
          </ShareSettingsCard>
          <ShareSettingsCard title={t['shareRate']}>
            <Box display="flex" flexDir="column" width="100%" gap="s16">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text fontSize="r1" color="gray.800">
                  {t['sharePaidUpShare']}
                </Text>
                <Box>
                  <FormInput isDisabled name="paidUpShareRate" size="sm" __placeholder="100" />
                </Box>
              </Box>
            </Box>
          </ShareSettingsCard>
          {/* <ShareSettingsCard
            title={t['shareIssueAuthority']}
            subtitle={t['shareIssueAuthoritySubtitle']}
          >
            <Box display="flex" flexDir="column" gap="s16">
              <FormCheckboxGroup
                name="shareIssueAuthority"
                list={shareIssueAuthorityOpt}
                orientation="column"
              />
            </Box>
          </ShareSettingsCard> */}
          {/* <ShareSettingsCard
            title={t['shareKitta']}
            subtitle={t['shareKittaSubtitle']}
          >
            <Box display="flex" flexDir="column" width="100%" gap="s16">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareTypeOfShare']}
                </Text>
                <Box width="190px">
                  <FormSelect
                    name="typeOfShareKitta"
                    options={[
                      {
                        label: t['shareTransactable'],
                        value: 'transactable',
                      },
                      {
                        label: t['shareNonTransactable'],
                        value: 'non-transactable',
                      },
                    ]}
                    __placeholder={t['sharePaidUpShare']}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareNumberOfAuthorizedPaidUpShare']}
                </Text>
                <Box>
                  <Input size="sm" __placeholder="10,000" />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareNumberOfIssuedShare']}
                </Text>
                <Box>
                  <Input size="sm" __placeholder="25,000" />
                </Box>
              </Box>
            </Box>
          </ShareSettingsCard> */}
        </Box>
        <SettingsFooter handleSave={handleSubmit} handleDiscard={handleDiscard} />
      </form>
    </FormProvider>
  );
};
