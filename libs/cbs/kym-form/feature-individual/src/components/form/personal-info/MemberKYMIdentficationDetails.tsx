import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  KymIndMemberInput,
  RootState,
  useAppSelector,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, FormSection } from '@myra-ui';
import { getKymSection } from '@coop/shared/utils';

import { Citizenship, DrivingLicense, NationalID, Passport, VoterCard } from '../identifications';

interface IMemberKYMIdentificationDetailsProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
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
  const methods = useForm<KymIndMemberInput>();

  const { reset, watch } = methods;

  const router = useRouter();
  const id = router?.query?.['id'];

  // const { data: identificationDocsData } =
  //   useGetIndIdentificationDocOptionQuery({ id });

  // const identificationDocs = useMemo(
  //   () =>
  //     identificationDocsData?.members?.individual?.options?.list?.data ?? [],
  //   [identificationDocsData]
  // );

  const identificationValues = watch('identificationSelection');

  // const checkedIds =
  //   identificationValues?.map((item) =>
  //     String(item?.options?.[0] && item?.id)
  //   ) ?? [];

  // const [currentShownDetails, setCurrentDetailsShown] = useState<string[]>([]);

  //

  // React.useEffect(() => {
  //   checkedIds.length !== 0 && setCurrentDetailsShown([...checkedIds]);
  // }, [JSON.stringify(checkedIds)]);

  const { data: editValues, refetch: refetchEdit } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.formState?.data?.formData;

      reset({
        identificationSelection: editValueData?.identificationSelection,
      });
    }
  }, [editValues]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetchEdit();
  }, [preference?.date]);

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
    <Box>
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSection(e.target.id);
            setKymCurrentSection(kymSection);
          }}
        >
          <FormSection
            flexLayout
            header="kymIndIDENTIFICATIONDETAILS"
            subHeader="kymIndChooseidentificationdetails"
          >
            <FormCheckboxGroup
              name="identificationSelection"
              showOther={false}
              list={identificationOptions}
            />
          </FormSection>
        </form>
      </FormProvider>
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

      <Box mt="s16" display="flex" flexDirection="column">
        {identificationValues?.includes('citizenship') && (
          <Citizenship setKymCurrentSection={setKymCurrentSection} />
        )}

        {identificationValues?.includes('drivingLicense') && (
          <DrivingLicense setKymCurrentSection={setKymCurrentSection} />
        )}

        {identificationValues?.includes('passport') && (
          <Passport setKymCurrentSection={setKymCurrentSection} />
        )}

        {identificationValues?.includes('voterCard') && (
          <VoterCard setKymCurrentSection={setKymCurrentSection} />
        )}

        {identificationValues?.includes('nationalId') && (
          <NationalID setKymCurrentSection={setKymCurrentSection} />
        )}
      </Box>

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
                              __placeholder={String(option?.name?.local)}
                            />
                          );
                        })}
                      </Grid>
                    </Box>
                  );
                })}
            </GroupContainer>
          ) : null} */}
    </Box>
  );
};
