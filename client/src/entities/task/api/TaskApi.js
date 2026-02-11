import { axiosInstance } from '../../../shared/lib/axiosInstance';

export default class TaskApi {
  static async getAllTasks() {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  }

  static async getTaskById(id) {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  }

  static async createTask(taskData) {
    const response = await axiosInstance.post('/tasks', taskData);
    return response.data;
  }

  static async updateTask(id, taskData) {
    const response = await axiosInstance.put(`/tasks/${id}`, taskData);
    return response.data;
  }

  static async deleteTask(id) {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data;
  }
}
