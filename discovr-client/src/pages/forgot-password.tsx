import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Result, Typography } from 'antd';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../generated/graphql';
import '../styles/components/login.less';
import { createUrqlClient } from '../utils/createUrqlClient';
import { TForgotPasswordFormProps } from '../types';

const { Title } = Typography;

export const ForgotPassword: React.FC = () => {
    const [form] = Form.useForm();
    const [complete, setComplete] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    // const [errors, setErrors] = useState<Array>([]);

    const [, forgotPassword] = useForgotPasswordMutation();
    const router = useRouter();

    const onFinish = async (values: TForgotPasswordFormProps) => {
        setLoading(true);
        console.log('Received values of form: ', values);
        await forgotPassword(values);
        setComplete(true);
        setLoading(false);
    };

    return (
        <>
            <Title style={{ textAlign: 'center', color: '#f3f5f9' }}>Forgot password</Title>

            <Form name="normal_login" className="login-form" onFinish={onFinish}>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your email address.',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Reset password
                    </Button>
                </Form.Item>

                {complete && (
                    <Result
                        status="success"
                        title="Operation successfully executed."
                        subTitle="If a account is associated to this email address, a mail has been sent."
                        extra={
                            <NextLink href="/">
                                <Button type="primary" key="console">
                                    Back home
                                </Button>
                            </NextLink>
                        }
                    />
                )}
            </Form>
        </>
    );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
