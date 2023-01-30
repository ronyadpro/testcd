import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { getuserinfo, updateuserinfo } from '../../services/httpServices';

const Profile = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [updated, setUpdated] = useState(false);
    const [modalshow, setModalshow] = useState(false);

    useEffect(() => {
        const formData = {
            userid: user?.msisdn
        };

        getuserinfo(formData).then((res) => {
            setUserInfo(res.data);
            setName(res.data?.fullname);
            setEmail(res.data?.email);
            setGender(res.data?.gender);
            setDob(res.data?.dob);
        });
    }, [user, updated]);

    const handleUpdate = (e) => {
        setModalshow(false);
        setUpdated(false);
        e.preventDefault();

        if (
            name !== userInfo.fullname ||
            email !== userInfo.email ||
            gender !== userInfo.gender ||
            dob !== userInfo.dob
        ) {
            const formData = {
                userid: user.msisdn,
                fullname: name,
                email: email,
                gender: gender,
                dob: dob
            };

            updateuserinfo(formData).then((res) => {
                if (res.status.responseCode === '1') {
                    setUpdated(true);
                }
            });
        }
    };

    return (
        <div>
            <h4>Dashboard</h4>
            <hr className="mb--30" />
            <address>
                <p>
                    <b>Full Name</b>&emsp;&emsp;:&emsp;
                    {userInfo?.fullname ? userInfo.fullname : 'Not Found'}
                </p>
                <p>
                    <b>Email </b>
                    &emsp;&emsp;&emsp;&emsp;:&emsp;
                    {userInfo?.email ? userInfo.email : 'Not Found'}
                </p>
                <p>
                    <b>Date of Birth</b>&ensp;:&emsp;
                    {userInfo?.dob === '0000-00-00'
                        ? 'Not Found'
                        : userInfo?.dob}
                </p>
                <p>
                    <b>Gender:</b>&emsp;&emsp;&emsp;:&emsp;
                    {userInfo?.gender ? userInfo.gender : 'Not Found'}
                </p>
            </address>
            {updated && (
                <div className="alert alert-success" role="alert">
                    Profile Successfully Updated !
                </div>
            )}
            <button
                type="button"
                className="btn btn-primary "
                data-bs-toggle="modal"
                data-bs-target="#modal_account_update"
                onClick={() => setModalshow(true)}
            >
                Update Account
            </button>

            <div
                className={` modal fade ${modalshow ? 'show' : ''}`}
                id="modal_account_update"
                style={{ display: ` ${modalshow ? 'block' : 'none'}` }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Update Account</h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setModalshow(false)}
                            ></button>
                        </div>

                        <form id="frm_account_update" onSubmit={handleUpdate}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="form-group  col-lg-6 col-sm-6 ">
                                        <label>
                                            Name<span>*</span>:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="txt_accountname"
                                            name="fullname"
                                            defaultValue={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group col-lg-6 col-sm-6 ">
                                        <label>
                                            Email<span>*</span>:
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control-sm"
                                            id="txt_dob_update"
                                            name="email"
                                            defaultValue={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-6 col-sm-6">
                                            <label htmlFor="blood">
                                                Gender <span>*</span>:
                                            </label>
                                            <select
                                                className="form-control form-control-sm"
                                                id="ddl_gender_update"
                                                name="gender"
                                                onChange={(e) =>
                                                    setGender(e.target.value)
                                                }
                                                defaultValue={
                                                    gender ? gender : 'DEFAULT'
                                                }
                                            >
                                                <option
                                                    value="DEFAULT"
                                                    disabled
                                                >
                                                    Please Select
                                                </option>
                                                <option
                                                    value="Male"
                                                    // selected={gender === 'Male'}
                                                >
                                                    {' '}
                                                    Male
                                                </option>
                                                <option
                                                    value="Female"
                                                    // selected={
                                                    //     gender === 'Female'
                                                    // }
                                                >
                                                    Female
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-group col-lg-6 col-sm-6 ">
                                            <label>
                                                Date of birth<span>*</span>:
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm"
                                                id="txt_dob_update"
                                                name="date"
                                                defaultValue={dob}
                                                onChange={(e) =>
                                                    setDob(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    // aria-label="Close"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
