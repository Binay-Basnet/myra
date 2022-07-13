import React from 'react';
import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';

import { Input, InputProps } from '@coop/shared/ui';
import { EditableTable, EditableTableProps } from '@coop/shared/editable-table';

interface RecordWithId {
  _id?: number;
}

interface IFormEditableTableProps<
  T extends RecordWithId & Record<string, string | number>
> extends EditableTableProps<T> {
  name: Path<T> | string;
  rules?: UseControllerProps['rules'];
}

export const FormEditableTable = <
  T extends RecordWithId & Record<string, string | number>
>({
  name,
  ...rest
}: IFormEditableTableProps<T>) => {
  const methods = useFormContext();

  const {
    formState: { errors },
    control,
  } = methods;

  return (
    <Controller
      name={name}
      rules={rest.rules}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <EditableTable defaultData={value} {...rest} onChange={onChange} />
        );
      }}
    />
  );
};

export default FormEditableTable;
