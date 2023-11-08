"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// app.use('/api/v1/', routes);
var port = process.env.PORT || 3010;
var uriDb = process.env.DB_URL;
var server = http_1.default.createServer(app);
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect("".concat(uriDb))
    .then(function () {
    console.log('Database connected successfully');
    server.listen(port, function () {
        console.log("Server is running at port ".concat(port));
    });
})
    .catch(function (error) {
    console.log({ error: error });
    process.exit(1);
});
//# sourceMappingURL=index.js.map