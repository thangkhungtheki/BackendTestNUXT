const express = require("express") 
const router =  express.Router()

const passport = require ("../passport/passport")
const jwt = require('jsonwebtoken')
const secret = "taolathangkhungtheki"

router.get('/', (req, res)=> {
    
    return res.status(200).send('hello guy')
})

router.post('/jwt', passport.authenticate('local.signin'), login)

router.get('/testauthen', authenticateToken , (req, res) => {
    return res.send('Đã đang nhập với token JWT')
})

function login(req, res) {
    // Tạo JWT với uid của user
    const userId = req.user.username;
    const expiresInMinute = 1 * 60
    const token = jwt.sign({ username: userId }, secret,{expiresIn: expiresInMinute})

    // Trả về cho client
    res.send({
        user: req.user,
        token
    });
}

function authenticateToken(req, res, next) {
    // Lấy header 'Authorization' từ request
    const authHeader = req.headers['authorization'];
    // Kiểm tra xem header 'Authorization' có tồn tại và có đúng định dạng 'Bearer <token>' không
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        // Nếu không tồn tại token, trả về lỗi 401 (Unauthorized)
        return res.sendStatus(401);
    }

    // Xác thực token bằng cách sử dụng jwt.verify
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            // Nếu xác thực không thành công, trả về lỗi 403 (Forbidden)
            return res.sendStatus(403);
        }
        // Nếu xác thực thành công, gán thông tin người dùng từ token vào request
        req.user = user;
        next(); // Tiếp tục tiến trình xử lý request
    });
}

module.exports = router