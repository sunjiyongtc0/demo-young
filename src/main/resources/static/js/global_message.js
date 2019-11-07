var Global={
	"PAGE_LAYOUT":{layout:['first','prev','links','next','last','refresh']},
	"DELETE_MESSAGE":"确认删除记录？",
	"SUBMIT":"提交",
	"CANCEL":"取消",
	"USER_PASS_RESET":"重置密码",
	"ERROR_MESSAGE":"程序出错，请联系管理员！",
	"NO_SELECTED":"没有记录被选中！",
	"ONE_SELECTED":"只能选择一条记录！",
	"DELETE_CONFIRM":"确定删除选中记录？",
	"DELETE_SUCCESS":"删除记录成功！",
	"DELETE_FAILURE":"删除记录失败！",
	"OPERATION_SUCCESS":"操作成功！",
	"CASCADE_DELETE_MESSAGE":"删除节点会级联删除下级节点，确定删除记录？",
	"DEST_TYPE_PROBE":1,
	"LOGIN_PASSWORD_ERROR":"用户名或密码错误！",
	"LOGIN_LOCKED":"用户被锁定，请联系管理员！",
	"LOGIN_CAPTCHA_ERROR":"验证码错误！",
	"DEST_TYPE_ADDRESS":0,
	"TASK_STATUS_1":0,//无任务
	"TASK_STATUS_2":1,//全部开启
	"TASK_STATUS_3":2,//部分开启
	"TASK_STATUS_4":3,//全部暂停
	"SELECT_TYPE_1":"probe",
	"SELECT_TYPE_2":"dest",
	"PROBE_STATUS_0":0,//探针状态为停止
	"PROBE_STATUS_1":1,//探针状态为已离线
	"PROBE_STATUS_2":2,//探针状态为数据上报异常
	"PROBE_STATUS_3":3,//探针状态为正常
	"TASK_PARAM_SSL_0":0,//未启用SSL安全登录
	"TASK_PARAM_SSL_1":1,//启用SSL安全登录
	"TASK_SRC_DEST_STATUS_0":0,//源-目的 任务状态为暂停
	"TASK_SRC_DEST_STATUS_1":1,//源-目的 任务状态为运行
	"TASK_PARAM_ALARM_TEMPLATE_ID_0":0,//不告警
	"SCENE_ID_1":'customer',//表示重点客户场景
	"SCENE_ID_2":'3g',//表示3g质量监测场景
	"SCENE_ID_3":'band',//表示宽带接入质量监测场景
	"SCENE_ID_4":'wlan',//表示WLAN接入质量场景
	"SCENE_ID_5":'top',//表示TOP100接入质量场景
	"SCENE_ID_6":'world',//表示国际出口质量场景
	"SCENE_ID_7":'industry',//行业展示
	"SCENE_ID_8":'digTrace',//表示国际出口质量场景
	"SCENE_ID_9":'worldPlus',//表示国际链路性能监测
	"TASK_TYPE_ID_19":19,//表示HTTPE网站业务测试
	"TASK_TYPE_NAME_HTTPE":'HTTPE',//表示HTTPE网站业务测试
    "TASK_TYPE_DESCRIPTION_HTTPE":'网站业务测试',//表示HTTPE网站业务测试
    "TASK_TYPE_ID_1":1,//表示Ping测试
	"TASK_TYPE_NAME_PING":'PING',//表示Ping测试
    "TASK_TYPE_DESCRIPTION_PING":'Ping测试',//表示Ping测试
    "TASK_TYPE_ID_6":6,//表示Traceroute测试
	"TASK_TYPE_NAME_TRACE":'TRACE',//表示Traceroute测试
    "TASK_TYPE_DESCRIPTION_TRACE":'Traceroute测试',//表示Traceroute测试
    "TASK_PARAM_IS_INIT_1":1,//是否是内置参数：1-是，0-否
    "TASK_PARAM_IS_INIT_0":0,//是否是内置参数：1-是，0-否
    "DELETE_FLAG_0":0,//0=未删除
    "DELETE_FLAG_1":1,//1=删除
    "ADDRESS_GROUP_ID_19":1,//重点客户地址组
    "TASK_TYPE_DEST_TYPES_0":0,//2全部 1地址 0探针
    "TASK_TYPE_DEST_TYPES_1":1,//2全部 1地址 0探针
    "TASK_TYPE_DEST_TYPES_2":2,//2全部 1地址 0探针
    "CONST_TYPE_1":"report_subscribers",//报表_订阅人(常量表常量类型)
	"ISOPEN_0":0,//0=未删除
    "ISOPEN_1":1,//1=删除
    "message" : {
		"zh":{
			"DELETE_MESSAGE":"确认删除记录？",
			"USER_PASS_RESET":"重置密码",
			"ERROR_MESSAGE":"程序出错，请联系管理员！",
			"NO_SELECTED":"没有记录被选中！",
			"ONE_SELECTED":"只能选择一条记录！",
			"LOGIN_PASSWORD_ERROR":"用户名或密码错误！",
			"LOGIN_LOCKED":"用户被锁定，请联系管理员！",
			"NO_USER_ROLE":"没有操作权限，请联系管理员进行角色分配！",
			"ENTER_VERIFY_CODE":"请输入验证码！",
			"ENTER_USER_NAME":"请输入用户名！",
			"ENTER_PASSWORD":"请输入密码！",
			"LOGIN_CAPTCHA_ERROR":"验证码错误！",
			"response_delay":"响应时延",
			"temporarily_no_data":"暂无数据",
			"high":"高",
			"low":"低",
			"looking_glass":'一次性测试',
			"pass_length":'长度必须大于6位',
			"pass_frm":'密码必须是数字和字母组合',
			"confirm_pass":'两次密码不一致',
			"pass_ok":'密码修改成功',
			"pass_err":'密码修改失败',
			"pass_reset":'密码重置',
			"user_name":'用户名',
			"user_pass":'密码',
			"re_user_pass":'确认密码',
			"pass_tip":"密码长度大于6位且必须是数字和字母组合"
		},
		"en":{
			"DELETE_MESSAGE":"Confirm delete record?",
			"USER_PASS_RESET":"Reset Password",
			"ERROR_MESSAGE":"The program is in error, please contact the webmaster!",
			"NO_SELECTED":"No records were selected!",
			"ONE_SELECTED":"Can only choose one record!",
			"LOGIN_PASSWORD_ERROR":"Account or password error!",
			"LOGIN_LOCKED":"The account is locked, please contact the webmaster!",
			"NO_USER_ROLE":"The account does not have the permissions to operate, please contact the webmaster for role assignment!",
			"ENTER_VERIFY_CODE":"Please enter the verification code!",
			"ENTER_USER_NAME":"Please enter the account!",
			"ENTER_PASSWORD":"Please enter the password!",
			"LOGIN_CAPTCHA_ERROR":"The verification code error!",
			"response_delay":"response delay",
			"temporarily_no_data":"temporarily no data",
			"high":"high",
			"low":"low",
			"looking_glass":'Looking Glass',
			"pass_length":'Length must be greater than 6',
			"pass_frm":'Password must be a combination of Numbers and letters',
			"confirm_pass":"The two passwords don't match",
			"pass_ok":'Password is changed',
			"pass_err":'Password change failed',
			"pass_reset":"Password reset",
			"user_name":'username',
			"user_pass":'password',
			"re_user_pass":'confirm password',
			"pass_tip":"combination of Numbers and letters"
		}
	}
}











