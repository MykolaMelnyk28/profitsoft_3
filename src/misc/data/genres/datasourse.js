import genresData from './genres.json';
import { AlreadyExistsError, DataSourceBase, NotFoundError } from './../common';

class DataSource extends DataSourceBase {
    constructor() {
        super();
        this.LS_ITEM = 'GENRE';
        this.genres = this.initializeLocalStorageList(this.LS_ITEM, genresData, 20);
    }

    nextId() {
        return ++(this.lastId);
    }

    getById(id) {
        const genre = this.genres.find(genre => this.equalId(genre.id, id));
        if (genre) {
            return genre;
        } else {
            throw new NotFoundError("Genre not found");
        }
    }

    getByIds(ids) {
        return ids.map(id => this.getById(id));
    }

    deleteById(id) {
        const genreToDelete = this.getById(id);
        if (genreToDelete) {
            this.genres = this.removeIfLocalStorageList(this.LS_ITEM, g => this.equalId(g.id, id));
            return genreToDelete;
        } else {
            throw new NotFoundError("Genre not found");
        }
    }

    create(genre) {
        this.checkUnique(undefined, genre);
        const newId = this.nextSequenceId(this.LS_ITEM);
        const newGenre = {
            name: genre.name,
            id: newId,
        }
        this.genres = this.pushToLocalStorageList(this.LS_ITEM, newGenre);
        this.setSequenceId(this.LS_ITEM, newId);
        return newGenre;
    }

    updateById(id, genre) {
        const genreToUpdate = this.getById(id);
        const updatedGenre = { ...genreToUpdate, ...genre }
        if (!genreToUpdate) {
            throw new NotFoundError("Genre not found");
        }
        this.genres = this.mapLocalStorageList(this.LS_ITEM, genre => {
            if (this.equalId(genre.id, id)) {
                return updatedGenre;
            }
            return genre;
        });
        return updatedGenre;
    }

    checkUnique(id, book) {
        const elm = this.books.find(b =>
            (!id || !this.equalId(b.id, id)) &&
            b.name === book.name
        );

        if (elm) {
            throw new AlreadyExistsError('Genre already exists');
        }
    }

    search(filter) {
        const {
            page,
            size,
            sort,
        } = filter;

        const filtered = this.filterGenres(filter);
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

    filterGenres(filter) {
        return this.genres.filter(g => {
            return filter?.query || g.name.toLowerCase().includes(filter.query.toLowerCase());
        });
    }

}

const dataSource = new DataSource();

export default dataSource;
