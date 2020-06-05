<template>
	<div>
		<header class="l-header">
			<h1>Shopping List</h1>
			<p v-if="remainingTask.length"> Remaining: {{ remainingTask.length }}</p>
			<p v-else>You got everything you need :)</p>
		</header>
		
		<todo-form @update-value="addTask" />
		<todo-list :tasks="tasks" @click-delete="deleteTask" />

		<div class="l-footer">
			<p class="c-purge" @click="purge">Delete done</p>
		</div>
	</div>
</template>

<script>

import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default {
	name: 'Index',
	components: {
		TodoForm,
		TodoList
	},
	data() {
		return {
			tasks: [],
		}
	},
	mounted: function() {
		this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	},
	watch: {
		tasks: {
			handler: function() {
				localStorage.setItem('tasks', JSON.stringify(this.tasks));
			}
		}
	},
	computed: {
		remainingTask() {
			return this.tasks.filter( task => {
				return !task.isDone
			});
		}
	},
	methods: {
		addTask(value) {
			if(value) {
				this.tasks.unshift({
					text: value,
					isDone: false
				});
			}
		},
		deleteTask(index) {
			this.tasks.splice(index, 1);
		},
		purge() {
			this.tasks = this.remainingTask;
		},
	},
}
</script>

<style lang="css" scoped>
.l-header {
	padding: 20px 20px 15px;
	text-align: center;
}
.l-header > h1 {
	margin-bottom: 8px;
	font-size: 24px;
	letter-spacing: .02em;
}
.l-header > p {
	margin-bottom: 0;
	font-size: 14px;
	letter-spacing: .01em;
}
.l-add-container {
	padding: 5px 20px;
}
.l-list-container {
	margin-top: 20px;
}
.l-footer {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 420px;
	height: 60px;
	background-color: #060606;
	color: #fff;
	text-align: center;
}
.l-footer > p {
	margin-bottom: 0;
}
.c-purge {
	cursor: pointer;
	text-decoration: underline;
}

</style>