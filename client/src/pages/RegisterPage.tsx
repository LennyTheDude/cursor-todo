import { useState } from 'react';
import type { FormEvent } from 'react';
import { register } from '../api/auth';

type RegisterPageProps = {
  onAuthenticated: (token: string) => void;
  onSwitchToLogin: () => void;
};

function RegisterPage({ onAuthenticated, onSwitchToLogin }: RegisterPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const result = await register({ email, password });
      onAuthenticated(result.token);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <h1>Register</h1>
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
            autoComplete="new-password"
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </main>
  );
}

export default RegisterPage;
