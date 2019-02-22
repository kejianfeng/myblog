<template>
  <div>
   <others-msg :comment="comment" :postAddress="postAddress" :saveCollection="saveCollection"></others-msg>
  </div>
</template>

<script>
import OthersMsg from 'base/othersMsg/othersMsg'
export default {
  name: 'messageBoard',
  data() {
  	return {
  		comment: [],
  		postAddress:'saveMessageBoard',
  		saveCollection:'messageBoard'
  	}
  },
  created() {
  	this.$axios.get('http://localhost:8010/api/getMessageBoard').then((res) => {
  		this.comment = res.data.reverse();
      // console.log(this.comment)
  	})
  },
  components: {
  	OthersMsg
  }
  
}
</script>

<style scoped>

</style>
