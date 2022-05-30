import { Input, InputGroup, Text, InputProps } from '@chakra-ui/react';
import { TextFields } from '@saccos/myra/ui';
import { forwardRef } from 'react';

/* eslint-disable-next-line */
export interface AmountInputNormalProps extends InputProps {
  labelColor?: string;
  label?: string;
}

export const AmountInputNormal = forwardRef<
  HTMLInputElement,
  AmountInputNormalProps
>((props, ref) => {
  const { labelColor, label, ...rest } = props;
  // const [isDebit, setIsDebit] = useState(true);
  // const handleClick = () => setIsDebit(!isDebit);

  return (
    <>
      <TextFields variant="formLabel" color={labelColor}>
        {' '}
        {label ?? 'Quantity'}
      </TextFields>
      <InputGroup h="44px">
        <Input
          variant={'outline'}
          type="number"
          fontSize={'s2'}
          placeholder="00"
          ref={ref}
          {...rest}
        />
      </InputGroup>
    </>
  );
});

export default AmountInputNormal;
