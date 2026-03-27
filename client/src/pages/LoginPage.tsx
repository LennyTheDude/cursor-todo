import { useState } from 'react';
import type { FormEvent } from 'react';
import { login } from '../api/auth';

type LoginPageProps = {
  onAuthenticated: (token: string) => void;
  onSwitchToRegister: () => void;
};

function LoginPage({ onAuthenticated, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const result = await login({ email, password });
      onAuthenticated(result.token);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={(event) => void handleSubmit(event)}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>
        No account yet?{' '}
        <button type="button" onClick={onSwitchToRegister}>
          Register
        </button>
      </p>
    </main>
  );
}

export default LoginPage;
