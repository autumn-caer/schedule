import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import {
  Action,
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  Direction,
  LOGIN,
  RegisterTaskAction,
  UpdateTaskAction,
  RegisterCategoryAction,
  UpdateCategoryAction,
} from "../actions";
import { task, category } from "../../types/types";

export const logIn = (id: string, content: string): LOGIN => {
  return {
    type: ActionType.LOGIN,
    payload: {},
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (id: string | null): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
    },
  };
};

export const registerTask = (task: task): RegisterTaskAction => {
  return {
    type: ActionType.REGISTER_TASK,
    payload: {
      task: task,
    },
  };
};

export const updateTask = (task: task): UpdateTaskAction => {
  return {
    type: ActionType.UPDATE_TASK,
    payload: {
      task: task,
    },
  };
};

export const registerCategory = (
  category: category
): RegisterCategoryAction => {
  return {
    type: ActionType.REGISTER_CATEGORY,
    payload: {
      category: category,
    },
  };
};

export const updateCategory = (category: category): UpdateCategoryAction => {
  return {
    type: ActionType.UPDATE_CATEGORY,
    payload: {
      category: category,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId: cellId,
      },
    });
  };
};
