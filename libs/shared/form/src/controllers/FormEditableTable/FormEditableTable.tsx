import { Controller, Path, useFormContext } from 'react-hook-form';

import { EditableTable, EditableTableProps } from '@coop/shared/editable-table';

interface RecordWithId {
  _id?: number;
}

interface IFormEditableTableProps<T extends RecordWithId & Record<string, string | number>>
  extends EditableTableProps<T> {
  name: Path<T> | string;
}

export const FormEditableTable = <T extends RecordWithId & Record<string, string | number>>({
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
      control={control}
      render={({ field: { onChange, value } }) => (
        <EditableTable defaultData={(value as T[]) ?? []} onChange={onChange} {...rest} />
      )}
    />
  );
};

export default FormEditableTable;
