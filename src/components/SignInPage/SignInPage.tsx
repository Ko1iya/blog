import { Link } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import styles from './SignInPage.module.scss';

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', { user: { ...values } });
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function SignInPage() {
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

        <Form.Item label={null} wrapperCol={{ offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
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
