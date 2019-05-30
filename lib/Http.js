const Middlewares = require('./Middlewares');

module.exports = class Http {
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

