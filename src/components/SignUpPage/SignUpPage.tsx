import { Link } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './SignUpPage.module.scss';

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function SignUpPage() {
  return (
    <div className={styles.signUpPage}>
      <h1>Create new account</h1>
      <Form
        layout="vertical"
        name="basic"
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 32 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark="optional"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Username' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email address"
          name="email"
          rules={[{ required: true, message: 'Email address' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Repeat Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Repeat Password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
          labelCol={{ span: 16 }}
        >
          <Checkbox>
            I agree to the processing of my personal information
          </Checkbox>
        </Form.Item>
        {/* Как сделать кнопку на всю ширину */}
        <Form.Item
          label={null}
          wrapperCol={{ offset: 10, span: 16 }}
          labelCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
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
