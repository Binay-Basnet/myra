import React, { useEffect, useMemo, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { FaMap } from 'react-icons/fa';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  useAllAdministrationQuery,
  useSetAddDirectorInstitutionMutation,
} from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  directorId: string;
}

export const DirectorTopPart = ({
  removeDirector,
  setKymCurrentSection,
  directorId,
}: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useForm();

  const { watch } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { mutate } = useSetAddDirectorInstitutionMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, dir: directorId, data: { ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const { data } = useAllAdministrationQuery();
  const [temporaryAddress, setTemporaryAddress] = useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch(`permanentAddress.provinceId`);
  const currentDistrictId = watch(`permanentAddress.districtId`);

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

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch(`temporaryAddress.districtId`);

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentTempProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtTempList.find((d) => d.id === currentTemptDistrictId)
        ?.municipalities ?? [],
    [currentTemptDistrictId]
  );

  const isPermanentAndTemporaryAddressSame = watch(
    `isTemporaryAndPermanentAddressSame`
  );

  //   const resetDirectorForm = () => {
  //     const values = getValues();

  //     // values['detailsOfDirectors'][index] = {};

  //     reset({ detailsOfDirectors: values['detailsOfDirectors'] });
  //   };

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <InputGroupContainer>
          <FormInput
            type="text"
            name={`name`}
            label={t['kymInsFullName']}
            placeholder={t['kymInsEnterFullName']}
          />
          <FormInput
            type="text"
            name={`designation`}
            label={t['kymInsDesignation']}
            placeholder={t['kymInsEnterDesignation']}
          />
        </InputGroupContainer>

        <Text fontSize="r1" fontWeight="SemiBold">
          {t['kymInsPermanentAddress']}
        </Text>
        {/* <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            > */}
        <InputGroupContainer>
          <FormSelect
            name={`permanentAddress.provinceId`}
            label={t['kymInsState']}
            placeholder={t['kymInsSelectState']}
            options={province}
          />
          <FormSelect
            name={`permanentAddress.districtId`}
            label={t['kymInsDistrict']}
            placeholder={t['kymInsSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name={`permanentAddress.localGovernmentId`}
            label={t['kymInsVDCMunicipality']}
            placeholder={t['kymInsSelectVDCMunicipality']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormInput
            type="number"
            name={`permanentAddress.wardNo`}
            label={t['kymInsWardNo']}
            placeholder={t['kymInsEnterWardNo']}
          />
          <FormInput
            type="text"
            name={`permanentAddress.locality`}
            label={t['kymInsLocality']}
            placeholder={t['kymInsEnterLocality']}
          />
          <FormInput
            type="text"
            name={`permanentAddress.houseNo`}
            label={t['kymInsHouseNo']}
            placeholder={t['kymInsEnterHouseNo']}
          />
        </InputGroupContainer>

        <Box>
          <FormMap name={`permanentAddress.coordinates`} />
        </Box>

        <Box
          id="Temporary Address"
          gap="s32"
          display={'flex'}
          flexDirection="column"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsTemporaryAddress']}
          </Text>

          <FormSwitch
            id="isPermanentAndTemporaryAddressSame"
            name={`isTemporaryAndPermanentAddressSame`}
            label={t['kymInsTemporaryAddressPermanent']}
          />

          {!isPermanentAndTemporaryAddressSame && (
            <>
              <InputGroupContainer>
                <FormSelect
                  name={`temporaryAddress.provinceId`}
                  label={t['kymInsState']}
                  placeholder={t['kymInsSelectState']}
                  options={province}
                />
                <FormSelect
                  name={`temporaryAddress.districtId`}
                  label={t['kymInsDistrict']}
                  placeholder={t['kymInsSelectDistrict']}
                  options={districtTempList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name={`temporaryAddress.localGovernmentId`}
                  label={t['kymInsVDCMunicipality']}
                  placeholder={t['kymInsSelectVDCMunicipality']}
                  options={localityTempList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormInput
                  type="number"
                  name={`temporaryAddress.wardNo`}
                  label={t['kymInsWardNo']}
                  placeholder={t['kymInsEnterWardNo']}
                />
                <FormInput
                  type="text"
                  name={`temporaryAddress.locality`}
                  label={t['kymInsLocality']}
                  placeholder={t['kymInsEnterLocality']}
                />
                <FormInput
                  type="text"
                  name={`temporaryAddress.houseNo`}
                  label={t['kymInsHouseNo']}
                  placeholder={t['kymInsEnterHouseNo']}
                />
              </InputGroupContainer>
              <Button
                mt="-16px"
                alignSelf="start"
                leftIcon={<Icon size="md" as={FaMap} />}
              >
                {t['pinOnMap']}
              </Button>
            </>
          )}
        </Box>

        <Box>
          <InputGroupContainer>
            <FormInput
              type="date"
              name={`dateOfMembership`}
              label={t['kymInsDateOfMembership']}
              placeholder="DD-MM-YYYY"
            />
            <FormInput
              type="text"
              name={`highestQualification`}
              label={t['kymInsHighestQualification']}
              placeholder={t['kymInsEnterHigestQualification']}
            />
            <FormInput
              type="string"
              name={`mobileNo`}
              label={t['kymInsMobileNo']}
              placeholder={t['kymInsEnterMobileNo']}
            />
            <FormInput
              type="text"
              name={`email`}
              label={t['kymInsEmail']}
              placeholder={t['kymInsEnterEmail']}
            />
            <FormInput
              onClick={() => {
                removeDirector(directorId);
              }}
              type="string"
              name={`citizenshipNo`}
              label={t['kymInsCitizenshipPassportDrivingLicenseNo']}
              placeholder={t['kymInsEnterNo']}
            />
            <FormInput
              type="string"
              name={`panNo`}
              label={t['kymInsPanNo']}
              placeholder={t['kymInsPanEnterNo']}
            />
          </InputGroupContainer>
        </Box>
      </form>
    </FormProvider>
  );
};
