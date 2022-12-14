import { FormProvider, useForm } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { KymIndMemberInput } from '@coop/cbs/data-access';
import { FormAddress, FormInput, FormSwitch } from '@coop/shared/form';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { useIndividual } from '../../hooks/useIndividual';

interface IMemberKYMAddressProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const MemberKYMAddress = ({ setKymCurrentSection }: IMemberKYMAddressProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymIndMemberInput>();
  useIndividual({ methods });

  const { watch } = methods;

  const isPermanentAndTemporaryAddressSame = watch('sameTempAsPermanentAddress');

  // const { data } = useAllAdministrationQuery();

  // const province = useMemo(
  //   () =>
  //     data?.administration?.all?.map((d) => ({
  //       label: d.name,
  //       value: d.id,
  //     })) ?? [],
  //   [data?.administration?.all]
  // );

  // // FOR PERMANENT ADDRESS
  // const currentProvinceId = watch('permanentAddress.provinceId');
  // const currentDistrictId = watch('permanentAddress.districtId');
  // const currentLocalityId = watch('permanentAddress.localGovernmentId');

  // const districtList = useMemo(
  //   () => data?.administration.all.find((d) => d.id === currentProvinceId)?.districts ?? [],
  //   [currentProvinceId]
  // );

  // const localityList = useMemo(
  //   () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
  //   [currentDistrictId]
  // );

  // const wardList = useMemo(
  //   () => localityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
  //   [currentLocalityId]
  // );
  // // FOR TEMPORARY ADDRESS
  // const currentTempProvinceId = watch('temporaryAddress.provinceId');
  // const currentTemptDistrictId = watch('temporaryAddress.districtId');
  // const currentTempLocalityId = watch('temporaryAddress.localGovernmentId');

  // const districtTempList = useMemo(
  //   () => data?.administration.all.find((d) => d.id === currentTempProvinceId)?.districts ?? [],
  //   [currentTempProvinceId]
  // );

  // const localityTempList = useMemo(
  //   () => districtTempList.find((d) => d.id === currentTemptDistrictId)?.municipalities ?? [],
  //   [currentTemptDistrictId]
  // );

  // const wardTempList = useMemo(
  //   () => localityTempList.find((d) => d.id === currentTempLocalityId)?.wards ?? [],
  //   [currentTempLocalityId]
  // );

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormAddress
          sectionId="kymAccIndPermanentAddress"
          sectionHeader="kymIndPermanentAddress"
          name="permanentAddress"
        />

        <FormSection id="kymAccIndTemporaryAddress" header="kymIndTemporaryAddress">
          <GridItem colSpan={3}>
            <FormSwitch
              name="sameTempAsPermanentAddress"
              label={t['kymIndTemporaryAddressPermanent']}
            />
          </GridItem>
          {!isPermanentAndTemporaryAddressSame && <FormAddress name="temporaryAddress" />}
        </FormSection>
        {/* <Box
          id="kymAccIndTemporaryAddress"
          gap="s16"
          display={'flex'}
          flexDirection="column"
          scrollMarginTop={'200px'}
        >
          <Box
            borderBottom={'1px solid'}
            borderBottomColor="border.layout"
            p="s20"
            display="flex"
            flexDirection="column"
            gap="s16"
          >
            <Text
              fontSize="r1"
              fontWeight="semibold"
              color="neutralColorLight.Gray-80"
            >
              {t['kymIndTemporaryAddress']}
            </Text>
            <FormSwitch
              name="sameTempAsPermanentAddress"
              label={t['kymIndTemporaryAddressPermanent']}
            />
          </Box>


        </Box> */}
        {/* </FormSection> */}

        <FormSection
          header="kymIndINCASERESIDINGINRENTEDHOUSE"
          id="kymAccIndIncaseofresidinginRentedHouse"
        >
          <FormInput
            type="text"
            name="landlordName"
            label={t['kymIndLandlordName']}
            __placeholder={t['kymIndLandlordName']}
          />
          <FormInput
            type="number"
            name="landlordContact"
            label={t['kymIndContactNo']}
            __placeholder={t['kymIndContactNo']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
