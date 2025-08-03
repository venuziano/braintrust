import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
}

const toastStyles = {
  success: {
    backgroundColor: 'var(--chart-2)',
    color: 'white',
    icon: CheckCircle,
  },
  error: {
    backgroundColor: 'var(--destructive)',
    color: 'var(--destructive-foreground)',
    icon: XCircle,
  },
  info: {
    backgroundColor: 'var(--primary)',
    color: 'var(--primary-foreground)',
    icon: Info,
  },
};

export function Toast({ type, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const style = toastStyles[type];
  const Icon = style.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 20px',
        borderRadius: 'var(--radius)',
        backgroundColor: style.backgroundColor,
        color: style.color,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        minWidth: '300px',
        maxWidth: '400px',
        transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <Icon style={{ width: '20px', height: '20px', flexShrink: 0 }} />
      <span style={{ fontSize: '14px', flex: 1 }}>{message}</span>
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <X style={{ width: '16px', height: '16px' }} />
      </button>
    </div>
  );
} 