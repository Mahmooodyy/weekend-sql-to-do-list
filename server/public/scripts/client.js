console.log('js working');
$(document).ready(function () {
	console.log('JQ');
	// Establish Click Listeners
	setupClickListeners();
	// load existing koalas on page load
	getKoalas();
	$(document).on('click', '#transferBtn', updateKoala);
	$(document).on('click', '#deleteBtn', deleteKoala);
}); // end doc ready

function setupClickListeners() {
	$('#addTaskBtn').on('click', function () {
		// Nate - changed class to #addKoalaBtn
		console.log('in addTaskBtn on click');
		// get user input and put in an object
		// NOT WORKING YET :(
		// using a test object
		//change
		let taskToSend = {
			name: $('#nameInput').val(),
			age: $('#descInput').val(),
			readyForTransfer: $('#transferInput').val(),
			notes: $('#notesInput').val(),
		};
		// call saveKoala with the new obejct
		console.log('koala to send', taskToSend);
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
				alert('Error in koalaToSend');
			});
		console.log('end of koalaToSend');
	});
}

function getTasks() {
	console.log('in getKoalas');

	$.ajax({
		url: '/tasks',
		method: 'GET',
	})
		.then(function (response) {
			console.log('test GET response,', response);
			renderKoala(response);
		})
		.catch(function (error) {
			console.log(error);
			alert('Error in getTasks');
		});
	console.log('end of getTasks');

	// ajax call to server to get koalas
} // end getKoalas

function renderKoala(tasks) {
	// changed to render koalas
	console.log('in renderTasks', tasks);
	// ajax call to server to get koalas --  ignore this line
	$('#taskInfo').empty();
	for (let task of tasks) {
		console.log(task);
		$('#taskInfo').append(`
    <tr>
    <td>${task.name}</td>
    <td>${task.age}</td>
    <td>${task.done}</td>
    <td><button data-id="${task.id}" id="transferBtn">Transfer</button></td>
    <td><button data-id="${task.id}" id="deleteBtn">Delete</button></td>
    </tr>
    `);
	}
	$('input').val('');
}

function deleteKoala() {
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

function updateKoala() {
	let taskId = $(this).data('id');
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