document.addEventListener("DOMContentLoaded", () => {
		const input = document.getElementById("input");
		const output = document.getElementById("output");

		const welcomeMessage = "Welcome to the HCC Terminal!\nType 'help' to see a list of available commands.";
		printText(welcomeMessage);

		input.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
						const command = input.value.trim();
						printText(`\n$ ${command}`, () => {
								handleCommand(command);
								input.value = "";
						});
				}
		});

		const commands = {
				help: "Available commands: help, about, contact, schedule, members, clear, dir, whoami, echo, logout, shutdown, slack, discord",
				about: "This is the HCC programming club's website. Our mission is to inspire and educate students in the field of computer science.",
				contact: "Contact us at: email@example.com",
				schedule: "Meetings are held every Friday at 3:00 PM in Room 101.",
				members: "Our club members are:\n- Alice\n- Bob\n- Charlie\n- Dana",
				whoami: "You are a guest user on the HCC Terminal.",
				slack: "Join our Slack: [Slack Invite Link]",
				discord: "Join our Discord: [Discord Invite Link]"
		};

		function handleCommand(command) {
				const [cmd, ...args] = command.split(' ');
				switch(cmd) {
						case "help":
						case "about":
						case "contact":
						case "schedule":
						case "members":
						case "whoami":
						case "slack":
						case "discord":
								printText(`\n${commands[cmd]}`);
								break;
						case "clear":
								output.textContent = "";
								break;
						case "dir":
								printText("\nDirectory:\n- about\n- contact\n- schedule\n- members\n- whoami\n- slack\n- discord");
								break;
						case "echo":
								printText(`\n${args.join(' ')}`);
								break;
						case "logout":
								printText("\nLogging out...");
								setTimeout(() => window.location.reload(), 1000);
								break;
						case "shutdown":
								printText("\nShutting down...");
								setTimeout(() => window.close(), 1000);
								break;
						default:
								printText(`\nCommand not found: ${command}`);
				}
		}

		function printText(text, callback) {
				let index = 0;
				function type() {
						if (index < text.length) {
								output.textContent += text.charAt(index);
								index++;
								setTimeout(type, 10);
						} else if (callback) {
								callback();
						}
						output.scrollTop = output.scrollHeight;
				}
				type();
		}
});
