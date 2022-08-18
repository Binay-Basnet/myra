import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  FormCheckbox,
  FormFileInput,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';
import { KymInsAccountOperationType } from '../../types';

const booleanList = [
  {
    label: 'Single',
    value: KymInsAccountOperationType.Single,
  },
  {
    label: 'Joint',
    value: KymInsAccountOperationType.Joint,
  },
];
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const AccountOperationInstitution = (props: IProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });

  const { watch } = methods;

  const isCompanyStampCompulsory = watch('isCompanyStampCompulsory');
  const { setSection } = props;

  useInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymInsAccountOperationInstruction"
          scrollMarginTop={'200px'}
          gap="s32"
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsAccountOperationInstruction']}
          </Text>

          <Box display={'flex'} flexDirection="column" gap="s32" mt="-16px">
            <FormSwitchTab options={booleanList} name="accountType" />
          </Box>

          <Box display="flex" flexDirection="column" gap="s32">
            <FormCheckbox
              name="isCompanyStampCompulsory"
              label={t['kynInsCompanyStampCompulsory']}
            />
            {isCompanyStampCompulsory && (
              <Box w="30%">
                <FormTextArea
                  name="specialInstruction"
                  label={t['kymInsSpecialInstruction']}
                  placeholder={t['kymInsEnterInstruction']}
                  rows={4}
                />
              </Box>
            )}

            {isCompanyStampCompulsory && (
              <Box w="13%">
                <FormFileInput
                  size="md"
                  label={t['kymInsCompanyStamp']}
                  name="companyStamp"
                />
              </Box>
            )}
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
