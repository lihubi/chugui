import config from "./config.js"

const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	let getCase = async (params = {}) => {
		 let res = await vm.$u.get(config.getCase,params)
		return res;
	}

	let setPrice = async (params = {}) => {
		 let res = await vm.$u.get(config.setPrice,params,{'Content-Type':'application/json;charset=utf-8'})
		return res;
	}
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getCase};
}

export default {
	install
}