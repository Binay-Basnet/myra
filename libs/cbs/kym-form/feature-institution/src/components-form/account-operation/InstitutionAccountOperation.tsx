import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSwitchTab } from '@coop/shared/form';
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
  const { setSection } = props;

  const { control, handleSubmit, getValues, watch, setError } = methods;
  useInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        {' '}
        <GroupContainer
          id="kymInsAccountOperationInstruction"
          scrollMarginTop={'200px'}
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
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
