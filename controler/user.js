const User = require('../modals/users');
const { v4: uuidv4 } = require("uuid")
const { setuser } = require("../Service/auth")

async function handelusersignup(req, res) {
    const { name, email, password } = req.body;
    await User.create(
        {
            name, email, password
        });
    return res.redirect("/");
}
async function handeluserlogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne(
        {
            email, password
        });
    if (!user) {
        return res.render("login", {
            error: "INVALID USERNAME AND PASSWORD"
        })
    }
    else {
        const sessionId = uuidv4()
        setuser(sessionId, user);
        res.cookie("uid", sessionId);
        return res.redirect("/");
    }
}



module.exports = { handelusersignup, handeluserlogin };