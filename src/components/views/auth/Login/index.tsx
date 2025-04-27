// components/LoginView.tsx
import Link from 'next/link';
import styles from './login.module.scss';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const LoginView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push, query } = useRouter();
  const callbackUrl = (query.callbackUrl as string) || '/';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        form.reset();
        push(callbackUrl);
      } else {
        setError(result.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.login__form}>
        <div className={styles.login__form__item}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={styles.login__input}
          />
        </div>
        <div className={styles.login__form__item}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={styles.login__input}
          />
        </div>
        <button
          type="submit"
          className={styles.login__button}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <p className={styles.login__link}>
        Don&apos;t have an account?{' '}
        <Link href="/auth/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginView;
