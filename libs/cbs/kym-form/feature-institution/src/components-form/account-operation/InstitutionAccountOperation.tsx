import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput } from '@coop/cbs/data-access';
import {
  FormCheckbox,
  FormFileInput,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem } from '@coop/shared/ui';
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
        <FormSection
          id="kymInsAccountOperationInstruction"
          header="kymInsAccountOperationInstruction"
        >
          <GridItem colSpan={3}>
            <FormSwitchTab options={booleanList} name="accountType" />
          </GridItem>
          <GridItem colSpan={3}>
            <Grid gap="s16">
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
            </Grid>
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
