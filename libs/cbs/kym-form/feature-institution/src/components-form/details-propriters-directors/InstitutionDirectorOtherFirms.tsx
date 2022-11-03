import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Button, Grid, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IAddDirector {
  index: number;
  removeDirector: () => void;
}

const AddDirector = ({ index, removeDirector }: IAddDirector) => {
  const { t } = useTranslation();
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeDirector}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <Grid templateColumns="repeat(2, 1fr)" gap="s20">
        <FormInput
          type="text"
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.nameOfDirector`}
          label={t['kymInsNameofDirector']}
          __placeholder={t['kymInsEnterNameofDirector']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.nameOfInstitution`}
          label={t['kymInsNameofInstitution']}
          __placeholder={t['kymInsEnterNameofInstitution']}
        />
      </Grid>
      <InputGroupContainer mt="s16">
        <FormInput
          type="text"
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.addressOfInstitution`}
          label={t['kymInsAddressofInstitution']}
          __placeholder={t['kymInsEnterAddressofInstitution']}
        />
        <FormInput
          type="text"
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.designation`}
          label={t['kymInsDesignation']}
          __placeholder={t['kymInsEnterDesignation']}
        />
        <FormInput
          type="number"
          textAlign="right"
          bg="white"
          name={`detailsOfDirectorsWithAffiliation.${index}.yearlyIncome`}
          label={t['kymInsYearlyIncome']}
          __placeholder="0.00"
        />
      </InputGroupContainer>
    </DynamicBoxContainer>
  );
};

export const InstitutionKYMDirectorWithAffiliation = () => {
  const { t } = useTranslation();
  const {
    fields: directorFields,
    append: directorAppend,
    remove: directorRemove,
  } = useFieldArray({ name: 'detailsOfDirectorsWithAffiliation' });

  return (
    <GroupContainer id="kymInsDetailsofdirectorsaffiliatedwithotherFirms" scrollMarginTop="200px">
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymInsDetailsofdirectorsaffiliatedwithotherFirms']}
      </Text>

      <div>
        <DynamicBoxGroupContainer>
          {directorFields.map((item, index) => (
            <Box key={item.id}>
              <AddDirector index={index} removeDirector={() => directorRemove(index)} />
            </Box>
          ))}
          <Button
            id="newDetailButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              directorAppend({});
            }}
          >
            {t['kymInsNewDetail']}
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
