// src/components/SignInPage/SignInPage.tsx
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import styles from './SignInPage.module.scss';
import { useSignInMutation } from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';
import { useAppDispatch } from '@/hooks/redux';
import { setCredentials } from '@/store/reducers/authSlice';

export type FormInputs = {
  email: string;
  password: string;
};

function SignInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();

  interface SignInError {
    data: {
      errors: {
        [key: string]: string;
      };
    };
    status: number;
  }

  const [signIn, { isLoading, error: signInError }] = useSignInMutation();

  let errorMessage: string;

  if (signInError && 'data' in signInError) {
    const error = signInError as SignInError;

    const firstErrorEntry = Object.entries(error.data.errors)[0];
    if (firstErrorEntry) {
      const [field, message] = firstErrorEntry;
      errorMessage = `${field} ${message}`;
    }
  }

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const result = await signIn({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      dispatch(setCredentials(result));
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className={styles.signUpPage}>
      <h1>Create new account</h1>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Email address"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Password must be at most 40 characters',
              },
            }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      {isLoading && <Spinner />}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div className={styles.isHaveAccount}>
        <p>Dont have an account? </p>
        <Link to="/sign-up">
          <p> Sign Up.</p>
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
