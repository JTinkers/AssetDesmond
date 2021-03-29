interface Array<T> {
    groupBy(key: string): Array<T>;
    remove(object: any): Array<T>;
}

Array.prototype.groupBy = function(key: string): Array<any> {
    return this.reduce((collection: Array<any>, current) => {
        const value = current[key];

        collection[value] = (collection[value] || []);
        collection[value].push(current);

        return collection;
    }, {});
};

Array.prototype.remove = function(object: any): Array<any> {
    const index = this.indexOf(object);

    if(index != -1)
        delete this[index];

    return this.filter(x => x !== null);
};