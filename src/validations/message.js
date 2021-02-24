export class ValidationMessage {
  static required(name) {
    return `${name} harus diisi.`;
  }

  static minLength(length) {
    return `Minimal ${length} karakter.`;
  }

  static numeric(name) {
    return `${name} harus angka.`;
  }

  static lengthNumeric(name, length) {
    return `Panjang ${name} harus ${length} digit.`;
  }

  static password(...kriteria) {
    const frontElement = kriteria.slice(0, kriteria.length - 1).toString();
    const lastElement = kriteria[kriteria.length - 1];
    return `Harus terdapat ${frontElement} ${
      frontElement.length ? 'dan' : ''
    } ${lastElement}.`;
  }
}
