// const DBResult = {
//     Error: (message) => {
//         this.message = message;
//         return this;
//     },
//     Data: (data) => {
//         this.data = data;
//         return this;
//     }
// }

class DatabaseResult {
    constructor(data = null, message = null) {
        this.data = data;
        this.message = message;
    }
}

class ResourceRead extends DatabaseResult {
    constructor(data) {
        super(data);
    }
}

class ResourceReadEmpty extends ResourceRead {
    constructor(data = null) {
        super(data);
    }
}

class ResourceReadData extends ResourceRead {
}

class ResourceCreated extends DatabaseResult {
}

class ResourceDeleted extends DatabaseResult {
}

class ResourceUpdated extends DatabaseResult {
}

class DatabaseError extends DatabaseResult {
    constructor(message, data = null) {
        super(data, message);
    }
}

module.exports = {
    DatabaseResult,
    DatabaseError,
    ResourceReadEmpty,
    ResourceReadData,
    ResourceRead,
    ResourceCreated,
    ResourceUpdated,
    ResourceDeleted,
}