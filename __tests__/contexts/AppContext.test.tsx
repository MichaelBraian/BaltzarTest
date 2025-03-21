import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../../contexts/AppContext';

// Test component that uses the context
const TestComponent = () => {
  const { 
    modalContent, 
    openModal, 
    closeModal,
    expandedServices,
    toggleServiceExpansion
  } = useAppContext();

  return (
    <div>
      <button 
        data-testid="open-modal-btn" 
        onClick={(e) => openModal('Test Title', 'Test Content', e)}
      >
        Open Modal
      </button>
      <button 
        data-testid="close-modal-btn" 
        onClick={closeModal}
      >
        Close Modal
      </button>
      <div data-testid="modal-state">
        {modalContent.isOpen ? 'Modal Open' : 'Modal Closed'}
      </div>
      <div data-testid="modal-title">{modalContent.title}</div>
      <div data-testid="modal-content">{modalContent.content}</div>
      
      <button 
        data-testid="toggle-service-btn" 
        onClick={() => toggleServiceExpansion(0)}
      >
        Toggle Service
      </button>
      <div data-testid="expanded-services">
        {expandedServices.length > 0 ? `Expanded: ${expandedServices.join(',')}` : 'None Expanded'}
      </div>
    </div>
  );
};

describe('AppContext', () => {
  beforeEach(() => {
    // Reset document body style before each test
    document.body.style.overflow = '';
  });

  it('provides modal state and functions', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Initial state - modal should be closed
    expect(screen.getByTestId('modal-state').textContent).toBe('Modal Closed');

    // Open the modal
    fireEvent.click(screen.getByTestId('open-modal-btn'));
    
    // Modal should be open with correct content
    expect(screen.getByTestId('modal-state').textContent).toBe('Modal Open');
    expect(screen.getByTestId('modal-title').textContent).toBe('Test Title');
    expect(screen.getByTestId('modal-content').textContent).toBe('Test Content');
    
    // Document body should have overflow: hidden
    expect(document.body.style.overflow).toBe('hidden');

    // Close the modal
    fireEvent.click(screen.getByTestId('close-modal-btn'));
    
    // Modal should be closed
    expect(screen.getByTestId('modal-state').textContent).toBe('Modal Closed');
    
    // Document body overflow should be reset
    expect(document.body.style.overflow).toBe('');
  });

  it('manages expanded services state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    // Initial state - no expanded services
    expect(screen.getByTestId('expanded-services').textContent).toBe('None Expanded');

    // Toggle first service
    fireEvent.click(screen.getByTestId('toggle-service-btn'));
    
    // First service should be expanded
    expect(screen.getByTestId('expanded-services').textContent).toBe('Expanded: 0');
    
    // Toggle again should collapse
    fireEvent.click(screen.getByTestId('toggle-service-btn'));
    
    // No expanded services
    expect(screen.getByTestId('expanded-services').textContent).toBe('None Expanded');
  });

  // Add more tests as needed for other context functionality
});

// Mock implementation for focus management
jest.mock('../../hooks/useFocusManagement', () => ({
  useFocusManagement: () => ({
    setFocus: jest.fn(),
    containerRef: { current: null }
  })
})); 