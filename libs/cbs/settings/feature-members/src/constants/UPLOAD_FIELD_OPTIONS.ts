import { FormFieldType as Field_Types } from '@coop/cbs/data-access';

export const UPLOAD_FIELD_OPTIONS = [
  {
    label: 'Single File',
    value: Field_Types.SingleFile,
  },
  {
    label: 'Multiple File',
    value: Field_Types.MultipleFile,
  },
];
