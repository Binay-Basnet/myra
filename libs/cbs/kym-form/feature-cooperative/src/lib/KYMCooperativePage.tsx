/* eslint-disable-next-line */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { featureCode, getKymCoopSection, useTranslation } from '@coop/shared/utils';
import { Box, Button, Checkbox, FormHeader, Icon, Text, asyncToast } from '@myra-ui';
import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { BiSave } from 'react-icons/bi';
import { AccordionKymCoopForm, KYMUpdateModal } from '@coop/cbs/kym-form/formElements';
import {
  KymCooperativeFormInput,
  useAppSelector,
  useGetKymCooperativeFormDataQuery,
  useSetKymCooperativeDataMutation,
  GetKymCooperativeFormDataQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { useDisclosure } from '@chakra-ui/react';
import { FormLayout } from '@coop/shared/form';
import { useForm } from 'react-hook-form';
import {
  KymAccountHolderDeclaration,
  KymCoopAccountOperatorDetail,
  KymCoopAddCoopDetails,
  KymCoopAssets,
  KymCoopBasicInfo,
  KymCoopBoardDirectorDetail,
  KymCoopContactDetails,
  KymCoopCurrentMembers,
  KymCoopDate,
  KymCoopDocumentDeclarationForm,
  KymCoopNoEmployee,
  KymCoopOpAddress,
  KymCoopRegdAddress,
  KymCoopRepresentative,
  KymEquityLiabilities,
} from '../components/form';

type KYMSection = {
  section: string;
  subSection: string;
};

const documentMap = [
  'agmBodDecisionDocument',
  'registeredCertificate',
  'moaAoa',
  'panCertificate',
  'taxClearance',
  'latestAuditReport',
  'logo',
  'minuteOfCentralRep',
  'accountHolderSignature',
  'accountHolderStamp',
];

const directorDocumentMap = ['photograph', 'identityDocumentPhoto', 'signature'];
const accountOepratorDocumentMap = ['photograph', 'identityDocumentPhoto', 'signature'];

const getCooperativeData = (data: GetKymCooperativeFormDataQuery | undefined) => {
  if (!data) {
    return {};
  }
  const editValueData = data?.members?.cooperative?.formState?.data;
  if (!editValueData) {
    return {};
  }
  const registeredAddressLocality = editValueData?.registeredAddress?.locality?.local;

  const operatingAddressLocality = editValueData?.operatingAddress?.locality?.local;
  const permanentAdrressLocality = editValueData?.permanentRepresentativeAddress?.locality?.local;
  const temporaryAddressLocality = editValueData?.temporaryRepresentativeAddress?.locality?.local;

  return {
    ...editValueData,

    documents: documentMap?.map((document) => ({
      fieldId: document,
      identifiers:
        editValueData?.documents?.find((d) => d?.fieldId === document)?.identifiers || [],
    })),

    accountOperator: editValueData?.accountOperator?.map((d) => ({
      ...d,
      documents: directorDocumentMap?.map((document) => ({
        fieldId: document,
        identifiers: d?.documents?.find((e) => e?.fieldId === document)?.identifiers || [],
      })),

      permanentAddress: {
        ...d?.permanentAddress,
        locality: d?.permanentAddress?.locality?.local,
      },
      temporaryAddress: {
        ...d?.temporaryAddress,
        locality: d?.temporaryAddress?.locality?.local,
      },
    })),
    directorDetails: editValueData?.directorDetails?.map((d) => ({
      ...d,
      documents: accountOepratorDocumentMap?.map((document) => ({
        fieldId: document,
        identifiers: d?.documents?.find((e) => e?.fieldId === document)?.identifiers || [],
      })),
      permanentAddress: {
        ...d?.permanentAddress,
        locality: d?.permanentAddress?.locality?.local,
      },
      temporaryAddress: {
        ...d?.temporaryAddress,
        locality: d?.temporaryAddress?.locality?.local,
      },
    })),

    noOfMaleEmployee: Number(editValueData.noOfMaleEmployee),
    noOfFemaleEmployee: Number(editValueData.noOfFemaleEmployee),

    registeredAddress: {
      ...editValueData?.registeredAddress,
      localGovernmentId: editValueData?.registeredAddress?.localGovernmentId || null,
      locality: registeredAddressLocality,
    },
    operatingAddress: {
      ...editValueData?.operatingAddress,
      localGovernmentId: editValueData?.operatingAddress?.localGovernmentId || null,

      locality: operatingAddressLocality,
    },
    permanentRepresentativeAddress: {
      ...editValueData?.permanentRepresentativeAddress,
      locality: permanentAdrressLocality,
    },
    temporaryRepresentativeAddress: {
      ...editValueData?.temporaryRepresentativeAddress,
      locality: temporaryAddressLocality,
    },
  };
};

export const KYMCooperativePage = () => {
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {
      directorDetails: [
        {
          documents: directorDocumentMap?.map((document) => ({
            fieldId: document,
            identifiers: [],
          })),
        },
      ],
      accountOperator: [
        {
          documents: accountOepratorDocumentMap?.map((document) => ({
            fieldId: document,
            identifiers: [],
          })),
        },
      ],

      documents: documentMap?.map((document) => ({
        fieldId: document,
        identifiers: [],
      })),
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();
  const [kymCurrentSection, setKymCurrentSection] = useState<KYMSection>();

  const router = useRouter();
  const action = String(router.query['action']);
  const id = String(router.query['id']);

  const totalAssets = useAppSelector((state) => state.cooperative.totalAssets);
  const totalEquity = useAppSelector((state) => state.cooperative.totalEquity);

  const { mutateAsync } = useSetKymCooperativeDataMutation();
  const { data: editData, isFetching } = useGetKymCooperativeFormDataQuery(
    { id },
    { enabled: !!id }
  );

  useEffect(() => {
    if (action !== 'add')
      methods.reset({
        ...getCooperativeData(editData),
      });
  }, [editData, isFetching, methods, action]);

  const submitForm = (forDraft = false) => {
    methods.handleSubmit(async (data) => {
      await asyncToast({
        id: 'individual-add',
        msgs: {
          loading: action === 'edit' ? 'Editing Member' : 'Adding Member',
          success: action === 'edit' ? 'Member Edited Successfully' : 'Member Added Successfully',
        },
        promise: mutateAsync({
          id: router.query['id'] as string,
          data,
          forDraft,
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof KymCooperativeFormInput, {
                message: error.validationErrorMsg[key][0],
              })
            );
          }
        },
        onSuccess: () => {
          if (forDraft) {
            router.push(ROUTES.CBS_MEMBER_DRAFT_LIST);
          } else {
            router.push(`${ROUTES.CBS_MEMBER_TRANSLATION}?id=${router.query['id']}`);
          }
        },
      });
    })();
  };

  return (
    <form
      onFocus={(e) => {
        const kymSection = getKymCoopSection(e.target.id);
        if (kymSection.subSection === kymCurrentSection?.subSection) {
          setKymCurrentSection(kymSection);
        }
      }}
    >
      <FormLayout methods={methods} hasSidebar>
        <FormHeader
          title={
            action === 'edit'
              ? `Update Member - ${featureCode?.newMemberCooperative}`
              : `Add New Member - ${featureCode?.newMemberCooperative}`
          }
          closeLink={ROUTES.CBS_MEMBER_LIST}
        />

        <FormLayout.Content>
          <FormLayout.Sidebar borderPosition="right">
            <Box p="s16" pr="s20">
              <AccordionKymCoopForm kymCurrentSection={kymCurrentSection} />
            </Box>
          </FormLayout.Sidebar>

          <FormLayout.Form>
            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop1InformationofOrganization']}
              </Text>
              <KymCoopBasicInfo />

              <KymCoopRegdAddress />
              <KymCoopOpAddress />

              <KymCoopContactDetails />
              <KymCoopCurrentMembers />
              <KymCoopDate />
              <KymCoopRepresentative />
              <KymCoopAddCoopDetails />
              <KymCoopNoEmployee />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop2EconomicDetails']}
              </Text>
              <KymEquityLiabilities />
              <KymCoopAssets />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop3DetailsofBoardDirectors']}
              </Text>
              <KymCoopBoardDirectorDetail />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop4DetailsofAccountOperators']}
              </Text>
              <KymCoopAccountOperatorDetail />
            </SectionContainer>

            <SectionContainer>
              <Text p="s20" fontSize="r3" fontWeight="SemiBold">
                {t['kymCoop5Declaration']}
              </Text>
              <KymAccountHolderDeclaration />
              <KymCoopDocumentDeclarationForm />
            </SectionContainer>

            <Box p="s20" display="flex" gap="s16" alignItems="start">
              <Checkbox fontSize="s3" />
              <Text variant="formInput" mt="-6px">
                I/We agree to the&nbsp;
                <Text as="span" variant="link">
                  Terms and condition.
                </Text>
              </Text>
            </Box>
          </FormLayout.Form>
        </FormLayout.Content>

        <FormLayout.Footer
          draftButton={
            <Button
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                submitForm(true);
              }}
            >
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
          mainButtonLabel={action === 'update' ? 'Update' : t['next']}
          isMainButtonDisabled={!(totalAssets === totalEquity)}
          mainButtonHandler={() => {
            if (action === 'update') {
              onOpen();
            } else {
              submitForm();
            }
          }}
        />

        <KYMUpdateModal
          isOpen={isOpen}
          onClose={onClose}
          onUpdateClick={() =>
            mutateAsync({
              id: router.query['id'] as string,
              data: methods.getValues(),
              forDraft: false,
            })
          }
        />
      </FormLayout>
    </form>
  );
};

export default KYMCooperativePage;
