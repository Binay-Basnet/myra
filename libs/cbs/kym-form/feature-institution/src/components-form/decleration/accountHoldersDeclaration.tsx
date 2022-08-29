import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useAllAdministrationQuery } from '@coop/cbs/data-access';
import { KymInsInput } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  FormCheckbox,
  FormInput,
  FormMap,
  FormSelect,
} from '@coop/shared/form';
import { Box, FormSection, GridItem, TextFields } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

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

  const currentProvinceId = watch('accountHolderAddress.provinceId');
  const currentDistrictId = watch('accountHolderAddress.districtId');
  const currentLocalityId = watch('accountHolderAddress.localGovernmentId');

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
        <FormSection
          id="kymInsAccountHolderDeclaration"
          header="kymInAccountHolderDeclarations"
        >
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
        </FormSection>

        <FormSection header="kymInsAddress">
          {' '}
          <FormSelect
            id="accountHolderAddress"
            name={`accountHolderAddress.provinceId`}
            label={t['kymInsState']}
            placeholder={t['kymInsSelectState']}
            options={province}
          />
          <FormSelect
            id="accountHolderAddress"
            name="accountHolderAddress.districtId"
            label={t['kymInsDistrict']}
            placeholder={t['kymInsSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            id="accountHolderAddress"
            name="accountHolderAddress.localGovernmentId"
            label={t['kymInsVDCMunicipality']}
            placeholder={t['kymInsSelectVDCMunicipality']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            id="accountHolderAddress"
            name="accountHolderAddress.wardNo"
            label={t['kymInsWardNo']}
            placeholder={t['kymInsEnterWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
          />
          <FormInput
            id="accountHolderAddress"
            type="text"
            name="accountHolderAddress.locality"
            label={t['kymInsLocality']}
            placeholder={t['kymInsEnterLocality']}
          />
          <FormInput
            id="accountHolderAddress"
            type="text"
            name="accountHolderAddress.houseNo"
            label={t['kymInsHouseNo']}
            placeholder={t['kymInsEnterHouseNo']}
          />
          <GridItem colSpan={2}>
            <FormMap
              name="accountHolderAddress.coordinates"
              id="accountHolderAddress"
            />
          </GridItem>
        </FormSection>

        <Box p="s20" display="flex" gap="s16" alignItems="center">
          <FormCheckbox
            id="weAgree"
            name="declarationAgreement"
            fontSize="s3"
          />
          <TextFields variant="formInput" mt="-6px">
            I/We agree to the&nbsp;
            <TextFields as="span" variant="link">
              Terms and condition.
            </TextFields>
          </TextFields>
        </Box>

        <GroupContainer scrollMarginTop={'200px'}>
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
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
