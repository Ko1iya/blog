import { useNavigate } from 'react-router-dom';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Button, Form, Input } from 'antd';
import styles from './FormArticle.module.scss';
import {
  useCreateArticleMutation,
  useEditArticleMutation,
} from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';

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

interface IFormArticleProps {
  title: string | undefined;
  description: string | undefined;
  body: string | undefined;
  tags: string[] | undefined;
  slug: string | undefined;
}

function FormArticle(props: IFormArticleProps) {
  const { title, description, body, tags, slug } = props;

  const navigate = useNavigate();

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

  const [createArticle, { isLoading: createLoading, error: createError }] =
    useCreateArticleMutation();
  const [editArticle, { isLoading: editLoading, error: editError }] =
    useEditArticleMutation();

  let errorMessage: string;
  const errorForm = title ? editError : createError;
  const isLoading = title ? editLoading : createLoading;
  const requestFunc = title ? editArticle : createArticle;

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
      await requestFunc(transformedData).unwrap();
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
