import React, { Component } from 'react';
import Dropdown from './Dropdown'

class Funds extends Component {
    constructor(props) {
        super(props);
        this.state = {
                id:0,
                fundName:'',
                fundStatusCode:'',
                fundTypeCode:'',
                fundPlatformCode:'',
                fundCurrencyCode:'',
                status:[
                    {
                        id:0,
                        title:"ACTIV",
                        selected:false,
                        key:'status'},{
                            id:1,
                            title:"CLOSE",
                            selected:false,
                            key:'status'},
                ],
              type : [
                    {
                    id:0,
                    title:"HEDGE",
                    selected:false,
                    key:'type'},
                    {
                        id:1,
                        title:"MATRX",
                        selected:false,
                        key:'type'
                    },
                    {
                        id:2,
                        title:"CLO",
                        selected:false,
                        key:'type'
                    }                    
                ],
                currency : [
                {
                id:0,
                title:"USD",
                selected:false,
                key:'currency'},
                {
                    id:1,
                    title:"EUR",
                    selected:false,
                    key:'currency'
                },
                {
                    id:2,
                    title:"GBP",
                    selected:false,
                    key:'currency'
                }                    
            ],
            platform :[
                {id:0,
                    title:"CLO",
                    selected:false,
                    key:'platform'},
                    {id:1,
                        title:"CDO",
                        selected:false,
                        key:'platform'},
                        {id:2,
                            title:"EFS",
                            selected:false,
                            key:'platform'},
                        {id:3,
                            title:"MHF",
                            selected:false,
                            key:'platform'}, 
                        {id:4,
                            title:"SMMF",
                            selected:false,
                            key:'platform'}]
        }
    }

    /*Dropdown Item Events */
    componentDidMount(){
        window.addEventListener('keydown',this.tabKeyPressed);
        window.addEventListener('mousedown',this.mouseClicked);
    }

    tabKeyPressed = (e) => {
        if (e.keyCode===9){
            document.querySelector('body').classList.remove('noFocus');
            window.removeEventListener('keydown',this.tabKeyPressed);
            window.addEventListener('mousedown',this.mouseClicked);
        }
    }
    toggleItem = (id,key) => {
        const temp=JSON.parse(JSON.stringify(this.state[key]));
        temp[id].selected=!temp[id].selected;
        this.setState({[key]:temp,});
    }

    mouseClicked = (e)  => {
        if(e.keyCode===9){
            document.querySelector('body').classList.add('noFocus');
            window.removeEventListener('mousedown',this.mouseClicked);
            window.addEventListener('keydown',this.tabKeyPressed);
        }
    }


    resetThenSet = (id,key) => {
      const temp = JSON.parse(JSON.stringify(this.state[key]));
        temp.forEach((item) => item.selected = false);
        temp[id].selected=true;
        console.log(key,id,temp[id].title);
        if (key==='currency')
        this.setState({fundCurrencyCode:temp[id].title});
      else if (key==='platform')
        this.setState({fundPlatformCode:temp[id].title});
      else if (key==='type')
        this.setState({fundTypeCode:temp[id].title});
      else if (key==='status')
        this.setState({fundStatusCode:temp[id].title});
        this.setState({ 
            [key]:temp
        });
    }

    handleUpdate=() => {  
        const {allFunds,updateFund} = this.props;

        var status= this.state.fundStatusCode===''?allFunds[this.id].fund_status_code:this.state.fundStatusCode; 
        var currency= this.state.fundCurrencyCode===''?allFunds[this.id].fund_base_currency_code:this.state.fundCurrencyCode;
        var platform =  this.state.fundPlatformCode===''?allFunds[this.id].fund_platform_code:this.state.fundPlatformCode;
        var type =  this.state.fundTypeCode===''?allFunds[this.id].fund_type_code:this.state.fundTypeCode;
        updateFund(this.id,this.fund_name.value,status,type,platform,currency);
    }

    render() {
        const {allFunds,pressEditBtn} = this.props;
        const fundsList=allFunds.map((fund,index)=> {
              return fund.isEditing===true? (
                <tr key={index}>
                    <td><input type="text" className="dd-list-item"
                            ref = {(val)=> {this.fund_name = val}}
                            required defaultValue = {fund.fund_name}/> </td>
                        <td> 
                        <Dropdown  
                            title ={fund.fund_base_currency_code!==null?fund.fund_base_currency_code:'currency'}
                            list = {this.state.currency}
                            resetThenSet = {this.resetThenSet}/>                                                                                     
                        </td>                          
                        <td> 
                        <Dropdown  
                             title ={fund.fund_platform_code!==null?fund.fund_platform_code:'platform'}
                             list = {this.state.platform}
                             resetThenSet = {this.resetThenSet}/>                                           
                        </td>  
                        <td>
                        <Dropdown  
                            title ={fund.fund_type_code}
                            list = {this.state.type}
                            resetThenSet = {this.resetThenSet}/>                                                                                  
                        </td>  
                        <td>
                        <Dropdown  
                            title ={fund.fund_status_code}
                            list = {this.state.status}
                            resetThenSet = {this.resetThenSet}/>                                                                                  
                        </td>  
                        <td>
                            <input type="button" value="Update"
                                onClick= {this.handleUpdate}
                                ref={()=>{this.id = index}}
                                className ="btn btn-outline-secondary btn-sm"/>
                        </td>
                   </tr>
            ):(
                <tr key={index}>
                    <td>{fund.fund_name}</td>
                    <td>{fund.fund_base_currency_code}</td>
                    <td>{fund.fund_platform_code}</td>
                    <td>{fund.fund_type_code}</td>
                    <td>{fund.fund_status_code}</td>
                    <td><button className="btn white black-text"
                            onClick={()=> pressEditBtn(index)}>Edit</button>
                    </td>
                </tr>
            )
        });
        return (
            <div className="table-responsive-sm">
            <table className="table table-active table-hover striped table-sm">
                <thead className="thead-secondary" >
                    <tr>
                        <th>Fund Name</th>
                        <th>Fund Currency </th>
                        <th>Fund Platform</th>
                        <th>Fund Type</th>
                        <th>Fund Status </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fundsList}
                </tbody>
            </table>
            </div>
        );
    }
}

export default Funds;