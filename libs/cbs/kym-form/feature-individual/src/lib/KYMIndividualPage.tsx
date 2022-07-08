/* eslint-disable-next-line */
import { getKymSection, useTranslation } from '@coop/shared/utils';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Kym_Field_Custom_Id,
  Kym_Field_Custom_Id as KYMOptionEnum,
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useGetKymFormStatusQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  Icon,
  IconButton,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { IoCloseOutline } from 'react-icons/io5';
import debounce from 'lodash/debounce';
import {
  KYMBasiccoopDetails,
  KYMDeclaration,
  KYMDocumentDeclaration,
  KYMEstimatedAmount,
  KYMFinancialTransactionDetails,
  MemberKYMAddress,
  MemberKYMBasicInfo,
  MemberKYMContactDetails,
  MemberKYMFamilyDetails,
  MemberKYMHusbandWifeOccupation,
  MemberKYMIdentificationDetails,
  MemberKYMIncomeSourceDetails,
  MemberKYMMainOccupation,
  MemberKYMProfession,
} from '../components/form';
import {
  ContainerWithDivider,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccorrdianAddMember } from '@coop/myra/components';
import { FormCheckbox } from '@coop/shared/form';
import { identity, pickBy } from 'lodash';

export function KYMIndividualPage() {
  const { t } = useTranslation();

  const { data: occupationDetailsDefaultFields } =
    useGetIndividualKymOptionsQuery({
      filter: {
        customId: Kym_Field_Custom_Id.OccupationDetails,
      },
    });

  const occupationFieldNames =
    occupationDetailsDefaultFields?.members.individual?.options.list?.data?.[0]?.options?.map(
      (option) => ({ id: option.id, value: '' })
    ) ?? [];

  const { data: familyDetailsFieldsData } = useGetIndividualKymOptionsQuery({
    filter: {
      customId: Kym_Field_Custom_Id.FamilyInformation,
    },
  });

  const familyDetailsFieldNames =
    familyDetailsFieldsData?.members.individual?.options.list?.data?.[0]?.options?.map(
      (option) => ({ id: option.id, value: '' })
    ) ?? [];

  const { data: incomeSourceDetailsField, isLoading } =
    useGetIndividualKymOptionsQuery({
      filter: {
        customId: Kym_Field_Custom_Id.IncomeSourceDetails,
      },
    });

  const incomeSourceDetailFieldNames =
    incomeSourceDetailsField?.members.individual?.options.list?.data?.[0]?.options?.map(
      (option) => ({ id: option.id, value: '' })
    ) ?? [];

  const { data: nationalityFields, isLoading: nationalityLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.Nationality },
    });

  const [kymCurrentSection, setKymCurrentSection] = React.useState<{
    section: string;
    subSection: string;
  }>();

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { mutate } = useSetMemberDataMutation({
    onSuccess: (res) => {
      setError('firstName', {
        type: 'custom',
        message: res?.members?.individual?.add?.error?.error?.['firstName'][0],
      });
    },
    onError: () => {
      setError('firstName', { type: 'custom', message: 'gg' });
    },
  });
  const kymFormStatusQuery = useGetKymFormStatusQuery(
    { id },
    { enabled: id !== 'undefined' }
  );
  const kymFormStatus =
    kymFormStatusQuery?.data?.members?.individual?.formState?.data
      ?.sectionStatus;

  const methods = useForm<KymIndMemberInput>();

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetIndividualKymEditDataQuery(
    {
      id: id,
    },
    { enabled: id !== 'undefined' }
  );

  const { watch, setError, reset } = methods;

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        console.log(editValues);
        if (editValues && data) {
          mutate({ id: router.query['id'] as string, data });
          refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, editValues]);

  useEffect(() => {
    if (editValues) {
      console.log(
        pickBy(
          editValues?.members?.individual?.formState?.data?.formData ?? {},
          (v) => v !== null
        )
      );
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;
      const permanentLocationData =
        editValueData?.permanentLocation?.latitude === null
          ? { latitude: 27.71, longitude: 85.31 }
          : editValueData?.permanentLocation;

      const temporaryLocationData =
        editValueData?.temporaryLocation?.latitude === null
          ? { latitude: 27.71, longitude: 85.31 }
          : editValueData?.temporaryLocation;
      console.log(
        'location',
        editValueData,
        permanentLocationData,
        temporaryLocationData,
        {
          ...editValueData,
          permanentLocation: permanentLocationData,
          temporaryLocation: temporaryLocationData,
        }
      );
      reset({
        mainOccupation: [
          {
            options: occupationFieldNames,
          },
        ],
        spouseOccupation: [
          {
            options: occupationFieldNames,
          },
        ],
        incomeSourceDetails: [
          {
            options: incomeSourceDetailFieldNames,
          },
        ],
        familyDetails: [
          {
            options: familyDetailsFieldNames,
          },
        ],
        nationalityId:
          nationalityFields?.members?.individual?.options?.list?.data?.[0]
            ?.options?.[0]?.id,

        ...pickBy(
          {
            ...editValueData,
            permanentLocation: permanentLocationData,
            temporaryLocation: temporaryLocationData,
          } ?? {},
          identity
        ),
      });
    }
  }, [isLoading, nationalityLoading, editLoading]);

  return (
    <>
      {/* // Top Bar */}

      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <Container minW="container.xl" height="fit-content">
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems={'center'}
            px="5"
            background="white"
            borderBottom="1px solid #E6E6E6"
          >
            <Text fontSize="r2" fontWeight="SemiBold">
              {t['membersFormAddNewMembers']}
            </Text>
            <IconButton
              variant={'ghost'}
              aria-label="close"
              icon={<Icon as={IoCloseOutline} size="md" />}
              onClick={() => router.back()}
            />
          </Box>
        </Container>
      </Box>

      <Container minW="container.xl" height="fit-content">
        <FormProvider {...methods}>
          <form
            onFocus={(e) => {
              const kymSection = getKymSection(e.target.id);
              setKymCurrentSection(kymSection);
            }}
          >
            {/* main */}
            <Box pb="s40" display="flex" width="100%">
              <Box display="flex">
                <Box
                  w={320}
                  p={2}
                  position="fixed"
                  borderRight="1px solid #E6E6E6"
                  minHeight="100%"
                  bg="white"
                >
                  <AccorrdianAddMember
                    formStatus={kymFormStatus}
                    kymCurrentSection={kymCurrentSection}
                  />
                </Box>

                <Box background="white" ml={320} px="s20" pt="s20" pb="120px">
                  <SectionContainer>
                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        {t['kymInd1PersonalInformation']}
                      </Text>
                      <ContainerWithDivider>
                        <MemberKYMBasicInfo />
                        <MemberKYMContactDetails />
                        <MemberKYMIdentificationDetails />
                        <MemberKYMAddress />
                        <MemberKYMFamilyDetails />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        {t['kymInd2ProfessionalInformation']}
                      </Text>
                      <ContainerWithDivider>
                        <MemberKYMProfession />
                        <MemberKYMMainOccupation />
                        <MemberKYMHusbandWifeOccupation />
                        <MemberKYMIncomeSourceDetails />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        {t['kymInd3COOPmembership']}
                      </Text>
                      <ContainerWithDivider>
                        <KYMBasiccoopDetails />
                        <KYMFinancialTransactionDetails />
                        <KYMEstimatedAmount />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <SectionContainer>
                      <Text fontSize="r3" fontWeight="600">
                        {t['kymInd4Declaration']}
                      </Text>
                      <ContainerWithDivider>
                        <KYMDeclaration />
                        <KYMDocumentDeclaration />
                      </ContainerWithDivider>
                    </SectionContainer>

                    <Box display="flex" gap="s16" alignItems="start">
                      <FormCheckbox name="declarationAgree" fontSize="s3">
                        {''}
                      </FormCheckbox>
                      <TextFields variant="formInput" mt="-6px">
                        I hereby declare that the information provided by me/us
                        in this form and documents provided to the co-operative
                        are true and correct. All transaction in this account
                        are from legitimate source. If found otherwise, I shall
                        bear the consequences thereof.
                      </TextFields>
                    </Box>
                  </SectionContainer>
                </Box>
              </Box>
            </Box>
            {/* </Box> */}

            {/* footer */}
          </form>
        </FormProvider>
      </Container>
      {/* <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <Box
              display="flex"
              height="60px"
              justifyContent="space-between"
              alignItems="center"
              background="white"
              px="5"
              borderTop="1px"
              borderColor="border.layout"
            >
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
                <Text as="i" fontSize="r1">
                  09:41 AM
                </Text>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                alignSelf="center"
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignSelf="center"
                >
                  <Button type="submit" variant="ghost" minW="160px">
                    <Icon as={BiSave} color="primary.500" />
                    <Text
                      alignSelf="center"
                      color="primary.500"
                      fontWeight="Medium"
                      fontSize="s2"
                      ml="5px"
                    >
                      {t['saveDraft']}
                    </Text>
                  </Button>
                </Box>
                &nbsp;
                <Button
                  minW="160px"
                  onClick={() => router.push(`/members/translation/${id}`)}
                >
                  {t['next']}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box> */}
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                  <Text as="i" fontSize="r1">
                    09:41 AM
                  </Text>
                </Box>
              }
              draftButton={
                <Button type="submit" variant="ghost">
                  <Icon as={BiSave} color="primary.500" />
                  <Text
                    alignSelf="center"
                    color="primary.500"
                    fontWeight="Medium"
                    fontSize="s2"
                    ml="5px"
                  >
                    {t['saveDraft']}
                  </Text>
                </Button>
              }
              mainButtonLabel={t['next']}
              mainButtonHandler={() =>
                router.push(`/members/translation/${id}`)
              }
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default KYMIndividualPage;
