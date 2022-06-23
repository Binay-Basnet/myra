import React, { useState, useMemo } from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopNoEmployee = () => {
  const { t } = useTranslation();
  const [maleNum, setMaleNum] = useState(0);
  const [femaleNum, setFemaleNum] = useState(0);

  const totalEmployee = useMemo(
    () => Number(maleNum) + Number(femaleNum),
    [maleNum, femaleNum]
  );

  return (
    <GroupContainer id="Number of Employee" scrollMarginTop={'200px'}>
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
          name="noOfMaleEmployee"
          label={t['kymCoopMale']}
          placeholder="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMaleNum(Number(e.target.value))
          }
        />
        <FormInput
          type="number"
          textAlign={'right'}
          name="noOfFemaleEmloyee"
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
          name="totalEmployee"
          label={t['kymCoopTotal']}
          placeholder="0"
          value={totalEmployee}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
