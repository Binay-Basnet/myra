import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { debounce } from 'lodash';

import { Alert, Box, FormSection, GridItem, MemberSelect, Text, toast } from '@myra-ui';

import { KymIndMemberInput } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSwitchTab, useMemberSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { FamilyMember } from './FamilyMember';

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

export const KYMIndCoopDetailsFamilyMember = () => {
  const { t } = useTranslation();
  const [currentMember, setCurrentMember] = useState(null);
  const [memberSearch, setMemberSearch] = useState();

  const { watch, control } = useFormContext<KymIndMemberInput>();

  const isFamilyAMember = watch('isFamilyAMember');

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'familyCoopMembers',
  });

  const { memberOptions, isFetching } = useMemberSelect({
    memberSearch,
    forceEnableAll: true,
  });

  return (
    <FormSection id="kymAccIndFamilyMemberinthisinstitution">
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s16">
          <FormSwitchTab
            label={t['kynIndFamilyMemberinthisinstitution']}
            options={booleanList}
            name="isFamilyAMember"
            id="familyMemberInThisInstitution"
          />
          {isFamilyAMember && (
            <Alert status="info" title="Info" hideCloseIcon>
              <Box display="flex" gap="s4" flexDirection="column">
                <ul>
                  <li>
                    <Text fontSize="r1" fontWeight="600">
                      Find Family Members With Name
                    </Text>
                  </li>
                  <li>
                    <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                      Multiple Members Can Be Selected With FInd Member Search{' '}
                    </Text>
                  </li>
                </ul>
              </Box>
            </Alert>
          )}
        </Box>
      </GridItem>

      {isFamilyAMember && (
        <>
          <GridItem colSpan={3}>
            <InputGroupContainer alignItems="center">
              <GridItem colSpan={2}>
                <MemberSelect
                  value={currentMember}
                  name="familyMemberId"
                  label="Member Search"
                  onInputChange={debounce((id) => {
                    setMemberSearch(id);
                  }, 800)}
                  options={memberOptions}
                  isLoading={isFetching}
                  onChange={(e: { value: string }) => {
                    if (fields.some((field) => field.familyMemberId === e.value)) {
                      toast({
                        id: 'error',
                        type: 'error',
                        message: 'This member has already been added',
                      });
                      setCurrentMember(null);

                      return;
                    }

                    append({
                      familyMemberId: e.value,
                    });
                  }}
                />
              </GridItem>
            </InputGroupContainer>
          </GridItem>

          {fields?.map((field, index) => (
            <GridItem colSpan={3} key={field.id}>
              <FamilyMember
                index={index}
                familyMemberId={field.familyMemberId}
                removeFamilyMember={() => remove(index)}
              />
            </GridItem>
          ))}
        </>
      )}
    </FormSection>
  );
};
