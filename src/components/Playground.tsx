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
			let gridRow: number[] = newArray[i];
			let trackerOne: number = 0;
			let trackerTwo: number = 1;
			while (trackerOne < 4) {
				if (trackerTwo === 4) {
					trackerTwo = trackerOne + 1;
					trackerOne++;
					continue;
				}
				if (gridRow[trackerOne] === 0 && gridRow[trackerTwo] === 0) {
					trackerTwo++;
				} else if (gridRow[trackerOne] === 0 && gridRow[trackerTwo] !== 0) {
					gridRow[trackerOne] = gridRow[trackerTwo];
					gridRow[trackerTwo] = 0;
					trackerTwo++;
				} else if (gridRow[trackerOne] !== 0 && gridRow[trackerTwo] === 0) {
					trackerTwo++;
				} else if (gridRow[trackerOne] !== 0 && gridRow[trackerTwo] !== 0) {
					if (gridRow[trackerOne] === gridRow[trackerTwo]) {
						gridRow[trackerOne] = gridRow[trackerOne] + gridRow[trackerTwo];
						gridRow[trackerTwo] = 0;
						trackerTwo = trackerOne + 1;
						trackerOne++;
					} else {
						trackerOne++;
						trackerTwo = trackerOne + 1;
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
			let gridRow: number[] = newArray[i];
			let trackerOne: number = gridRow.length - 1;
			let trackerTwo: number = trackerOne - 1;
			while (trackerOne > 0) {
				if (trackerTwo === -1) {
					trackerTwo = trackerOne - 1;
					trackerOne--;
					continue;
				}
				if (gridRow[trackerOne] === 0 && gridRow[trackerTwo] === 0) {
					trackerTwo--;
				} else if (gridRow[trackerOne] === 0 && gridRow[trackerTwo] !== 0) {
					gridRow[trackerOne] = gridRow[trackerTwo];
					gridRow[trackerTwo] = 0;
					trackerTwo--;
				} else if (gridRow[trackerOne] !== 0 && gridRow[trackerTwo] === 0) {
					trackerTwo--;
				} else if (gridRow[trackerOne] !== 0 && gridRow[trackerTwo] !== 0) {
					if (gridRow[trackerOne] === gridRow[trackerTwo]) {
						gridRow[trackerOne] = gridRow[trackerOne] + gridRow[trackerTwo];
						gridRow[trackerTwo] = 0;
						trackerTwo = trackerOne - 1;
						trackerOne--;
					} else {
						trackerOne--;
						trackerTwo = trackerOne - 1;
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
		let grid: number[][] = cloneDeep(boardContentArray);
		let oldBoardContentArray = JSON.parse(JSON.stringify(boardContentArray));
		for (let i = 3; i >= 0; i--) {
			let trackerOne = grid.length - 1;
			let trackerTwo = trackerOne - 1;
			while (trackerOne > 0) {
				if (trackerTwo === -1) {
					trackerTwo = trackerOne - 1;
					trackerOne--;
					continue;
				}
				if (grid[trackerOne][i] === 0 && grid[trackerTwo][i] === 0) {
					trackerTwo--;
				} else if (grid[trackerOne][i] === 0 && grid[trackerTwo][i] !== 0) {
					grid[trackerOne][i] = grid[trackerTwo][i];
					grid[trackerTwo][i] = 0;
					trackerTwo--;
				} else if (grid[trackerOne][i] !== 0 && grid[trackerTwo][i] === 0) {
					trackerTwo--;
				} else if (grid[trackerOne][i] !== 0 && grid[trackerTwo][i] !== 0) {
					if (grid[trackerOne][i] === grid[trackerTwo][i]) {
						grid[trackerOne][i] = grid[trackerOne][i] + grid[trackerTwo][i];
						grid[trackerTwo][i] = 0;
						trackerTwo = trackerOne - 1;
						trackerOne--;
					} else {
						trackerOne--;
						trackerTwo = trackerOne - 1;
					}
				}
			}
		}
		if (JSON.stringify(grid) !== JSON.stringify(oldBoardContentArray)) {
			addNumber(grid);
		}
		if (checkerFlag) {
			return grid;
		} else {
			setData(grid);
		}
	};

	const swipeUp = (checkerFlag: boolean) => {
		let grid: number[][] = cloneDeep(boardContentArray);
		let oldBoardContentArray = JSON.parse(JSON.stringify(boardContentArray));
		for (let i = 0; i < 4; i++) {
			let trackerOne = 0;
			let trackerTwo = 1;
			while (trackerOne < 4) {
				if (trackerTwo === 4) {
					trackerTwo = trackerOne + 1;
					trackerOne++;
					continue;
				}
				if (grid[trackerOne][i] === 0 && grid[trackerTwo][i] === 0) {
					trackerTwo++;
				} else if (grid[trackerOne][i] === 0 && grid[trackerTwo][i] !== 0) {
					grid[trackerOne][i] = grid[trackerTwo][i];
					grid[trackerTwo][i] = 0;
					trackerTwo++;
				} else if (grid[trackerOne][i] !== 0 && grid[trackerTwo][i] === 0) {
					trackerTwo++;
				} else if (grid[trackerOne][i] !== 0 && grid[trackerTwo][i] !== 0) {
					if (grid[trackerOne][i] === grid[trackerTwo][i]) {
						grid[trackerOne][i] = grid[trackerOne][i] + grid[trackerTwo][i];
						grid[trackerTwo][i] = 0;
						trackerTwo = trackerOne + 1;
						trackerOne++;
					} else {
						trackerOne++;
						trackerTwo = trackerOne + 1;
					}
				}
			}
		}
		if (JSON.stringify(oldBoardContentArray) !== JSON.stringify(grid)) {
			addNumber(grid);
		}
		if (checkerFlag) {
			return grid;
		} else {
			setData(grid);
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
