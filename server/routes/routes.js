
const jsonfile = require('jsonfile');

exports.register = function(req,res){
    var today = new Date(),
        loginObj = {},
        driver = {
            "name":req.body.name,
            "email":req.body.email,
            "password":req.body.password,
            "mobile":req.body.mobile,
            "car": req.body.car,
            "created":today,
            "from":req.body.from,
            "to": req.body.to,
            "distance":10
        },
        driverFile = './data/drivers.json',
        loginFile = './data/userdata.json';
    loginObj[driver.email] = driver.password;

    jsonfile.readFile(driverFile,function (err, obj) {
        if(err){
            console.log("Error reading driver", err);
        }else{
            if(!Array.isArray(obj))
                obj=[];
            obj.push(driver)
            jsonfile.writeFile(driverFile, obj, function (err) {
                if (err) {
                    console.log("Error ocurred while saving driver", err);
                    res.send({
                        "code": 204,
                        "success": "Registration failed"
                    })
                } else {
                    jsonfile.readFile(loginFile,function (err, obj) {
                        if(err){
                            console.log("Error reading login", err);
                        }else{
                            if(!Array.isArray(obj))
                                obj=[];

                            obj.push(loginObj);
                            jsonfile.writeFile(loginFile, obj, function (err) {
                                if (err) {
                                    console.log("Error ocurred while saving driver", err);
                                } else {
                                    res.send({
                                        "code": 200,
                                        "success": "Registration sucessfull"
                                    })
                                }
                            });
                        }
                    });


                }
            });
        }
    });
};

exports.login = function(req,res){
    var email= req.body.email;
    var password = req.body.password;

    var file = './data/userdata.json';
    jsonfile.readFile(file,function (err, obj) {
        if(err){
            console.log("Error ocurred in reading db",err);
        }else{
            let loginArr = obj.map((user, i)=>{
                return Object.keys(user)[0] === email && user[email] === password;
            });

            if(loginArr.length){
                res.send({
                    "code":200,
                    "success":"login sucessfull"
                })
            }else{
                res.send({
                    "code":204,
                    "success":"login failed"
                })
            }

        }
    });

};

exports.drivers = function(req,res){
    var from= req.query.from?req.query.from.toLowerCase() : null,
        to = req.query.to?req.query.to.toLowerCase() : null,
        file = './data/drivers.json',
        returnArr;

    jsonfile.readFile(file,function (err, arr) {
        if(err){
            console.log("Error ocurred in reading db",err);
        }else{
            if(from || to){
                returnArr = arr.filter((driver)=>{
                    return (driver.to.toLowerCase().indexOf(to) === 0 || driver.from.toLowerCase().indexOf(from) === 0);
                });
            }else{
                returnArr = arr;
            }


            res.send({
                "code":200,
                "data":returnArr
            })
        }
    });

};