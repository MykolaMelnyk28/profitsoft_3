import booksData from './books.json';
import { AlreadyExistsError, DataSourceBase, NotFoundError } from './../common';
import authorDataSource from './../authors/datasourse';
import genreDataSource from './../genres/datasourse';

class DataSource extends DataSourceBase {
    constructor() {
        super();
        this.LS_ITEM = 'BOOK';
        this.authorDataSource = authorDataSource;
        this.genreDataSource = genreDataSource;
        this.books = this.initializeLocalStorageList(this.LS_ITEM, booksData, 80);
    }

    getById(id) {
        const book = this.books.find(x => this.equalId(x.id, id));
        if (book) {
            return book;
        } else {
            throw new NotFoundError("Book not found");
        }
    }

    deleteById(id) {
        const bookToDelete = this.getById(id);
        if (bookToDelete) {
            this.books = this.removeIfLocalStorageList(this.LS_ITEM, b => this.equalId(b.id, id));
            return bookToDelete;
        } else {
            throw new NotFoundError("Book not found");
        }
    }

    create(book) {
        this.checkUnique(undefined, book);
        const newId = this.nextSequenceId(this.LS_ITEM);
        const newBook = {
            title: book.title,
            yearPublished: book.yearPublished,
            pages: book.pages,
            description: book?.description,
            author: this.getAuthorById(book.authorId),
            genres: this.getGenresByIds(book.genreIds),
            id: newId,
        }
        this.books = this.pushToLocalStorageList(this.LS_ITEM, newBook);
        this.setSequenceId(this.LS_ITEM, newId);
        return newBook;
    }

    getAuthorById(id) {
        return this.authorDataSource.getById(id);
    }

    getGenresByIds(ids) {
        return this.genreDataSource.getByIds(ids);
    }

    updateById(id, book) {
        this.checkUnique(id, book);
        const bookToUpdate = this.getById(id);
        const updatedBook = {
            id: bookToUpdate.id,
            title: book.title,
            yearPublished: book.yearPublished,
            pages: book.pages,
            description: book?.description,
            author: book.authorId ? this.getAuthorById(book.authorId) : bookToUpdate.author,
            genres: book.genreIds ? this.getGenresByIds(book.genreIds) : bookToUpdate.genres,
        };
        if (!bookToUpdate) {
            throw new NotFoundError("Book not found");
        }
        this.books = this.mapLocalStorageList(this.LS_ITEM, book => {
            if (this.equalId(book.id, id)) {
                return updatedBook;
            }
            return book;
        });

        return updatedBook;
    }

    checkUnique(id, book) {
        const elm = this.books.find(b =>
            (!id || !this.equalId(b.id, id)) &&
            b.title === book.title &&
            this.equalId(b.author.id, book.authorId)
        );

        if (elm) {
            throw new AlreadyExistsError('ALREADY_EXISTS_ERROR');
        }
    }

    search(filter) {
        const {
            page,
            size,
            sort,
        } = filter;

        const filtered = this.filterBooks(filter);
        if (sort) {
            this.applySort(filtered, sort);
        }

        const startIndex = page * size;
        const endIndex = startIndex + size;
        const totalElements = filtered.length;
        const totalPages = Math.ceil(totalElements / size);

        return {
            content: filtered.slice(startIndex, endIndex),
            page,
            size,
            totalElements,
            totalPages,
        };
    }

    filterBooks(filter) {
        return this.books.filter(b => {
            const conditions = [
                !(filter?.query ?? '') || b.title.toLowerCase().includes(filter.query.toLowerCase()),
                !(filter?.authorIds?.length ?? 0) || filter.authorIds.includes(b.author.id),
                !(filter?.genreIds?.length ?? 0) || filter.genreIds.some(id => b.genres.some(g => g.id === id)),
                filter?.minYearPublished == null || b.yearPublished >= filter.minYearPublished,
                filter?.maxYearPublished == null || b.yearPublished <= filter.maxYearPublished,
                filter?.minPages == null || b.pages >= filter.minPages,
                filter?.maxPages == null || b.pages <= filter.maxPages
            ];
            return conditions.every(c => c);
        });
    }

}

const dataSource = new DataSource();

export default dataSource;
