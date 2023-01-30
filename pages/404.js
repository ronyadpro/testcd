import Link from 'next/link';
function PageNotFound() {
    return (
        <div
            style={{ width: '100%', height: '68vh' }}
            className="d-flex justify-content-center align-items-center"
        >
            <div className="text-center">
                <h1>404 Page Not Found</h1>
                <p>The page you requested was not found.</p>

                <Link
                    href="/"
                    passHref
                    style={{ display: 'block', marginTop: '40px' }}
                >
                    <button className="btn btn-primary">
                        Go to the home page
                    </button>
                </Link>
            </div>
        </div>
    );
}
export default PageNotFound;
