import React, { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopNoEmployee = (props: IProps) => {
  const { t } = useTranslation();
  const [maleNum, setMaleNum] = useState(0);
  const [femaleNum, setFemaleNum] = useState(0);

  const totalEmployee = useMemo(
    () => Number(maleNum) + Number(femaleNum),
    [maleNum, femaleNum]
  );
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { control, handleSubmit, getValues, watch, setError } = methods;
  useCooperative({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        {' '}
        <GroupContainer
          id="kymCoopAccNumberofEmployee"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopNumberofEmployee']}
          </Text>
          <InputGroupContainer>
            <FormInput
              type="number"
              textAlign={'right'}
              name="noOfMaleMembers"
              label={t['kymCoopMale']}
              placeholder="0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMaleNum(Number(e.target.value))
              }
            />
            <FormInput
              type="number"
              textAlign={'right'}
              name="noOfFemaleMembers"
              label={t['kymCoopFemale']}
              placeholder="0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFemaleNum(Number(e.target.value))
              }
            />

            <FormInput
              bg="neutralColorLight.Gray-20"
              border="1px solid"
              borderColor="disabled.disabled"
              isDisabled={true}
              type="number"
              textAlign={'right'}
              name="noOfOtherMembers"
              label={t['kymCoopTotal']}
              placeholder="0"
              value={totalEmployee}
            />
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
