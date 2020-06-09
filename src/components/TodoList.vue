<template>
	<div class="l-list-container">
		<div class="c-list">
			<div class="c-list_item" v-for="(task, index) in tasks" :key='index'>
				<label>
				<input type="checkbox" name="complete" class="c-checkbox" @click="updateDone(index)" :checked="task.isDone">
				<span class="c-checkbox_value">{{ task.text }}</span>
				</label>
				<span class="c-delete" @click="clickDelete(index)">[delete]</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TodoList',
	props: ['tasks'],
	methods: {
		clickDelete(index) {
			this.$emit('click-delete', index);
		},
		updateDone(index) {
			this.$emit('update-check', index);
		}
	}
}
</script>

<style lang="css" scoped>
.c-list {
	width: 100%;
}
.c-list_item {
	cursor: pointer;
	position: relative;
	border-top: 1px solid #e6e6e6;
}
.c-list_item:last-child {
	border-bottom: 1px solid #e6e6e6;
}
label {
	display: block;
	margin: 0;
}
.c-checkbox {
	display: none;
}
.c-checkbox_value {
	cursor: pointer;
	display: flex;
	padding: 14px 20px;
	background-color: pink;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}
.c-checkbox:checked + .c-checkbox_value {
  background-color: #a4a4a4;
  color: #7b7b7b;
  text-decoration: line-through;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}
.c-delete {
	cursor: pointer;
	position: absolute;
	padding: 2px;
	top: 16px;
	right: 18px;
	font-size: 12px;
	z-index: 100;
}
</style>