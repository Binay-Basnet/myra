import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  useAllAdministrationQuery,
} from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IRegisteredDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const RegisteredDetails = ({ setSection }: IRegisteredDetailsProps) => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  const { watch } = methods;

  const { sectionStatus } = useCooperativeUnionInstitution({ methods });
  const sectionErrors = sectionStatus?.errors[0]?.errors;

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  const currentProvinceId = watch('regdAddress.provinceId');
  const currentDistrictId = watch('regdAddress.districtId');
  const localGovernmentId = watch('regdAddress.localGovernmentId');

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

  const wardList = useMemo(
    () => localityList.find((d) => d.id === localGovernmentId)?.wards ?? [],
    [localGovernmentId]
  );

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopUnionAccRegisteredDetails"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopUnionRegisteredDetails']}
          </Text>
          <InputGroupContainer>
            <FormInput
              type="number"
              name="regdNo"
              label={t['kymCoopUnionRegisteredNumber']}
              placeholder={t['kymCoopUnionEnterRegisteredNumber']}
              errorText={
                sectionErrors?.['regdNo'] && sectionErrors['regdNo'][0]
              }
            />

            <GridItem colSpan={2}>
              <FormInput
                type="text"
                name="issuingOffice"
                label={t['kymCoopUnionIssuingOffice']}
                placeholder={t['kymCoopUnionEnterIssuingOffice']}
                errorText={
                  sectionErrors?.['issuingOffice'] &&
                  sectionErrors['issuingOffice'][0]
                }
              />
            </GridItem>

            <FormSelect
              name="regdAddress.provinceId"
              label={t['kymIndProvince']}
              placeholder={t['kymIndSelectProvince']}
              options={province}
            />
            <FormSelect
              name="regdAddress.districtId"
              label={t['kymIndDistrict']}
              placeholder={t['kymIndSelectDistrict']}
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              name="regdAddress.localGovernmentId"
              label={t['kymIndLocalGovernment']}
              placeholder={t['kymIndSelectLocalGovernment']}
              options={localityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              name="regdAddress.wardNo"
              label={t['kymIndWardNo']}
              placeholder={t['kymIndEnterWardNo']}
              options={wardList?.map((d) => ({
                label: d,
                value: d,
              }))}
            />
            <FormInput
              type="text"
              name="regdAddress.locality"
              label={t['kymIndLocality']}
              placeholder={t['kymIndEnterLocality']}
            />
          </InputGroupContainer>
          <Box>
            <FormMap name={`regdAddress.coordinates`} />
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
