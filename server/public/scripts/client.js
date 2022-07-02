console.log('js working');
$(document).ready(function () {
	console.log('JQ');
	// click listeners
    getTasks();
	clickListeners();
	$(document).on('click', '#completeBtn', updateTask);
	$(document).on('click', '#deleteBtn', deleteTask);
});

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
} // end getTasks

function renderTask(tasks) {
	console.log('in renderTasks', tasks);
	$('#taskInfo').empty();
	for (let task of tasks) {
        if (task.done === true) {
            $('#taskInfo').append(`
            <tr class="allDone">
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>Completed!</td>
            <td>Nice Job!</td>
            <td><button data-id="${task.id}" id="deleteBtn">Delete</button></td>
            </tr>
            `);
        }else{
            $('#taskInfo').append(`
            <tr>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>Not Completed</td>
            <td><button data-id="${task.id}" id="completeBtn">Complete</button></td>
            <td><button data-id="${task.id}" id="deleteBtn">Delete</button></td>
            </tr>
            `)
        };
		console.log(task);
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

function updateTask() {
	let taskId = $(this).data('id');
    // $(this).parent().parent().css('background-color', 'green')
	$.ajax({
		type: 'PUT',
		url: `/tasks/${taskId}`,
	})
		.then(function (response) {
			console.log('its UPDATED');
			getTasks();
		})
		.catch(function (error) {
			alert('Error UPDATED Daddy O', error);
		});
}