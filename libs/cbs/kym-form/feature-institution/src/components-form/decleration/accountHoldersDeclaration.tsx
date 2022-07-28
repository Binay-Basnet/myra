import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { KymInsInput } from '@coop/shared/data-access';
import {
  useGetInstitutionKymEditDataQuery,
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
} from '@coop/shared/form';
import { Box, Checkbox, Text, TextFields } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/institutionHook';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const AccountHolderDeclarationInstitution = (props: IProps) => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;
  const { watch, setError, reset } = methods;

  const router = useRouter();
  const id = String(router?.query?.['id']);
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetInstitutionKymEditDataQuery(
    {
      id: id,
    },
    { enabled: id !== 'undefined' }
  );

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        console.log(editValues);
        if (editValues && data) {
          mutate({
            id: router.query['id'] as string,
            data,
          });
          refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, editLoading]);

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.institution?.formState?.data?.formData;

      const registeredAddressLocality =
        editValueData?.registeredAddress?.locality?.local;
      const operatingAddressLocality =
        editValueData?.operatingOfficeAddress?.locality?.local;
      console.log('edit value', editValueData);
      const branchOfficeAddress =
        editValueData?.branchOfficeAddress?.locality?.local;
      const accountHoldersAddress =
        editValueData?.accountHolderAddress?.locality?.local;
      reset({
        ...pickBy(editValueData ?? {}, (v) => v !== null),
        registeredAddress: {
          ...editValueData?.registeredAddress,
          locality: registeredAddressLocality,
        },
        operatingOfficeAddress: {
          ...editValueData?.operatingOfficeAddress,
          locality: operatingAddressLocality,
        },
        branchOfficeAddress: {
          ...editValueData?.branchOfficeAddress,
          locality: branchOfficeAddress,
        },
        accountHolderAddress: {
          ...editValueData?.accountHolderAddress,
          locality: accountHoldersAddress,
        },
      });
    }
  }, [editLoading]);

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  const currentProvinceId = watch('accountHolderAddress.provinceId');
  const currentDistrictId = watch('accountHolderAddress.districtId');

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
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
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
                name={`accountHolderAddress.provinceId`}
                label={t['kymInsState']}
                placeholder={t['kymInsSelectState']}
                options={province}
              />
              <FormSelect
                name="accountHolderAddress.districtId"
                label={t['kymInsDistrict']}
                placeholder={t['kymInsSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="accountHolderAddress.localGovernmentId"
                label={t['kymInsVDCMunicipality']}
                placeholder={t['kymInsSelectVDCMunicipality']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name="accountHolderAddress.wardNo"
                label={t['kymInsWardNo']}
                placeholder={t['kymInsEnterWardNo']}
              />
              <FormInput
                type="text"
                name="accountHolderAddress.locality"
                label={t['kymInsLocality']}
                placeholder={t['kymInsEnterLocality']}
              />
              <FormInput
                type="text"
                name="accountHolderAddress.houseNo"
                label={t['kymInsHouseNo']}
                placeholder={t['kymInsEnterHouseNo']}
              />
            </InputGroupContainer>

            <Box>
              <FormMap name="accountHolderAddress.coordinates" />
            </Box>
          </Box>
          {/* <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
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
          </Grid> */}
          <Box display="flex" gap="s16" alignItems="start">
            <Checkbox fontSize="s3" id="weAgree">
              {''}
            </Checkbox>
            <TextFields variant="formInput" mt="-6px">
              I/We hereby confirm that the information provede by me/us in this
              form and documents provided to the Bank are true and corrent. I/We
              further confirm that I/We have read and understood to the Bank's
              terms and conditions governing account opening/operations and
              shall abide and be bound by present/future rules Nepal Rastra
              Bank, Himalayan Bank Limited and Laws of the country. In the event
              I/We fail to abide by the terms and conditions, I/We shall bear
              the damage and/or penalties resulting as a consequence thereof.
            </TextFields>
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
