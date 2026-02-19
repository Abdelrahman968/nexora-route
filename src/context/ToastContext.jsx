import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

export function ToastContextProvider({ children }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-left" />
      {children}
    </HeroUIProvider>
  );
}
