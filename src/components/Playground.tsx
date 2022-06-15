import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";
import { useEvent } from "../utils";
import "./Playground.css";
import Block from "./Block";

function Playground() {
	const UP: number = 38;
	const DOWN: number = 40;
	const LEFT: number = 37;
	const RIGHT: number = 39;

	const [boardContentArray, setData] = useState([
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	]);

	const [gameOver, setGameOver] = useState(false);

	const initialize = () => {
		let newBoardContentArray: number[][];
		newBoardContentArray = cloneDeep(boardContentArray);
		addNumber(newBoardContentArray);
		addNumber(newBoardContentArray);
		setData(newBoardContentArray);
	};

	const addNumber = (newBoardContentArray: number[][]) => {
		let isAdded: boolean = false;
		let isGridFull: boolean = false;
		let attempts: number = 0;
		while (!isAdded) {
			if (isGridFull) {
				break;
			}

			let x: number = Math.floor(Math.random() * 4);
			let y: number = Math.floor(Math.random() * 4);
			attempts++;
			if (newBoardContentArray[x][y] === 0) {
				newBoardContentArray[x][y] = Math.random() > 0.5 ? 2 : 4;
				isAdded = true;
			}
			if (attempts > 50) {
				isGridFull = true;
			}
		}
	};

	const swipeLeft = (checkerFlag: boolean) => {
		let oldBoardContentArray: number[][] = boardContentArray;
		let newArray: number[][] = cloneDeep(boardContentArray);

		for (let i = 0; i < 4; i++) {
			let b: number[] = newArray[i];
			let slow: number = 0;
			let fast: number = 1;
			while (slow < 4) {
				if (fast === 4) {
					fast = slow + 1;
					slow++;
					continue;
				}
				if (b[slow] === 0 && b[fast] === 0) {
					fast++;
				} else if (b[slow] === 0 && b[fast] !== 0) {
					b[slow] = b[fast];
					b[fast] = 0;
					fast++;
				} else if (b[slow] !== 0 && b[fast] === 0) {
					fast++;
				} else if (b[slow] !== 0 && b[fast] !== 0) {
					if (b[slow] === b[fast]) {
						b[slow] = b[slow] + b[fast];
						b[fast] = 0;
						fast = slow + 1;
						slow++;
					} else {
						slow++;
						fast = slow + 1;
					}
				}
			}
		}
		if (JSON.stringify(oldBoardContentArray) !== JSON.stringify(newArray)) {
			addNumber(newArray);
		}
		if (checkerFlag) {
			return newArray;
		} else {
			setData(newArray);
		}
	};

	const swipeRight = (checkerFlag: boolean) => {
		let oldBoardContentArray: number[][] = boardContentArray;
		let newArray: number[][] = cloneDeep(boardContentArray);

		for (let i = 3; i >= 0; i--) {
			let b: number[] = newArray[i];
			let slow: number = b.length - 1;
			let fast: number = slow - 1;
			while (slow > 0) {
				if (fast === -1) {
					fast = slow - 1;
					slow--;
					continue;
				}
				if (b[slow] === 0 && b[fast] === 0) {
					fast--;
				} else if (b[slow] === 0 && b[fast] !== 0) {
					b[slow] = b[fast];
					b[fast] = 0;
					fast--;
				} else if (b[slow] !== 0 && b[fast] === 0) {
					fast--;
				} else if (b[slow] !== 0 && b[fast] !== 0) {
					if (b[slow] === b[fast]) {
						b[slow] = b[slow] + b[fast];
						b[fast] = 0;
						fast = slow - 1;
						slow--;
					} else {
						slow--;
						fast = slow - 1;
					}
				}
			}
		}
		if (JSON.stringify(newArray) !== JSON.stringify(oldBoardContentArray)) {
			addNumber(newArray);
		}
		if (checkerFlag) {
			return newArray;
		} else {
			setData(newArray);
		}
	};

	const swipeDown = (checkerFlag: boolean) => {
		let b: number[][] = cloneDeep(boardContentArray);
		let oldBoardContentArray = JSON.parse(JSON.stringify(boardContentArray));
		for (let i = 3; i >= 0; i--) {
			let slow = b.length - 1;
			let fast = slow - 1;
			while (slow > 0) {
				if (fast === -1) {
					fast = slow - 1;
					slow--;
					continue;
				}
				if (b[slow][i] === 0 && b[fast][i] === 0) {
					fast--;
				} else if (b[slow][i] === 0 && b[fast][i] !== 0) {
					b[slow][i] = b[fast][i];
					b[fast][i] = 0;
					fast--;
				} else if (b[slow][i] !== 0 && b[fast][i] === 0) {
					fast--;
				} else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
					if (b[slow][i] === b[fast][i]) {
						b[slow][i] = b[slow][i] + b[fast][i];
						b[fast][i] = 0;
						fast = slow - 1;
						slow--;
					} else {
						slow--;
						fast = slow - 1;
					}
				}
			}
		}
		if (JSON.stringify(b) !== JSON.stringify(oldBoardContentArray)) {
			addNumber(b);
		}
		if (checkerFlag) {
			return b;
		} else {
			setData(b);
		}
	};

	const swipeUp = (checkerFlag: boolean) => {
		let b: number[][] = cloneDeep(boardContentArray);
		let oldBoardContentArray = JSON.parse(JSON.stringify(boardContentArray));
		for (let i = 0; i < 4; i++) {
			let slow = 0;
			let fast = 1;
			while (slow < 4) {
				if (fast === 4) {
					fast = slow + 1;
					slow++;
					continue;
				}
				if (b[slow][i] === 0 && b[fast][i] === 0) {
					fast++;
				} else if (b[slow][i] === 0 && b[fast][i] !== 0) {
					b[slow][i] = b[fast][i];
					b[fast][i] = 0;
					fast++;
				} else if (b[slow][i] !== 0 && b[fast][i] === 0) {
					fast++;
				} else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
					if (b[slow][i] === b[fast][i]) {
						b[slow][i] = b[slow][i] + b[fast][i];
						b[fast][i] = 0;
						fast = slow + 1;
						slow++;
					} else {
						slow++;
						fast = slow + 1;
					}
				}
			}
		}
		if (JSON.stringify(oldBoardContentArray) !== JSON.stringify(b)) {
			addNumber(b);
		}
		if (checkerFlag) {
			return b;
		} else {
			setData(b);
		}
	};

	const checkIfGameOver = () => {
		let checkSwipeLeft: number[][] | undefined = swipeLeft(true);

		if (JSON.stringify(boardContentArray) !== JSON.stringify(checkSwipeLeft)) {
			return false;
		}

		let checkSwipeDown: number[][] | undefined = swipeDown(true);
		if (JSON.stringify(boardContentArray) !== JSON.stringify(checkSwipeDown)) {
			return false;
		}

		let checkSwipeRight: number[][] | undefined = swipeRight(true);

		if (JSON.stringify(boardContentArray) !== JSON.stringify(checkSwipeRight)) {
			return false;
		}

		let checkSwipeUp: number[][] | undefined = swipeUp(true);

		if (JSON.stringify(boardContentArray) !== JSON.stringify(checkSwipeUp)) {
			return false;
		}

		return true;
	};
	const resetGame = () => {
		setGameOver(false);
		const emptyGrid = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		addNumber(emptyGrid);
		addNumber(emptyGrid);
		setData(emptyGrid);
	};

	const handleKeyDown = (event: any) => {
		if (gameOver) {
			return;
		}
		switch (event.keyCode) {
			case UP:
				swipeUp(false);
				break;
			case DOWN:
				swipeDown(false);
				break;
			case LEFT:
				swipeLeft(false);
				break;
			case RIGHT:
				swipeRight(false);
				break;
			default:
				break;
		}

		let isGameOver = checkIfGameOver();
		if (isGameOver) {
			setGameOver(true);
		}
	};

	useEffect(() => {
		initialize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEvent("keydown", handleKeyDown);

	return (
		<div className="App">
			<div className="appContainer">
				<div className="innerContainer">
					<div className="gameTitle">2048</div>
					<div>
						<div onClick={resetGame} className="newGameButton">
							NEW GAME
						</div>
					</div>
				</div>
				<div className="gameBoard">
					{gameOver && (
						<div className="gameOverOverlay">
							<div>
								<div className="gameOverMessage">Game Over</div>
								<div>
									<div onClick={resetGame} className="tryAgainButton">
										Try Again
									</div>
								</div>
							</div>
						</div>
					)}
					{boardContentArray.map((row, oneIndex) => {
						return (
							<div style={{ display: "flex" }} key={oneIndex}>
								{row.map((digit, index) => (
									<Block num={digit} key={index} />
								))}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Playground;
