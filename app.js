const express = require('express');
const app = express();
const axios = require('axios');



app.get('/contest/:platform', async (req, res) => {
    let url = "https://kontests.net/api/v1/" + req.params.platform;
    axios.get(url).then((resp) => {
        res.json({
            status: true,
            msg: '',
            response: resp.data
        })
    }).catch((err) => {
        res.json({
            status: false,
            msg: 'error while fetching data',
            response: err
        });
    })
});
app.get('/contest/time/:platform', async (req, res) => {
    let url = "https://kontests.net/api/v1/" + req.params.platform;
    axios.get(url).then((resp) => {
        let response = [];
        for (let obj of resp.data) {
            console.log(obj)
            if (obj['in_24_hours'] != 'No')
                response.push(obj);
        }
        if (response.length == 0) {
            res.json({
                status: true,
                msg: "currently there are no contests available",
                response: []
            })
        }
        else {
            res.json({
                status: true,
                msg: '',
                response: response

            })
        }
    }).catch((err) => {
        res.json({
            status: false,
            msg: 'error while fetching data',
            response: err
        });
    })
});

app.get('/contest/running/:platform', async (req, res) => {
    let url = "https://kontests.net/api/v1/" + req.params.platform;
    axios.get(url).then((resp) => {
        let response = [];
        for (let obj of resp.data) {
            if (obj['status'] != 'BEFORE')
                response.push(obj);
        }
        if (response.length == 0) {
            res.json({
                status: true,
                msg: "currently there are no contests available",
                response: []
            })
        }
        else {
            res.json({
                status: true,
                msg: '',
                response: response

            })
        }
    }).catch((err) => {
        res.json({
            status: false,
            msg: 'error while fetching data',
            response: err
        });
    })
});
app.listen(3000, () => {
    console.log("server started");
})