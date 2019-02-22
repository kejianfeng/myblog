export  function assignComment(comment_) {
	   const date_ = new Date();
       const date = date_.toLocaleDateString();
       const time = date_.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0]; //截取时间点
       const comment = Object.assign({}, comment_, {
           date,
           time
       })
       return comment;
}

export function sortInfo(data) {
		var label = [], classify_ = [], classify = [];
		var time = [], timeResult = [];
		data.forEach((item) => {
			label = label.concat(item.label.split('/'));
			var single = item.originDate.match(/\d{4}-\d{1,2}/)[0];
			if(!time.includes(single)) {
				time.push(single)
			}
			// console.log(item.label.split('/'))
			if(!classify_.includes(item.classify)) {
				classify_.push(item.classify)
			}
		})
		time.sort();
		for(let i = 0; i < time.length; i++) {
			let key = time[i];
			let  list = [];
			for(let j = 0; j < data.length; j++) {
				if(key == data[j].originDate.match(/\d{4}-\d{1,2}/)[0]) {
					console.log("霞")
					list.push(data[j])
				}
			}
			timeResult.push({
				time:key,
				list,

			})
		}
		let tag = Array.from(new Set(label));
		for(let i = 0; i < classify_.length; i++) {
			let key = classify_[i];
			let num = 0;
			for(let j = 0; j < data.length; j++) {
				if(data[j].classify == key) {
					console.log(123)
					num++
				}
			}
			classify.push({
				key,
				num
			})
		}

		return {
			length: data.length,
			label:tag,
			classify,
			listContent: timeResult

		}
}

export function random() {
	return Math.random().toString(36).slice(2)
}