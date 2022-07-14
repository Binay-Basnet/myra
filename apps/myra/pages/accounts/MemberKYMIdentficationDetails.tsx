import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Option_Field_Type,
  KymIndMemberInput,
  useGetIndIdentificationDocOptionQuery,
} from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Checkbox, Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const MemberKYMIdentificationDetails = () => {
  const { t } = useTranslation();
  const { register, getValues } = useFormContext<KymIndMemberInput>();
  const { data: identificationDocsData } =
    useGetIndIdentificationDocOptionQuery();

  const identificationDocs = useMemo(
    () =>
      identificationDocsData?.members?.individual?.options?.list?.data ?? [],
    [identificationDocsData]
  );
  const identificationValues = getValues()?.identification;
  const checkedIds =
    identificationValues?.map((item) =>
      String(item?.options?.[0] && item?.id)
    ) ?? [];
  const [currentShownDetails, setCurrentDetailsShown] = useState<string[]>([]);
  React.useEffect(() => {
    checkedIds.length !== 0 && setCurrentDetailsShown([...checkedIds]);
  }, [JSON.stringify(checkedIds)]);

  return (
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
        {identificationDocs.map(
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
        )}
      </Box>

      {currentShownDetails?.length !== 0 ? (
        <GroupContainer>
          {identificationDocs
            .filter((docs) => docs && currentShownDetails?.includes(docs?.id))
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
                          type={option?.fieldType}
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
      ) : null}
    </GroupContainer>
  );
};
