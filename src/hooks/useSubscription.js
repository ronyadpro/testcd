import { useContext } from 'react';
import { SubscriptionContext } from '../context/SubscriptionProvider';

const useSubscription = () => {
    return useContext(SubscriptionContext);
};

export default useSubscription;
