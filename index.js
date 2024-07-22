`use strict`;

function getComputerChoice() {
	const option = [`rock`, `paper`, `scissors`];
	const randomNumber = Math.floor(Math.random() * option.length);
	return option[randomNumber];
}

function getHumanChoice() {
	const message = prompt(
		`Time to beat the computer. 🤖\n\nChoose:\n(1) Rock\n(2) Paper\n(3) Scissors`
	).toLowerCase();

	switch (message) {
		case `1`:
			return `rock`;
		case `2`:
			return `paper`;
		case `3`:
			return `scissors`;
		case `r`:
			return `rock`;
		case `p`:
			return `paper`;
		case `s`:
			return `scissors`;
	}

	return message;
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
	const gameRules = [
		{
			condition: humanChoice === computerChoice,
			message: `👱🏼 You: ${humanChoice}\n🤖 Computer: ${computerChoice}\n\nDraw this time!`,
			func: null
		},
		{
			condition: humanChoice === `rock` && computerChoice === `scissors`,
			message: `👱🏼 You: ${humanChoice}\n🤖 Computer: ${computerChoice}\n\nRock beats Scissors.\nYou got +1!`,
			func: () => {
				return humanScore++;
			}
		},
		{
			condition: computerChoice === `rock` && humanChoice === `scissors`,
			message: `👱🏼 You: ${humanChoice}\n🤖 Computer: ${computerChoice}\n\nRock beats Scissors.\nComputer got +1!`,
			func: () => {
				return computerScore++;
			}
		},
		{
			condition: humanChoice === `rock` && computerChoice === `paper`,
			message: `👱🏼 You: ${humanChoice}\n🤖 Computer: ${computerChoice}\n\nPaper beats Rock.\nComputer got +1`,
			func: () => {
				return computerScore++;
			}
		},
		{
			condition: computerChoice === `rock` && humanChoice === `paper`,
			message: `👱🏼 You: ${humanChoice}\n🤖 Computer: ${computerChoice}\n\nPaper beats Rock.\nYou got +1`,
			func: () => {
				return humanScore++;
			}
		},
		{
			condition: computerChoice === `scissors` && humanChoice === `paper`,
			message: `👱🏼 You: ${humanChoice}\n🤖 Computer: ${computerChoice}\n\nScissors beats Paper.\nComputer got +1`,
			func: () => {
				return computerScore++;
			}
		},
		{
			condition: humanChoice === `scissor` && computerChoice === `paper`,
			message: `👱🏼 You: ${humanChoice}\n🤖 Computer: ${computerChoice}\n\nScissor beats Paper.\nYou got +1`,
			func: () => {
				return humanScore++;
			}
		}
	];

	gameRules.forEach((rule) => {
		if (rule.condition) {
			console.log(rule.message);
			if (rule.func) rule.func();
			console.log(
				`Score:\n👱🏼 Human: ${humanScore}\n🤖 Computer: ${computerScore}`
			);
		}
	});
}

function playGame() {
	const round = 5;
	while (humanScore < round && computerScore < round) {
		const humanSelection = getHumanChoice();
		const computerSelection = getComputerChoice();
		playRound(humanSelection, computerSelection);
	}

	if (humanScore === 5) {
		console.log(`You Won! 🥳🎉`);
	} else if (computerScore === 5) {
		console.log(`You Lose! 😔🪨`);
	}
}

const playButton = document.getElementById(`play`);

playButton.addEventListener(`click`, () => {
	if (humanScore === 5 || computerScore === 5) {
		const message = prompt(
			'Do you want to start another game?\n(Y) Yes or (N) No'
		).toLowerCase();

		if (message === 'y' || message === 'yes') {
			console.clear();
			console.log(`The epic-game is started! 😁`);
			humanScore = 0;
			computerScore = 0;
			playGame();
		} else {
			return console.log('Nice to play you again! 😁');
		}
	} else {
		console.log(`The epic-game is started! 😁`);
		playGame();
	}
});
