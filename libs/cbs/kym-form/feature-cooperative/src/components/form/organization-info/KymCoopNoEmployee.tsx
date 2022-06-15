import React, { useState, useMemo } from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';
import { Text } from '@coop/shared/ui';

export const KymCoopNoEmployee = () => {
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
        Number of Employee
      </Text>
      <InputGroupContainer>
        <FormInput
          type="number"
          textAlign={'right'}
          name="noOfMaleEmployee"
          label="Male"
          placeholder="0"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMaleNum(Number(e.target.value))
          }
        />
        <FormInput
          type="number"
          textAlign={'right'}
          name="noOfFemaleEmloyee"
          label="Female"
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
          label="Total"
          placeholder="0"
          value={totalEmployee}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
