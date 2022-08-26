// import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const Interest = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const depositNature = watch('nature');

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductInterest']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="interest.minRate"
          type="number"
          label={t['depositProductMinimumRate']}
          textAlign={'right'}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />
        <FormInput
          name="interest.maxRate"
          type="number"
          label={t['depositProductMaximumRate']}
          textAlign={'right'}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />
        <FormInput
          name="interest.defaultRate"
          type="number"
          label={t['depositProductDefaultRate']}
          textAlign={'right'}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />
        {depositNature !== NatureOfDepositProduct.RecurringSaving && (
          <FormInput
            type="number"
            name="interest.additionalRate"
            label={t['depositProductAdditionalBaseRate']}
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
        )}
        <FormInput
          name="interest.ceoAuthority"
          type="number"
          label={t['depositProductCEOAuthority']}
          textAlign={'right'}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />
        <FormInput
          name="interest.boardAuthority"
          type="number"
          label={t['depositProductBoardAuthority']}
          textAlign={'right'}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
