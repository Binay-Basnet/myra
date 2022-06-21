import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { useGetIndIdentificationDocOptionQuery } from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Checkbox, Grid, Text } from '@coop/shared/ui';

const identificationDetails = [
  'Citizenship',
  'Driving License',
  'Passport',
  'Voters Card',
  'National ID',
];

export const MemberKYMIdentificationDetails = () => {
  const { register } = useFormContext();
  const { data: identificationDocsData } =
    useGetIndIdentificationDocOptionQuery();

  const identificationDocs = useMemo(
    () =>
      identificationDocsData?.members?.individual?.options?.list?.data ?? [],
    [identificationDocsData]
  );
  const [currentShownDetails, setCurrentDetailsShown] = useState<string[]>([]);

  console.log();

  return (
    <GroupContainer id="Identification Details" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="semibold">
        IDENTIFICATION DETAILS
      </Text>
      <Text fontSize="r1" fontWeight="medium">
        Choose identification details
      </Text>
      <Box display="flex">
        {identificationDocs.map((item, index) => (
          <Checkbox
            id="identificationDetailsPersonal"
            mr={5}
            key={index}
            label={String(item?.name.local)}
            onChange={() => {
              if (!item?.id) return;

              if (currentShownDetails.includes(item.id)) {
                setCurrentDetailsShown((prev) =>
                  prev.filter((data) => data !== item.id)
                );
              } else {
                item?.name.local &&
                  setCurrentDetailsShown((prev) => [...prev, item.id]);
              }
            }}
          />
        ))}
      </Box>

      {currentShownDetails.length !== 0 ? (
        <GroupContainer>
          {identificationDocs
            .filter((docs) => docs && currentShownDetails.includes(docs?.id))
            .map((field, fieldIndex) => {
              register(`identification.${fieldIndex}.id`, {
                value: field?.id,
              });
              return (
                <Box display="flex" flexDirection="column" gap="s24">
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
                        `identification.${fieldIndex}.fields.${optionIndex}.id`,
                        {
                          value: option.id,
                        }
                      );

                      return (
                        <FormInput
                          type="number"
                          name={`identification.${fieldIndex}.fields.${optionIndex}.value`}
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
      ) : null}
    </GroupContainer>
  );
};
