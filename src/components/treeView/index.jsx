import React, { useState, useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Checkbox from '@mui/material/Checkbox';
import { getCategories } from '../../utils/helpers/filter';
import { categoriesActions } from '../../slices';
import { useDispatch, useSelector } from 'react-redux';

export const RichObjectTreeView = () => {
  // console.log("data ",data)
  const [selectedLeaves, setSelectedLeaves] = useState([]);
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) => getCategories(state.categories.categoriesList.data));
  // const classes = useStyles();

  useEffect(() => {
    dispatch(categoriesActions.fetchCategories())
  }, []); //eslint-disable-line

  // console.log(categoriesList);

  const handleCheck = (nodeLeaves) => {
    nodeLeaves.length === 1 ? singleLeafHandleCheck(nodeLeaves[0]) : multipleLeavesHandleCheck(nodeLeaves);
  };

  const singleLeafHandleCheck = (nodeLeaf) => {
    if (selectedLeaves.includes(nodeLeaf)) {
      setSelectedLeaves(selectedLeaves.filter((id) => id !== nodeLeaf));
    } else {
      setSelectedLeaves([...selectedLeaves, nodeLeaf]);
    }
  };

  const multipleLeavesHandleCheck = (nodeLeaves) => {
    let tempSelectedLeaves = [...selectedLeaves]
    const tempSelectedLeavesCount = tempSelectedLeaves.length;
    tempSelectedLeaves = tempSelectedLeaves.filter((leaf) => !nodeLeaves.includes(leaf));
    if(tempSelectedLeaves.length !== tempSelectedLeavesCount-nodeLeaves.length) {
      tempSelectedLeaves = [...tempSelectedLeaves, ...nodeLeaves];
    }
    setSelectedLeaves([...tempSelectedLeaves]);
  }

  const isNodeSelected = (nodeLeaves) => {
    return nodeLeaves.every((element) => selectedLeaves.includes(element));
  };

  const isNodeIndeterminate = (isSelected, nodeLeaves) => {
    console.log(!isSelected && nodeLeaves.some((element) => selectedLeaves.includes(element)));
    return !isSelected && nodeLeaves.some((element) => selectedLeaves.includes(element));
  };

  // console.log("selectedLeaves", selectedLeaves);

  const renderTree = (nodes) => {
    // console.log("In nodes", nodes?.leaves ? "Hello": "Hi");
    if (nodes?.leaves) {
      
    
    const isChecked = isNodeSelected(nodes.leaves);
    return (
    <TreeItem
      key={nodes.name}
      nodeId={nodes.name}
      label={
        <div>
          <Checkbox
            checked={isChecked}
            // indeterminate={() => isNodeIndeterminate(isChecked, nodes.leaves)}
            onChange={() => handleCheck(nodes.leaves)}
          />
          {nodes.name}
        </div>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
    )
    }
    return null
  };



  return (
    <TreeView
      aria-label="controlled"
      // defaultExpanded
      defaultCollapseIcon={null}
      defaultExpandIcon={null}
      defaultExpanded={['Parent']}
    >
      {renderTree(categoriesList)}
    </TreeView>
  );
};
