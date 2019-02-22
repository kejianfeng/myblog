const mutations = {
	changeId(state, item) {
		state.id = item.id;
		state.reading = item.reading
	},
	changeDailyBlogId(state, item) {
		state.dailyBlogId = item.id;
		state.dailyBlogreading = item.reading
	}
}

export default mutations