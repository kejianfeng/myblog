

module.exports =  {
	//计算id值
	random () { // 生成10-12位不等的字符串
	    return Math.random().toString(36).slice(2) // 截取小数点后的字符串
	}
}