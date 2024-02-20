import { useFormContext } from 'react-hook-form';

import { Input, Text } from '@myra-ui';

import {
  ContainerWithDivider,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const CooperativeMemberInformation = () => {
  const { t } = useTranslation();

  // const [currentTotal, setCurrentTotal] = useState<number>(0);
  // const [targetTotal, setTargetTotal] = useState<number>(0);

  const { watch } = useFormContext();

  const noOfMaleMemberCurrent = Number.isNaN(watch('noOfMaleMemberCurrent'))
    ? 0
    : watch('noOfMaleMemberCurrent');
  const noOfFemaleMemberCurrent = Number.isNaN(watch('noOfFemaleMemberCurrent'))
    ? 0
    : watch('noOfFemaleMemberCurrent');
  const noOfInstitutionalMemberCurrent = Number.isNaN(watch('noOfInstitutionalMemberCurrent'))
    ? 0
    : watch('noOfInstitutionalMemberCurrent');

  const noOfMaleMemberTarget = Number.isNaN(watch('noOfMaleMemberTarget'))
    ? 0
    : watch('noOfMaleMemberTarget');
  const noOfFemaleMemberTarget = Number.isNaN(watch('noOfFemaleMemberTarget'))
    ? 0
    : watch('noOfFemaleMemberTarget');
  const noOfInstitutionalMemberTarget = Number.isNaN(watch('noOfInstitutionalMemberTarget'))
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
    <GroupContainer p="s20" id="kymCoopUnionAccContactDetails" scrollMarginTop="200px">
      <Text fontSize="r1" fontWeight="semibold" color="neutralColorLight.Gray-80">
        {t['kymCoopUnionCooperativeMemberInformation']}
      </Text>

      <ContainerWithDivider gap="s8">
        <InputGroupContainer>
          <Text fontSize="s3" fontWeight={600} color="neutralColorLight.Gray-80">
            {t['kymCoopUnionMemberDetails']}
          </Text>

          <Text fontSize="s3" fontWeight={600} color="neutralColorLight.Gray-80">
            {t['kymCoopUnionCurrent']}
          </Text>

          <Text fontSize="s3" fontWeight={600} color="neutralColorLight.Gray-80">
            {t['kymCoopUnionTargetFiscalYear']}
          </Text>
        </InputGroupContainer>
        <InputGroupContainer>
          <Text variant="formHelper" margin="auto 0">
            {t['kymCoopUnionNoMaleMembers']}
          </Text>

          <FormInput
            type="number"
            min={0}
            name="noOfMaleMemberCurrent"
            __placeholder={t['kymCoopUnionEnterNoMaleMembers']}
          />

          <FormInput
            type="number"
            min={0}
            name="noOfMaleMemberTarget"
            __placeholder={t['kymCoopUnionEnterNoMaleMembers']}
          />
        </InputGroupContainer>

        <InputGroupContainer>
          <Text variant="formHelper" margin="auto 0">
            {t['kymCoopUnionNoFemaleMembers']}
          </Text>

          <FormInput
            type="number"
            min={0}
            name="noOfFemaleMemberCurrent"
            __placeholder={t['kymCoopUnionEnterNoFemaleMembers']}
          />

          <FormInput
            type="number"
            min={0}
            name="noOfFemaleMemberTarget"
            __placeholder={t['kymCoopUnionEnterNoFemaleMembers']}
          />
        </InputGroupContainer>

        <InputGroupContainer>
          <Text variant="formHelper" margin="auto 0">
            {t['kymCoopUnionNoInstitutionalMembers']}
          </Text>

          <FormInput
            type="number"
            min={0}
            name="noOfInstitutionalMemberCurrent"
            __placeholder={t['kymCoopUnionEnterNoInstitutionalMembers']}
          />

          <FormInput
            type="number"
            min={0}
            name="noOfInstitutionalMemberTarget"
            __placeholder={t['kymCoopUnionEnterNoInstitutionalMembers']}
          />
        </InputGroupContainer>

        <InputGroupContainer>
          <Text variant="formLabel" margin="auto 0">
            {t['kymCoopUnionTotalCurrentMembers']}
          </Text>

          <Input
            type="number"
            // __placeholder={'0'}
            isDisabled
            value={currentTotal}
          />

          <Input type="number" isDisabled value={targetTotal} />
        </InputGroupContainer>
      </ContainerWithDivider>
    </GroupContainer>
  );
};
