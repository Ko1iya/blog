// src/components/SignUpPage/SignUpPage.tsx
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './SignUpPage.module.scss';
import { useSignUpMutation } from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';
import { useAppDispatch } from '@/hooks/redux';
import { setCredentials } from '@/store/reducers/authSlice';

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
};

interface SignUpError {
  data: {
    errors: {
      [key: string]: string;
    };
  };
  status: number;
}

function SignUpPage() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreement: false,
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signUp, { isLoading, error: signUpError }] = useSignUpMutation();

  let errorMessage: string;

  if (signUpError && 'data' in signUpError) {
    const error = signUpError as SignUpError;

    const firstErrorEntry = Object.entries(error.data.errors)[0];
    if (firstErrorEntry) {
      const [field, message] = firstErrorEntry;
      errorMessage = `${field} ${message}`;
    }
  }

  const password = watch('password');

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const result = await signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(setCredentials(result.user));
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
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
          label="Username"
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            rules={{
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Username must be at most 20 characters',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

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

        <Form.Item
          label="Repeat Password"
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Please confirm your password',
              validate: (value) =>
                value === password || 'The passwords do not match',
            }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.agreement ? 'error' : ''}
          help={errors.agreement?.message}
        >
          <Controller
            name="agreement"
            control={control}
            rules={{
              required: 'You must agree to the terms',
            }}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                I agree to the processing of my personal information
              </Checkbox>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Create
          </Button>
        </Form.Item>
      </Form>

      {isLoading && <Spinner />}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div className={styles.isHaveAccount}>
        <p>Already have an account? </p>
        <Link to="/sign-in">
          <p> Sign In.</p>
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
