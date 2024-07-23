document.addEventListener("DOMContentLoaded", () => {
		const input = document.getElementById("input");
		const output = document.getElementById("output");

		const welcomeMessage = "Welcome to the HCC Terminal!\nType 'help' to see a list of available commands.";
		printText(welcomeMessage);

		let currentDirectory = "/";
		let isCommandProcessing = false;

		const commands = {
				help: function() {
						return "Available commands:\n- help\n- license\n- about\n- contact\n- schedule\n- members\n- clear\n- dir\n- whoami\n- echo\n- logout\n- shutdown\n- slack\n- discord\n- cd\n- neofetch\n- cat";
				},
				license: function() {
						window.location.href = './license.html';
						return "Sending to Carbonated License page.";
				},
				about: function() {
						return "This is the HCC programming club's website. Our mission is to inspire and educate students in the field of computer science.";
				},
				contact: function() {
						return "Contact us at: email@example.com";
				},
				schedule: function() {
						return "Meetings are held every Friday at 3:00 PM in Room 101.";
				},
				members: function() {
						return "Our club members are:\n- Alice\n- Bob\n- Charlie\n- Dana";
				},
				whoami: function() {
						return "You are a guest user on the HCC Terminal.";
				},
				slack: function() {
						return "Join our Slack: [Slack Invite Link]";
				},
				discord: function() {
						return "Join our Discord: [Discord Invite Link]";
				},
				clear: function() {
						return { clear: true };
				},
				dir: function(args, currentDirectory, directories) {
						return `Directory contents of ${currentDirectory}:\n${directories[currentDirectory].map(item => directories[`${currentDirectory === '/' ? '' : currentDirectory}/${item}`] ? `./${item}` : item).join('\n')}`;
				},
				echo: function(args) {
						return args.join(' ');
				},
				logout: function() {
						return "Logging out...";
				},
				shutdown: function() {
						return "Shutting down...";
				},
				cd: function(args, currentDirectory, directories) {
						const dir = args[0];
						if (dir === "..") {
								if (currentDirectory !== "/") {
										const pathParts = currentDirectory.split('/');
										pathParts.pop();
										return { newDir: pathParts.join('/') || "/" };
								} else {
										return "Already in the root directory.";
								}
						} else if (directories[currentDirectory].includes(dir) && directories.hasOwnProperty(`${currentDirectory === '/' ? '' : currentDirectory}/${dir}`)) {
								return { newDir: `${currentDirectory === '/' ? '' : currentDirectory}/${dir}` };
						} else {
								return `Directory not found: ${dir}`;
						}
				},
				neofetch: function() {
						return `\n    HCC-TERMINAL\n~~~~~~~~~~~~~~~~~~~~\nVersion: 1.0.0\nKernel: Web-Based Linux\nArchitecture: x86_64\nOS: Linux\nHostname: hcc-terminal`;
				},
				cat: function(args) {
						const file = args[0];
						if (commands[file]) {
								return commands[file]();
						} else {
								return `File not found: ${file}`;
						}
				}
		};

		const directories = {
				"/": ["about", "contact", "schedule", "members", "whoami", "slack", "discord", "projects", "people"],
				"/projects": ["todo", "joker3d"],
				"/people": ["jack", "sergio"]
		};

		const projectLinks = {
				todo: "projects/todo/todo.html",
				joker3d: "projects/joker3d/index.html"
		};

		const peopleLinks = {
				jack: "people/jack/jack.html",
				sergio: "people/sergio.html"
		};

		// Populate people directory dynamically
		Object.keys(peopleLinks).forEach(person => {
				directories["/people"].push(person);
		});

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

				if (commands[cmd]) {
						const result = commands[cmd](args, currentDirectory, directories);

						if (typeof result === "object") {
								if (result.clear) {
										output.textContent = "";
										isCommandProcessing = false;
										return;
								}
								if (result.newDir) {
										currentDirectory = result.newDir;
										printText(`\nChanged directory to ${currentDirectory}`, () => isCommandProcessing = false);
										return;
								}
						} else {
								printText(`\n${result}`, () => isCommandProcessing = false);
						}
				} else if (currentDirectory === "/projects" && projectLinks[cmd]) {
						window.location.href = projectLinks[cmd];
				} else if (currentDirectory === "/people" && peopleLinks[cmd]) {
						window.location.href = peopleLinks[cmd];
				} else {
						printText(`\nCommand not found: ${command}`, () => isCommandProcessing = false);
				}
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
