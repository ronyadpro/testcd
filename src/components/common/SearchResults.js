import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { search } from '../../services/httpServices';
import AuthorSectionItem from '../authors/AuthorSectionItem';
import BooksList from '../books/BookList';
import Breadcrumb from './Breadcrumb';
const SearchResults = () => {
    // const { params } = useParams();
    const router = useRouter();
    const { key } = router?.query;
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [categories, setCategories] = useState([]);

    const formData = {
        key: key
    };

    useEffect(() => {
        search(formData).then((res) => {
            if (res?.status.responseCode === '1') {
                setBooks(res?.data.books);
                setAuthors(res?.data.writers);
                setGenres(res?.data.genres);
                setCategories(res?.data.categories);
            }
        });
    }, [key]);

    return (
        <div>
            <Breadcrumb from={'search'} />

            <div className="container">
                <div className="text-center">
                    <h3>Search result for - '{key}'</h3>
                </div>

                {categories.length > 0 && (
                    <div className="row">
                        <div className="col-lg-6">
                            <h4 className="ml--10">Categories</h4>
                        </div>
                    </div>
                )}
                <section>
                    {categories.map((cat) => (
                        <div key={cat.catcode}>
                            <Link
                                href={`/contents/category/${cat.catcode}`}
                                passHref
                            >
                                <button
                                    type="button"
                                    className="category mb--10"
                                >
                                    {cat.catname_bn}
                                </button>
                            </Link>
                        </div>
                    ))}
                </section>

                {genres.length > 0 && (
                    <div className="row">
                        <div className="col-lg-6">
                            <h4 className="ml--10">Genres</h4>
                        </div>
                    </div>
                )}
                <section>
                    {genres.map((gen) => (
                        <div key={gen.genre_code}>
                            <Link
                                href={`/contents/genre/${gen.genre_code}`}
                                passHref
                            >
                                <button
                                    type="button"
                                    className="category mb--10"
                                >
                                    {gen.genre_bn}
                                </button>
                            </Link>
                        </div>
                    ))}
                </section>

                {books.length > 0 && (
                    <div className="row mt--20">
                        <div className="col-lg-6">
                            <h4 className="ml--10">eBooks</h4>
                        </div>
                    </div>
                )}
                <section>
                    <BooksList booklist={books} />
                </section>

                {authors.length > 0 && (
                    <div className="row mt--20">
                        <div className="col-lg-6">
                            <h4 className="ml--10">Writers</h4>
                        </div>
                    </div>
                )}

                <section>
                    <div className="shop-product-wrap grid with-pagination row space-db--20 shop-border">
                        {authors?.map((content) => (
                            <AuthorSectionItem
                                key={content.authorcode}
                                content={content}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SearchResults;
