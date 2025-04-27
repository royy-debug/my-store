// components/RegisterView.tsx
import Link from 'next/link';
import styles from './register.module.scss';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const RegisterView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: formData.get('email') as string,
      fullname: formData.get('fullname') as string,
      phone: formData.get('phone') as string,
      password: formData.get('password') as string,
    };

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        form.reset();
        push('/auth/login');
      } else {
        setError(result.message || 'Email is already registered.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.register__form}>
        <div className={styles.register__form__item}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={styles.register__input}
          />
        </div>
        <div className={styles.register__form__item}>
          <label htmlFor="fullname">Full Name</label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            required
            className={styles.register__input}
          />
        </div>
        <div className={styles.register__form__item}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={styles.register__input}
          />
        </div>
        <div className={styles.register__form__item}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={styles.register__input}
          />
        </div>
        <button
          type="submit"
          className={styles.register__button}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className={styles.register__link}>
        Have an account? <Link href="/auth/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
