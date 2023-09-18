import React, { useState, useEffect } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import Checkbox from "@mui/material/Checkbox";
import { getCategories } from "../../utils/helpers/filter";
import { categoriesActions } from "../../slices";
import { useDispatch, useSelector } from "react-redux";

export const RichObjectTreeView = ({search, selectedLeaves, setSelectedLeaves}) => {
  // const [selectedLeaves, setSelectedLeaves] = useState([]);
  const dispatch = useDispatch();
  const categoriesList = useSelector((state) =>
    getCategories(state.categories.categoriesList?.filter(it=>it?.toLowerCase()?.includes(search)))
  );


  useEffect(() => {
    dispatch(categoriesActions.fetchCategories());
  }, []); //eslint-disable-line

  const handleCheck = (nodeLeaves) => {
    nodeLeaves.length === 1
      ? singleLeafHandleCheck(nodeLeaves[0]):
      multipleLeavesHandleCheck(nodeLeaves);
  };

  const singleLeafHandleCheck = (nodeLeaf) => {
    if (selectedLeaves.includes(nodeLeaf)) {
      setSelectedLeaves(selectedLeaves.filter((id) => id !== nodeLeaf));
    } else {
      setSelectedLeaves([...selectedLeaves, nodeLeaf]);
    }
  };


  const multipleLeavesHandleCheck = (nodeLeaves) => {
    let tempSelectedLeaves = [...selectedLeaves];
    const tempSelectedLeavesCount = tempSelectedLeaves.length;
    tempSelectedLeaves = tempSelectedLeaves.filter(
      (leaf) => !nodeLeaves.includes(leaf)
    );
    if (
      tempSelectedLeaves.length !==
      tempSelectedLeavesCount - nodeLeaves.length
    ) {
      tempSelectedLeaves = [...tempSelectedLeaves, ...nodeLeaves];
    }
    setSelectedLeaves([...tempSelectedLeaves]);
  };

  const isNodeSelected = (nodeLeaves) => {
    return nodeLeaves?.every((element) => selectedLeaves.includes(element));
  };

  const isNodeIndeterminate = (isSelected, nodeLeaves) => {
    // console.log(
    //   !isSelected &&
    //     nodeLeaves.some((element) => selectedLeaves.includes(element))
    // );
    return !isSelected &&selectedLeaves.length&& nodeLeaves.some((element) => selectedLeaves.includes(element));
  };

  const getTreeItemsFromData = (treeItems) => {
    // console.log(treeItems, "treeItems");
    return treeItems.map((treeItemData) => {
      let children;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      const isChecked = isNodeSelected(treeItemData?.leaves);
      const isIntermediate = isNodeIndeterminate(isChecked, treeItemData.leaves);

      return (
        <TreeItem
          key={treeItemData.name}
          nodeId={treeItemData.name}
          label={
            <div>
              <Checkbox
                checked={isChecked}
                indeterminate={isIntermediate}
                onChange={() => {
                  handleCheck(treeItemData.leaves)}}
              />
              {treeItemData.name}
            </div>
          }
          children={children}
        />
      );
    });
  };

  return (
    <TreeView
      aria-label="controlled"
      // defaultExpanded
      defaultCollapseIcon={null}
      defaultExpandIcon={null}
      // sx={{padding:"0"}}
      // defaultExpanded={['Parent']}
    >
      {getTreeItemsFromData(categoriesList.children)}
    </TreeView>
  );
};
