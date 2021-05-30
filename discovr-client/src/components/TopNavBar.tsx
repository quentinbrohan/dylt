import React from 'react';
import { Button, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { isServer } from '../utils/isServer';

const TopNavBar: React.FC = () => {
    const router = useRouter();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    let body = null;

    // Data is loading
    if (fetching) {
        // User not logged in
    } else if (!data?.me) {
        body = (
            <Space>
                <Link href="/register">
                    <Button>Register</Button>
                </Link>
                <Link href="/login">
                    <Button type="primary">Login</Button>
                </Link>
            </Space>
        );
        // User is logged in
    } else {
        body = (
            <Space>
                <div>{data.me.username}</div>
                <Button
                    type="primary"
                    onClick={async () => {
                        await logout();
                        router.reload();
                    }}
                    loading={logoutFetching}
                >
                    Logout
                </Button>
            </Space>
        );
    }

    return <>{body}</>;
};

export default TopNavBar;
