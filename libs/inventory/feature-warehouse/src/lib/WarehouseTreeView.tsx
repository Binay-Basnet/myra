import { Box } from '@myra-ui';

import Tree from '../component/Tree';

export const WarehouseTreeView = () => (
  <Box p="10px" display="flex" flexDirection="column" justifyContent="space-between" gap="s4">
    <Tree code="1" title="Warehouse 1" isExtensible={false} />
    <Tree code="2" title="Warehouse 2" isExtensible={false} />
    <Tree code="3" title="Warehouse 3" isExtensible={false} />
    <Tree code="4" title="Warehouse 4" isExtensible={false} />
  </Box>
);
