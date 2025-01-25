import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // Cambiar esto por una clave secreta segura

class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  // Método para obtener la instancia única
  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  // Método para cifrar los datos
  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  }

  // Método para descifrar los datos
  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Método para guardar datos en localStorage
  public setItem(key: string, value: any): void {
    const encryptedValue = this.encrypt(JSON.stringify(value));
    localStorage.setItem(key, encryptedValue);
  }

  // Método para obtener datos de localStorage
  public getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;
    const decryptedValue = this.decrypt(encryptedValue);
    return JSON.parse(decryptedValue);
  }

  // Método para eliminar datos de localStorage
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorageService.getInstance();