var express = require('express');
var cors = require('cors');

const bodyParser=require('body-parser');
var app=express();
const port = process.emitWarning.PORT || 5000;

var config = {
    user: 'appuser',
    password: 'zais4ppd3v',
    server: 'sql-dev', 
    database: 'renaissance' 
};

var sql=require("mssql");

app.use(cors({origin:'*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/* Get All Funds */
app.get('/fundApi/funds', function(req,res){
    sql.connect(config).then(() => {
        return sql.query("use Renaissance; select * from trades.funds;");
    }).then(result => {
        res.send(result.recordset);
    }).catch(err=> {
        res.status(500).send("something went wrong!!!");
    })
});

/* Get active funds */
app.get('/fundApi/activeFunds', function(req,res){
    sql.connect(config).then(() => {
        return sql.query("use Renaissance; select * from trades.funds where fund_status_code='ACTIV';");
    }).then(result => {
        res.send(result.recordset);
    }).catch(err=> {
        res.status(500).send("something went wrong!!!");
    })
});

/* Get Closed funds */
app.get('/fundApi/closedFunds', function(req,res){
    sql.connect(config).then(() => {
        return sql.query("use Renaissance; select * from trades.funds where fund_status_code='CLOSE';");
    }).then(result => {
        res.send(result.recordset);
    }).catch(err=> {
        res.status(500).send("something went wrong!!!");
    })
});

/*get Fund  by Id*/
app.get('/fundApi/funds/:ID',function(req,res){
    sql.connect(config).then(() => {
        return sql.query("use Renaissance; select * from trades.funds where fund_Id=" +
         req.params.ID);
    }).then(result=> {
        res.send(result.recordset);
        // res.status(200).send('Funds Retrieved successfully');
    }).catch(err => {
        res.status(500).send("something went wrong!!!");
    })
}); 

/* Edit Fund */
app.get ('/fundApi/editFund/:Id',function(req,res){
    sql.connect(config).then(() => {
        return sql.query("use Renaissance; select * from trades.funds where Fund_Id=" +
         req.params.ID);
    }).then(result => {
        res.send(result.recordset);
    }).catch(err => {
        res.status(500).send("something went wrong!!!");
    });
 });

/* Add Fund*/

app.post('/fundApi/addFund',function(req,res) {
	console.log(req.body);
	req.removeAllListeners('data');
	req.removeAllListeners('end');

	process.nextTick(function(){
		if(req.body){
			req.emit('data',JSON.stringify(req.body));}
			req.emit('end');
			     });
    sql.connect(config).then(() => {
        return sql.query("use Renaissance; Insert into trades.Funds(add_user,Fund_Name,fund_display_name,fund_base_currency_code,fund_platform_Code,fund_type_code,fund_status_code)" +
			 " values ('fundApp','" + req.body.FundName + "','"+req.body.FundName + "'," +
			 "'" + req.body.Currency + "','" + req.body.FundPlatformCode + "'," +
			 "'" + req.body.FundTypeCode + "','" + req.body.FundStatusCode + "');" +
			 " select * from trades.funds where fund_status_code='ACTIV'");
    }).then(result => {
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(500).send("something went wrong!!!");
    });
});


/* Update Fund Procedure */
app.post('/fundApi/updateFundProc', function(req,res){
	var body = req.body;
	var fundId = req.body.fundId;
    	var fundName = req.body.fundName;
    	var fundPlatformCode = req.body.fundPlatformCode;
    	var fundTypeCode = req.body.fundTypeCode;
        var fundStatusCode = req.body.fundStatusCode;
	var fundCurrencyCode=req.body.fundCurrencyCode;
	 console.log(body);

	sql.connect(config).then(() => {
        return sql.query("use ZaisOperation; exec  [dbo].UpdateFundDetails @fund_Id=" + fundId + 
                                            ", @fund_name ='" + fundName + "'" +
                                            ", @fund_platform_code ='" + fundPlatformCode + "'" +
					    ", @fund_type_code ='" + fundTypeCode + "'" +
				 	    ", @fund_status_code ='" + fundStatusCode + "'" +
                                            ", @fund_currency_code ='" + fundCurrencyCode + "'; use Renaissance;" +
					    " select * from trades.funds where fund_status_code='ACTIV';");
    }).then(result => {
        res.status(200).send(result.recordset);
    }).catch(err => {
        res.status(500).send("something went wrong!!!");
    }); 
});
 
/* Update Fund Post*/
app.post('/fundApi/updateFund/:ID', function(req,res){
	var body =req.body;
	var fundId = req.body.ID;
    	var fundName = req.body.FundName;
    	var fundPlatformCode = req.body.FundPlatformCode;
    	var fundTypeCode = req.body.FundTypeCode;
   	var fundStatusCode = req.body.FundStatusCode;
	var fundCurrencyCode=req.body.FundCurrencyCode;

	console.log(req.body);

    sql.connect(config).then(() => {
        return sql.query("Update trades.Funds set Fund_Name ='" + fundName + "'," +
                                      "fund_base_currency_code ='" + fundCurrencyCode + "'," +
                                      "fund_platform_Code ='" + fundPlatformCode + "'," +
				      "fund_type_code ='" +  fundTypeCode + "'," +
                                      "fund_status_code ='" + fundStatusCode + "'" +				      
			 	      "WHERE fund_Id=" + fundId + ");");
    }).then(result => {
        res.status(200).send("Fund updated successfully");
    }).catch(err => {
        res.status(500).send("something went wrong!!!");
    })
});




var server= app.listen(port,()=> console.log(`Listening on port ${port}`));
