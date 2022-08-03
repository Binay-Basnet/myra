import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { KymInsInput } from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const BranchOfficeAddress = (props: IProps) => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const { watch } = methods;
  useInstitution({ methods });

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentprovinceId = watch(`branchOfficeAddress.provinceId`);
  const currentdistrictId = watch(`branchOfficeAddress.districtId`);
  const currentLocalityId = watch('branchOfficeAddress.localGovernmentId');
  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentprovinceId)
        ?.districts ?? [],
    [currentprovinceId]
  );

  const localityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentdistrictId)?.municipalities ??
      [],
    [currentdistrictId]
  );

  const wardList = useMemo(
    () => localityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId]
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
          id="kymInsbranchOfficeAddress"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsbranchOfficeAddress']}
          </Text>
          <Box
            id="branch Office Address"
            gap="s16"
            display={'flex'}
            flexDirection="column"
          >
            <InputGroupContainer>
              <FormSelect
                id="branchOfficeAddress"
                name={`branchOfficeAddress.provinceId`}
                label={t['kymIndProvince']}
                placeholder={t['kymIndSelectProvince']}
                options={province}
              />
              <FormSelect
                id="branchOfficeAddress"
                name={`branchOfficeAddress.districtId`}
                label={t['kymIndDistrict']}
                placeholder={t['kymIndSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                id="branchOfficeAddress"
                name="branchOfficeAddress.localGovernmentId"
                label={t['kymIndLocalGovernment']}
                placeholder={t['kymIndSelectLocalGovernment']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                id="branchOfficeAddress"
                name="branchOfficeAddress.wardNo"
                label={t['kymIndWardNo']}
                options={wardList?.map((d) => ({
                  label: d,
                  value: d,
                }))}
                placeholder={t['kymIndEnterWardNo']}
              />
              <FormInput
                id="branchOfficeAddress"
                type="text"
                name="branchOfficeAddress.locality"
                label={t['kymIndLocality']}
                placeholder={t['kymIndEnterLocality']}
              />
              <FormInput
                id="branchOfficeAddress"
                type="text"
                name="branchOfficeAddress.houseNo"
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              />
            </InputGroupContainer>

            <Box>
              <FormMap
                name="branchOfficeAddress.coordinates"
                id="branchOfficeAddress"
              />
            </Box>
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
