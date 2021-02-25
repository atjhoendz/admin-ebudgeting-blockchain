/* eslint-disable no-useless-catch */
import { BaseService } from './base.service';

export class UsersService extends BaseService {
  static get entity() {
    return 'user';
  }

  static async getAll() {
    try {
      const response = await this.request({ auth: true }).get(this.entity);

      return response.data.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async addData(formData) {
    try {
      const response = await this.request({ auth: true }).post(
        this.entity,
        formData,
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async get(id) {
    try {
      const response = await this.request({ auth: true }).get(
        `${this.entity}/${id}`,
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async update(id, formData) {
    try {
      const response = await this.request({ auth: true }).put(
        `${this.entity}/${id}`,
        formData,
      );

      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updatePassword(id, formData) {
    try {
      const response = await this.request({ auth: true }).put(
        `${this.entity}/password/${id}`,
        formData,
      );
      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
}
