import Link from 'next/link';
import styles from './Register.module.scss';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const RegisterView = () => {
    const [isLoading, setISLoading] = useState(false)
    const [error, setError] = useState('');
    const { push } = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setISLoading(true)
        setError('')
        const form = event.target as HTMLFormElement
        const data = {

            email: form.email.value,
            fullname: form.fullname.value,
            phone: form.phone.value,
            password: form.password.value,
        }
        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),

        })
        if (result.status === 200) {


            form.reset();
            setISLoading(false)
            push('/auth/login');
        } else {
            setISLoading(false)
            setError('Eamil is already registered')
        }
    }
    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="text" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="">Fullname</label>
                        <input name="fullname" id="fullname" type="text" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="">Phone</label>
                        <input name="phone" id="phone" type="number" className={styles.register__form__item__input} />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="">Password</label>
                        <input name="password" id="password" type="password" className={styles.register__form__item__input} />
                    </div>
                    <button type="submit" className={styles.register__form__button}>{isLoading ? 'Loading...' : 'Register'}</button>
                </form>
            </div>
            <p className={styles.register__link}>
                have a account?sign in <Link href="/auth/login">Here</Link>
            </p>
        </div>
    );
};
export default RegisterView;