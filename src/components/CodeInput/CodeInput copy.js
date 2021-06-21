import React, { Component } from "react";
import { textSelect, removeDefaultBehavior, isFunction } from "./utils";
import "../../static/css/code_input.css";

class CodeInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: new Array(props.length).fill(""),
			dom: new Array(props.length)
		};
	}

	onChange=(e, i)=> {
		const value = e.target.value.trim();
		//如果定义了过滤器
		if (isFunction(this.props.validator)) {
			if (value !== "" && !this.props.validator(value, i)) {
				textSelect(e.target);
				return;
			}
		}
		
		const newCode = this.state.code.map(v => v);
		newCode[i] = value;
		this.setState({ code: newCode });
		textSelect(e.target);
		if (value !== "") {
			//不是最后一格才跳转下一格
			if(i!==this.props.length-1)
				this.focusOn(i + 1);
		}
		if (isFunction(this.props.onChange)) {
			// if (newCode.every(v => v !== "")) {
			// 	e.target.blur();
			// }
			//拼接成字符串后回调
			this.props.onChange(newCode.join(''));
		}
	}
	getPrevBox(i) {
		return this.state.dom[i - 1];
	}
	getNextBox(i) {
		return this.state.dom[i + 1];
	}
	focusOn(i) {
		const element = this.state.dom[i];
		if (element) {
			element.focus();
		}
	}
	onKeyDown(e, i) {
		const BACK_SPACE = 8;
		const inputElement = e.target;
		switch (e.keyCode) {
			case BACK_SPACE:
				removeDefaultBehavior(e);
				//如果选中格有内容，那么应该仅删除当前内容
				if(this.state.code[i]!=='')
				{
					//直接删除
					this.setState((prevState) => {
						const nextState = prevState;
						nextState.code[i] = '';
						return nextState;
					});
				}
				//如果没有内容，那么应该光标后退并删除上一个的内容
				else {
					//如果是第1格（下标0），那么既然走到这里了说明没有内容，就直接返回
					if (i === 0) break;
					//后退
					this.focusOn(i - 1);
					//删除
					this.setState((prevState) => {
						const nextState = prevState;
						nextState.code[i - 1] = "";
						return nextState;
					});
				}
				break;
			case 37: // 左
			case 38: // 上
				removeDefaultBehavior(e);
				if (this.getPrevBox(i)) {
					this.focusOn(i - 1);
				} else {
					this.focusOn(i);
				}
				break;
			case 39: // 右
			case 40: // 下
				removeDefaultBehavior(e);
				if (this.getNextBox(i)) {
					this.focusOn(i + 1);
				} else {
					this.focusOn(i);
				}
				break;
			default:
				// 不管你输入什么都会聚焦文本
				textSelect(inputElement);
		}
	}
	componentDidCatch(error, info) {
		console.error(error);
	}
	render() {
		const codeBox = [];
		//this.state.dom = [];
		const inputType = this.props.type || "input";
		for (let i = 0; i < this.props.length; i++) {
			codeBox.push(
				<div key={i} className="codebox-field-wrap" style={{userSelect:'none'}}>
					<input
						type={inputType}
						maxLength="1"
						autoComplete="false"
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="false"
						value={this.state.code[i]}
						ref={dom =>{
							//这里不用setState，因为用了会报错还不知道怎么解决
							this.state.dom[i] = dom
						}}
						onFocus={e => textSelect(e.target)}
						onClick={e => {
							removeDefaultBehavior(e);
							//移动光标到这一格之前第一个空白格
							for(let j=i;this.state.code[j]==='';j--)
								textSelect(this.state.dom[j]);
						}}
						onChange={e => this.onChange(e, i)}
						onKeyDown={e => this.onKeyDown(e, i)}
					/>
				</div>
			);
		}
		return (
			<div className="codebox-container">
				<form>{codeBox}</form>
			</div>
		);
	}
}

export default CodeInput;
