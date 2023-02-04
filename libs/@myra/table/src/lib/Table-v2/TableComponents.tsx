/* ===================================== */
/* ====== WIP New Table v2 ============= */
/* ===================================== */

import React from 'react';
import * as ChakraTable from '@chakra-ui/table';

export interface TableContainerProps {
  children: React.ReactNode;
}

export const TableContainer = ({ children }: TableContainerProps) => (
  <ChakraTable.TableContainer maxH="500px" overflowY="scroll">
    {children}
  </ChakraTable.TableContainer>
);

/* ===================================== */
/* =========== Table Root ============== */
/* ===================================== */

export interface TableRootProps extends ChakraTable.TableProps {
  size: 'default' | 'compact';
  variant: 'simple' | 'report';
  name?: string;
}

export const TableRoot = ({ size, variant, name, ...props }: TableRootProps) => (
  <ChakraTable.Table
    sx={{
      pageBreakInside: 'auto',
    }}
    size={size}
    variant={variant}
    data-table-title={name}
    {...props}
  />
);

/* ===================================== */
/* =========== Table Head ============== */
/* ===================================== */

export interface TableHeadProps extends ChakraTable.TableHeadProps {
  children: React.ReactNode;
}

export const TableHead = (props: TableHeadProps) => <ChakraTable.Thead {...props} />;
