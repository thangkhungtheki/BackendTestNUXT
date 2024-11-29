var express = require("express")
var router =  express.Router()
var crypto = require("crypto")
const axios = require('axios');

process.env.NODE_NO_WARNINGS = '1';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


router.get('/bizfly/laydata', async (req, res) => {
    var headers = {
        "cb-access-key": 'ae2j7Afu668a62989aefb959481c0d2596a15ca81vb9bHSH',
        "cb-access-timestamp": Date.now(),
        "cb-project-token": 'c393aed1-feca-4a37-a7ee-62680acabfcc',
        "cb-access-sign": "",
        
    }
    let _stringBuildToken = headers['cb-access-timestamp'] + headers['cb-project-token'];
    headers['cb-access-sign'] = crypto
        .createHmac('sha512', "bc470aa83a2d41a9717026f5e0e4d3fdb55b18a3")
        .update(_stringBuildToken)
        .digest('hex')

    let uri = "https://api.bizfly.vn/crm/_api/base-table/find"
    var data = {
        table: "data_customer",
        select: ["name","created_at"],
        output: "by-key"
    }
    JSON.stringify({"table":"data_customer","limit":10,"skip":0,"select":["name","created_at"],"output":"by-key"});
    let resdata = await axios.get(uri, { 
        headers: headers ,
        data: data
    })
    // console.log(headers)
    // console.log(data)
    
    res.send(resdata.data)
})

module.exports = router