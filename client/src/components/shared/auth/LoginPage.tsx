import React from 'react';
import { LoginForm } from './LoginForm';

export function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: 'var(--foreground)',
            margin: '0 0 8px 0',
          }}>
            Welcome Back
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'var(--muted-foreground)',
            margin: 0,
          }}>
            Sign in to your account to continue
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
} 