let url = require("url")

module.exports = {
    getParams: (req) => {
        let q = url.parse(req.url, true);
        let pieces = q.pathname.split("/")
        let num = pieces.filter(piece => piece && Number(piece))[0]
        let params = {}
        params.id = num.toString()
        Object.assign(req.params, params)
        return req
    },
    getQuery: (req) => {
        let q = url.parse(req.url, true)
        Object.assign(req.query, q.query)
        return req
    },
    getBody: (req) => {
        let q = url.parse(req.url, true)
        Object.assign(req.body, q.query)
        return req
    }
}