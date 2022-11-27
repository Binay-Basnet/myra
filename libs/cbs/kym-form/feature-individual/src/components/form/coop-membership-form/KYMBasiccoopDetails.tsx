import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, FormMemberSelect, FormSection, GridItem } from '@myra-ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { KYMBasiccoopDetailsFamilyMember } from './KYMBasiccoopDetailsFamilyMember';
import { getFieldOption } from '../../../utils/getFieldOption';

const booleanList = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

interface IKYMBasiccoopDetailsBasicProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

const KYMBasiccoopDetailsBasic = ({ setKymCurrentSection }: IKYMBasiccoopDetailsBasicProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { watch, reset } = methods;

  const { data: purposeData, isLoading: purposeLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Purpose,
  });

  const isMemberOfAnotherCooperative = watch('isMemberOfAnotherCooperative');

  const { data: editValues, refetch } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.membershipDetails,
        otherCoopName: editValueData?.membershipDetails?.otherCoopName?.local,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation({ onSuccess: () => refetch() });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormSection templateColumns={2} id="kymAccIndMainPurposeofBecomingMember">
          <FormSelect
            name="purposeId"
            label={t['kynIndMainpurposeofbecomingmember']}
            __placeholder={t['kynIndSelectpurposeofbecomingmember']}
            isLoading={purposeLoading}
            options={getFieldOption(purposeData)}
          />
        </FormSection>

        <FormSection>
          <GridItem colSpan={3}>
            <FormSwitchTab
              label={t['kynIndMemberofAnothercooperative']}
              options={booleanList}
              name="isMemberOfAnotherCooperative"
            />
          </GridItem>
          {isMemberOfAnotherCooperative && (
            <>
              <FormInput
                type="text"
                name="otherCoopName"
                label={t['kymIndCooperativeName']}
                __placeholder={t['kymIndCooperativeName']}
              />

              <FormInput
                name="otherCoopBranchId"
                label={t['kymIndCooperativeServiceCenter']}
                __placeholder={t['kymIndCooperativeEnterServiceCenter']}
              />

              <FormInput
                type="text"
                name="otherCoopMemberId"
                label={t['kymIndCooperativeMemberID']}
                __placeholder={t['kymIndCooperativeMemberID']}
              />
            </>
          )}
        </FormSection>
        {/* {otherCooperative?.members?.individual?.options?.list?.data?.[0]?.options?.map(
                    (option, optionIndex) => {
                      register(
                        `otherMembershipDetails.options.${optionIndex}.id`,
                        {
                          value: option.id,
                        }
                      );

                      return (
                        <FormInputWithType
                          key={optionIndex}
                          formType={option?.fieldType}
                          name={`otherMembershipDetails.options.${optionIndex}.value`}
                          label={option?.name?.local}
                          __placeholder={option?.name?.local}
                        />
                      );
                    }
                  )} */}
      </form>
    </FormProvider>
  );
};

interface IKYMBasiccoopDetailsIntroducerProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

const KYMBasiccoopDetailsIntroducer = ({
  setKymCurrentSection,
}: IKYMBasiccoopDetailsIntroducerProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm();

  const { watch, reset } = methods;

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.introducers,
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormSection header="kymIndIntroducers" templateColumns={2}>
          <FormMemberSelect name="firstIntroducerId" label={t['kymIndFirstIntroducer']} />

          <FormMemberSelect name="secondIntroducerId" label={t['kymIndSecondIntroducer']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};

interface IKYMBasiccoopDetailsProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const KYMBasiccoopDetails = ({ setKymCurrentSection }: IKYMBasiccoopDetailsProps) => (
  <Box display="flex" flexDirection="column" id="kymAccIndIncomeSourceDetails">
    <KYMBasiccoopDetailsBasic setKymCurrentSection={setKymCurrentSection} />

    <KYMBasiccoopDetailsIntroducer setKymCurrentSection={setKymCurrentSection} />

    <KYMBasiccoopDetailsFamilyMember setKymCurrentSection={setKymCurrentSection} />
  </Box>
);

// export const FamilyMember = ({ control, index }: any) => {
//   const { t } = useTranslation();
//   return (
//     <Grid templateColumns="repeat(4, 1fr)" gap="s16">
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndFirstName']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               __placeholder={t['kynIndFirstName']}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndCitizenshipNo']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               __placeholder={t['kynIndEnterCitizenshipNo']}
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndMemberID']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               __placeholder={t['kynIndEnterMemberID']}
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <Button
//         id="findmemberButton"
//         mt="23px"
//         variant="outline"
//         leftIcon={<Icon size="md" as={AiOutlineSearch} />}
//       >
//         {t['kynIndFindMember']}
//       </Button>
//     </Grid>
//   );
// };
