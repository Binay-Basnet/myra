import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  KymCoopAccountOperatorDetailsFormInput,
  RootState,
  useAllAdministrationQuery,
  useAppSelector,
  useGetCoOperativeAccountOperatorEditDataQuery,
  useSetCoopAccOperatorDataMutation,
} from '@coop/cbs/data-access';
import { DynamicBoxGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import {
  Box,
  Button,
  Collapse,
  FormSection,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { BottomOperatorCoop } from './accountOperatorDocuments';
import { DynamicAddtraining } from './acoountOperatorTraining';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  accountId: string;
}

export const AddOperator = ({ removeDirector, setKymCurrentSection, accountId }: IAddDirector) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();

  const methods = useForm<KymCoopAccountOperatorDetailsFormInput>();
  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);
  const { data: editValues, refetch } = useGetCoOperativeAccountOperatorEditDataQuery({
    id,
  });

  const { mutate } = useSetCoopAccOperatorDataMutation();

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.cooperative?.listAccountOperators?.data;

      const familyMemberDetail = editValueData?.find((item) => item?.id === accountId);

      if (familyMemberDetail) {
        reset({
          nameEn: familyMemberDetail?.fullName,
          designation: familyMemberDetail?.designation,
          permanentAddress: {
            ...familyMemberDetail?.permanentAddress,
            locality: familyMemberDetail?.permanentAddress?.locality?.local,
          },
          isPermanentAndTemporaryAddressSame:
            familyMemberDetail?.isPermanentAndTemporaryAddressSame,
          temporaryAddress: {
            ...familyMemberDetail?.temporaryAddress,
            locality: familyMemberDetail?.temporaryAddress?.locality?.local,
          },
          dateOfMembership: familyMemberDetail?.dateOfMembership,
          highestQualification: familyMemberDetail?.highestQualification,
          contactNumber: familyMemberDetail?.contactNumber,
          email: familyMemberDetail?.email,
          citizenshipNo: familyMemberDetail?.citizenshipNo,
          panNo: familyMemberDetail?.panNo,
          coopRelatedTraining: familyMemberDetail?.coopRelatedTraining,
        });
      }
    }
  }, [editValues]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

  useEffect(() => {
    const subscription = watch(
      debounce((item) => {
        mutate({ id, accOperatorId: accountId, data: { ...item } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);
  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(`isPermanentAndTemporaryAddressSame`);

  const province = useMemo(
    () =>
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    [data?.administration?.all]
  );

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch(`permanentAddress.provinceId`);
  const currentDistrictId = watch(`permanentAddress.districtId`);
  const currentLocalityId = watch(`permanentAddress.localGovernmentId`);

  const districtList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentProvinceId)?.districts ?? [],
    [currentProvinceId]
  );

  const localityList = useMemo(
    () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
    [currentDistrictId]
  );

  const wardList = useMemo(
    () => localityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId]
  );
  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch(`temporaryAddress.districtId`);
  const currentTempLocalityId = watch(`temporaryAddress.localGovernmentId`);

  const districtTempList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentProvinceId)?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
    [currentTemptDistrictId]
  );

  const wardTempList = useMemo(
    () => localityTempList.find((d) => d.id === currentTempLocalityId)?.wards ?? [],
    [currentTempLocalityId]
  );

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px="s12"
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          h="60px"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Account Operator `}</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronDownOutline} />}
              />
            )}
          </Box>
        </Box>
        {!isOpen && (
          <IconButton
            id="accountOperatorCloseIcon"
            size="sm"
            variant="ghost"
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={() => {
              removeDirector(accountId);
            }}
          />
        )}
      </Box>

      <Collapse
        in={isOpen}
        style={{ marginTop: '0px', border: '1px solid', borderColor: '#E0E5EB' }}
      >
        <DynamicBoxGroupContainer>
          <FormProvider {...methods}>
            <form
              onFocus={(e) => {
                const kymSection = getKymCoopSection(e.target.id);
                setKymCurrentSection(kymSection);
              }}
            >
              <Box display="flex" flexDirection="column" gap="s48">
                <FormSection>
                  <FormInput
                    id="accountOperatorCoop"
                    type="text"
                    name="nameEn"
                    label={t['kymCoopFullName']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="text"
                    name="designation"
                    label={t['kymCoopDesignation']}
                  />
                </FormSection>

                <FormSection header="kymCoopPermanentAddress">
                  <FormSelect
                    id="accountOperatorCoop"
                    name="permanentAddress.provinceId"
                    label={t['kymCoopState']}
                    options={province}
                  />
                  <FormSelect
                    id="accountOperatorCoop"
                    name="permanentAddress.districtId"
                    label={t['kymCoopDistrict']}
                    options={districtList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    id="accountOperatorCoop"
                    name="permanentAddress.localGovernmentId"
                    label={t['kymCoopLocalGovernment']}
                    options={localityList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    id="accountOperatorCoop"
                    name="permanentAddress.wardNo"
                    label={t['kymCoopWardNo']}
                    options={wardList?.map((d) => ({
                      label: d,
                      value: d,
                    }))}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="text"
                    name="permanentAddress.locality"
                    label={t['kymCoopLocality']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="text"
                    name="permanentAddress.houseNo"
                    label={t['kymCoopRepresentativeHouseNo']}
                  />

                  <GridItem colSpan={2}>
                    <FormMap name="permanentAddress.coordinates" />
                  </GridItem>
                </FormSection>

                <FormSection header="kymCoopTemporaryAddress">
                  <GridItem colSpan={3}>
                    <FormSwitch
                      name="isPermanentAndTemporaryAddressSame"
                      label={t['kymCoopTemporaryAddressPermanent']}
                    />
                  </GridItem>

                  {!isPermanentAndTemporaryAddressSame && (
                    <>
                      <FormSelect
                        id="accountOperatorCoop"
                        name="temporaryAddress.provinceId"
                        label={t['kymCoopState']}
                        options={province}
                      />
                      <FormSelect
                        id="accountOperatorCoop"
                        name="temporaryAddress.districtId"
                        label={t['kymCoopDistrict']}
                        options={districtTempList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        id="accountOperatorCoop"
                        name="temporaryAddress.localGovernmentId"
                        label={t['kymCoopLocalGovernment']}
                        options={localityTempList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        id="accountOperatorCoop"
                        name="temporaryAddress.wardNo"
                        label={t['kymCoopWardNo']}
                        options={wardTempList.map((d) => ({
                          label: d,
                          value: d,
                        }))}
                      />
                      <FormInput
                        id="accountOperatorCoop"
                        type="text"
                        name="temporaryAddress.locality"
                        label={t['kymCoopLocality']}
                      />
                      <FormInput
                        id="accountOperatorCoop"
                        type="text"
                        name="temporaryAddress.houseNo"
                        label={t['kymCoopRepresentativeHouseNo']}
                      />

                      <GridItem colSpan={2}>
                        <FormMap name="temporaryAddress.coordinates" id="accountOperatorCoop" />
                      </GridItem>
                    </>
                  )}
                </FormSection>

                <FormSection>
                  <FormDatePicker
                    id="accountOperatorCoop"
                    name="dateOfMembership"
                    label={t['kymCoopDateOfMembership']}
                  />
                  <FormInput
                    type="text"
                    id="accountOperatorCoop"
                    name="highestQualification"
                    label={t['kymCoopHighestQualification']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="number"
                    name="contactNumber"
                    label={t['kymCoopMobileNo']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="text"
                    name="email"
                    label={t['kymCoopEmail']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="string"
                    name="citizenshipNo"
                    label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
                  />
                  <FormInput
                    id="accountOperatorCoop"
                    type="string"
                    name="panNo"
                    label={t['kymCoopPanOrVatNo']}
                  />
                </FormSection>
                <DynamicAddtraining />
              </Box>
            </form>
          </FormProvider>
          {/* <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <FormFileInput
                size="lg"
                label={t['kymCoopPhotograph']}
                name={`accountOperatorsDetails.photograph`}
              />
              <FormFileInput
                size="lg"
                label={t['kymCoopPhotographOfIdentityProofDocument']}
                name={`accountOperatorsDetails.identityDocumentPhoto`}
              />
              <Box w="124px">
                <FormFileInput
                  size="md"
                  label={t['kymCoopSignature']}
                  name={`boardOfDirectorsDetails.signature`}
                />
              </Box>
            </Grid> */}
          <BottomOperatorCoop accountId={accountId} setKymCurrentSection={setKymCurrentSection} />
        </DynamicBoxGroupContainer>
        <Box display="flex" justifyContent="flex-end" px="s20" py="s10" alignItems="center">
          <Button
            id="accountOperatorCloseButton"
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector(accountId);
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};
