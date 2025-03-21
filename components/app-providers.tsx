import React, { PropsWithChildren, Suspense } from 'react';
import { ThemeProvider } from './theme-provider';
import { FramerMotionProvider } from './framer-motion-provider';
import { AppProvider } from '../contexts/AppContext';
import { Modal } from './ui/modal';
import { useAppContext } from '../contexts/AppContext';

/**
 * Loading fallback for Suspense boundaries
 */
const SuspenseFallback = () => (
  <div className="flex h-40 w-full items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-300 border-t-transparent"></div>
  </div>
);

/**
 * ModalContainer component that gets modal state from context
 */
const ModalContainer = () => {
  const { modalContent, closeModal } = useAppContext();
  
  return (
    <Modal
      isOpen={modalContent.isOpen}
      onClose={closeModal}
      title={modalContent.title}
      content={modalContent.content}
      clickPosition={modalContent.clickPosition}
    />
  );
};

/**
 * Main app providers wrapper that combines all providers needed for the app
 */
export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <FramerMotionProvider>
          <AppProvider>
            {children}
            <ModalContainer />
          </AppProvider>
        </FramerMotionProvider>
      </ThemeProvider>
    </Suspense>
  );
};

/**
 * WithProviders HOC to wrap components with all providers
 */
export const withAppProviders = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const WithProviders: React.FC<P> = (props) => {
    return (
      <AppProviders>
        <Component {...props} />
      </AppProviders>
    );
  };
  
  WithProviders.displayName = `WithAppProviders(${Component.displayName || Component.name || 'Component'})`;
  
  return WithProviders;
}; 