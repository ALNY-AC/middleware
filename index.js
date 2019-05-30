const Http = require('./lib/Http')

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
