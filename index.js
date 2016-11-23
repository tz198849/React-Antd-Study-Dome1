import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DatePicker, Menu, Icon,Input } from 'antd';

var A1 = React.createClass({
  getDefaultProps:function(){
    return {hname:"没有设置名字就显示这个默认的吧"};
  },
  render:function(){
    return <h1>{this.props.hname}</h1>;
  }
});

var A2 = React.createClass({
  render:function(){
    return <div style={{width:200}}><Input placeholder="1122112123" /></div>;
  }
});


/*
  ...this.props
  props提供的语法糖，可以将父组建中的全部属性都复制给子组建  需求：定义一个组建link，link组建中只有一个 a ，我们不设置属性，所有属性从父组建自动复制得到
*/
var Link = React.createClass({
  render:function(){
    return(
      <a {...this.props}>{this.props.text}</a>
    )
  }
});

/*
  this.props.children   children:表示组件的所有子节点 ， children 组件属性不跟组件的属性对应的，是一个例外。
  定义一个列表组件，列表项中显示的内容，以及列表项的数量都由外部决定
  总结：this.props 传的是属性的值  ，而  this.props.children传的是子节点
*/
var ListComponent = React.createClass({
  render:function(){
    return(
      <ul>
          {
            /*
              列表项目的数量和内容不确定，在创建模板调用时才能给出数据
              利用 this.props.children 从父{组件}获取需要展示的列表项内容

              获取到列表内容后，需要遍历children，逐项进行设置   使用 React.Children.map 方法
              返回值：数组对象，当前应该返回数组中的元素是 li
            */
            React.Children.map(this.props.children,function(child){
              // thild 是遍历得到的父 组件 的子节点
              return <li>{child}</li>
            })
          }
      </ul>
    );
  }
});


/*
  属性验证   propTypes  ，  组件类 的属性 ， 用于验证组件实例的属性是否符合要求
  propTypes: {
  title: React.PropTypes.string.isRequired,
  },
*/

/*
    事件处理 react中的事件名称，首字母小写，驼峰命名法  案例：定义一个组件 button ，给button添加 onClick事件
*/
var MyButton=React.createClass({
  handleClick:function(){
    alert('点击了');
  },
  render:function(){
    return (
      <button onClick={this.handleClick}>{this.props.ButtonValue}</button>
    )
  }
});

/*
  state 状态  （props 组件自身的属性） this.state来设置不同的状态
  需求：创建一个 CheckButton 组件，包含一个 checkbox类型的 <input>，让checkbox在选中和未选中时显示不同的文字。根据checked状态来判断。
*/
var CheckButton = React.createClass({
  //定义初始状态
  getInitialState:function(){
    return {
      // 在这个对象中 设置的属性，将会存储在 state 中 ， 现在设置默认的状态：未选中
      isCheck:false
    }
  },
  //定义事件绑定的方法
  handleChang:function(){
    //修改状态的值，通过 this.state 读取设置的状态值
    this.setState({
      isCheck:!this.state.isCheck
    });
  },
  render:function(){
    //根据不同的状态值，设置显示的文字。在JSX语法中，不能直接使用if，可以在外部调用函数使用，这里可以使用三目运算符
    var text = this.state.isCheck ? '已经选中' : '没有选中';
    return(
      <div><input type='checkbox' onChange={this.handleChang} />{text}</div>
    )
  }
});


/*
  同上：state来设置状态。需求：定义一个输入框组建，将用户输入的值进行实时显示在 输入框下面； 分析：组建与用户交互过程中，存在状态的变化，即输入框中的值。
  这里没有调试出来。不知道什么原因
*/
var ChInput = React.createClass({
  //定义一个初始状态值
  getInitialState: function(){
    return (
      value: "请输入"
    )
  },
  //通过 event.target 来获取当前输入的内容
  handleChange:function(event) {
    this.setState ({
      value: event.target.value
    });
  },
  render: function(){
    var value = this.state.value;
    return (
      <div>
        <input type='text' value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

/*
  生命周期介绍
  1、组件的生命周期分为三个状态：
  Mounting:组件挂载，已插入真实 DOM
  Updating：组件更新，正在被重新渲染
  Unmounting：组件移出，已移出真实 DOM
  2、组件的生命周期可分为四个阶段： 创建、实例化、更新、销毁

  一、Mounting/组件挂载相关：
  1、componentWillmount 组件将要挂载。在render之前执行，但仅执行一次，及时多次重复渲染该组件，或者改变了组件的state
  2、componentDidMount  组件已经挂载。在render之后执行，同一个组件重复渲染只执行一次

  二、Updating/组件更新相关：
  1、componentWillReceiveProps（object nextProps）  已加载组件收到信的props之前调用，注意组件初始化渲染时则不执行
  2、shouldComponentUpdate（object nextProps，object newxState）  组件判断是否重新渲染时调用。该接口实际是在组件接收到了新的 props 或者新的 state 的时候 会立即调用，然后通过
  3、componentWillUpdate（object nextProps，object nextState）  组件将要更新
  4、componentDidUpdate（object prevProps ， object prevState） 组件已经更新

  三、Unmounting/组件移除相关：
  1、componentWillUnmount  在组件要被移除之前的时间点触发，可以利用该方法来执行一些必要的清理组件将要移除

  四、生命周期中 与 props 和 state 相关：
  1、getDefaultProps  设置 props属性默认值
  2、getInitialState  设置state 属性初始值
*/

var Demo = React.createClass({
  //  一、创建阶段   流程： 只调用 getDefaultProps 方法
  getDefaultProps:function(){
    console.log("getDefaultProps");
    return {};
  },

  // 二、实例化 阶段   流程： 1、getInitialState  2、componentWillMount  3、render  4、componentDidMount
  getInitialState:function(){
    // 设置this.state 的默认值
    console.log("getInitialState");
    return null;
  },

  render:function(){
    //  渲染并返回一个虚拟 DOM
    console.log("render");
    return <div>Hello react</div>
  },

  componentDidMount:function(){
    //  在 render 之后调用 ，在该方法中，React会使 render 方法返回的虚拟DOM对象 创建真实的DOM 结构，可以在这个方法中读取DOM节点
    console.log("componentDidMount");
  },

  // 三、更新阶段  流程： 1、componentWillReceiveProps  2、shouldComponentUpdate（如果返回false，后三个方法不执行）  3、componentWillUpdate  4、render  5、componentDidUpdate
  componentWillReceiveProps:function(){
    console.log("componentWillReceiveProps");
  },

  shouldComponentUpdate:function(){
    console.log("shouldComponentUpdate");
    return true //是否需要更新
  },
  componentWillUpdate:function(){
    console.log("componentWillUpdate");
  },
  componentDidUpdate:function(){
    console.log("componentDidUpdate");
  },

  // 四、销毁阶段   流程 ： componentWillUnmount
  componentWillUnmount:function(){
    console.log("componentWillUnmount");
  }
});

  // 第一次 创建组件 并 加载组件
  ReactDOM.render(
    <Demo />,
    document.getElementById('root')
  );

  // 第二次 重新渲染更新
  ReactDOM.render(
    <Demo />,
    document.getElementById('root')
  );

  //  移除组件
  ReactDOM.unmountComponentAtNode(
    document.getElementById("root")
  );

var AppMenu = React.createClass({
  render:function(){
    return(
      <div>
        <A1 hname={this.props.a1name}/>
        <A2 />
        <Link href="http://www.baidu.com" text="中间的内容吧" />
        <MyButton ButtonValue='点我把' />
        <CheckButton />

      </div>
    );
  }
});


ReactDOM.render(
  <AppMenu a1name="如果没有设置上面有默认的名字"/>,
  /* 使用 children 子节点 好像只能调用到 DOM 中。。
  <ListComponent>
  <p>123</p>
  <p>123</p>
  <p>123</p>
  </ListComponent>,
  */
  document.getElementById('root')
  //document.body
);
