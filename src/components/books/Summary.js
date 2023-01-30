const Summary = ({ summary }) => {
    return (
        <article className="summary">
            <h1 className="sr-only">Tab Article</h1>
            <p>{summary}</p>
        </article>
    );
};

export default Summary;
