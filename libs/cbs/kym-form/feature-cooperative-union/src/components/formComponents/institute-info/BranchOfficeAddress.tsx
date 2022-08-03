import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  CoopUnionInstitutionInformationInput,
  useAllAdministrationQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IBranchOfficeAddressProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BranchOfficeAddress = ({
  setSection,
}: IBranchOfficeAddressProps) => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  const { watch } = methods;

  useCooperativeUnionInstitution({ methods });

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('branchOfficeAddress.provinceId');
  const currentDistrictId = watch('branchOfficeAddress.districtId');
  const localGovernmentId = watch('branchOfficeAddress.localGovernmentId');

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
        <GroupContainer id="Branch Office Address" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopUnionOperatorBranchAddress']}
          </Text>
          <Box
            id="Branch Office Address"
            gap="s16"
            display={'flex'}
            flexDirection="column"
          >
            <InputGroupContainer>
              <FormSelect
                name="branchOfficeAddress.provinceId"
                label={t['kymIndProvince']}
                placeholder={t['kymIndSelectProvince']}
                options={province}
              />
              <FormSelect
                name="branchOfficeAddress.districtId"
                label={t['kymIndDistrict']}
                placeholder={t['kymIndSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="branchOfficeAddress.localGovernmentId"
                label={t['kymIndLocalGovernment']}
                placeholder={t['kymIndSelectLocalGovernment']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="branchOfficeAddress.wardNo"
                label={t['kymIndWardNo']}
                placeholder={t['kymIndEnterWardNo']}
                options={wardList?.map((d) => ({
                  label: d,
                  value: d,
                }))}
              />
              <FormInput
                type="text"
                name="branchOfficeAddress.locality"
                label={t['kymIndLocality']}
                placeholder={t['kymIndEnterLocality']}
              />
              <FormInput
                type="text"
                name="branchOfficeAddress.houseNo"
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              />
            </InputGroupContainer>

            <Box>
              <FormMap name="branchOfficeAddress.coordinates" />
            </Box>
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
