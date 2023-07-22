const input = document.getElementById('input')

const sendText = async () => {
	try {
		const response = await fetch('http://127.0.0.1:3000/', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json;charset=utf-8'
			}),
			body: JSON.stringify({longUrl: input.value})
		});

		const result = await response.json();
		console.log(result.message);

	} catch (error) {
		console.error('Произошла ошибка:', error);	}
}


