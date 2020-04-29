export default {
	addItem(state, payload) {
		payload.checked = false
		state.cartList.push(payload)
	},
	addCounter(state, payload) {
		payload.count++
	}
}