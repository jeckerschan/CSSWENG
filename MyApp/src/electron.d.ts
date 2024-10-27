// electron.d.ts
import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    electronAPI: {
      ipcRenderer: {
        send: (channel: string, data?: any) => void;
        on: (channel: string, func: (...args: any[]) => void) => void;
        connectToDatabase: () => Promise<void>;
        loginAttempt: (credentials: { email: string; password: string }) => Promise<boolean>;
      };
    };
  }
}
