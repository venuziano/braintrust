import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../../../api/auth';
import { useAuth } from '../../../contexts/AuthContext';
import { useToast } from '../../../contexts/ToastContext';
import { getDefaultRoute } from '../../../routes';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginApi, isLoading, error, isSuccess } = useLogin();
  const { login: authLogin } = useAuth();
  const { showSuccess, showError } = useToast();

  // Clear form on successful login
  useEffect(() => {
    if (isSuccess) {
      setEmail('');
      setPassword('');
    }
  }, [isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginApi({ email, password });
      
      authLogin(result.user, result.token);
      showSuccess(`Welcome back, ${result.user.name}!`);
      
      // Redirect to default route based on user role
      const defaultRoute = getDefaultRoute(result.user.role);
      if (defaultRoute) {
        window.history.pushState({}, '', `/${defaultRoute.path}`);
      }
    } catch (err) {
      console.error('Login failed:', err);
      showError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{
      padding: '24px',
      backgroundColor: 'var(--card)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    }}>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--foreground)',
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              fontSize: '14px',
            }}
            placeholder="Enter your email"
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--foreground)',
          }}>
            Password
          </label>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                paddingRight: '48px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                fontSize: '14px',
              }}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted-foreground)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                borderRadius: 'var(--radius)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {showPassword ? (
                <EyeOff style={{ width: '16px', height: '16px' }} />
              ) : (
                <Eye style={{ width: '16px', height: '16px' }} />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            marginBottom: '16px',
            padding: '12px',
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--destructive)',
            color: 'var(--destructive-foreground)',
            fontSize: '14px',
          }}>
            {error.message}
          </div>
        )}



        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 'var(--radius)',
            border: 'none',
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
            fontSize: '14px',
            fontWeight: '500',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'var(--muted)',
        borderRadius: 'var(--radius)',
        fontSize: '12px',
        color: 'var(--muted-foreground)',
      }}>
        <strong>Test Credentials:</strong><br />
        Admin: alice@braintrust.com / password1<br />
        Solutions Engineer: bob.se@contractor.com / password2<br />
        Client: carol@acme.com / password3
      </div>
    </div>
  );
} 