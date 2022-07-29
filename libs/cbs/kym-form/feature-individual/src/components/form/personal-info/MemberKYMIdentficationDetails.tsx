import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormCheckboxGroup, FormInput } from '@coop/shared/form';
import { Box, Grid, Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

interface IMemberKYMIdentificationDetailsProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

const identificationOptions = [
  { value: 'citizenship', label: 'Citizenship' },
  { value: 'drivingLicense', label: 'Driving License' },
  { value: 'passport', label: 'Passport' },
  { value: 'voterCard', label: 'Voter Card' },
  { value: 'nationalId', label: 'National ID' },
];

export const MemberKYMIdentificationDetails = ({
  setKymCurrentSection,
}: IMemberKYMIdentificationDetailsProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymIndMemberInput>();

  const { reset, getValues, watch } = methods;

  const router = useRouter();
  const id = router?.query?.['id'];

  // const { data: identificationDocsData } =
  //   useGetIndIdentificationDocOptionQuery({ id });

  // const identificationDocs = useMemo(
  //   () =>
  //     identificationDocsData?.members?.individual?.options?.list?.data ?? [],
  //   [identificationDocsData]
  // );

  const identificationValues = getValues()?.identificationSelection;

  // const checkedIds =
  //   identificationValues?.map((item) =>
  //     String(item?.options?.[0] && item?.id)
  //   ) ?? [];

  // const [currentShownDetails, setCurrentDetailsShown] = useState<string[]>([]);

  // console.log({ currentShownDetails });

  // React.useEffect(() => {
  //   checkedIds.length !== 0 && setCurrentDetailsShown([...checkedIds]);
  // }, [JSON.stringify(checkedIds)]);

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.identification,
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
        <GroupContainer
          id="kymAccIndIdentificationDetails"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="semibold">
            {t['kymIndIDENTIFICATIONDETAILS']}
          </Text>
          <Text fontSize="r1" fontWeight="medium">
            {t['kymIndChooseidentificationdetails']}
          </Text>
          <Box display="flex">
            <FormCheckboxGroup
              name={'identificationSelection'}
              showOther={false}
              list={identificationOptions}
            />
            {/* {identificationOptions.map(
              (item, index) => {
                // const isChecked = checkedIds?.includes(item.name);
                return (
                  // identificationValues.map((data, i) => (

                  <Checkbox
                    id="identificationDetailsPersonal"
                    mr={5}
                    key={index + item.name}
                    label={String(item.label)}
                    // defaultChecked={isChecked}
                    onChange={() => {
                      if (currentShownDetails?.includes(item.name)) {
                        setCurrentDetailsShown((prev) =>
                          prev.filter((data) => data !== item.name)
                        );
                      } else {
                        setCurrentDetailsShown((prev) => [...prev, item.name]);
                      }
                    }}
                  />
                );
              }
              // ))
            )} */}

            {/* {identificationDocs.map(
              (item, index) => {
                const isChecked = checkedIds?.includes(item?.id);
                return (
                  // identificationValues.map((data, i) => (
                  <Checkbox
                    id="identificationDetailsPersonal"
                    mr={5}
                    key={item?.id + isChecked}
                    label={String(item?.name.local)}
                    defaultChecked={isChecked}
                    onChange={() => {
                      if (!item?.id) return;

                      if (currentShownDetails?.includes(item.id)) {
                        setCurrentDetailsShown((prev) =>
                          prev.filter((data) => data !== item.id)
                        );
                      } else {
                        item?.name.local &&
                          setCurrentDetailsShown((prev) => [...prev, item.id]);
                      }
                    }}
                  />
                );
              }
              // ))
            )} */}
          </Box>

          <GroupContainer>
            {identificationValues?.includes('citizenship') && (
              <Box display="flex" flexDirection="column" gap="s16">
                <Text
                  fontSize="r1"
                  fontWeight="medium"
                  color="neutralColorLight.Gray-70"
                >
                  {t['kynIndCitizenship']}
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="citizenshipNo"
                    label={t['kynIndCitizenshipNo']}
                    placeholder={t['kynIndCitizenshipNo']}
                  />

                  <FormInput
                    type="text"
                    name="citizenshipIssuePlace"
                    label={t['kynIndCitizenshipIssuePlace']}
                    placeholder={t['kynIndCitizenshipIssuePlace']}
                  />

                  <FormInput
                    type="date"
                    name="citizenshipIssueDate"
                    label={t['kynIndCitizenshipIssueDate']}
                    placeholder={t['kynIndCitizenshipIssueDate']}
                  />
                </Grid>
              </Box>
            )}

            {identificationValues?.includes('drivingLicense') && (
              <Box display="flex" flexDirection="column" gap="s16">
                <Text
                  fontSize="r1"
                  fontWeight="medium"
                  color="neutralColorLight.Gray-70"
                >
                  {t['kymIndDrivingLicense']}
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="drivingLicenseNo"
                    label={t['kymIndDrivingLicenseNo']}
                    placeholder={t['kymIndDrivingLicenseNo']}
                  />

                  <FormInput
                    type="text"
                    name="drivingLicenseIssuePlace"
                    label={t['kymIndDrivingLicenseIssuePlace']}
                    placeholder={t['kymIndDrivingLicenseIssuePlace']}
                  />

                  <FormInput
                    type="date"
                    name="drivingLicenseIssueDate"
                    label={t['kymIndDrivingLicenseIssueDate']}
                    placeholder={t['kymIndDrivingLicenseIssueDate']}
                  />
                </Grid>
              </Box>
            )}

            {identificationValues?.includes('passport') && (
              <Box display="flex" flexDirection="column" gap="s16">
                <Text
                  fontSize="r1"
                  fontWeight="medium"
                  color="neutralColorLight.Gray-70"
                >
                  {t['kymIndPassport']}
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="passportNo"
                    label={t['kymIndPassportNo']}
                    placeholder={t['kymIndPassportNo']}
                  />

                  <FormInput
                    type="text"
                    name="passportIssuePlace"
                    label={t['kymIndPassportIssuePlace']}
                    placeholder={t['kymIndPassportIssuePlace']}
                  />

                  <FormInput
                    type="date"
                    name="passportIssueDate"
                    label={t['kymIndPassportIssueDate']}
                    placeholder={t['kymIndPassportIssueDate']}
                  />
                </Grid>
              </Box>
            )}

            {identificationValues?.includes('voterCard') && (
              <Box display="flex" flexDirection="column" gap="s16">
                <Text
                  fontSize="r1"
                  fontWeight="medium"
                  color="neutralColorLight.Gray-70"
                >
                  {t['kymIndVoterCard']}
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="voterCardNo"
                    label={t['kymIndVoterCardNo']}
                    placeholder={t['kymIndVoterCardNo']}
                  />

                  <FormInput
                    type="text"
                    name="voterPollingStation"
                    label={t['kymIndVoterCardPollingStation']}
                    placeholder={t['kymIndVoterCardPollingStation']}
                  />
                </Grid>
              </Box>
            )}

            {identificationValues?.includes('nationalId') && (
              <Box display="flex" flexDirection="column" gap="s16">
                <Text
                  fontSize="r1"
                  fontWeight="medium"
                  color="neutralColorLight.Gray-70"
                >
                  {t['kymIndNationalID']}
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="nationalIDNo"
                    label={t['kymIndNationalIDNo']}
                    placeholder={t['kymIndNationalIDNo']}
                  />
                </Grid>
              </Box>
            )}
          </GroupContainer>

          {/* {currentShownDetails?.length !== 0 ? (
            <GroupContainer>
              {identificationDocs
                .filter(
                  (docs) => docs && currentShownDetails?.includes(docs?.id)
                )
                .map((field, fieldIndex) => {
                  register(`identification.${fieldIndex}.id`, {
                    value: field?.id,
                  });
                  return (
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="s24"
                      key={fieldIndex}
                    >
                      <Text
                        fontSize="r1"
                        fontWeight="medium"
                        color="neutralColorLight.Gray-70"
                      >
                        {field?.name.local}
                      </Text>
                      <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                        {field?.options?.map((option, optionIndex) => {
                          register(
                            `identification.${fieldIndex}.options.${optionIndex}.id`,
                            {
                              value: option.id,
                            }
                          );
                          return (
                            <FormInputWithType
                              key={optionIndex}
                              formType={option?.fieldType}
                              id="identificationFields"
                              name={`identification.${fieldIndex}.options.${optionIndex}.value`}
                              label={String(option?.name?.local)}
                              placeholder={String(option?.name?.local)}
                            />
                          );
                        })}
                      </Grid>
                    </Box>
                  );
                })}
            </GroupContainer>
          ) : null} */}
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
