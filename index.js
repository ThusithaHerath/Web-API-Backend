const express = require('express')
const app = express()
const dotenv = require('dotenv')
const AuthRouter = require("./routes/user.routes");
const CruiseRouter = require("./routes/cruise.routes");
const PackageRouter = require("./routes/package.routes");
const ActivityRouter = require("./routes/activity.routes");
const ListRouter = require("./routes/list.routes");
const CartRouter = require("./routes/cart.routes");

dotenv.config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type');
    res.header('Content-Type', 'application/json');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

AuthRouter.routesConfig(app);
CruiseRouter.routesConfig(app);
ActivityRouter.routesConfig(app);
PackageRouter.routesConfig(app);
ListRouter.routesConfig(app);
CartRouter.routesConfig(app);

app.listen(process.env.PORT, () => console.log(`App is listening port ${process.env.PORT}`))
