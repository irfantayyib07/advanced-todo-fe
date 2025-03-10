export type Task = {
 title: string;
 description: string;
 status: "pending" | "completed";
 _id: string;
 createdAt: string;
 updatedAt: string;
 __v: number;
};

export type TaskResponse = Task[];

export type AddTaskPayload = {
 title: string;
 description: string;
 status: "pending" | "completed";
};

export type UpdateTaskPayload = Partial<AddTaskPayload>;
export type AddTaskResponse = TaskResponse;
export type UpdateTaskResponse = TaskResponse;
export type DeleteTaskResponse = { message: string };
