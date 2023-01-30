import Profile from '../../src/components/account/Profile';
import AccountLayout from '../../src/components/layout/AccountLayout';
const myprofile = () => {
    return <Profile />;
};

myprofile.Layout = AccountLayout;
// export default withProtected(myprofile);
export default myprofile;
