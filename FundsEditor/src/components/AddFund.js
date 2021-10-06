import React, { Component } from 'react';
import Dropdown from './Dropdown'

class AddFund extends Component {
    state = {
        fundName :'',
        fundStatusCode:'',
        fundTypeCode:'',
        fundPlatformCode:'',
        fundCurrencyCode:'',
        isEditing:false,
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
    compoenentDidMount(){
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
  
      handleSubmit = (e) => {
          e.preventDefault();
          console.log("on handlesubmit");
          console.log(this.props);
          this.props.addFund(this.state);
        e.target.reset();
      }

      updateState = (e)=>{
         this.setState({[e.target.name]:e.target.value});
      }

    render() {
        return (
                <form onSubmit ={this.handleSubmit}>  
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
                     <tr>
                        <td>
                             <input type="text" 
                                   className="dd-list-item"
                                   name="fundName" 
                                   value={this.state.fundName}
                                   onChange={this.updateState}/>
                        </td><td>
                            <Dropdown title ="currency"
                                      list = {this.state.currency}
                                      resetThenSet = {this.resetThenSet}/>  
                        </td><td>
                            <Dropdown title ="platform"
                                      list = {this.state.platform}
                                      resetThenSet = {this.resetThenSet}/> 
                        </td><td>
                            <Dropdown title ="type"
                                      list = {this.state.type}
                                      resetThenSet = {this.resetThenSet}/> 
                        </td><td>
                            <Dropdown title ="status"
                                      list = {this.state.status}
                                      resetThenSet = {this.resetThenSet}/>
                        </td><td>
                            <input type="submit"
                                    value="Add +"
                                    className="btn btn-outline-primary btn-sm"/>
                        </td></tr> 
                </tbody>
            </table>      
        </form>
       );
    }
}

export default AddFund;