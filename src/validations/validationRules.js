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

export const provinsiValidations = {
  formData: {
    nama: {
      required,
    },
  },
};

export const lembagaValidations = {
  formData: {
    nama: {
      required,
    },
    jumlah_anggaran: {
      required,
      numeric,
    },
  },
};

export const anggaranValidations = {
  formData: {
    nama_lembaga: {
      required,
    },
    sisa_anggaran: {
      required,
      numeric,
    },
  },
};

export const penomoranValidations = {
  formData: {
    nomor: {
      required,
      numeric,
    },
    tanggal: {
      required,
    },
  },
};

export const pmkValidations = {
  formData: {
    nama_kategori: {
      required,
    },
    tahun: {
      required,
      numeric,
      validTahun: tahun => {
        const currentYear = new Date().getFullYear();
        return tahun >= 1900 && tahun <= parseInt(currentYear) + 3;
      },
    },
    jenis_pmk: {
      required,
    },
    jenis_tiket: {
      required,
    },
    asal: {
      required,
    },
    tujuan: {
      required,
    },
    nama_provinsi: {
      required,
    },
    biaya: {
      required,
      numeric,
    },
  },
};
