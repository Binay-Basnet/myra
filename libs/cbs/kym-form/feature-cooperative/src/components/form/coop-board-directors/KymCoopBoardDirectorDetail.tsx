import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Button, FormSection, GridItem, Icon } from '@myra-ui';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { AddDirector } from '../../accordion-component/KymCoopDirectorAccordion';

export const KymCoopBoardDirectorDetail = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<KymCooperativeFormInput>();

  const { fields, append, remove } = useFieldArray({
    name: 'directorDetails',
    control,
  });

  return (
    <FormSection id="kymCoopAccBoardOfDirectorDetails" header="kymCoopBoardofdirectordetails">
      {fields.map((item, index) => (
        <GridItem key={item.id} colSpan={3}>
          <AddDirector index={index} removeDirector={remove} />
        </GridItem>
      ))}

      <GridItem colSpan={2}>
        <Button
          id="directorButton"
          alignSelf="start"
          leftIcon={<Icon size="md" as={AiOutlinePlus} />}
          variant="outline"
          onClick={() => {
            append({
              documents: [
                {
                  fieldId: 'photograph',
                  identifiers: [],
                },
                {
                  fieldId: 'identityDocumentPhoto',
                  identifiers: [],
                },
                {
                  fieldId: 'signature',
                  identifiers: [],
                },
              ],
            });
          }}
        >
          {t['kymCoopAddDirector']}
        </Button>
      </GridItem>
    </FormSection>
  );
};
