import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useLayoutEffect } from 'react';
import { Button, Form, Input } from 'antd';
import styles from './FormArticle.module.scss';

import Spinner from '../Spinner/Spinner';
import { useAppSelector } from '@/hooks/redux';

type FormInputs = {
  title: string;
  description: string;
  body: string;
  tagList: {
    // Add an id field for useFieldArray
    id?: string;
    value: string;
  }[];
};

interface IFormArticle {
  title: string;
  description: string;
  body: string;
  tags?: [string];
  slug?: string;
}

interface IFormArticleProps {
  title: string | undefined;
  description: string | undefined;
  body: string | undefined;
  tags: string[] | undefined;
  slug: string | undefined;
  isLoading: boolean;
  requestFunc: (data: IFormArticle) => unknown;
  errorForm: FetchBaseQueryError | SerializedError;
}

function FormArticle(props: IFormArticleProps) {
  const {
    title,
    description,
    body,
    tags,
    slug,
    requestFunc,
    errorForm,
    isLoading,
  } = props;

  const navigate = useNavigate();

  const token = useAppSelector((state) => state.authSlice.token);

  const isAuth = token;

  useLayoutEffect(() => {
    if (!isAuth) {
      navigate('/sign-in');
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: title || '',
      description: description || '',
      body: body || '',
      tagList: tags ? tags.map((tag) => ({ value: tag })) : [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });
  interface Error {
    data: {
      errors: {
        [key: string]: string;
      };
    };
    status: number;
  }

  let errorMessage: string;

  if (errorForm && 'data' in errorForm) {
    const error = errorForm as Error;

    const firstErrorEntry = Object.entries(error.data.errors)[0];
    if (firstErrorEntry) {
      const [field, message] = firstErrorEntry;
      errorMessage = `${field} ${message}`;
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const transformedData = {
      ...formData,
      tagList: formData.tagList.map((tag) => tag.value),
      ...(slug && { slug }),
    };

    try {
      await requestFunc(transformedData);

      if (title) {
        navigate(`/articles/${slug}`, { replace: true });
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className={styles.formArticle}>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Title"
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title?.message}
        >
          <Controller
            defaultValue={title}
            name="title"
            control={control}
            rules={{
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Title must be at most 20 characters',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Short description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.message}
        >
          <Controller
            defaultValue={description}
            name="description"
            control={control}
            rules={{
              required: 'description is required',
              minLength: {
                value: 3,
                message: 'description must be at least 3 characters',
              },
              maxLength: {
                value: 200,
                message: 'description must be at most 20 characters',
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Text"
          validateStatus={errors.body ? 'error' : ''}
          help={errors.body?.message}
        >
          <Controller
            defaultValue={body}
            name="body"
            control={control}
            rules={{
              required: 'Text is required',
              minLength: {
                value: 3,
                message: 'Text must be at least 3 characters',
              },
            }}
            render={({ field }) => {
              const obj = {
                ...field,
                placeholder: 'Text',
              };
              return <Input.TextArea {...obj} />;
            }}
          />
        </Form.Item>
        {fields.map((field, index) => (
          <Form.Item
            key={field.id}
            validateStatus={errors.tagList?.[index] ? 'error' : ''}
            help={errors.tagList?.[index]?.message}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <Controller
                name={`tagList.${index}.value`}
                control={control}
                rules={{
                  required: 'Tag is required',
                }}
                render={({ field: fieldd }) => <Input {...fieldd} />}
              />
              <Button onClick={() => remove(index)} danger>
                Delete
              </Button>
            </div>
          </Form.Item>
        ))}

        <Button
          onClick={() => append({ value: '' })}
          style={{ width: '319px', marginBottom: '20px' }}
        >
          Add Tag
        </Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '319px' }}>
            {title ? 'Edit ' : 'Create '}
          </Button>
        </Form.Item>
      </Form>

      {isLoading && <Spinner />}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default FormArticle;
