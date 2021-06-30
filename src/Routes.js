import React, { Suspense, lazy } from 'react';
// import { Router, Route } from "react-router";
import { createBrowserHistory } from "history";

import { Route, Switch, BrowserRouter  as Router } from 'react-router-dom';

// import { Skeleton } from 'antd';
import { CircularProgress, LinearProgress, Collapse } from "@material-ui/core";
import { connect } from 'react-redux';


//路由页面，主页分开写
const Home = React.lazy(() => import('./page/home'));
//必须加载页面，如果有非必须加载，请动态加载，例如enable?<Route .../>:<Redirect to='' />
//具体应用：登录后才能访问的页面
const RouterList = [
	{ component: lazy(()=>import('./page/signin')), pathname: '/signin' },
	{ component: lazy(()=>import('./page/signup')), pathname: '/signup' },
	{ component: lazy(() => import('./page/thirdpartyoauth')), pathname: '/thirdpartyoauth'  },
	{ component: lazy(() => import('./page/verify')), pathname: '/verify'  },
  ];
  

/*nginx配置中需要加以下内容
    location / {
        try_files $uri $uri/ /index.html; 
    }
*/
const appHistory = createBrowserHistory();

const Routes = (props) => {
	
	return (
		<div>
			{/* 在这里放了一个全局的进度条，可以发dispatch控制 */}
			<div className="progress-placeholder">
				<Collapse in={props.loadingVisible}>
					<LinearProgress />
				</Collapse>
			</div>

			{/* 接下来是路由 */}
			<React.Suspense fallback=
				{
				// 显示页面骨架
				<div style={{
					width: '100%',
					height: '100%',
					margin: 'auto',
					paddingTop: 50,
					textAlign: 'center',
				  }}>
					{/* <Skeleton active /> */}
					<CircularProgress />
					{/* <div>loading</div> */}
					{/* https://zhuanlan.zhihu.com/p/37148975 */}
				</div>
				}
			>
				<Router history={appHistory}>
					<Switch>
						<Route exact path="/" component={Home} />
						{
							RouterList.map((s, i) => {
							let PageModule = s.component;  // 给匿名组件取个名字，便于下面用
							return <Route key={'router' + i}
								path={s.pathname}
								exact
								render={(props) => <PageModule {...props} />}  // 这里用 render
							/>
							})
						}
					</Switch>
				</Router>
			</React.Suspense>
		</div>
	);
};

export default connect(
	(state) => ({
		spinnerVisible: state.getIn(['ui', 'spinnerVisible']),
		loadingVisible: state.getIn(['ui', 'loadingVisible']),
	}),
	(dispatch) => ({
	})
)(Routes);


//export default Routes;
