// src/components/SignUpPage/SignUpPage.tsx
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import styles from './EditProfile.module.scss';
import { useEditProfileMutation } from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';
import { useAppDispatch } from '@/hooks/redux';
import { setCredentials } from '@/store/reducers/authSlice';

type FormInputs = {
  username: string;
  email: string;
  bio: string;
  avatar: string;
};

interface EditProfileError {
  data: {
    errors: {
      [key: string]: string;
    };
  };
  status: number;
}

function EditProfilePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/sign-in');
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      username: '',
      email: '',
      bio: '',
      avatar: '',
    },
  });

  const [editProfile, { isLoading, error: editProfileError }] =
    useEditProfileMutation();

  let errorMessage: string;

  if (editProfileError && 'data' in editProfileError) {
    const error = editProfileError as EditProfileError;

    const firstErrorEntry = Object.entries(error.data.errors)[0];
    if (firstErrorEntry) {
      const [field, message] = firstErrorEntry;
      errorMessage = `${field} ${message}`;
    }
  }
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const result = await editProfile({
        user: {
          username: formData.username,
          email: formData.email,
          image: formData.avatar,
          bio: formData.bio,
        },
      }).unwrap();

      dispatch(setCredentials(result.user));
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className={styles.editProfilePage}>
      <h1>Edit account</h1>
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
          label="Bio"
          validateStatus={errors.bio ? 'error' : ''}
          help={errors.bio?.message}
        >
          <Controller
            name="bio"
            control={control}
            rules={{
              required: false,
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
          label="Avatar image (url)"
          validateStatus={errors.avatar ? 'error' : ''}
          help={errors.avatar?.message}
        >
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Save
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

export default EditProfilePage;
