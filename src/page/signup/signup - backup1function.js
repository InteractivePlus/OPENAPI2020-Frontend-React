import React from "react";
import axios from 'axios'
import { Container, CardContent, TextField, Link, Button, Grid, FormControlLabel, Checkbox, LinearProgress, Collapse } from "@material-ui/core";

import { FlexCard, XsydCardContainer } from "../../components";
import {Setting,ErrCode} from "../../config/config.js";
import "../../static/css/logcommon.css";
import "../../static/css/register.css";

function Register(props) {
	let [protocol, setProtocol] = React.useState(false);
	let [clientWidth, setClientWidth] = React.useState(document.body.clientWidth);
	let [page, setPage] = React.useState(1);
	let [loading, setLoading] = React.useState(false);


	let pageMaxCount = 4; //增加新collapse时记得调整最大页数

	//let [captchaId,setCaptchaId] = React.useState(1); //当前的验证码id
	let captchaId = ''; //当前的验证码id
	let captchaImg = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAKACWAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+86KKK+cPnAqOeZLaGSWQ7Y0Usx9AKkqO4t47u3khlXfFIpRlPcHqKYHE2fxy8A3yFo/FmmIBwRLOIyPruxXmGn/ABy8Z6v4kg0HTL7wLrOoOWkUWN1cOtwoGdiEAhDjgs5x1wOlWfiF+y78OtM8N61rEOm3FrLbW0twBHdybdwUnoSa+Yf2c74WHxm8NOW2q9yI8k9jXoU6VOUZSjrbueHXxFeFSEJ2V+x9XeLvib8Tfhxoc+reIdB8Mz2UeHMtlfyJsBOBHtcZd+pyOOR6Gs74aftWWvii9A8T2dr4UsJw32K6uJZCtywIBAYoFGMjOW7iuK8d397+078X4/CukyuvhHRHzd3KH5XYHDN7kkFV+hNfQ+u/DXTNT+HF34PtY0srGW0a2iYID5ZIwHx6g81ElCMUprV/gbwdapOUqUvdXfq/w0Ou61Q1rxBpnhyza71S/t7C2XrLcSBB+tfN2j/sl+LvDSSQaR8R5rK0kxuiihdOmcdH9z2FeIfFv4Znwt4+03QbrxXceJtVnAa8lW1d2twT8qgB3ZzjJxx29aUKEJysp/gOri6tKHNKnb5o++9Q1Ca+8M3N5oTxXlxLbNJZuGBSRivyHPpnFfP8f7RPxD8BOV8feAZjZrwb/S4nVPqWJZCfxFJ8PrD486fpEFhFbaRZaKkYW1W9SOOeOIL8oCoTtZuM79xBPPQio/EHj7xl4QnEfjFtW0qFlAMk08L2k6EnA+0Q2bIjZyAhRGGFLOVYAOFNJuOj+eoqlaUkp+9H5aHW2n7YXw4nsTPLfXlvKBk27Wjl/oCBj9a6y1+M2max4V/t3RrK61KzW3a4nlzHFFaqAT+9d2AzweE3kY5A4r4yPg3W/jJD4t8bBFt9G0q2kkDzqis5VCQiiKNFZuOTgdcnceDp3viC21z4YeA/CMN/LHf6nN5dzc3N24t7WBZCqqI92xcnJLY3ELycGtnh4dN+pyRx1bVy2tp0vrbzPXPhZ8bPEnxH1vVtQ1DxVp3h3Ron2Q2SWqzzFDwZCCdyKAR+8YbQxUEHofZNB8faNbmf7f440vVJHUNFFH5cPyjPzIoYtICMcjIJ6YBxXReDvDFh4N8M6do2moFs7SJY0I/i9WPuTzWs8SSABkVgrbhkZwfX61xTnGT0Wn9eR6tKlUhFc0rv5/5nP2nji01e7gh0i0u9XjZws1zboqQ26n+JmkZd3fhAx45A4ro6KKxduh1JNbsKKKKQworKv9eWzuWt0tpZ5Vx93pyM1yms/EN1nk0+1VbrUSCDp2nusl4q9CxTcCoH944AJHNbxoyeux3LB1OVTm1FPq2l/wAH8Dvt6hwu4biM7c80iTRyO6K6s6HDKDkqevPpXiDfCfU9dZZZvD2myxSf6u78UX8t/fwD3Rg4AzkhUnxzngkivJPGy+PfCWr3lhF8PNMvIIvktdVttPk8zHB+WYNvI/2c8dugrVUIy0U9Tzq84UYqSkn6KX6xPoP9obXYNJ+DfidzMitPavbJ83VmGMfWvgrwmJNG8SeHLoQSSNN+8VCrpvy7oNpCMT06qG5BHUEV67Y/Br4gfGnWLOfV/DFj4V0uHAlmjsktZJfViWzLIx/vMSO/U87fxD+A+oWPxX8I2/hnQ2axt0tzdPbIFRAsnzM7dztPJ6120VClHlcjw69OpiUsQ1ZJpJdXrvbsvM4q68FfEj4Ewz+JdDuxp1nckpIlnKJ2iTOV81HXHfrg456Zr6C+DrJ8SNKm1yy+JHiNp7kbbmyluYC9rL3CoYtqj0wuO4NeyHwvpkts0U1okyOu11kJYMD1BBrw+T9nVvhz40vfFvhzXYdM0EKZrvTLmNigiAJcBweg5I4OKzlXpVbrZ97HpvCUMPVj7KUnT63tdeaV/vRu/FgWHwz8Gtqeq+LfEl8LZdtvp41MwG5mKlV3PEElIyd2N+OOlYH7LXgeDwnoF34t1uQf27rjGQB2LyRwk7uSSWyx5JPPA5rxmfxv4f8Ai38WEu/EuqrpHg3SjvihnLM0wB4GFB5PU8dK9g1D9prwslyml+BPDt34q1ArthEcDrGMdOGG7H4Ch0+WPJq7/ImlUwDryq1JNxjpG1rvu+rXlue5yeLLVVZlhmdFGWfaAAPXrXyh8UviBqP7RnjqDwl4caWHwtZyA3NyBxKR96Rv9kchR36+lfRXguLxB8QPh9d23jvS10e4vi8T2dm7RlYTjAyGJBIyDzWh8OfhR4d+Flhc2ug2rRLcSb5JJm3yN6Lu9B6e9c8Z06Tb5dV5nZiHTxXJGEHGG8tdWu22h5dr/wAD/A+n+DL6PSbnVNMvY7FkD2d3KiyEJhiycod4yG45DHvzXmfwX+GGjfF/4MnT7mwddVs7uWO31OH5WhzhgGOPmXnofU4xX2DfaZDeWdxD5UYaWNk3bBxkYrh/gp8I0+D/AIfvtPXUGv2vLo3TkptVCVC4UfRR1qlXSi97+ZFShhVXjKnSvGzTTfpbax458OPiP4p+C3ii3+H3jVkktZCF0zUpydhUnCrvJHy9ueh4NfRv9vz2/F1p80eP4k+YGl8TeDdC8ZW0UGuaTaapHES0YuYgxjJ6lT1U/StKys4tPtIbaBSkMKBEUsWwo4AyeaylVhLVx1OjCyVGPsqsFKK2eqfpfr5GZ/bN3e/8eFkxUdXn4AP51NaQaqbhHubiIRfxRIP64/rWpRWbmrWUUdcsTFJxp00l97+9/okFFFFYnCc5q/hvUdd1CUXGtz2WlLjybbSw1vMxwN3mzbiSM9AgTGeS3bW0nRbHQ7UW9hax20Q6hByx/vMerMe7Ekk8k0UVV29CVFJ3LtFFFSUFFFFABUc8Ed1BJDNGssMilHRxkMDwQR6UUUAeaw/s0/DaC485PC1sTnJV5JHX8mY13mheG9K8MWf2TSNOttNtv+eVrEI1P5UUVbnKW7M40oQ1jFI0qKKKg0CiiigAooooAKKKKACiiigD/9k=`
;

	let handleResize = () => {
		setClientWidth(document.body.clientWidth);
	};

	let handleProtocolChange = (event) => {
		setProtocol(event.target.checked);
	};

	let handleNextPage = (event) => {
		// 验证表单

		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			if (page < pageMaxCount) {
				setPage(page + 1);
			}
		}, 1000);
	};

	let hadnleDoSignUp = (event) => {
		//http://pdk.xsyds.cn:8899/

	}

	let handleChange = (key, val) => {
		console.log(captchaImg)
	}

	let handleGetCaptcha = async (event) => {
// 		let img;
// 		let id;
// 		await axios.get('http://81.71.84.198:8899/captcha', {
// 				params: {
// 					width: 150,
// 					height:40
// 				}
// 			})
// 			.then((response) => {
// 				console.log(response.data);
// 				if (response.data.errorCode == ErrCode.NO_ERROR) {
// 					console.log('captcha get')
// 					//es6大法好
// 					//id = response.data.data.captcha_id;
// 					captchaId = response.data.data.captcha_id;
// 					captchaImg='data:image/jpeg;base64,' +response.data.data.captcha_data.jpegBase64;
					
// img=`data:image/jpeg;base64,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`
// //captchaImg = captchaImg.replace(/\s/g, encodeURIComponent(' '))
// handleNextPage();
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			})
// 			.then(() => {
// 				//无论有没有成功都在执行完成后打印id看看
// 				console.log(captchaId)
// 				console.log(img)
// 			});
// 		//setCaptchaId(id);
// 		console.log(captchaId)
		
// 		captchaImg=img;
		captchaImg=`data:image/jpeg;base64,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`
		handleNextPage();
		console.log(captchaImg)
	}

	let handlePreviousPage = (event) => {
		setPage(1);
	};

	let handleGoLogin = (event) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			props.history.push("/signin");
		}, 1000);
	};

	window.addEventListener("resize", handleResize);

	return (
		<>
			<div className="progress-placeholder">
				<Collapse in={loading}>
					<LinearProgress />
				</Collapse>
			</div>

			<Container maxWidth={clientWidth <= 600 ? false : "xs"} className={clientWidth <= 600 ? "" : "container"}>
				<FlexCard size={clientWidth <= 600 ? "small" : "large"}>
					<Collapse in={page === 1}>
						<CardContent className={page === 1 ? "register-card" : "register-card-none"}>
							<XsydCardContainer title="注册您的形随意动账号" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div>
									<TextField className="input" label="用户名" onChange={value => handleChange('username', value)} />
									<TextField className="input" label="电子邮箱" onChange={value => handleChange('email', value)} />
									<p className="email-tip-text">您需要证实此电子邮件地址属于你</p>

									<TextField className="input" type="password" label="密码" />
									<TextField className="input" type="password" label="确认密码" />
									<p className="password-tip-text">
										使用{Setting.PASSWORD_MINLEN}个~{Setting.PASSWORD_MAXLEN}个字符（必须包含字母和数字）
									</p>
								</div>

								<FormControlLabel
									control={
										<Checkbox checked={protocol} size="small" onChange={handleProtocolChange} name="protocol" color="primary" />
									}
									label={
										<div style={{ fontSize: "0.8em" }}>
											我已阅读并同意<Link href="#">《用户协议》</Link>
										</div>
									}
								/>
								<Grid container justify="center" alignItems="center">
									<Grid item xs={6}>
										<Link href="/#/signin">登录账号</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={handleGetCaptcha} disabled={!protocol} disableElevation>
											下一步
										</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>

					<Collapse in={page === 2}>
						<CardContent className={page === 2 ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="注册验证" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">
									<img style={{ verticalAlign: "middle" }} className="logo" src={captchaImg} />
									<TextField className="input" label="验证码" onChange={value => handleChange('username', value)} />
								</div>

								<Grid container justify="center" alignItems="center">
									<Grid item xs={6}>
										<Link href="/#/signup" onClick={handlePreviousPage}>
											返回
										</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={handleNextPage} disableElevation>
											下一步
										</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>

					<Collapse in={page === 3}>
						<CardContent className={page === 3 ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="完善信息" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">
									<TextField className="input" label="手机号" />
									<TextField className="input" label="国家/地区" />
									<TextField className="input" label="语言选择" />
								</div>

								<Grid container justify="center" alignItems="center">
									<Grid item xs={6}>
										<Link href="/#/signup" onClick={handlePreviousPage}>
											返回
										</Link>
									</Grid>
									<Grid item xs={6} className="options-right">
										<Button variant="contained" color="primary" onClick={handleNextPage} disableElevation>
											下一步
										</Button>
									</Grid>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>

					<Collapse in={page === 4}>
						<CardContent className={page === 4 ? "validation-card" : "validation-card-none"}>
							<XsydCardContainer title="完成注册" subtitle="一个账号，畅享BlueAirLive所有服务">
								<div className="space-justify-view">恭喜您，注册完成</div>
								<Grid container justify="center" alignItems="center">
									<Button variant="contained" color="primary" onClick={handleGoLogin} disableElevation>
										去登陆
									</Button>
								</Grid>
							</XsydCardContainer>
						</CardContent>
					</Collapse>
				</FlexCard>
			</Container>
		</>
	);
}

export default Register;
