interface Array<T> {
    groupBy(key: string): Array<T>;
}

Array.prototype.groupBy = function(key: string): Array<any> {
    return this.reduce((collection: Array<any>, current) => {
        const value = current[key];

        collection[value] = (collection[value] || []);
        collection[value].push(current);

        return collection;
    }, {});
};