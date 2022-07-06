import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
} from '@coop/shared/form';
import {
  Box,
  Checkbox,
  Grid,
  GridItem,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AccountHolderDeclarationInstitution = () => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const { watch } = useFormContext();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  const currentProvinceId = watch('accountHolderProvinceId');
  const currentDistrictId = watch('accountHolderDistrictId');

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentProvinceId]
  );

  const localityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentDistrictId]
  );

  return (
    <GroupContainer
      id="kymInsAccountHolderDeclaration"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInAccountHolderDeclarations']}
      </Text>
      <InputGroupContainer>
        <FormInput
          name="accountHolderName"
          label={t['kymInsAccountHolderName']}
          placeholder={t['kymInsEnterAccountHolderName']}
        />
        <FormInput
          name="accountHolderPhone"
          label={t['kymInsPhone']}
          placeholder={t['kymInsEnterPhoneNumber']}
        />
        <FormInput
          name="accountHolderEmail"
          label={t['kymInsEmail']}
          placeholder={t['kymInsEnterEmailAddress']}
        />
      </InputGroupContainer>

      <Box display="flex" flexDirection="column" gap="s16">
        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymInsAddress']}
        </Text>
        <InputGroupContainer>
          <FormSelect
            name={`accountHolderProvinceId`}
            label={t['kymInsState']}
            placeholder={t['kymInsSelectState']}
            options={province}
          />
          <FormSelect
            name="accountHolderDistrictId"
            label={t['kymInsDistrict']}
            placeholder={t['kymInsSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="accountHolderMunicipality"
            label={t['kymInsVDCMunicipality']}
            placeholder={t['kymInsSelectVDCMunicipality']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormInput
            type="number"
            name="accountHolderWardNo"
            label={t['kymInsWardNo']}
            placeholder={t['kymInsEnterWardNo']}
          />
          <FormInput
            type="text"
            name="accountHolderLocality"
            label={t['kymInsLocality']}
            placeholder={t['kymInsEnterLocality']}
          />
          <FormInput
            type="text"
            name="accountHolderLocality"
            label={t['kymInsHouseNo']}
            placeholder={t['kymInsEnterHouseNo']}
          />
        </InputGroupContainer>

        <Box>
          <FormMap name="accountHolderLocation" />
        </Box>
      </Box>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
        <Box w="124px">
          <FormFileInput
            name="accountHolderSignature"
            label={t['kymInsSignature']}
            size="md"
          />
        </Box>
        <Box w="124px">
          <FormFileInput
            name="accountHolderStamp"
            label={t['kymInsStamp']}
            size="md"
          />
        </Box>
      </Grid>
      <Box display="flex" gap="s16" alignItems="start">
        <Checkbox fontSize="s3" id="weAgree">
          {''}
        </Checkbox>
        <TextFields variant="formInput" mt="-6px">
          I/We hereby confirm that the information provede by me/us in this form
          and documents provided to the Bank are true and corrent. I/We further
          confirm that I/We have read and understood to the Bank's terms and
          conditions governing account opening/operations and shall abide and be
          bound by present/future rules Nepal Rastra Bank, Himalayan Bank
          Limited and Laws of the country. In the event I/We fail to abide by
          the terms and conditions, I/We shall bear the damage and/or penalties
          resulting as a consequence thereof.
        </TextFields>
      </Box>
    </GroupContainer>
  );
};
