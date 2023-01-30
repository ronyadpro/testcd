import { createContext } from 'react';
import useSubscriptionService from './../hooks/useSubscriptionService';

export const SubscriptionContext = createContext();
const SubscriptionProvider = ({ children }) => {
    const allContext = useSubscriptionService();
    return (
        <SubscriptionContext.Provider value={allContext}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export default SubscriptionProvider;
