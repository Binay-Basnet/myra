import { RegisterOptions } from 'react-hook-form';
import { InputProps, SelectProps } from '@chakra-ui/react';

// type FormTypes = 'input' | 'select';
//! TODO use a Generic for its name or ...
interface ICommonJsonProps<TfieldTypes> {
  name: keyof TfieldTypes;
  label: React.ReactNode;
  validations?: RegisterOptions;
  render?: boolean;
  // type: string; //! TODO should be based on T['name']
}

interface IInputJson<TfieldTypes> extends InputProps {
  variant: 'input';
  dependency?: IConditionalProps<IInputProps, TfieldTypes>;
}

interface ISelectJson<TfieldTypes> extends SelectProps {
  variant: 'select';
  dependency?: IConditionalProps<ISelectProps, TfieldTypes>;
}

export type DefaultFieldTypes = object;

export type IInputProps<TfieldTypes = DefaultFieldTypes> =
  IInputJson<TfieldTypes> & ICommonJsonProps<TfieldTypes>;

export type ISelectProps<TfieldTypes = DefaultFieldTypes> =
  ISelectJson<TfieldTypes> & ICommonJsonProps<TfieldTypes>;

export type DataSchema<
  TfieldTypes extends DefaultFieldTypes = DefaultFieldTypes
> = IInputProps<TfieldTypes> | ISelectProps<TfieldTypes>;

// type DataSchemaWithoutType = Omit<DataSchema, 'type'>;

export interface IConditionalProps<T, U = DefaultFieldTypes> {
  keys: Array<keyof U>; //! TODO omit its own key
  conditions: (
    watch: Record<keyof U, string> | null //! TODO Check if I can do something like Record<keys,string>
    // methods: Omit<UseFormReturn<FieldValues, unknown>, 'watch' & 'control'> //! TODO! what is this?
  ) => Partial<T> | null;
}
export type Dependencies<TfieldTypes = DefaultFieldTypes> = Partial<
  Record<keyof TfieldTypes, IConditionalProps<DataSchema, TfieldTypes>>
>;
