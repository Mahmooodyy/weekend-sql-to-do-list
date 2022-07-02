console.log('js working');
$(document).ready(function () {
	console.log('JQ');
	// Establish Click Listeners
	clickListeners();
	getTasks();
	// $(document).on('click', '#transferBtn', updateTask);
	$(document).on('click', '#deleteBtn', deleteTask);
}); // end doc ready

function clickListeners() {
	$('#addTaskBtn').on('click', function () {
		console.log('in addTaskBtn on click');
		let taskToSend = {
			name: $('#nameInput').val(),
			description: $('#descInput').val(),
			done: $('#boolInput').val(),
		};
		console.log('task to send', taskToSend);
		$.ajax({
			url: '/tasks',
			method: 'POST',
			data: taskToSend,
		})
			.then(function (response) {
				console.log('test GET response,', response);
				getTasks();
			})
			.catch(function (error) {
				console.log(error);
				alert('Error in taskToSend');
			});
		console.log('end of taskToSend');
	});
}

function getTasks() {
	console.log('in getTasks');

	$.ajax({
		url: '/tasks',
		method: 'GET',
	})
		.then(function (response) {
			console.log('test GET response,', response);
			renderTask(response);
		})
		.catch(function (error) {
			console.log(error);
			alert('Error in getTasks');
		});
	console.log('end of getTasks');

	// ajax call to server to get task
} // end getTasks

function renderTask(tasks) {
	// changed to render koalas
	console.log('in renderTasks', tasks);
	// ajax call to server to get koalas --  ignore this line
	$('#taskInfo').empty();
	for (let task of tasks) {
		console.log(task);
		$('#taskInfo').append(`
    <tr>
    <td>${task.name}</td>
    <td>${task.description}</td>
    <td>${task.done}</td>
    <td><button data-id="${task.id}" id="transferBtn">Complete</button></td>
    <td><button data-id="${task.id}" id="deleteBtn">Delete</button></td>
    </tr>
    `);
	}
	$('input').val('');
}

function deleteTask() {
	let taskId = $(this).data('id');
	$.ajax({
		type: 'DELETE',
		url: `/tasks/${taskId}`,
	})
		.then(function (response) {
			console.log('its deleted');
			getTasks();
		})
		.catch(function (error) {
			alert('Error deleting Daddy O', error);
		});
}

// function updateTask() {
// 	let taskId = $(this).data('id');
// 	$.ajax({
// 		type: 'PUT',
// 		url: `/tasks/${taskId}`,
// 	})
// 		.then(function (response) {
// 			console.log('its UPDATED');
// 			getTasks();
// 		})
// 		.catch(function (error) {
// 			alert('Error UPDATED Daddy O', error);
// 		});
// }