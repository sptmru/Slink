const input = document.getElementById('input');
const readyLink = document.getElementById('readyLink');
const incorrect = document.getElementById('incorrect');

const urlPattern = new RegExp('^(https?://|www\\.)\\S+', 'i');

const sendText = async () => {
	const originalURL = input.value.trim();

	if (urlPattern.test(originalURL)) {
		try {
			const response = await fetch('http://127.0.0.1:3000/', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json;charset=utf-8'
				}),
				body: JSON.stringify({ longUrl: input.value })
			});

			const result = await response.json();
			console.log(result.message);
			readyLink.classList.remove('no-active');
			readyLink.innerText = result.message;

		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	} else {
		incorrect.classList.toggle('no-active');
		setTimeout(() => {
			incorrect.classList.toggle('no-active');
		}, "2800");
	}
}
