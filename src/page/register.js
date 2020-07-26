import React from "react";
import Logo from "../static/logo.png";
import { CssBaseline, Container, Card, CardContent, Typography, TextField, Link, Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Setting from "../config/config.js";
import "./register.css";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1e88e5",
		},
		secondary: {
			main: "#64b5f6",
		},
	},
});

class Register extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container maxWidth="sm" className="container">
					<div>
						<Card variant="outlined">
							<CardContent className="login-card">
								<div className="register-tip">
									<img className="logo" src={Logo} alt="Logo" />
									<Typography className="register-tip-text" variant="h1">
										注册您的形随意动账号
									</Typography>
								</div>
								<p className="project-tip-text">一个账号，畅享BlueAirLive所有服务</p>

								<div>
									<TextField className="input" label="用户名" />
									<TextField className="input" label="电子邮箱" />
									<p className="email-tip-text">您需要证实此电子邮件地址属于你</p>

									<TextField className="input" label="密码" />
									<TextField className="input" label="确认密码" />
									<p className="password-tip-text">
										使用{Setting.PASSWORD_MINLEN}个~{Setting.PASSWORD_MAXLEN}个字符（字母、数字和符号的组合）
									</p>
								</div>
								<Grid container justify="center" alignItems="center">
									<Grid item xs={6}>
										<Link href="/#/login">登录账号</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary">
											下一步
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</div>
				</Container>
			</ThemeProvider>
		);
	}
}

export default Register;
