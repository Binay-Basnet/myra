import { useEffect, useRef } from 'react';

import { Box, Text } from '@myra-ui/foundations';

import { COASelector } from '../COASelector';
import { OperatorSelector } from '../OperatorSelector';

type Formula = {
  expression: string;
  variables: Record<string, string>;
};

interface FormulaEditorProps {
  formula: Formula;
  onFormulaEdit: (newFormula: Formula) => void;
  label?: string;
}

const getFormulaInArray = (str: string) => {
  const delimiters = ['[', '{', '(', '+', '-', '*', '/', ')', '}', ']'];
  const pattern = new RegExp(`\\s*(${delimiters.map((d) => `\\${d}`).join('|')})\\s*`);
  return str.split(pattern).filter((s) => s.trim() !== '' && s !== ' ');
};

export const FormulaEditor = ({ formula, onFormulaEdit, label }: FormulaEditorProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Select the target element using the ref
    const targetElement = ref.current;

    // Create a new instance of MutationObserver
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.target.contains(targetElement)) {
          const textContent = Array.from(targetElement?.children || [])
            .map((children) => {
              if (children.getAttribute('data-operator')) {
                return children.getAttribute('data-operator');
              }
              if (children.getAttribute('data-coa')) {
                return children.getAttribute('data-coa');
              }
              return children.textContent;
            })
            .join('')
            .replace(/ /g, '')
            .replace(/,/g, '+');

          onFormulaEdit({
            expression: textContent,
            variables: formula.variables,
          });
        }
      });
    });

    // Configure the observer to watch for changes to child nodes of the target element
    const observerConfig = { childList: true, subtree: true };

    // Start observing the target element
    if (targetElement) observer.observe(targetElement, observerConfig);

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  console.log(JSON.stringify(formula, null, 2));

  return (
    <Box display="flex" flexDir="column" gap="s4">
      {label && (
        <Text variant="formLabel" color="gray.800">
          {label}
        </Text>
      )}

      <Box p="s8" bg="highlight.500" borderRadius="br2">
        <Box
          as="div"
          bg="white"
          display="flex"
          border="1px"
          borderColor="border.layout"
          alignItems="center"
          borderRadius="br2"
          px="s12"
          gap="s4"
          h="s48"
          contentEditable={false}
          w="100%"
          ref={ref}
        >
          {getFormulaInArray(formula.expression).map((char) => {
            if (
              char === '(' ||
              char === ')' ||
              char === '[' ||
              char === ']' ||
              char === '{' ||
              char === '}'
            ) {
              return <Box>{char}</Box>;
            }

            if (char === '+' || char === '-' || char === '*' || char === '/') {
              return <OperatorSelector value={char} />;
            }

            if (char.startsWith('var_')) {
              return (
                <COASelector
                  variable={char}
                  char={formula.variables[char]}
                  onCharChange={(newChar) => {
                    onFormulaEdit({
                      expression: formula.expression,
                      variables: {
                        ...formula.variables,
                        [char]: newChar,
                      },
                    });
                  }}
                />
              );
            }

            return (
              <Box fontStyle="italic" color="gray.600">
                {char}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
