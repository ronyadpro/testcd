const ReaderMsg = ({ msg }) => {
    return (
        <div
            style={{ width: '100%', height: '68vh' }}
            className="d-flex justify-content-center align-items-center"
        >
            <h1>{msg}</h1>
        </div>
    );
};

export default ReaderMsg;
