import { LinkOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, Typography, Space } from 'antd';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useTrackQuery, useUpdateTrackMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';
import '../../../styles/components/editTrack.less';
import { validateYouTubeUrl } from '../../../utils/validateYouTubeUrl';
import { TTrackFormProps } from '../../../types';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Title } = Typography;

const EditTrack = () => {
    const router = useRouter();
    const intId = useGetIntId();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const [{ data, fetching }] = useTrackQuery({
        pause: intId === -1,
        variables: {
            id: intId,
        },
    });
    const [, updateTrack] = useUpdateTrackMutation();

    const [error, setError] = useState<string | undefined>(undefined);

    const onFinish = async (values: TTrackFormProps) => {
        setLoading(true);
        console.log('Received values of form: ', values);
        const { error } = await updateTrack({
            id: intId,
            ...values,
        });

        const isValidUrl = validateYouTubeUrl(values.url);
        if (!isValidUrl) {
            setLoading(false);
            setError('Url non valide. Seuls les liens YouTube sont acceptés.');
            return;
        }

        if (!error) {
            setLoading(false);
            router.back();
        }
    };

    if (fetching) {
        return <Spin indicator={loadingIcon} />;
    }

    if (!data?.track) {
        return <div>Track not found.</div>;
    }

    return (
        <>
            <Title style={{ textAlign: 'center', color: '#f3f5f9' }}>Edit a track</Title>
            <Form
                name="create_track"
                className="edit-track-form"
                layout="vertical"
                initialValues={{
                    name: data.track.name,
                    url: data.track.url,
                }}
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
                    <Space size="large">
                        <Button
                            type="default"
                            htmlType="button"
                            className="edit-track-form-button"
                            loading={loading}
                            onClick={() => {
                                router.back();
                            }}
                        >
                            Back
                        </Button>
                        <Button type="primary" htmlType="submit" className="edit-track-form-button" loading={loading}>
                            Edit track
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};

export default withUrqlClient(createUrqlClient)(EditTrack);
