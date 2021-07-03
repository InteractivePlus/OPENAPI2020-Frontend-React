import Immutable from 'immutable';
import {
    CAPTCHASTATE,
    SIGNUPPAGE,
    SIGNINPAGE,
    VERIFYPAGE,
    RESETPWDPAGE
} from "../config/config.js";

// initstate model
export const UiState = Immutable.fromJS({
    spinnerVisible: false,
    //进度条状态
    loadingVisible: false,
    isEdit: false,
    
});

export const RecipeState = Immutable.fromJS({
    recipes: [],
    recipe: {
        id: '',
        name: '',
        description: '',
        imagePath: '',
    }
});

export const UserState = Immutable.fromJS({
    username: '',
    email: '',
    password: '',
    isAuthorized: false,
    //当前会话验证id
    captchaId: '',
    //图片验证码base64
    captchaImgBase64: '',
    //用于判断当前验证码状态，指的是验证前验证码是否获得，和验证后无关
    isCaptchaGotten: false,
    captchaInputValue: '',
    captchaValidState: CAPTCHASTATE.INVALID,
    //验证码输入框是否启用，当设置为false触发清除，然后需要再次设定为true
    isCaptchaInputEnabled: true
});

export const UserSignUpState = Immutable.fromJS({
    page: SIGNUPPAGE.EMPTY_PAGE,
});

export const UserSignInState = Immutable.fromJS({
    page: SIGNINPAGE.EMPTY_PAGE,
    
});

export const UserVerifyState = Immutable.fromJS({
    page: VERIFYPAGE.EMPTY_PAGE,
});

export const UserResetPwdState = Immutable.fromJS({
    page: RESETPWDPAGE.EMPTY_PAGE,
});
