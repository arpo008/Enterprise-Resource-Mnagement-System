"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./API/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// app.use(bodyParser.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', userRoutes_1.default);
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=app.js.map