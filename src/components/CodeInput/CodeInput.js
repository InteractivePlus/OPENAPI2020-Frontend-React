/**
 * @file 多位输入框
 * @version v1.0
 * React Hooks版本，原版本为CodeInput copy.js
 */
import React from "react";
import { textSelect, removeDefaultBehavior, isFunction } from "./utils";
import "../../static/css/code_input.css";

const CodeInput = (props) => {
	//从props中引入状态和方法
	//需要的参数有长度、输入框类型（是否为密码框）和过滤器
	const {
		enable,
		length,
		type,
		validator
	} = props;

	//具体输入的值
	let [code, setCode] = React.useState(new Array(length).fill(""));
	//每个输入框的dom引用列表
	let [dom, ] = React.useState(new Array(length));
	

	//hook版forceupdate实现
	//使用：forceUpdate();
	const [,updateState]=React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	

	let onChange=(e, i)=> {
		const value = e.target.value.trim();
		//如果定义了过滤器
		if (isFunction(validator)) {
			if (value !== "" && !validator(value, i)) {
				textSelect(e.target);
				return;
			}
		}
		//将新的值插入进去
		const newCode = code.map(v => v);
		newCode[i] = value;
		setCode(newCode);

		textSelect(e.target);
		if (value !== "") {
			//不是最后一格才跳转下一格
			if(i!==length-1)
				focusOn(i + 1);
		}
		if (isFunction(props.onChange)) {
			// if (newCode.every(v => v !== "")) {
			// 	e.target.blur();
			// }
			//拼接成字符串后回调
			props.onChange(newCode.join(''));
		}
	}
	let getPrevBox=(i)=> {
		return dom[i - 1]
	}
	let getNextBox=(i)=>{
		return dom[i + 1]
	}
	let focusOn=(i)=>{
		const element = dom[i];
		if (element) {
			element.focus();
		}
	}
	let onKeyDown=(e, i)=> {
		const BACK_SPACE = 8;
		const inputElement = e.target;
		switch (e.keyCode) {
			case BACK_SPACE:
				removeDefaultBehavior(e);
				//如果选中格有内容，那么应该仅删除当前内容
				if(code[i]!=='')
				{
					//直接删除
					code[i] = '';
					setCode(code);
				}
				//如果没有内容，那么应该光标后退并删除上一个的内容
				else {
					//如果是第1格（下标0），那么既然走到这里了说明没有内容，就直接返回
					if (i === 0) break;
					//后退
					focusOn(i - 1);
					//删除
					code[i-1] = '';
					setCode(code);
				}
				break;
			case 37: // 左
			case 38: // 上
				removeDefaultBehavior(e);
				if (getPrevBox(i)) {
					focusOn(i - 1);
				} else {
					focusOn(i);
				}
				break;
			case 39: // 右
			case 40: // 下
				removeDefaultBehavior(e);
				if (getNextBox(i)) {
					focusOn(i + 1);
				} else {
					focusOn(i);
				}
				break;
			default:
				// 不管你输入什么都会聚焦文本
				textSelect(inputElement);
		}
		//必须要强制更新一下，否则文本框将保留上一个值，但是code[i]已经清空了
		//更好的办法有待探索
		forceUpdate();
	}

	//监听enable的改变，决定是否重置输入框
	React.useEffect(() => {
		// console.log('enable change')
		//重置code
		setCode(new Array(length).fill(""));
		//选中第一个（下标0）输入框
		textSelect(dom[0]);
	}, [enable]);

	return (
		<div className="codebox-container">
			<form>
				{
					Array(length).fill('').map((item, index) => (
						<div key={index} index={index} className="codebox-field-wrap" style={{ userSelect: 'none' }}>
							<input
								type={type || "input"}
								maxLength="1"
								autoComplete="false"
								autoCorrect="off"
								autoCapitalize="off"
								spellCheck="false"
								value={code[index]}
								ref={(myref) =>{
									//这里不用setState，因为用了会报错还不知道怎么解决
									dom[index] = myref;
								}}
								onFocus={e => textSelect(e.target)}
								onClick={e => {
									removeDefaultBehavior(e);
									//移动光标到这一格之前第一个空白格
									for (let j = index; code[j] === ''; j--)
										textSelect(dom[j]);
								}}
								onChange={e => onChange(e, index)}
								onKeyDown={e => onKeyDown(e, index)}>
							</input>
						</div>
					))
				}
			</form>
		</div>
	);
}

export default CodeInput;
