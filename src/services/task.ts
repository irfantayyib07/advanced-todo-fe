import { addTask, deleteTask, getAllTasks, updateTask } from "@/api/task";
import {
 AddTaskPayload,
 AddTaskResponse,
 DeleteTaskResponse,
 Task,
 TaskResponse,
 UpdateTaskPayload,
 UpdateTaskResponse,
} from "@/types/task";
import { useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export type ApiError = { message: string };

const QUERY_KEY = "TASKS";
type ErrorFnE = (error: ApiError) => void;
type SuccessAddTaskFn = (data: AddTaskResponse) => void;
type SuccessEditTaskFn = (data: UpdateTaskResponse) => void;
type SuccessDeleteTaskFn = (data: DeleteTaskResponse) => void;

export function useTasks(): UseQueryResult<TaskResponse> {
 return useQuery({
  queryKey: [QUERY_KEY],
  queryFn: () => getAllTasks(),
  select: res => res || ([] as Task[]),
 });
}

export const useAddTask = (onSuccessFn?: SuccessAddTaskFn, onErrorFn?: ErrorFnE) => {
 const queryClient = useQueryClient();
 return useMutation<AddTaskResponse, ApiError, AddTaskPayload>({
  mutationFn: payload => addTask(payload),
  onSuccess: data => {
   queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
   onSuccessFn?.(data);
  },
  onError: error => {
   onErrorFn?.(error);
  },
 });
};

export const useUpdateTask = (taskId: string, onSuccessFn?: SuccessEditTaskFn, onErrorFn?: ErrorFnE) => {
 const queryClient = useQueryClient();
 return useMutation<UpdateTaskResponse, ApiError, UpdateTaskPayload>({
  mutationFn: payload => updateTask(taskId, payload),
  onSuccess: data => {
   queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
   onSuccessFn?.(data);
  },
  onError: error => {
   onErrorFn?.(error);
  },
 });
};

export const useDeleteTask = (onSuccessFn?: SuccessDeleteTaskFn, onErrorFn?: ErrorFnE) => {
 const queryClient = useQueryClient();
 return useMutation<DeleteTaskResponse, ApiError, string>({
  mutationFn: taskId => deleteTask(taskId),
  onSuccess: data => {
   queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
   onSuccessFn?.(data);
  },
  onError: error => {
   onErrorFn?.(error);
  },
 });
};
