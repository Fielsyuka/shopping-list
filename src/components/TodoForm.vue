<template>
	<div class="l-add-container">
		<form @submit.prevent="updateValue" class="c-form">
			<input type="text" class="c-input-text" v-model="value"><button type="submit" class="c-btn">Add</button>
		</form>
	</div>
</template>

<script>
export default {

	name: 'TodoForm',
	data() {
		return {
			value: '',
		};
	},
	methods: {
		updateValue() {
			this.$emit('update-value', this.value);
			this.value = '';
		}
	}
}
</script>

<style lang="css" scoped>
.c-form {
	display: flex;
	width: 100%;
}
.c-input-text {
	display: inline-block;
  width: 100%;
  height: 30px;
  padding: 2px 10px;
  border: 1px solid #979797;
  border-radius: 3px 0 0 3px;;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: inherit;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.c-btn {
  display: inline-block;
  cursor: pointer;
  position: relative;
  height: 30px;
  max-width: 100%;
  padding: 2px 14px;
  border-radius: 0 3px 3px 0;
  -webkit-box-shadow: none;
          box-shadow: none;
  border: 1px solid #060606;
  background-color: #060606;
  color: #fff;
  font-size: inherit;
  text-align: center;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-transition: opacity .25s;
  transition: opacity .25s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>