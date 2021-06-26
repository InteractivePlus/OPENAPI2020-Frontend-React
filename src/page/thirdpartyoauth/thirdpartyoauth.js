import React from "react";

import {
    Container, CardContent, TextField,
    Link, Button, Grid, LinearProgress,
    Collapse, Checkbox, FormControlLabel
} from "@material-ui/core";

import { FlexCard, XsydCardContainer } from "../../components";
import "../../static/css/logcommon.css";
import "../../static/css/register.css";

function ThirdPartyOAuth(props) {
    let [clientWidth, setClientWidth] = React.useState(document.body.clientWidth);
    let [authorizing, setAuthorizing] = React.useState(false);          // 授权正在处理中
    let [retrievingAppName, setRetrieving] = React.useState(false);     // 正在获取第三方应用信息
    let [authorized, setAuthorized] = React.useState(true);             // 授权成功与否
    let [authErrReason, setAuthReason] = React.useState("");            // 授权失败原因
    let [appName, setAppName] = React.useState("");                     // 第三方应用名称
    let [appIcon, setAppIcon] = React.useState("");                     // 第三方应用图标路径

    let handleResize = () => {
        setClientWidth(document.body.clientWidth);
    };
    
    let handleContinue = (event) => {
        // ToDo: 进行授权
        let rtn = window.confirm("授权是否成功?");

        setAuthorizing(true);
        setTimeout(() => {
            setAuthorizing(false);
            setAuthorized(rtn);
            if (rtn) {
                // ToDo: 跳转到第三方页面
                props.history.push("/dashboard");
            } else {
                // ToDo: 更新授权失败原因
                setAuthReason("加冰逃跑了!");
            }
        }, 1000);
    };

    let retrieveAppInfo = () => {
        // ToDo: 获取第三方应用信息

        setRetrieving(true);
        setTimeout(() => {
            setRetrieving(false);
            setAppName("阳光加冰");
            setAppIcon("https://avatars0.githubusercontent.com/u/47358542?s=460");
        }, 1000);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", retrieveAppInfo);

    return (
        <>
            <div className="progress-placeholder">
                <Collapse in={authorizing | retrievingAppName}>
                    <LinearProgress />
                </Collapse>
            </div>

            <Container maxWidth={clientWidth <= 600 ? false : "xs"} className={clientWidth <= 600 ? "" : "container"}>
                <FlexCard size={clientWidth <= 600 ? "small" : "large"}>
                    <Collapse in={retrievingAppName}>
                        <CardContent className={ retrievingAppName ? "validation-card" : "validation-card-none"}>
                            <XsydCardContainer title="第三方应用授权" subtitle="正在获取第三方应用信息..."></XsydCardContainer>
                        </CardContent>
                    </Collapse>

                    <Collapse in={!retrievingAppName && !authorizing}>
                        <CardContent className={ !retrievingAppName && !authorizing ? "validation-card" : "validation-card-none"}>
                            <XsydCardContainer title="第三方应用授权" subtitle={'授权"' + appName + '"访问您的形随意动账号'} appImage={appIcon}>
                                <div className="space-justify-view">
                                <FormControlLabel
									control={
										<Checkbox defaultChecked size="small" name="protocol" color="primary" />
									}
									label={
										<div style={{ fontSize: "0.8em" }}>
											允许获取用户信息
										</div>
									}
								/>
                                </div>

                                <div className="space-justify-view">
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item xs={6} className="options-left">
                                            <Link href="/signup">注册账号</Link>
                                        </Grid>
                                        <Grid item xs={6} className="options-right">
                                            <Button variant="contained" color="primary" onClick={handleContinue} disableElevation>
                                                授权
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>

                                {
                                    !authorized ? (
                                        <Grid container justify="center" alignItems="center">
                                            <Grid item className="options-left">
                                                <div style={{color: "red"}}>应用授权失败，请重试！（原因: {authErrReason}）</div>
                                            </Grid>
                                        </Grid>
                                    ) : <></>
                                }
                            </XsydCardContainer>
                        </CardContent>
                    </Collapse>

                    <Collapse in={!retrievingAppName && authorizing}>
                        <CardContent className={ !retrievingAppName && authorizing ? "validation-card" : "validation-card-none"}>
                            <XsydCardContainer title="第三方应用授权" subtitle="正在验证..." appImage={appIcon}></XsydCardContainer>
                        </CardContent>
                    </Collapse>
                </FlexCard>
            </Container>
        </>
    );
}

export default ThirdPartyOAuth;
