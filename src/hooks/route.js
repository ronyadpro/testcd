import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from './useAuth';

export function withPublic(Component) {
    return function WithPublic(props) {
        const { user, isLoading } = useAuth();
        const router = useRouter();
        if (user.msisdn && !isLoading) {
            useEffect(() => {
                router.back();
            }, []);
            return <h1>Loading</h1>;
        }
        return <Component user={user} {...props} />;
    };
}

export function withProtected(Component) {
    return function WithProtected(props) {
        const { user, isLoading } = useAuth();
        const router = useRouter();

        if (!user.msisdn && !isLoading) {
            useEffect(() => {
                router.replace('/signin');
            }, []);
            return <h1>Loading</h1>;
        }

        return <Component user={user} {...props} />;
    };
}
