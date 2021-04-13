/* eslint-disable no-useless-catch */
import axiosService from './axios.service';

export class UsersService {
  static get entity() {
    return 'user';
  }

  static async getAll() {
    try {
      const response = await axiosService.get(this.entity);

      return response.data.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async addData(formData) {
    try {
      const response = await axiosService.post(this.entity, formData);

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async get(id) {
    try {
      const response = await axiosService.get(`${this.entity}/${id}`);

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, formData) {
    try {
      const response = await axiosService.put(`${this.entity}/${id}`, formData);

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updatePassword(id, formData) {
    try {
      const response = await axiosService.put(
        `${this.entity}/password/${id}`,
        formData,
      );
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }

  static async delete(id) {
    try {
      const response = await axiosService.delete(`${this.entity}/${id}`);

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
}
