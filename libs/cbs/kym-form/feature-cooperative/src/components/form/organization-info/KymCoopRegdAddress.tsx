import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/customCooperative';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymCoopRegdAddress = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { control, handleSubmit, getValues, watch, setError } = methods;
  useCooperative({ methods });
  const { data } = useAllAdministrationQuery();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('registeredAddress.provinceId');
  const currentDistrictId = watch('registeredAddress.districtId');

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentProvinceId]
  );

  const muncipalityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentDistrictId]
  );

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopAccRegisteredAddress"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopRegisteredAddress']}
          </Text>
          <InputGroupContainer>
            <FormSelect
              name="registeredAddress.provinceId"
              label={t['kymCoopProvince']}
              placeholder={t['kymCoopSelectState']}
              options={province}
            />
            <FormSelect
              name="registeredAddress.districtId"
              label={t['kymCoopDistrict']}
              placeholder={t['kymCoopSelectDistrict']}
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              name="registeredAddress.localGovernmentId"
              label={t['kymCoopMunicipality']}
              placeholder={t['kymCoopSelectMunicipality']}
              options={muncipalityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />

            <FormInput
              type="text"
              name="registeredAddress.wardNo"
              label={t['kymCoopWardNo']}
              placeholder={t['kymCoopEnterWardNo']}
            />
            <FormInput
              type="text"
              name="registeredAddress.locality"
              label={t['kymCoopLocality']}
              placeholder={t['kymCoopEnterLocality']}
            />
            <FormInput
              type="text"
              name="registeredAddress.houseNo"
              label={t['kymCoopRepresentativeHouseNo']}
              placeholder={t['kymCoopRepresentativeEnterHouseNo']}
            />
          </InputGroupContainer>

          <Box mt="-16px">
            <FormMap name="registeredAddress.coordinates" />
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
