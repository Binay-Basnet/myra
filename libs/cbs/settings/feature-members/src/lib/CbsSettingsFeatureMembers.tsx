import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import omit from 'lodash/omit';

import { asyncToast, Box, SettingsFooter, Text } from '@myra-ui';

import {
  useAddGeneralMemberMutation,
  useGetGeneralMemberSettingsDataQuery,
} from '@coop/cbs/data-access';
import { featureCode, useTranslation } from '@coop/shared/utils';

import { NewMemberCharge } from '../components/general/MemberCharge';
import { MemberCodeManagement } from '../components/general/MemberCodeManagement';
import { MemberRiskLevel } from '../components/general/MemberRiskLevel';
import { TypeOfMember } from '../components/general/TypeOfMember';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureMembersProps {}

export const CbsSettingsFeatureMembers = () => {
  const { t } = useTranslation();
  const methods = useForm();
  const { getValues, reset } = methods;

  const { mutateAsync } = useAddGeneralMemberMutation();

  const onSubmit = () => {
    const values = getValues();

    const updatedData = {
      ...values,
      risk: {
        generalRisk: values['risk']?.generalRisk ? Number(values['risk']?.generalRisk) : null,
        mediumRisk: values['risk']?.mediumRisk ? Number(values['risk']?.mediumRisk) : null,
        highRisk: values['risk']?.highRisk ? Number(values['risk']?.highRisk) : null,
      },
      memberCode: {
        prefix: values?.['memberCode']?.prefix,
        noOfDigits: Number(values?.['memberCode']?.noOfDigits),
        initialNo: values?.['memberCode']?.initialNo,
      },
    };

    asyncToast({
      id: 'general-settings-member-id',
      msgs: {
        success: 'General Member Settings Saved',
        loading: 'Saving General Member Settings',
      },
      promise: mutateAsync({ data: updatedData }),
      // onError: (error) => {
      //   if (error.__typename === 'ValidationError') {
      //     Object.keys(error.validationErrorMsg).map((key) =>
      //       methods.setError(key as keyof  GeneralMemberInput, {
      //         message: error.validationErrorMsg[key][0] as string,
      //       })
      //     );
      //   }
      // },
    });
  };

  const { data: editValues } = useGetGeneralMemberSettingsDataQuery();

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.settings?.general?.KYM?.general?.generalMember?.record;
      if (editValueData) {
        reset({
          ...omit({ ...editValueData }, ['isCodeSetup']),
        });
      }
    }
  }, [editValues]);

  return (
    <Box display="flex" flexDirection="row" h="fit-content">
      <Box flex={1} p="s16">
        <Box borderBottom="1px" borderBottomColor="border.layout" py="s8" w="100%">
          <Text fontSize="r2" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
            {`${t['settingsGeneral']} - ${featureCode.generalMemberSetting}`}
          </Text>
          <Text pt="s2" fontSize="r1" fontWeight="Reglular" color="gray.400">
            {t['settingsTheseSettings']}
          </Text>
        </Box>
        <Box mt="s16" display="flex" flexDir="column" gap="s16">
          <FormProvider {...methods}>
            <TypeOfMember />
            <MemberRiskLevel />
            <NewMemberCharge />
            <MemberCodeManagement />
          </FormProvider>
        </Box>
      </Box>
      <SettingsFooter handleSave={onSubmit} />
    </Box>
  );
};

export default CbsSettingsFeatureMembers;
