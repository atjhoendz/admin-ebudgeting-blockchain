import {
  required,
  minLength,
  numeric,
  maxLength,
  sameAs,
} from 'vuelidate/lib/validators';

export const userValidations = {
  formData: {
    username: {
      required,
      minLength: minLength(4),
    },
    nama_lengkap: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
      goodPassword: password => {
        return /[a-z]/.test(password) && /[0-9]/.test(password);
      },
    },
    nip: {
      required,
      numeric,
      minLength: minLength(18),
      maxLength: maxLength(18),
    },
    jabatan: {
      required,
    },
  },
  passwordBaru: {
    password: {
      required,
      minLength: minLength(6),
      goodPassword: password => {
        return /[a-z]/.test(password) && /[0-9]/.test(password);
      },
    },
    konfirmasi: {
      sameAs: sameAs('password'),
    },
  },
  passwordLama: {
    required,
    minLength: minLength(6),
    goodPassword: password => {
      return /[a-z]/.test(password) && /[0-9]/.test(password);
    },
  },
};
