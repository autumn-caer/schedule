import { ActionType } from "../action-types";
import { task, category } from "../../types/types";

export type Direction = "up" | "down";
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface LOGIN {
  type: ActionType.LOGIN;
  payload: {
    //   cellId: string;
    //   bundle: {
    //     code: string;
    //     err: string;
    //   };
  };
}

export interface RegisterTaskAction {
  type: ActionType.REGISTER_TASK;
  payload: {
    cellId: string | null;
    task: task;
  };
}

export interface RegisterCategoryAction {
  type: ActionType.REGISTER_CATEGORY;
  payload: {
    cellId: string | null;
    category: category;
  };
}

export interface UpdateCategoryAction {
  type: ActionType.UPDATE_CATEGORY;
  payload: {
    cellId: string | null;
    category: category;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | LOGIN
  | RegisterTaskAction
  | RegisterCategoryAction
  | UpdateCategoryAction;
