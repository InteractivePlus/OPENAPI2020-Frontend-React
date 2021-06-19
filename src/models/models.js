import Immutable from 'immutable';
import {
    Setting, ErrCode, ApiUrl, CAPTCHASTATE,
    SIGNUPPAGE, SIGNINPAGE
} from "../config/config.js";

// initstate model
export const UiState = Immutable.fromJS({
    spinnerVisible: false,
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
    isCaptchaGotten: false,
    captchaInputValue: '',
    captchaValidState: CAPTCHASTATE.INVALID,
});

export const UserSignUpState = Immutable.fromJS({
    page: SIGNUPPAGE.EMPTY_PAGE,

});

export const UserSignInState = Immutable.fromJS({
    page: SIGNINPAGE.EMPTY_PAGE,

});