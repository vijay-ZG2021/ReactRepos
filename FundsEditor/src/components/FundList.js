import React, { Component } from 'react';
import Funds from './Funds'
import AddFund from './AddFund'

class FundList extends Component {
    constructor(props) {
        super(props);
        this.state={
            funds:[]
        }
    }

    toggleFundStatus(id){
        if (id===this.props.funds[id-1].fund_id)
        return  !this.props.funds[id-1].fund_status_code
    }

    componentDidMount(){
        fetch("http://localhost:5000/fundApi/activeFunds")
        .then((res)=> {return res.json();})
        .then((data)=>{this.setState({funds:data});
        })
        .catch((err)=> {console.log(err)});
    }

    pressEditBtn = (id) => {
        let funds = this.state.funds;
        funds[id].isEditing= true;
        console.log(funds[id].fund_platform_code,funds[id].fund_type_code);
       this.setState({funds});
    }

    updateFund = (id,fundName,status,type,platform,currency) => {
        let funds=this.state.funds;
       
        funds[id].fund_name=fundName;
        funds[id].fund_base_currency_code = currency;
        funds[id].fund_status_code = status;
        funds[id].fund_type_code=type;
        funds[id].fund_platform_code=platform;
        funds[id].isEditing=false;
        this.setState({funds});
        // const apiUrl = `http://localhost:5000/fundApi/updateFundProc/${funds[id].fund_id}`;
          
        const apiUrl = "http://localhost:5000/fundApi/updateFundProc";

          const options = {
            method:'POST',
            body : JSON.stringify({
                fundId : funds[id].fund_id,
                fundName : fundName,
                fundTypeCode:type,
                fundStatusCode: status,
                fundPlatformCode : platform,
                fundCurrencyCode:currency
            }),
            headers:{"Content-type":"application/json; charset=UTF-8"}}
            fetch(apiUrl,options)
                .then(res=>res.text)
                .then((result)=>{console.log(result);
                        this.setState({response:result,
                        funds : funds.filter(fund=>fund.fundId !== funds[id].fundId)
                    });
                },(err) => {
                    console.log(err);
                    }
                )
            }
    addFund = (newFund) => {
        let funds = [...this.state.funds,newFund];
        this.setState({funds});
        const apiUrl = `http://localhost:5000/fundApi/addFund`;
        const options = {
            method:'POST',
            body: JSON.stringify({
                FundName: newFund.fundName,
                Currency : newFund.fundCurrencyCode,
                FundPlatformCode  : newFund.fundPlatformCode,
                FundTypeCode : newFund.fundTypeCode,
                FundStatusCode:newFund.fundStatusCode    
             }),
             headers: {"Content-type" : "application/json;charset=UTF-8"}}

             fetch(apiUrl,options)
                .then(res=> res.text)
                .then((res) => {this.setState({response:res,
                    funds:funds
                });
                },(err) => {
                    console.log(err);});
                    //this.setState({error:err})
    }
    
    render() {
        const {funds} = this.state;
        return (
            <div className="container">
                <h4>Funds</h4>
                <AddFund addFund={this.addFund}/>
                <Funds allFunds ={funds}
                        pressEditBtn={this.pressEditBtn}
                        updateFund = {this.updateFund}/>
                     </div>
        );
    }
}

export default FundList;