import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const SubsBookAddModal = ({ addSubData, modalshow, setModalshow }) => {
    const router = useRouter();
    return (
        <div
            className={`d-flex justify-content-center align-items-center  ${
                modalshow ? 'show modal fade' : ''
            }`}
            id="modal_account_update"
            style={{ display: ` ${modalshow ? 'block' : 'none'}` }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Books</h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setModalshow(false)}
                        ></button>
                    </div>
                    <div className="p-3 px--50">
                        {addSubData.status === 'success' ? (
                            <div className="">
                                <div className="text-success d-flex justify-content-center align-items-center p-2">
                                    <AiOutlineCheck size={35} />
                                    <h3>Success</h3>
                                </div>
                                <h6 className="py-2">{addSubData.message}</h6>
                                <div className="mt-3  d-flex justify-content-center">
                                    <button
                                        onClick={() =>
                                            router.push('/account/mylibrary')
                                        }
                                        className="btn btn-primary"
                                    >
                                        My Library
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="">
                                <div className="text-danger d-flex justify-content-center align-items-center p-2">
                                    <AiOutlineClose size={35} />
                                    <h3>Failed</h3>
                                </div>
                                <h6 className="py-2">{addSubData.message}</h6>

                                <div className="mt-3  d-flex justify-content-center">
                                    <button
                                        onClick={() =>
                                            router.push('/subscribe')
                                        }
                                        className="btn btn-primary"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubsBookAddModal;
