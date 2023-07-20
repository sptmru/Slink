const input = document.getElementById('input')

const sendText = async () => {
	try {
		await fetch('http://127.0.0.1:3000/', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json;charset=utf-8'
			}),
			body: JSON.stringify(input.value)
		});

		// let result = await response.json();
		// console.log(result.message);

	} catch (error) {
		console.log('приплыли')
	}
}


