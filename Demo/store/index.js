import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		addressID: 0,
		orderItem: ''
	},
	getters:{
		getAddressID(state){
			return state.addressID;
		},
		getOrderItem(state){
			return state.orderItem;
		}
	},
	mutations: {
		changeAddress(state, addressID) {
			state.addressID = addressID;
		},
		changeOrderItem(state, orderItem){
			state.orderItem = orderItem;
		}
	},
	actions: {
		changeAddressFunc(context, addressID){
			context.commit("changeAddress", addressID);
		},
	}
})

export default store
