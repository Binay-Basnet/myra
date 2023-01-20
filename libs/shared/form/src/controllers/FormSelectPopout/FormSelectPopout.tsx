// import { Control, Controller, FieldValues, useFormContext } from 'react-hook-form';
// import { ControllerRenderProps, UseControllerProps } from 'react-hook-form/dist/types/controller';
// import { get } from 'lodash';

// import { SelectPopout, SelectProps } from '@myra-ui';

// interface Option {
//   label: string;
//   value: string;
// }

// interface IFormSelectPopoutProps<T extends Record<string, unknown>> extends SelectProps {
//   control?: Control<T>;
//   name?: string;
//   showAll?: boolean;
//   optionType: 'default' | 'member' | undefined;
//   rules?: UseControllerProps['rules'];
//   //   options: Option | MemberOption | undefined;
// }

// // type ValueType = Readonly<Option | Option[] | MemberOption[] | MemberOption | null>;

// // type TSelectPopoutProps =
// //   | (SelectProps & {
// //       popoverBtn: (selectedValue: ValueType) => React.ReactNode;
// //       optionType?: 'default' | undefined;
// //       options: Option[];
// //     })
// //   | (SelectProps & {
// //       popoverBtn: (selectedValue: ValueType) => React.ReactNode;
// //       optionType: 'member';
// //       options: MemberOption[];
// //     });

// export const FormSelectPopout = <T extends Record<string, unknown>>(
//   props: IFormSelectPopoutProps<T>
// ) => {
//   const { name, ...rest } = props;

//   const methods = useFormContext();
//   const {
//     formState: { errors },
//     control: formControl,
//   } = methods;

//   return (
//     <Controller
//       control={formControl}
//       rules={rest.rules}
//       name={name ?? ''}
//       render={({ field }) => <FormControl field={field} errors={errors} {...props} />}
//     />
//   );
// };

// interface FormControlProps<T extends Record<string, unknown>> extends IFormSelectPopoutProps<T> {
//   errors: any;
//   field: ControllerRenderProps<FieldValues, string>;
// }

// const FormControl = <T extends Record<string, unknown>>({
//   name,
//   options: selectOptions,
//   errors,
//   field: { onChange, value },

//   optionType,
//   ...rest
// }: FormControlProps<T>) => {
//   //   const foundValue = selectOptions?.find((option) => option.value === value);

//   const methods = useFormContext();
//   const { clearErrors } = methods;

//   return (
//     <SelectPopout
//       errorText={name ? (get(errors, name)?.message as string) : undefined}
//       optionType={optionType}
//       options={selectOptions}
//       value={value}
//       inputId={name}
//       {...rest}
//       onChange={(newValue) => {
//         if (errors[name as string]?.type === 'required') {
//           clearErrors(name);
//         }
//         if (Array.isArray(newValue)) {
//           onChange(newValue);
//         } else {
//           const { value: newVal } = newValue as Option;
//           onChange(newVal);
//         }
//       }}
//     />
//   );
// };

// export default FormSelectPopout;
