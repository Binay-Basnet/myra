import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { CloseIcon } from '@chakra-ui/icons';

import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Grid, GridItem, Icon } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { TextBoxContainer, TopText } from '../formui';

const options = [
  { label: 'option 1', value: 'option1' },
  { label: 'option 2', value: 'option2' },
];
interface IAddAccountServices {
  index: number;
  removeAccountServices: () => void;
}

const AddServiceCharge = ({
  index,
  removeAccountServices,
}: IAddAccountServices) => {
  const { t } = useTranslation();
  return (
    <DynamicBoxContainer>
      <CloseIcon
        cursor="pointer"
        onClick={removeAccountServices}
        color="gray.500"
        _hover={{
          color: 'gray.900',
        }}
        aria-label="close"
        alignSelf="flex-end"
      />
      <Grid templateColumns="repeat(2,1fr)" gap="s20">
        <GridItem>
          <FormSelect
            name={`dormantSetup.${index}.duration`}
            label={t['depositProductDuration']}
            placeholder={t['depositProductSelectDuration']}
            options={options}
          />
        </GridItem>
        <GridItem>
          <FormSelect
            name={`dormantSetup.${index}.condition`}
            label={t['depositProductCondition']}
            placeholder={t['depositProductSelectCondition']}
            options={options}
          />
        </GridItem>
      </Grid>
    </DynamicBoxContainer>
  );
};

export const DormantSetup = () => {
  const { t } = useTranslation();
  const {
    fields: accountServicesFields,
    append: accountServicesAppend,
    remove: accountServicesRemove,
  } = useFieldArray({ name: 'dormantSetup' });

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <TextBoxContainer>
        <TopText>{t['depositProductDormantSetup']} </TopText>
      </TextBoxContainer>
      <div>
        <DynamicBoxGroupContainer>
          {accountServicesFields.map((item, index) => {
            return (
              <Box key={item.id}>
                <AddServiceCharge
                  index={index}
                  removeAccountServices={() => accountServicesRemove(index)}
                />
              </Box>
            );
          })}
          <Button
            id="sisterConcernButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              accountServicesAppend({});
            }}
          >
            {t['new']}
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
