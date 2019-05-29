
class MiddlewaresNext {
    constructor(middlewares) {
        this.index = -1;
        this.middlewares = middlewares;
    }
    async next(request) {
        this.index++;
        if (this.index >= this.middlewares.length) {
            return request;
        } else {
            return this.middlewares[this.index](request, (_request) => this.next(_request));
        }
    }
}


class Middlewares {
    constructor() {
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    async run(request) {
        const middlewaresNext = new MiddlewaresNext(this.middlewares);
        return await middlewaresNext.next(request);
    }
}



class Http {
    constructor() {
        this.middlewares = new Middlewares();
    }
    use(middleware) {
        this.middlewares.use(middleware);
    }
    async post(url, data) {

        this.middlewares.use((request) => {
            return new Promise((resolve, reject) => {
                // url data ajax请求模拟
                // const res = await axios.post(url, request);

                console.warn(request);

                const res = {
                    data: {
                        res: 1,
                        data: [],
                        msg: '',
                    }
                }
                setTimeout(() => {
                    resolve(res);
                }, 1000);
            });
        });

        const response = await this.middlewares.run(data);
        return response;
    }
}




async function main() {

    const http = new Http();

    http.use(async (request, next) => {
        request.appid = 'admin';
        let response = await next(request);
        return response;
    });

    http.use(async (request, next) => {
        request.jwt = 'w7e98f64s5d3124war6s5fd';
        let response = await next(request);
        return response;
    });

    const res = await http.post('book/list', { page: 1 });

    console.warn(res);

}

main();
