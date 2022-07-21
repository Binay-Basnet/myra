import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  KymIndMemberInput,
  useGetIndIdentificationDocOptionQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormCheckboxGroup, FormInput } from '@coop/shared/form';
import { Box, Checkbox, Grid, Text } from '@coop/shared/ui';
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

  const { register, getValues, watch } = methods;

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { data: identificationDocsData } =
    useGetIndIdentificationDocOptionQuery({ id });

  const identificationDocs = useMemo(
    () =>
      identificationDocsData?.members?.individual?.options?.list?.data ?? [],
    [identificationDocsData]
  );

  console.log({ identificationDocs });

  const identificationValues = getValues()?.identifications;

  // const checkedIds =
  //   identificationValues?.map((item) =>
  //     String(item?.options?.[0] && item?.id)
  //   ) ?? [];

  const [currentShownDetails, setCurrentDetailsShown] = useState<string[]>([]);

  // console.log({ currentShownDetails });

  // React.useEffect(() => {
  //   checkedIds.length !== 0 && setCurrentDetailsShown([...checkedIds]);
  // }, [JSON.stringify(checkedIds)]);

  const { mutate } = useSetMemberDataMutation({
    onSuccess: (res) => {
      // setError('firstName', {
      //   type: 'custom',
      //   message: res?.members?.individual?.add?.error?.error?.['firstName'][0],
      // });
      console.log(res);
    },
    //   onError: () => {
    //     setError('firstName', { type: 'custom', message: 'gg' });
    //   },
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id: router.query['id'] as string, data });
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
              name={'identifications'}
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
                  Citizenship
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="citizenshipNo"
                    label="Citizenship No"
                    placeholder="Citizenship No"
                  />

                  <FormInput
                    type="text"
                    name="citizenshipIssuePlace"
                    label="Place of Issue"
                    placeholder="Place of Issue"
                  />

                  <FormInput
                    type="date"
                    name="citizenshipIssueDate"
                    label="Issued Date"
                    placeholder="Issued Date"
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
                  Driving License
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="drivingLicenseNo"
                    label="Driving License No"
                    placeholder="Driving License No"
                  />

                  <FormInput
                    type="text"
                    name="drivingLicenseIssuePlace"
                    label="Place of Issue"
                    placeholder="Place of Issue"
                  />

                  <FormInput
                    type="date"
                    name="drivingLicenseIssueDate"
                    label="Issued Date"
                    placeholder="Issued Date"
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
                  Passport
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="passportNo"
                    label="Passport No"
                    placeholder="Passport No"
                  />

                  <FormInput
                    type="text"
                    name="passportIssuePlace"
                    label="Place of Issue"
                    placeholder="Place of Issue"
                  />

                  <FormInput
                    type="date"
                    name="passportIssueDate"
                    label="Issued Date"
                    placeholder="Issued Date"
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
                  Voter Card
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="voterCardNo"
                    label="Voter Card No"
                    placeholder="Voter Card No"
                  />

                  <FormInput
                    type="text"
                    name="voterPollingStation"
                    label="Polling Station"
                    placeholder="Polling Station"
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
                  National ID
                </Text>
                <Grid templateColumns="repeat(3, 1fr)" gap="s20">
                  <FormInput
                    type="text"
                    name="nationalIDNo"
                    label="National ID No"
                    placeholder="National ID No"
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
