import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { ContainerWithDivider } from '@coop/cbs/kym-form/ui-containers';
import { CoopUnionInstitutionInformationInput } from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Input, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface ICooperativeMemberInformationProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const CooperativeMemberInformation = ({
  setSection,
}: ICooperativeMemberInformationProps) => {
  const { t } = useTranslation();

  // const [currentTotal, setCurrentTotal] = useState<number>(0);
  // const [targetTotal, setTargetTotal] = useState<number>(0);

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCooperativeUnionInstitution({ methods });

  const { watch } = methods;

  const noOfMaleMemberCurrent = isNaN(watch('noOfMaleMemberCurrent'))
    ? 0
    : watch('noOfMaleMemberCurrent');
  const noOfFemaleMemberCurrent = isNaN(watch('noOfFemaleMemberCurrent'))
    ? 0
    : watch('noOfFemaleMemberCurrent');
  const noOfInstitutionalMemberCurrent = isNaN(
    watch('noOfInstitutionalMemberCurrent')
  )
    ? 0
    : watch('noOfInstitutionalMemberCurrent');

  const noOfMaleMemberTarget = isNaN(watch('noOfMaleMemberTarget'))
    ? 0
    : watch('noOfMaleMemberTarget');
  const noOfFemaleMemberTarget = isNaN(watch('noOfFemaleMemberTarget'))
    ? 0
    : watch('noOfFemaleMemberTarget');
  const noOfInstitutionalMemberTarget = isNaN(
    watch('noOfInstitutionalMemberTarget')
  )
    ? 0
    : watch('noOfInstitutionalMemberTarget');

  const currentTotal =
    Number(noOfMaleMemberCurrent) +
    Number(noOfFemaleMemberCurrent) +
    Number(noOfInstitutionalMemberCurrent);

  const targetTotal =
    Number(noOfMaleMemberTarget) +
    Number(noOfFemaleMemberTarget) +
    Number(noOfInstitutionalMemberTarget);

  // useEffect(() => {
  //   setCurrentTotal(
  //     (parseInt(noOfMaleMemberCurrent) || 0) +
  //       (parseInt(noOfFemaleMemberCurrent) || 0) +
  //       (parseInt(noOfInstitutionalMemberCurrent) || 0)
  //   );

  //   setTargetTotal(
  //     (parseInt(noOfMaleMemberTarget) || 0) +
  //       (parseInt(noOfFemaleMemberTarget) || 0) +
  //       (parseInt(noOfInstitutionalMemberTarget) || 0)
  //   );
  // }, [
  //   noOfMaleMemberCurrent,
  //   noOfFemaleMemberCurrent,
  //   noOfInstitutionalMemberCurrent,
  //   noOfMaleMemberTarget,
  //   noOfFemaleMemberTarget,
  //   noOfInstitutionalMemberTarget,
  // ]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopUnionAccContactDetails"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {'Cooperative Member Information'}
          </Text>

          <ContainerWithDivider gap="s8">
            <InputGroupContainer>
              <Text
                fontSize="s3"
                fontWeight={600}
                color="neutralColorLight.Gray-80"
              >
                Member Details
              </Text>

              <Text
                fontSize="s3"
                fontWeight={600}
                color="neutralColorLight.Gray-80"
              >
                Current
              </Text>

              <Text
                fontSize="s3"
                fontWeight={600}
                color="neutralColorLight.Gray-80"
              >
                Target for next fiscal year
              </Text>
            </InputGroupContainer>
            <InputGroupContainer>
              <TextFields variant="formHelper" margin="auto 0">
                No. of Male Members
              </TextFields>

              <FormInput
                type="number"
                name="noOfMaleMemberCurrent"
                placeholder={'Enter No. of Male Members'}
              />

              <FormInput
                type="number"
                name="noOfMaleMemberTarget"
                placeholder={'Enter No. of Male Members'}
              />
            </InputGroupContainer>

            <InputGroupContainer>
              <TextFields variant="formHelper" margin="auto 0">
                No. of Female Members
              </TextFields>

              <FormInput
                type="number"
                name="noOfFemaleMemberCurrent"
                placeholder={'Enter No. of Female Members'}
              />

              <FormInput
                type="number"
                name="noOfFemaleMemberTarget"
                placeholder={'Enter No. of Female Members'}
              />
            </InputGroupContainer>

            <InputGroupContainer>
              <TextFields variant="formHelper" margin="auto 0">
                No. of Institutional Members
              </TextFields>

              <FormInput
                type="number"
                name="noOfInstitutionalMemberCurrent"
                placeholder={'Enter No. of Institutional Members'}
              />

              <FormInput
                type="number"
                name="noOfInstitutionalMemberTarget"
                placeholder={'Enter No. of Institutional Members'}
              />
            </InputGroupContainer>

            <InputGroupContainer>
              <TextFields variant="formLabel" margin="auto 0">
                Total Current Members
              </TextFields>

              <Input
                type="number"
                // placeholder={'0'}
                isDisabled
                value={currentTotal}
              />

              <Input
                type="number"
                // placeholder={'0'}
                isDisabled
                value={targetTotal}
              />
            </InputGroupContainer>
          </ContainerWithDivider>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
