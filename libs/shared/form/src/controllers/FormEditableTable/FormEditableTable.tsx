import { Controller, Path, useFormContext } from 'react-hook-form';

import { Box, Text } from '@myra-ui';
import { EditableTable, EditableTableProps } from '@myra-ui/editable-table';

interface RecordWithId {
  _id?: number;
}

interface IFormEditableTableProps<
  T extends RecordWithId & Record<string, string | number | boolean>
> extends EditableTableProps<T> {
  name: Path<T> | string;
  label?: string;
}

export const FormEditableTable = <
  T extends RecordWithId & Record<string, string | number | boolean>
>({
  name,
  label,
  ...rest
}: IFormEditableTableProps<T>) => {
  const methods = useFormContext();

  const {
    // formState: { errors },
    control,
  } = methods;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box display="flex" flexDirection="column" gap="s4">
          {label && (
            <Text variant="formLabel" color="gray.700">
              {label}
            </Text>
          )}
          <EditableTable defaultData={(value as T[]) ?? []} onChange={onChange} {...rest} />
        </Box>
      )}
    />
  );
};

export default FormEditableTable;
