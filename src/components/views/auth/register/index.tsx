    import styles from './Register.module.scss';
    
    const RegisterView = () => {
    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register</h1>
            <div className={styles.register__form}>
                <form action="">
                    <div>
                        <label htmlFor=""></label>
                        <input type="text" />
                    </div>
                    <button>Register</button>
                </form>
            </div>
            <p>
                have a account?sign in here
            </p>
        </div>
    );
    };

    export default RegisterView;