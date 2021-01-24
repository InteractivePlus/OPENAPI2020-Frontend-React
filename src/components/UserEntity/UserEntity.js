class UserEntity {
    constructor() {
        this.uid = 0;
        //this.username = "";
        this.nickname = "";
        this.signature = "";
        //this.email = "";
        this.phone = "";
        this.emailVerified = false;
        this.phoneVerified = false;
        this.accountFrozen = false;
	}
	
	// get username() {
	// 	return this.username;
	// }
	// set username(val) {
	// 	this.username=val;
	// }
	// set email(val) {
	// 	this.email=val;
	// }
}

export default UserEntity;
