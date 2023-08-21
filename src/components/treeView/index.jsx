import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Checkbox } from "@mui/material";

const data = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "2",
      name: "Child - 2",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
    {
      id: "5",
      name: "Child - 5",
      children: [
        {
          id: "6",
          name: "Child - 6",
        },
        {
          id: "7",
          name: "Child - 7",
        },
      ],
    },
    {
      id: "8",
      name: "Child - 8",
      children: [
        {
          id: "9",
          name: "Child - 9",
        },
        {
          id: "10",
          name: "Child - 10",
        },
      ],
    },
  ],
};

export const RichObjectTreeView = () => {
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    // <Box sx={{ flexGrow: 1, overflow:'auto' }}>
    <TreeView
      aria-label="controlled"
      // aria-expanded
      expanded={["root", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
      multiSelect
      //   defaultCollapseIcon={
      //     <Checkbox
      //       checked={true}
      //       indeterminate={true}
      //       // onChange={handleChange1}
      //     />
      //   }
      //   defaultExpanded={['root']}
      //   defaultExpandIcon={
      //     <Checkbox
      //       checked={true}
      //       indeterminate={true}
      //       // onChange={handleChange1}
      //     />
      //   }
      // defaultExpanded={['1']}
      defaultCollapseIcon={
        <Checkbox
          checked
          indeterminate={false}
          // onChange={handleChange1}
        />
      }
      defaultExpandIcon={
        <Checkbox
          checked
          indeterminate
          // onChange={handleChange1}
        />
      }
      // defaultEndIcon={
      //   <Checkbox
      //     checked={false}
      //     indeterminate={false}
      //     // onChange={handleChange1}
      //   />
      // }
      //   sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {renderTree(data)}
    </TreeView>
    // </Box>
  );
};
