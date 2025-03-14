var express = require("express")
var router =  express.Router()
var crypto = require("crypto")
const axios = require('axios');
const https = require('https')

// process.env.NODE_NO_WARNINGS = '1';
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Bỏ qua chứng chỉ không hợp lệ
});

router.get('/bizfly/laydata', async (req, res) => {
    var headers = {
        "cb-access-key": 'eVk3JWXe77804edb4d10eabf58475575890f54792GDc0bQl',
        "cb-access-timestamp": Date.now(),
        "cb-project-token": '882c9d61-b44e-4a37-9304-bc6c58fea07d',
        "cb-access-sign": "",
        
    }
    let _stringBuildToken = headers['cb-access-timestamp'] + headers['cb-project-token'];
    headers['cb-access-sign'] = crypto
        .createHmac('sha512', "c1193ebe353479275f3c136a585cb0ef98ca348f")
        .update(_stringBuildToken)
        .digest('hex')

    let uri = "https://api.bizfly.vn/crm/_api/base-table/find"
    var data = {
        table: "data_price_quote",
        select: [],
        output: "default",
        limit: 500,
        skip: 1

    }
    // JSON.stringify({"table":"data_customer","limit":10,"skip":0,"select":["name","created_at"],"output":"by-key"});
    
    // let resdata = await axios.post(uri, data , {headers: headers})
    let resdata = await axios.get(uri, { 
        headers: headers ,
        data: data
    })
    // console.log(headers)
    // console.log(data)
    
    // let len = resdata.l()
    // console.log(len)
    res.send(resdata.data)
})

module.exports = router