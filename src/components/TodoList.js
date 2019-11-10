import React from 'react';
import { Icon,Checkbox,Typography,Row,Col,Layout,Badge } from 'antd';
class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:"TodoList",
            value:'',
            list:[],
            doneList:[]
        }
    }
   
    setValue=(e)=>{
        // 获取输入框的值，并将值放入state的value中
        this.setState({
            value:e.target.value
        })
        if(e.keyCode == 13){
            // 将输入框的值放入state的list中，并将input框清空
            var tempList = this.state.list;
            tempList.push(this.state.value);
            this.setState({
                list:tempList
            })
            e.target.value = "";
        }
        localStorage.setItem("todolist",JSON.stringify(tempList))
    }
  
    // 删除待办事项指定内容
    delList=(key)=>{
        var tempList = this.state.list;
        tempList.splice(key,1)
        this.setState({
            list:tempList
        })
        localStorage.setItem("todolist",JSON.stringify(tempList))

    }
    active=(e)=>{
        var li = e.target.parentNode.parentNode.childNodes;
        // 将所有input边框清除
        li.forEach((value)=>{
            value.childNodes[1].style.border = "none";
            value.childNodes[1].style.outline = "none";
        })
        // 为当前input设置边框
        e.target.style.border = "1px solid #ccc";
        e.target.style.outline = "#ccc";
    }
  
    toDone=(key,e)=>{
        // 将点击的事件放到已完成事项
        var tempList = this.state.doneList;
        tempList.push(this.state.list[key]);
        this.setState({
            doneList:tempList
        })
        // 在待办事项中删除点击的事项
        e.target.value = this.state.list[key+1]

        this.delList(key);
        localStorage.setItem("donelist",JSON.stringify(this.state.doneList))
    }
    //删除已完成事项的指定内容
    delDoneList=(key)=>{
        var tempList = this.state.doneList;
        tempList.splice(key,1)
        this.setState({
            doneList:tempList
        })
        localStorage.setItem("donelist",JSON.stringify(this.state.doneList))
    }

    toDo=(key)=>{
        // 将点击的事件放到待办事项
        this.state.list.push(this.state.doneList[key]);
        // 在已完成事项中删除点击的事项
        this.delDoneList(key);
        localStorage.setItem("todolist",JSON.stringify(this.state.list))
    }

    componentDidMount(){
        var todolist = JSON.parse(localStorage.getItem("todolist"));
        var donelist = JSON.parse(localStorage.getItem("donelist"));
        if(donelist != null){
            this.setState({
                doneList:donelist 
            })
        }
        if(todolist != null){
            this.setState({
                list:todolist,
            })
        }
    }
    changeValue=(key,str,e)=>{
        var tempList;
        if(str === "todo"){
            tempList = this.state.list;
            tempList[key] = e.target.value;
            this.setState({
                todolist:tempList
            })
        }
        else{
            tempList = this.state.doneList;
            tempList[key] = e.target.value;
            this.setState({
                doneList:tempList
            })
        }
    }

    render(){
        const {Text} = Typography;
        const {Header, Content} = Layout;
        return (
        <div className="todoList">
             <Layout className="layout">
                <Header>
                    <Text type="warning">TodoList</Text>
                    <input onKeyUp={this.setValue}/>
                </Header>
                <Content>
                <Row  type="flex" justify="space-around">
                    <Col className="description">
                        <h3>待办事项</h3>
                        <a href="#">
                            <Badge count={this.state.list.length} >
                            <span className="head-example" />
                            </Badge>
                        </a>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col >
                <ul>
                {
                this.state.list.map((value,key)=>{
                    return (<li key={key}>
                                <Checkbox onChange={this.toDone.bind(this,key)} checked={false}/>
                                <input value={value} onClick={this.active} onChange={this.changeValue.bind(this,key,"todo")}/>
                                <Icon className="icons" type="close-circle"  onClick={this.delList.bind(this,key)}/>
                            </li>)
                })
                }
                </ul>
                </Col>
                </Row>
                <Row  type="flex" justify="space-around">
                <Col className="description">
                    <h3>已完成事项</h3>
                    <a href="#">
                        <Badge count={this.state.doneList.length} style={{ backgroundColor: '#52c41a' }}>
                        <span className="head-example" />
                        </Badge>
                    </a>
                </Col>
                </Row>
                <ul>
                {
                this.state.doneList.map((value,key)=>{
                    return ( <li key={key} className="doneLi">
                                <Checkbox checked={true}  onChange={this.toDo.bind(this,key)} style={{color: '#52c41a'}}/>
                                <input value={value}  onClick={this.active}  onChange={this.changeValue.bind(this,key,"done")}/>
                                <Icon className="icons" type="close-circle" onClick={this.delDoneList.bind(this,key)} />
                            </li> )
                })
                }
                </ul>
                </Content>
            </Layout>
        </div>
        )
    }
}
export default TodoList;
