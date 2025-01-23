import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Button, Form, Input } from 'antd';
import styles from './FormArticle.module.scss';
import { useCreateArticleMutation } from '@/store/reducers/blogApi';
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
  title: string;
  description: string;
  body: string;
  tags: string[];
}

function FormArticle(props: IFormArticleProps) {
  const { title, description, body, tags } = props;

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
    // ERROR: Тип "string" не может быть назначен для типа "never".ts(2322)
    // fieldArray.d.ts(6, 5): Ожидаемый тип поступает из свойства "name", объявленного здесь в типе "UseFieldArrayProps<FormInputs, never, "id">"
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

  const [createArticle, { isLoading, error: createError }] =
    useCreateArticleMutation();

  let errorMessage: string;

  if (createError && 'data' in createError) {
    const error = createError as Error;

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
    };

    try {
      const result = await createArticle(transformedData).unwrap();
      console.log(result);
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
            Create
          </Button>
        </Form.Item>
      </Form>

      {isLoading && <Spinner />}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default FormArticle;
