import storage from './../storage'

export class DataSourceBase {

    constructor() {
        this.localStorage = storage;
    }

    initializeLocalStorageList(item, list, sequenceId) {
        let localStorageList = this.getLocalStorageList(item);
        if (localStorageList.length === 0) {
            localStorageList = structuredClone(list);
            this.setLocalStorageList(item, localStorageList);
            this.setSequenceId(item, sequenceId);
        }
        return localStorageList;
    }

    equalId(id1, id2) {
        return parseInt(id1) === parseInt(id2);
    }

    mergeArrays(left, right) {
        const items = {};
        for (let value of left) {
            items[value.id] = value;
        }
        for (let value of right) {
            items[value.id] = value;
        }
        return Object.values(items);
    }

    listKey(item) {
        return `${item}-list`
    }

    sequenceIdKey(item) {
        return `${item}-sequence-id`;
    }

    getLocalStorageList(item) {
        let list = this.localStorage.getItem(this.listKey(item));
        if (list === undefined || list === null) {
            return [];
        } 
        return JSON.parse(list);
    }

    setLocalStorageList(item, list) {
        this.localStorage.setItem(this.listKey(item), JSON.stringify(list));   
    }

    pushToLocalStorageList(item, value) {
        let list = this.getLocalStorageList(item);
        list.push(value);
        this.localStorage.setItem(this.listKey(item), JSON.stringify(list));
        return list;
    }

    clearLocalStorageList(item) {
        this.localStorage.removeItem(this.listKey(item));
    }

    findInLocalStorageList(item, predicate) {
        return this.getLocalStorageList(item).find(predicate);
    }

    removeIfLocalStorageList(item, predicate) {
        let list = this.getLocalStorageList(item);
        list = list.filter(x => !predicate(x));
        this.localStorage.setItem(this.listKey(item), JSON.stringify(list));
        return list;
    }

    mapLocalStorageList(item, mapper) {
        let list = this.getLocalStorageList(item);
        list = list.map(mapper);
        console.log(list);
        this.localStorage.setItem(this.listKey(item), JSON.stringify(list));
        return list;
    }

    getSequenceId(item) {
        const key = this.sequenceIdKey(item);
        const id = this.localStorage.getItem(key);
        return !id ? 0 : parseInt(JSON.parse(id));
    }

    nextSequenceId(item) {
        return this.getSequenceId(item) + 1;
    }

    setSequenceId(item, value) {
        const key = this.sequenceIdKey(item);
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    applySort(arr, sort) {
        const parts = sort.split(/\s*,\s*/);
        const property = parts[0].trim();
        const direction = parts[1].trim().toLowerCase();
        arr.sort((l, r) => {
            return this.compare(
                l[property],
                r[property],
                typeof l[property],
                direction
            );
        });
    }

    compare(a, b, type, direction = 'asc') {
        const dir = direction === 'desc' ? -1 : 1;

        if (a == null) return 1 * dir;
        if (b == null) return -1 * dir;

        switch (type) {
            case 'number':
                return (a - b) * dir;

            case 'string':
                return a.localeCompare(b, undefined, { sensitivity: 'base' }) * dir;

            case 'date':
                return (new Date(a) - new Date(b)) * dir;

            case 'boolean':
                return (a === b ? 0 : a ? 1 : -1) * dir;

            default:
                return 0;
        }
    }
}

export class NotFoundError extends Error {
    constructor(message = 'Not found') {
        super(message);
        this.name = 'AlreadyExistsError';
    }
}

export class AlreadyExistsError extends Error {
    constructor(message = 'Already exists') {
        super(message);
        this.name = 'AlreadyExistsError';
    }
}
