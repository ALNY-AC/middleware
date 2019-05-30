const MiddlewareNext = require('./MiddlewareNext')

module.exports = class Middlewares {
    constructor() {
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    async run(request) {
        const middlewareNext = new MiddlewareNext(this.middlewares);
        return await middlewareNext.next(request);
    }
}


