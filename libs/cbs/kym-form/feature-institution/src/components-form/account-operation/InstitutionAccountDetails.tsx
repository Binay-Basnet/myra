import React, { useEffect, useMemo } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { GrRotateRight } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymInsInput,
  useAllAdministrationQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Collapse, Icon, IconButton, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IAddAccountDetailsConcern {
  index: number;
  removeAccountDetails: () => void;
}

const AddAccountDetails = ({
  index,
  removeAccountDetails,
}: IAddAccountDetailsConcern) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();

  const { getValues, reset, watch } = useFormContext();

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
  const currentProvinceId = watch(
    `accountOperatorsDetails.${index}.permanentState`
  );
  const currentDistrictId = watch(
    `accountOperatorsDetails.${index}.permanentDistrict`
  );

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
  const currentTempProvinceId = watch(
    `accountOperatorsDetails.${index}.temporaryState`
  );
  const currentTemptDistrictId = watch(
    `accountOperatorsDetails.${index}.temporaryDistrict`
  );

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
    `accountOperatorsDetails.${index}.isPermanentAndTemporaryAddressSame`
  );

  const resetDirectorForm = () => {
    const values = getValues();

    values['accountOperatorsDetails'][index] = {};

    reset({ accountOperatorsDetails: values['accountOperatorsDetails'] });
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px={'s16'}
          h="60px"
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor={'pointer'}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Account Operator ${index + 1}`}</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoChevronDownOutline} />}
              />
            )}
          </Box>
        </Box>
        {!isOpen && (
          <IconButton
            size="sm"
            variant={'ghost'}
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={removeAccountDetails}
          />
        )}
      </Box>

      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <SectionContainer
          mt="0"
          pt="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
          gap="s32"
          px="s20"
          pb="s20"
        >
          <InputGroupContainer>
            <FormInput
              type="text"
              name={`accountOperatorsDetails.${index}.fullName`}
              label={t['kymInsFullName']}
              placeholder={t['kymInsEnterFullName']}
            />
            <FormInput
              type="text"
              name={`accountOperatorsDetails.${index}.contact`}
              label={t['kymInsContactNo']}
              placeholder={t['kymInsContactNoPlaceholder']}
            />
            <FormInput
              type="text"
              name={`accountOperatorsDetails.${index}.email`}
              label={t['kymInsEmail']}
              placeholder={t['kymInsEnterEmailAddress']}
            />
          </InputGroupContainer>

          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsPermanentAddress']}
          </Text>
          <InputGroupContainer>
            <FormSelect
              name={`accountOperatorsDetails.${index}.permanentState`}
              label={t['kymInsState']}
              placeholder={t['kymInsSelectState']}
              options={province}
            />
            <FormSelect
              name={`accountOperatorsDetails.${index}.permanentDistrict`}
              label={t['kymInsDistrict']}
              placeholder={t['kymInsSelectDistrict']}
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              name={`accountOperatorsDetails.${index}.permanentMunicipality`}
              label={t['kymInsVDCMunicipality']}
              placeholder={t['kymInsSelectVDCMunicipality']}
              options={localityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormInput
              type="number"
              name={`accountOperatorsDetails.${index}.permanentWardNo`}
              label={t['kymInsWardNo']}
              placeholder={t['kymInsEnterWardNo']}
            />
            <FormInput
              type="text"
              name={`accountOperatorsDetails.${index}.permanentLocality`}
              label={t['kymInsLocality']}
              placeholder={t['kymInsEnterLocality']}
            />
            <FormInput
              type="text"
              name={`accountOperatorsDetails.${index}.permanentHouseNo`}
              label={t['kymInsHouseNo']}
              placeholder={t['kymInsEnterHouseNo']}
            />
          </InputGroupContainer>

          <Box>
            <FormMap
              name={`boardOfDirectorsDetails.${index}.permanentLocation`}
            />
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
              name={`accountOperatorsDetails.${index}.isPermanentAndTemporaryAddressSame`}
              label={t['kymInsTemporaryAddressPermanent']}
            />

            {!isPermanentAndTemporaryAddressSame && (
              <>
                <InputGroupContainer>
                  <FormSelect
                    name={`accountOperatorsDetails.${index}.temporaryState`}
                    label={t['kymInsState']}
                    placeholder={t['kymInsSelectState']}
                    options={province}
                  />
                  <FormSelect
                    name={`accountOperatorsDetails.${index}.temporaryDistrict`}
                    label={t['kymInsDistrict']}
                    placeholder={t['kymInsSelectDistrict']}
                    options={districtTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name={`accountOperatorsDetails.${index}.temporaryMunicipality`}
                    label={t['kymInsVDCMunicipality']}
                    placeholder={t['kymInsSelectVDCMunicipality']}
                    options={localityTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormInput
                    type="number"
                    name={`accountOperatorsDetails.${index}.temporaryWardNo`}
                    label={t['kymInsWardNo']}
                    placeholder={t['kymInsEnterWardNo']}
                  />
                  <FormInput
                    type="text"
                    name={`accountOperatorsDetails.${index}.temporaryLocality`}
                    label={t['kymInsLocality']}
                    placeholder={t['kymInsEnterLocality']}
                  />
                  <FormInput
                    type="text"
                    name={`accountOperatorsDetails.${index}.temporaryHouseNo`}
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
              <FormSelect
                name={`accountOperatorsDetails.${index}.designation`}
                label={t['kymInsDesignation']}
                placeholder={t['kymInsSelectposition']}
                options={[
                  { value: 'precident', label: 'President' },
                  { value: 'viceprecident', label: 'Vice-President' },
                  { value: 'secretary', label: 'Secretary' },
                  { value: 'treasurer', label: 'Treasurer' },
                ]}
              />
              <FormInput
                name="panNo"
                placeholder={t['kymInsPanNoPlaceholder']}
                label={t['kymInsPanNo']}
              />
              <Box display="flex" flexDirection={'column'} gap="s4">
                <Text fontSize={'s3'} fontWeight="500">
                  {t['kymInsSpecimenSignature']}
                </Text>
                <Box w="124px" display="flex" flexDirection={'column'} gap="s4">
                  <FormFileInput
                    name={`accountOperatorsDetails.${index}.specimenSignature`}
                  />
                </Box>
              </Box>
            </InputGroupContainer>
          </Box>
        </SectionContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          border="1px solid"
          borderColor="border.layout"
          alignItems={'center'}
          h="60px"
          px="s20"
        >
          <Button
            id="accountOperatorReset"
            variant="ghost"
            leftIcon={<GrRotateRight />}
            onClick={resetDirectorForm}
          >
            {t['kymInsReset']}
          </Button>
          <Button
            id="accountOperatorClose"
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={removeAccountDetails}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const InstitutionKYMAccountDetail = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();

  const { control, handleSubmit, getValues, watch, setError } = methods;
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
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        // console.log(editValues);
        // if (editValues && data) {
        mutate({ id: router.query['id'] as string, data });
        //   refetch();
        // }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);
  const {
    fields: accountFields,
    append: accountAppend,
    remove: accountRemove,
  } = useFieldArray<any>({ control, name: 'accountOperatorsDetails' });

  return (
    <FormProvider {...methods}>
      <form
        // onChange={debounce(() => {
        //   console.log('hello', getValues());
        //   mutate({ id, data: getValues() });
        // }, 800)}
        // onSubmit={handleSubmit((data) => {
        //   console.log('data', data);
        // })}
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          gap="s16"
          id="kymInsDetailsofAccountOperators"
          scrollMarginTop="200px"
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsDetailsofAccountOperators']}
          </Text>

          <div>
            <DynamicBoxGroupContainer>
              {accountFields.map((item, index) => {
                return (
                  <Box
                    key={item.id}
                    display="flex"
                    flexDirection={'column'}
                    // gap="s16"
                    // border="1px solid"
                    // borderColor="border.layout"
                  >
                    <AddAccountDetails
                      index={index}
                      removeAccountDetails={() => accountRemove(index)}
                    />
                  </Box>
                );
              })}
              <Button
                id="accountOperatorDetailsButton"
                alignSelf="start"
                leftIcon={<Icon size="md" as={AiOutlinePlus} />}
                variant="outline"
                onClick={() => {
                  accountAppend({});
                }}
              >
                {t['kymInsNewOperator']}
              </Button>
            </DynamicBoxGroupContainer>
          </div>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
