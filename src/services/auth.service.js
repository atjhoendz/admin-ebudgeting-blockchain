import axios from 'axios';
import { API_URL } from '../.env';
import $store from '../store';
import $router from '../router';

export class AuthService {
  static async makeLogin({ username, password }) {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { username, password },
        { withCredentials: true },
      );

      _setAuthData({
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
        exp: parseTokenData(response.data.data.accessToken).exp,
      });

      console.log(response.data.data.accessToken);

      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async refreshToken() {
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        headers: { Authorization: `Bearer ${$store.state.refreshToken}` },
      });

      _setAuthData({
        accessToken: response.data.data.accessToken,
        refreshToken: null,
        exp: parseTokenData(response.data.data.accessToken).exp,
      });

      return response.data;
    } catch (err) {
      console.log(err.response.status);
      $router.push({ name: 'Login' }).catch(() => {});
    }
  }

  static debounceRefreshToken = this._debounce(() => {
    return this.refreshToken();
  }, 100);

  static getBearer() {
    return `Bearer ${$store.state.accessToken}`;
  }

  static isAccessTokenExpired() {
    const accessTokenExpDate = $store.state.auth.accessTokenExpDate - 10;
    const nowTime = Math.floor(new Date().getTime() / 1000);

    return accessTokenExpDate <= nowTime;
  }

  static hasRefreshToken() {
    return Boolean(localStorage.getItem('refreshToken'));
  }

  static setRefreshToken(status) {
    if (!['', 'true'].includes(status))
      throw new Error(`setRefreshToken: invalid value ${status}`);

    localStorage.setItem('refreshToken', status);
  }

  static _debounce(inner, ms = 0) {
    let timer = null;
    let resolves = [];

    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const result = inner();
        resolves.forEach(r => r(result));
        resolves = [];
      }, ms);

      return new Promise(resolve => resolves.push(resolve));
    };
  }
}

export function parseTokenData(accessToken) {
  let payload = '';
  let tokenData = {};

  try {
    payload = accessToken.split('.')[1];
    tokenData = JSON.parse(atob(payload));
  } catch (error) {
    throw new Error(error);
  }

  return tokenData;
}

// function _resetAuthData() {
//   $store.commit('auth/SET_ACCESS_TOKEN', null);
//   $store.commit('auth/SET_REFRESH_TOKEN', null);
// }

function _setAuthData({ accessToken, refreshToken = null, exp } = {}) {
  $store.commit('auth/SET_ACCESS_TOKEN', accessToken);
  if (refreshToken) $store.commit('auth/SET_REFRESH_TOKEN', refreshToken);
  $store.commit('auth/SET_ATOKEN_EXP_DATE', exp);
}
