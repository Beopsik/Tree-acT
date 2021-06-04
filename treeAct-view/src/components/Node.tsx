import { ClickAwayListener, Input } from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutlineSharp } from "@material-ui/icons";
import ToggleButton from "@material-ui/lab/ToggleButton";
import React, { useState } from "react";
import styled from "styled-components";
import { NewTreeNode } from "../../../common/types";
import { Name } from "../module/tree";

const Root = styled.p`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  position: relative;
  &:after {
    border-left: 1px solid green;
    bottom: -30px;
    content: "";
    height: 30px;
    left: 50%;
    position: absolute;
  }
`;

const NonLeaf = styled(ToggleButton)`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  width: 80px;
  height: 60px;
  border-radius: 10%;
  border: 2px solid #ffffff;
  position: relative;
  &:after {
    border-left: 1px solid green;
    bottom: -30px;
    content: "";
    height: 30px;
    left: 50%;
    position: absolute;
  }
`;

const Leaf = styled(ToggleButton)`
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  width: 80px;
  height: 60px;
  border: 2px dashed #ffffff;
  position: relative;
  /* text-transform: none; */
`;

const WhiteInput = styled(Input)`
  color: white;
`;

const RootAddButton = styled(AddCircleOutline)`
  position: absolute;
  left: 22px;
  top: 45px;
  color: green;
`;

const AddButton = styled(AddCircleOutline)`
  position: absolute;
  left: 27px;
  top: 60px;
  color: green;
`;

const RemoveButton = styled(RemoveCircleOutlineSharp)`
  position: absolute;
  left: 27px;
  top: -30px;
  color: red;
`;

const LabelText = styled.p`
  color: white;
  text-transform: none;
  margin: 0;
`;

interface nodeProps {
  node: NewTreeNode;
  onInsert: (id: number) => void;
  onRemove: (id: number) => void;
  onChangeName: ({ id, name }: Name) => void;
  onExpand: (id: number) => void;
}

const Node = (props: nodeProps) => {
  const { node, onInsert, onRemove, onChangeName, onExpand } = props;
  const [isEditable, setEditable] = useState<boolean>(false);

  const handleDoubleClick = (e: React.MouseEvent<HTMLElement>) => {
    setEditable(true);
  };

  const handleClickAway = () => {
    setEditable(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onExpand(node.id);
  };

  const handleInsert = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    onInsert(node.id);
  };

  const handleRemove = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    console.log("remove id: ", node.id);
    onRemove(node.id);
  };

  return (
    <div>
      {node.name === "App" ? (
        <>
          <Root onClick={handleClick}>
            <text>App</text>
            <RootAddButton onClick={handleInsert} />
          </Root>
        </>
      ) : node.children.length !== 0 ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <NonLeaf onClick={handleClick} onDoubleClick={handleDoubleClick}>
            <RemoveButton onClick={handleRemove} />
            {isEditable ? (
              <WhiteInput
                value={node.name}
                autoFocus={true}
                inputProps={{
                  "aria-label": "description",
                  autoCapitalize: "none",
                }}
                onChange={(e) =>
                  onChangeName({ id: node.id, name: e.target.value })
                }
              />
            ) : (
              <LabelText>{node.name}</LabelText>
            )}
            <AddButton onClick={handleInsert} />
          </NonLeaf>
        </ClickAwayListener>
      ) : (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Leaf onClick={handleClick} onDoubleClick={handleDoubleClick}>
            <RemoveButton onClick={handleRemove} />
            {isEditable ? (
              <WhiteInput
                value={node.name}
                autoFocus={true}
                inputProps={{
                  "aria-label": "description",
                  autoCapitalize: "none",
                }}
                onChange={(e) =>
                  onChangeName({ id: node.id, name: e.target.value })
                }
              />
            ) : (
              <LabelText>{node.name}</LabelText>
            )}
            <AddButton onClick={handleInsert} />
          </Leaf>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default Node;
