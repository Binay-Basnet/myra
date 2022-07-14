import React from 'react';
import { Path } from 'react-hook-form';

import { Kym_Option_Field_Type as FIELD_TYPE } from '@coop/shared/data-access';
import { FormEmailInput, FormInput, FormTextArea } from '@coop/shared/form';
import { InputProps, TextAreaInputProps } from '@coop/shared/ui';

interface FormInputTypeProps<T> extends InputProps {
  formType?: FIELD_TYPE;
  name: Path<T>;
}

export const FormInputWithType = <T,>(props: FormInputTypeProps<T>) => {
  const { formType, ...rest } = props;
  switch (formType) {
    case FIELD_TYPE.Amount:
      return <FormInput type="number" textAlign="right" {...rest} />;
    case FIELD_TYPE?.Url:
    case FIELD_TYPE.TextInput:
    case FIELD_TYPE?.PoBox:
      return <FormInput {...rest} />;
    case FIELD_TYPE?.Date:
      return <FormInput type="date" {...rest} />;
    case FIELD_TYPE?.Email:
      return <FormEmailInput {...rest} />;
    case FIELD_TYPE?.NumberInput:
    case FIELD_TYPE?.PhoneNumber:
      return <FormInput type="number" {...rest} />;

    //todo
    // case FIELD_TYPE?.Paragraph:
    //   return <FormTextArea {...rest} />;
    case FIELD_TYPE?.Address:
    case FIELD_TYPE?.Bank:
    case FIELD_TYPE?.Display:
    case FIELD_TYPE?.Fax:
    case FIELD_TYPE?.LocalLevel:
    case FIELD_TYPE?.MultipleFile:
    case FIELD_TYPE?.District:
    case FIELD_TYPE?.Province:
    case FIELD_TYPE?.SingleFile:
      return <FormInput {...rest} />;
    default:
      return <FormInput {...rest} />;
  }
};
