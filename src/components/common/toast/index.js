import Toast from './Toast.vue'

const obj = {}
obj.install =function(Vue) {
	const toastCont = Vue.extend(Toast)
	const toast = new toastCont()
	
	toast.$mount(document.createElement('div'))
	document.body.appendChild(toast.$el)
	Vue.prototype.$toast = toast
}

export default obj