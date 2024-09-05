() => {
	const arrpcSocket = new WebSocket("ws://127.0.0.1:1337")
	let currentData

	arrpcSocket.onmessage = async (x) => {
		currentData = JSON.parse(x.data)
	}

	async function fetchAppInfo(appId) {
		const response = await fetch(`https://discord.com/api/v10/applications/${appId}/rpc`)

		const data = await response.json()

		return data
	}

	let client;
	let intrvl;
	let starting;
	async function main() {
		client = await new Promise((res) => {
			setInterval(() => {
				if (window.controllers.client.isReady()) res(window.controllers.client.getReadyClient())
			}, 10)
		});

		starting = client.user.status.text
		let lastActivityUpdate = {}
		let lastStatus = ""
		let currentAppInfo = {}

		intrvl = setInterval(async () => {
			lastStatus = client.user.status.text

			if (currentData && currentData.activity) {
				if (lastActivityUpdate?.application_id !== currentData.activity.application_id) {
					// don't constantly bombard discord's servers
					currentAppInfo = await fetchAppInfo(currentData.activity.application_id);
				}
				
				lastActivityUpdate = currentData.activity
				const generatedStatusText = `(${currentAppInfo.name}) ${currentData.activity.details ?? ""} ${currentData.activity.state ?? ""}`

				if (lastStatus !== generatedStatusText) {
					// same thing with revolt lmao
					await client.api.patch("/users/@me", {
						status: {
							text: generatedStatusText
						}

					})
				}
			} else {
				if (client.user.status.text !== starting && lastStatus !== client.user.status.text) {
					await client.api.patch("/users/@me", {
						status: {
							text: starting
						}

					})
				}
			}
		}, 10000)
	}

	main()

	return {
		onUnload: async () => {
			await client.api.patch("/users/@me", { status: { text: starting } })
			clearInterval(intrvl)
			arrpcSocket.close(1000, "Plugin unloaded.")
		}
	}
}
