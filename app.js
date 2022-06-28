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

app.get('/get/contest/in-day/:date',async function(req,res){
    let response=[];
    let platforms=['codeforces','codeforces_gym','top_coder','at_coder','code_chef','cs_academy','hacker_rank','hacker_earth','kick_start','leet_code'];
    for (let platform of platforms) {
        let contests=await getContestsOfFlatformInDay(platform,req.params.date);
        if(contests.length){
            response.push(contests);
        }
    }
    res.json({
        status:true,
        msg:'',
        response:response
    })
})

 function getContestsOfFlatformInDay(platform,date){
    return new Promise((resolve,reject)=>{
        let url = "https://kontests.net/api/v1/" + platform;
    axios.get(url).then((resp) => {
        let response = [];
        for (let obj of resp.data) {
            if (obj['start_time'].includes(date))
                response.push(obj);
        }
        resolve(response);
    })
    })
}

app.listen(3000, () => {
    console.log("server started");
})
