import { LinkOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { validateYouTubeUrl } from '@/utils/validators';
import { useCreateTrackMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';
import '../styles/components/createTrack.less';
import { cleanYouTubeUrl } from '../utils/cleanYouTubeUrl';
import { TTrackFormProps } from '../types';

const { Title } = Typography;

const CreateTrack: React.FC = () => {
    const router = useRouter();
    useIsAuth();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const [, createTrack] = useCreateTrackMutation();

    const onFinish = async (values: TTrackFormProps) => {
        setLoading(true);
        console.log('Received values of form: ', values);
        const { error } = await createTrack({
            input: {
                name: values.name,
                url: cleanYouTubeUrl(values.url),
            },
        });

        if (error) {
            setError(error?.graphQLErrors[0].message);
            // form.setFields([])
            setLoading(false);
        }

        const isValidUrl = validateYouTubeUrl(values.url);
        if (!isValidUrl) {
            setLoading(false);
            setError('Url non valide. Seuls les liens YouTube sont acceptés.');
            return;
        }

        if (!error) {
            setLoading(false);
            router.push('/');
        }
    };

    return (
        <>
            <Title style={{ textAlign: 'center', color: '#f3f5f9' }}>Add track</Title>
            <Form
                name="create_track"
                className="create-track-form"
                layout="vertical"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="Artist(s) - Track Title (Remix) [Ref]"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the artist's name and the track title.",
                        },
                    ]}
                >
                    <Input placeholder="Artist(s) - Track Title (Remix) [Reference]" />
                </Form.Item>
                <Form.Item
                    name="url"
                    label="Track link"
                    rules={[
                        {
                            required: true,
                            message: "Please enter track's link",
                        },
                        {
                            validator: (rule, value) => {
                                console.log({ value });
                                const isValidUrl = validateYouTubeUrl(value);
                                if (isValidUrl) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Invalid URL. Only YouTube links are accepted.'));
                            },
                        },
                    ]}
                    {...(error && {
                        validateStatus: 'error',
                        help: error,
                    })}
                >
                    <Input
                        prefix={<LinkOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="Track's link (Youtube url)"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="create-track-form-button" loading={loading}>
                        Add track
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default withUrqlClient(createUrqlClient)(CreateTrack);
