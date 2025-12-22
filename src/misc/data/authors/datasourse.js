import authorsData from './authors.json';
import { DataSourceBase, NotFoundError } from './../common';

class DataSource extends DataSourceBase {
    constructor() {
        super();
        this.LS_ITEM = 'AUTHOR';
        this.authors = this.initializeLocalStorageList(this.LS_ITEM, authorsData, 23);
    }

    getById(id) {
        const author = this.authors.find(author => this.equalId(author.id, id));
        if(author) {
            return author;
        } else {
            throw new NotFoundError("Author not found");
        }
    }

    deleteById(id) {
        const authorToDelete = this.getById(id);
        if (authorToDelete) {
            this.authors = this.removeIfLocalStorageList(this.LS_ITEM, a => this.equalId(a.id, id));
            return authorToDelete;
        } else {
            throw new NotFoundError("Author not found");
        }
    }

    create(author) {
        const newId = this.nextSequenceId(this.LS_ITEM);
        const newAuthor = {
            firstName: author.firstName,
            lastName: author.lastName,
            id: newId,
        }
        this.authors = this.pushToLocalStorageList(this.LS_ITEM, newAuthor);
        this.setSequenceId(this.LS_ITEM, newId);
        return newAuthor;
    }

    updateById(id, author) {
        const authorToUpdate = this.getById(id);
        const updatedAuthor = { ...authorToUpdate, ...author }
        if(!authorToUpdate) {
            throw new NotFoundError("Author not found");
        }
        this.authors = this.mapLocalStorageList(this.LS_ITEM, author => {
            if (this.equalId(author.id, id)) {
                return updatedAuthor;
            }
            return author;
        });
        return updatedAuthor;
    }

    search(filter) {
        const {
            page,
            size,
            sort,
        } = filter;

        const filtered = this.filterAuthors(filter);
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

    filterAuthors(filter) {
        return this.authors.filter(a => {
            return filter?.query || `${a.firstName} ${a.lastName}`.toLowerCase().includes(filter.query.toLowerCase());
        });
    }

}

const dataSource = new DataSource();

export default dataSource;
