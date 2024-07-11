document.addEventListener("DOMContentLoaded", () => {
		const input = document.getElementById("input");
		const output = document.getElementById("output");

		const welcomeMessage = "Welcome to the HCC Terminal!\nType 'help' to see a list of available commands.";
		printText(welcomeMessage);

		let currentDirectory = "/";
		let isCommandProcessing = false;

		const commands = {
				help: "Available commands:\n- help\n- about\n- contact\n- schedule\n- members\n- clear\n- dir\n- whoami\n- echo\n- logout\n- shutdown\n- slack\n- discord\n- cd\n- neofetch",
				about: "This is the HCC programming club's website. Our mission is to inspire and educate students in the field of computer science.",
				contact: "Contact us at: email@example.com",
				schedule: "Meetings are held every Friday at 3:00 PM in Room 101.",
				members: "Our club members are:\n- Alice\n- Bob\n- Charlie\n- Dana",
				whoami: "You are a guest user on the HCC Terminal.",
				slack: "Join our Slack: [Slack Invite Link]",
				discord: "Join our Discord: [Discord Invite Link]"
		};

		const directories = {
				"/": ["about", "contact", "schedule", "members", "whoami", "slack", "discord", "projects", "people"],
				"/projects": ["todo"],
				"/people": ["jack", "sergio"]
		};

		const projectLinks = {
				todo: "projects/todo.html"
		};

		const peopleLinks = {
				jack: "people/jack.html",
				sergio: "people/sergio.html"
		};

		input.addEventListener("keydown", (event) => {
				if (event.key === "Enter" && !isCommandProcessing) {
						const command = input.value.trim();
						printText(`\n$ ${command}`, () => {
								handleCommand(command);
								input.value = "";
						});
				}
		});

		function handleCommand(command) {
				const [cmd, ...args] = command.split(' ');

				isCommandProcessing = true;

				switch (cmd) {
						case "help":
						case "about":
						case "contact":
						case "schedule":
						case "members":
						case "whoami":
						case "slack":
						case "discord":
								printText(`\n${commands[cmd]}`, () => isCommandProcessing = false);
								break;
						case "clear":
								output.textContent = "";
								isCommandProcessing = false;
								break;
						case "dir":
								printText(`\nDirectory contents of ${currentDirectory}:\n${directories[currentDirectory].join('\n')}`, () => isCommandProcessing = false);
								break;
						case "echo":
								printText(`\n${args.join(' ')}`, () => isCommandProcessing = false);
								break;
						case "logout":
								printText("\nLogging out...", () => setTimeout(() => window.location.reload(), 1000));
								break;
						case "shutdown":
								printText("\nShutting down...", () => setTimeout(() => window.close(), 1000));
								break;
						case "cd":
								changeDirectory(args[0]);
								break;
						case "neofetch":
								printNeofetch();
								break;
						default:
								if (currentDirectory === "/projects" && projectLinks[cmd]) {
										window.location.href = projectLinks[cmd];
								} else if (currentDirectory === "/people" && peopleLinks[cmd]) {
										window.location.href = peopleLinks[cmd];
								} else {
										printText(`\nCommand not found: ${command}`, () => isCommandProcessing = false);
								}
				}
		}

		function changeDirectory(dir) {
				if (dir === "..") {
						if (currentDirectory !== "/") {
								const pathParts = currentDirectory.split('/');
								pathParts.pop();
								currentDirectory = pathParts.join('/') || "/";
								printText(`\nChanged directory to ${currentDirectory}`, () => isCommandProcessing = false);
						} else {
								printText("\nAlready in the root directory.", () => isCommandProcessing = false);
						}
				} else if (directories[currentDirectory].includes(dir)) {
						currentDirectory = `${currentDirectory === '/' ? '' : currentDirectory}/${dir}`;
						printText(`\nChanged directory to ${currentDirectory}`, () => isCommandProcessing = false);
				} else {
						printText(`\nDirectory not found: ${dir}`, () => isCommandProcessing = false);
				}
		}

		function printNeofetch() {
				const neofetchOutput = `
				 __   __  _______  _______ 
				|  | |  ||   _   ||       |
				|  |_|  ||  |_|  ||    _  |
				|       ||       ||   |_| |
				|       ||       ||    ___|
				|   _   ||   _   ||   |    
				|__| |__||__| |__||___|    

				HCC Terminal
				---------------------------
				OS: Web-Based Terminal
				Host: HCC Programming Club
				Kernel: JavaScript
				Uptime: Since Page Load
				Resolution: Responsive
				Terminal: Custom
				`;

				printText(neofetchOutput, () => isCommandProcessing = false);
		}

		function printText(text, callback) {
				let index = 0;
				function type() {
						if (index < text.length) {
								output.textContent += text.charAt(index);
								index++;
								setTimeout(type, 10); // Adjust the speed here (in milliseconds)
						} else if (callback) {
								callback();
						}
						output.scrollTop = output.scrollHeight;
				}
				type();
		}
});
