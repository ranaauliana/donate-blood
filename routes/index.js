var express = require("express");
var router = express.Router();

const homeRouter = require("../controllers/homeController");
const requestRouter = require("../controllers/requestController");
const userRouter = require("../controllers/userController");

const { auth } = require("../middleware/auth");

// home
router.get("/", homeRouter.index);

// request
router.get("/permohonan", auth, requestRouter.viewCreate);
router.get("/permohonan/detail/:id", requestRouter.viewDetail);
router.get("/permohonan/pasien", requestRouter.viewAll);
router.get("/permohonan/posting", auth, requestRouter.viewPost);
router.get("/user/posting/:id", auth, requestRouter.viewEdit);
router.get("/profil", requestRouter.viewProfil);

router.put("/status/green/:id", auth, requestRouter.statusGreen);
router.put("/status/white/:id", auth, requestRouter.statusWhite);
router.put("/user/posting/edit/:id", auth, requestRouter.actionEdit);

router.post("/permohonan/create", auth, requestRouter.actionCreate);
router.delete("/posting/delete/:id", auth, requestRouter.actionDelete);

// user
router.get("/account/login", userRouter.viewLogin);
router.get("/account/register", userRouter.viewRegister);
router.get("/account/logout", userRouter.actLogout);

router.post("/account/register/create", userRouter.actionRegister);
router.post("/account/login", userRouter.actionLogin);

module.exports = router;
