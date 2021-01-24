import React, { useState } from 'react';
import LoaderButton from '../../../components/LoaderButton/LoaderButton';
import { useAppContext } from '../../../libs/contextLib';
import './Signup.css';
import { Auth } from 'aws-amplify';
import { Form, Input } from 'antd';
import SignupForm from './SignupForm';

const Signup = ({ footer, xsSpan, xlSpan }) => {
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState();

  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    form.validateFields()
        .then((fields) => newUser === null ? handleSignupSubmit(fields) :
                                                     handleConfirmationSubmit(fields));
  };

  const handleSignupSubmit = (fields) => {
    // TODO: Call API
    setIsLoading(true);

    Auth.signUp({
      username: fields.email,
      password: fields.password,
    }).then((currentUser) => {
      setIsLoading(false);
      setNewUser(currentUser);
      setUserInfo(fields);
    }).catch((e) => {
      setError(e.message);
      setIsLoading(false);
    });
  };

  const handleConfirmationSubmit = (fields) => {
    setIsLoading(true);

    Auth.confirmSignUp(userInfo.email, fields.confirmationCode)
        .then(() => Auth.signIn(userInfo.email, userInfo.password))
        .then(() => {
          userHasAuthenticated(true);
        }).catch((e) => {
          setError(e.message);
          setIsLoading(false);
        });
  };

  const confirmationFields = () =>
    <Form.Item label='Confirmation Code' name='confirmationCode' rules={[{ required: true }]}>
      <Input />
    </Form.Item>;

  return (
    <Form className="login-form" layout="vertical" form={form} onFinish={handleSubmit}>
      {newUser === null ? <SignupForm xsSpan={xsSpan} xlSpan={xlSpan}/> : confirmationFields()}

      <Form.Item>
        <LoaderButton
          block
          size="lg"
          htmlType="submit"
          variant="success"
          isLoading={isLoading}
        >
          {newUser === null ? 'Sign up' : 'Verify'}
        </LoaderButton>
      </Form.Item>
      <div className="errorMsg">{error}</div>
      <p>
        {footer}
      </p>
    </Form>
  );
};


export default Signup;