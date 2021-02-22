import { BaseService } from './base.service';

export class UsersService extends BaseService {
  static get entity() {
    return 'user';
  }

  static async getCurrent() {
    try {
      const response = await this.request({ auth: true }).get(
        `${this.entity}/`,
      );

      return response.data.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
