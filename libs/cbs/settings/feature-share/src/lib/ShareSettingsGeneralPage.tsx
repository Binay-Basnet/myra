import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  BranchCategory,
  TypeOfShare,
  useGetSettingsShareGeneralDataQuery,
  useSetSettingsShareGeneralMutation,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormCheckboxGroup, FormInput } from '@coop/shared/form';
import { asyncToast, Box, SettingsFooter, Text, toast } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import ShareSettingsCard from '../components/ShareSettingsCard/ShareSettingsCard';
import ShareSettingsHeader from '../components/ShareSettingsHeader/ShareSettingsHeader';

export const ShareSettingsGeneralPage = () => {
  const { t } = useTranslation();
  const methods = useForm();
  const router = useRouter();

  const { getValues, reset, watch } = methods;

  const shareIssueAuthorityOpt = [
    {
      label: t['shareHeadOffice'],
      value: BranchCategory?.HeadOffice,
    },
    {
      label: t['shareRegionalOffice'],
      value: BranchCategory?.RegionalOffice,
    },
    {
      label: t['shareServiceCenterBranch'],
      value: BranchCategory?.ServiceCenter,
    },
    {
      label: t['shareContactOffice'],
      value: BranchCategory?.ContactOffice,
    },
    {
      label: t['shareOther'],
      value: BranchCategory?.BranchOffice,
    },
  ];
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
      onSuccess: () => router.push('/settings/general/share'),
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
          <ShareSettingsHeader title={t['settingsShareGeneral']} />
          <ShareSettingsCard
            title={t['shareTypesOfShare']}
            subtitle={t['shareChooseTypeOfShare']}
          >
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareMultiplicityFactor']}
                </Text>
                <Box>
                  <FormInput
                    name="multiplicityFactor"
                    size="sm"
                    placeholder="50"
                  />
                </Box>
              </Box>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareTransactableMinimumQuantityOfShareThatCanBeIssued']}
                </Text>
                <Box>
                  <FormInput
                    name="minimumQuantityOfShare"
                    size="sm"
                    placeholder="100"
                  />
                </Box>
              </Box>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareMaximumQuantityOfShareThatCanBeIssued']}
                </Text>
                <Box>
                  <FormInput
                    name="maximumQuantityOfShare"
                    size="sm"
                    placeholder="200"
                  />
                </Box>
              </Box>
            </Box>
          </ShareSettingsCard>
          <ShareSettingsCard title={t['shareRate']}>
            <Box display="flex" flexDir="column" width="100%" gap="s16">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['sharePaidUpShare']}
                </Text>
                <Box>
                  <FormInput
                    name="paidUpShareRate"
                    size="sm"
                    placeholder="100"
                  />
                </Box>
              </Box>
            </Box>
          </ShareSettingsCard>
          <ShareSettingsCard
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
          </ShareSettingsCard>
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
                    placeholder={t['sharePaidUpShare']}
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
                  <Input size="sm" placeholder="10,000" />
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
                  <Input size="sm" placeholder="25,000" />
                </Box>
              </Box>
            </Box>
          </ShareSettingsCard> */}
          <ShareSettingsCard
            title={t['shareCertificateNumber']}
            subtitle={t['shareCertificateNumberSubtitle']}
          >
            <Box display="flex" flexDir="column" width="100%" gap="s16">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareStartNumber']}
                </Text>
                <Box>
                  <FormInput name="startNumber" size="sm" placeholder="00001" />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareEndNumber']}
                </Text>
                <Box>
                  <FormInput name="endNumber" size="sm" placeholder="00001" />
                </Box>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareIncrementer']}
                </Text>
                <Box>
                  <FormInput name="incrementor" size="sm" placeholder="1" />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text fontSize="r1" color="gray.800">
                  {t['shareNumberOfDigits']}
                </Text>
                <Box>
                  <FormInput name="noOfDigits" size="sm" placeholder="7" />
                </Box>
              </Box>
            </Box>{' '}
            <Box
              mt="s16"
              mx="-16px"
              p="s16"
              mb="-16px"
              width="calc(100% + 32px)"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bg="background.500"
            >
              <Text p="s12" color="gray.800" fontSize="r1" fontWeight="500">
                {t['sharePreview']}
              </Text>
              <Text p="s12" color="gray.800" fontSize="r1" fontWeight="400">
                XYZ12346342
              </Text>
            </Box>
          </ShareSettingsCard>
        </Box>
        <SettingsFooter
          handleSave={handleSubmit}
          handleDiscard={handleDiscard}
        />
      </form>
    </FormProvider>
  );
};
