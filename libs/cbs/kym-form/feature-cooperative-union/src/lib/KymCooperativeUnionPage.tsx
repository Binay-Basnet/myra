import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import omit from 'lodash/omit';

import { asyncToast, Box, Button, Icon, Text } from '@myra-ui';

import {
  CoopUnionInstitutionInformationInput,
  GetCooperativeUnionKymEditDataQuery,
  useGetCooperativeUnionKymEditDataQuery,
  useSetCooperativeUnionDataMutation,
} from '@coop/cbs/data-access';
import { AccorrdianAddCOOPUnion, KYMUpdateModal } from '@coop/cbs/kym-form/formElements';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { featureCode, getKymSectionCoOperativeUnion, useTranslation } from '@coop/shared/utils';

import { CentralRepresentativeDetails } from '../components';
import { AccountOperatorDetails } from '../components/FormSections/account-operators';
import { DirectorDetails } from '../components/FormSections/board-directors-details';
import { Declaration } from '../components/FormSections/decleration';
import { EconomicDetails } from '../components/FormSections/economic-details';
import { InstituteInfo } from '../components/FormSections/institute-info';
import { CustomCoopUnionInstitutionInformationInput } from '../types';

type KYMSection = {
  section: string;
  subSection: string;
};

const documentFields = [
  'applicantSign',
  'applicantStamp',
  'agmBodDecisionDocument',
  'registeredCertificate',
  'moaAoa',
  'panCertificate',
  'taxClearance',
  'lastAuditReport',
  'logo',
  'minuteOfCentralRep',
];

const directorDocFields = ['photograph', 'identityDocumentPhoto'];

const accountOperatorDocFields = ['photograph', 'identityDocumentPhoto', 'signature'];

const crDocFields = ['photograph', 'identityDocumentPhoto', 'signature', 'crDecisionDocument'];

const getCoopUnionData = (data: GetCooperativeUnionKymEditDataQuery | undefined) => {
  const editData = data?.members?.cooperativeUnion?.formState?.data;

  if (!editData) return {};

  return {
    ...omit(editData, 'objState'),
    regdAddress: {
      ...editData?.regdAddress,
      locality: editData?.regdAddress?.locality?.local,
    },
    operatingOfficeAddress: {
      ...editData?.operatingOfficeAddress,
      locality: editData?.operatingOfficeAddress?.locality?.local,
    },
    branchOfficeAddress: {
      ...editData?.branchOfficeAddress,
      locality: editData?.branchOfficeAddress?.locality?.local,
    },
    applicantPermanentAddress: {
      ...editData?.applicantPermanentAddress,
      locality: editData?.applicantPermanentAddress?.locality?.local,
    },
    applicantTemporaryAddress: {
      ...editData?.applicantTemporaryAddress,
      locality: editData?.applicantTemporaryAddress?.locality?.local,
    },
    directors:
      editData?.directors?.map((director) => ({
        ...director,
        permanentAddress: {
          ...director?.permanentAddress,
          locality: director?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...director?.temporaryAddress,
          locality: director?.temporaryAddress?.locality?.local,
        },
        documents: directorDocFields?.map((document) => ({
          fieldId: document,
          identifiers: director?.documents?.find((d) => d?.fieldId === document)?.identifiers || [],
        })),
      })) ?? [],
    accountOperators:
      editData?.accountOperators?.map((accountOp) => ({
        ...accountOp,
        permanentAddress: {
          ...accountOp?.permanentAddress,
          locality: accountOp?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...accountOp?.temporaryAddress,
          locality: accountOp?.temporaryAddress?.locality?.local,
        },
        documents: accountOperatorDocFields?.map((document) => ({
          fieldId: document,
          identifiers:
            accountOp?.documents?.find((d) => d?.fieldId === document)?.identifiers || [],
        })),
      })) ?? [],
    centralRepresentative: {
      ...editData?.centralRepresentative,
      permanentAddress: {
        ...editData?.centralRepresentative?.permanentAddress,
        locality: editData?.centralRepresentative?.permanentAddress?.locality?.local,
      },
      temporaryAddress: {
        ...editData?.centralRepresentative?.temporaryAddress,
        locality: editData?.centralRepresentative?.temporaryAddress?.locality?.local,
      },
      documents: crDocFields?.map((document) => ({
        fieldId: document,
        identifiers:
          editData?.centralRepresentative?.documents?.find((d) => d?.fieldId === document)
            ?.identifiers || [],
      })),
    },
    documents: documentFields?.map((document) => ({
      fieldId: document,
      identifiers: editData?.documents?.find((d) => d?.fieldId === document)?.identifiers || [],
    })),
  };
};

export const KYMCooperativeUnionPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();

  const { id } = router.query;

  const action = String(router.query['action']);

  const [kymCurrentSection, setKymCurrentSection] = useState<KYMSection>();

  const setSection = useCallback((section: KYMSection) => setKymCurrentSection(section), []);

  // const dispatch = useAppDispatch();
  // const isFormDirty = useAppSelector((state) => state.coopUnion.isFormDirty);

  // const totalEquityCurrent = useAppSelector((state) => state.coopUnion.totalEquityCurrent);
  // const totalEquityTarget = useAppSelector((state) => state.coopUnion.totalEquityTarget);
  // const totalAssetsCurrent = useAppSelector((state) => state.coopUnion.totalAssetsCurrent);
  // const totalAssetsTarget = useAppSelector((state) => state.coopUnion.totalAssetsTarget);

  // const isCurrentEqual = totalEquityCurrent === totalAssetsCurrent;
  // const isTargetEqual = totalEquityTarget === totalAssetsTarget;

  const methods = useForm<CustomCoopUnionInstitutionInformationInput>({
    defaultValues: {
      directors: [
        {
          documents: directorDocFields?.map((document) => ({
            fieldId: document,
            identifiers: [],
          })),
        },
      ],
      accountOperators: [
        {
          documents: accountOperatorDocFields?.map((document) => ({
            fieldId: document,
            identifiers: [],
          })),
        },
      ],
      documents: documentFields?.map((fieldId) => ({ fieldId, identifiers: [] })),
      centralRepresentative: {
        documents: crDocFields?.map((fieldId) => ({ fieldId, identifiers: [] })),
      },
    },
  });

  const { mutateAsync } = useSetCooperativeUnionDataMutation();

  const submitForm = (forDraft = false) => {
    methods.handleSubmit(async (data) => {
      await asyncToast({
        id: 'coop-union-add',
        msgs: {
          loading: action === 'edit' ? 'Editing Member' : 'Adding Member',
          success: action === 'edit' ? 'Member Edited Successfully' : 'Member Added Successfully',
        },
        promise: mutateAsync({
          id: router.query['id'] as string,
          data: omit(data, ['notAmongDirectors']),
          forDraft,
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof CoopUnionInstitutionInformationInput, {
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

  const { data: coopUnionEditData, isFetching } = useGetCooperativeUnionKymEditDataQuery(
    { id: id as string },
    { enabled: !!id }
  );

  useEffect(() => {
    if (action === 'edit') {
      methods.reset({ ...methods.getValues(), ...getCoopUnionData(coopUnionEditData) });
    }
  }, [action, coopUnionEditData, methods]);

  return (
    <>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);
          if (kymSection.subSection === kymCurrentSection?.subSection) {
            setSection(kymSection);
          }
        }}
      >
        <FormLayout methods={methods} hasSidebar>
          <FormLayout.Header
            title={
              action === 'edit' || action === 'update'
                ? `Update Member - ${featureCode?.newMemberCooperativeUnion}`
                : `Add New Member - ${featureCode?.newMemberCooperativeUnion}`
            }
            closeLink={ROUTES.CBS_MEMBER_LIST}
          />

          <FormLayout.Content>
            <FormLayout.Sidebar borderPosition="right">
              <Box p="s16" pr="s20">
                <AccorrdianAddCOOPUnion kymCurrentSection={kymCurrentSection} />
              </Box>
            </FormLayout.Sidebar>

            <FormLayout.Form>
              <InstituteInfo />
              <DirectorDetails />
              <AccountOperatorDetails />
              <CentralRepresentativeDetails />
              <EconomicDetails />
              <Declaration />
            </FormLayout.Form>
          </FormLayout.Content>

          <FormLayout.Footer
            draftButton={
              coopUnionEditData?.members?.cooperativeUnion?.formState?.data?.objState &&
              !['APPROVED', 'VALIDATED']?.includes(
                coopUnionEditData?.members?.cooperativeUnion?.formState?.data?.objState || ''
              ) && (
                <Button variant="ghost" onClick={() => submitForm(true)}>
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
              )
            }
            isMainButtonDisabled={isFetching}
            mainButtonLabel={action === 'update' ? 'Update' : t['next']}
            mainButtonHandler={async () => {
              if (action === 'update') {
                onOpen();
              } else {
                submitForm();
              }
            }}
          />
        </FormLayout>
      </form>

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
    </>
  );
};

export default KYMCooperativeUnionPage;
