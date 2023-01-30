const AuthorBio = ({ bio }) => {
    return (
        <article className="authorinfo">
            <h1 className="sr-only">Tab Article</h1>
            <p>{bio}</p>
        </article>
    );
};

export default AuthorBio;
