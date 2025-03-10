import axios from "axios";
import {
 TaskResponse,
 AddTaskPayload,
 AddTaskResponse,
 UpdateTaskPayload,
 UpdateTaskResponse,
 DeleteTaskResponse,
} from "@/types/task";
import { ENDPOINTS } from "@/constants/endpoints";

const apiClient = axios.create({
 baseURL: "http://localhost:3500",
});

export const getAllTasks = async (): Promise<TaskResponse> => {
 const url = `${ENDPOINTS.TASKS}`;
 const response = await apiClient.get<TaskResponse>(url);
 return response.data;
};

export const addTask = async (payload: AddTaskPayload): Promise<AddTaskResponse> => {
 const response = await apiClient.post<AddTaskResponse>(`${ENDPOINTS.TASKS}`, payload);
 return response.data;
};

export const updateTask = async (taskId: string, payload: UpdateTaskPayload): Promise<UpdateTaskResponse> => {
 const response = await apiClient.put<UpdateTaskResponse>(`${ENDPOINTS.TASKS}/${taskId}`, payload);
 return response.data;
};

export const deleteTask = async (taskId: string): Promise<DeleteTaskResponse> => {
 const response = await apiClient.delete<DeleteTaskResponse>(`${ENDPOINTS.TASKS}/${taskId}`);
 return response.data;
};
