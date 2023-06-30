import { useFieldArray, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { Button, FormSection, GridItem, Icon } from '@myra-ui';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { AddOperator } from '../../accordion-component/KymCoopAccountOperator';

export const KymCoopAccountOperatorDetail = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<KymCooperativeFormInput>();

  const { fields, append, remove } = useFieldArray({
    name: 'accountOperator',
    control,
  });

  return (
    <FormSection id="kymCoopAccAccountOperatorDetail" header="kymCoopDetailsofAccountOperators">
      {fields.map((item, index) => (
        <GridItem key={item.id} colSpan={3}>
          <AddOperator index={index} removeDirector={remove} />
        </GridItem>
      ))}
      <GridItem colSpan={2}>
        <Button
          id="accountOperatorButton"
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
          {t['kymCoopAddOperator']}
        </Button>
      </GridItem>
    </FormSection>
  );
};
