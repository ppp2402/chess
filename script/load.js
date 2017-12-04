(function() {

	function setFirstRow(i) {
		var playerInitial;
		switch (i) {
			case 1:
			case 8:
				playerInitial = inputData.playerText.rook;
				break;
			case 2:
			case 7:
				playerInitial = inputData.playerText.knight;
				break;
			case 3:
			case 6:
				playerInitial = inputData.playerText.bishop;
				break;								
			case 4:
				playerInitial = inputData.playerText.king;
				break;								
			case 5:
				playerInitial = inputData.playerText.queen;
				break;
		}
		return playerInitial;
	}

	function setPlayerImage(playerInitial, playerColor) {
		/*var playerElement = document.createElement('img');
		playerElement.src = "images/"+playerImage;
		playerElement.setAttribute('alt','player');
		playerElement.setAttribute('width','50');
		playerElement.setAttribute('height','50');
		cellElement.appendChild(playerElement);*/

		var playerElement = document.createElement('p');
		playerElement.innerText = playerInitial;
		playerElement.classList.add('cellText');
		playerElement.style.color = playerColor;
		return playerElement;
	}

	function onPlayerClick(evt, domNode) {
		//console.log(evt, domNode);
	}

	function createCell(backgroundColor, dataCol, dataRow, playerImage, playerInitial, playerColor) {
		
		function isBlack(playerColor) {
			return (playerColor === 'black') ? true : false;
		}

		var cellElement = document.createElement('div');
		cellElement.classList.add('cell');
		cellElement.style.backgroundColor = backgroundColor;
		var attributeOb = {
			'data-col': dataCol,
			'data-row': dataRow,
			'data-isBlack': isBlack(playerColor)
		};
		for(attribute in attributeOb) {
			cellElement.setAttribute(attribute, attributeOb[attribute]);
		}
		cellElement.addEventListener('click', function(evt) {
			onPlayerClick(evt, this);
		});			
		
		if(playerInitial !== '')
			cellElement.appendChild(setPlayerImage(playerInitial, playerColor));

		return cellElement;
	}

	function setCellColor(backgroundColor) {
		return (backgroundColor === inputData.cellColorWhite) ? inputData.cellColorBlack : inputData.cellColorWhite;
	}

	function emptyChessBoard() {
		var chessBoard = document.getElementById('chessBoard');
		chessBoard.innerHTML = '';
		return chessBoard;
	}

	function createGrid() {
		var chessBoard = emptyChessBoard();
		var backgroundColor, cellElementTemp, playerColor, playerInitial;

		for(let i = 1; i <= 8; i++) {
			
			backgroundColor = setCellColor(backgroundColor);
			for(let j = 1; j <= 8; j++) {

				switch (i) {
					case 1:							
						playerColor = 'black';
						playerInitial = setFirstRow(j);
						break;
					case 2:
						playerColor = 'black';
						playerInitial = inputData.playerText.pawn;
						break;
					case 7:
						playerColor = inputData.whitePlayerColor;
						playerInitial = inputData.playerText.pawn;
						break;
					case 8:
						playerColor = inputData.whitePlayerColor;
						playerInitial = setFirstRow(j);
						break;
					default:
						playerColor = '';
						playerInitial = '';
						break;							
				}
				
				let cellElement = createCell(backgroundColor, j, i, '', playerInitial, playerColor);
				backgroundColor = setCellColor(backgroundColor);
				(i == 1 && j == 1) ? chessBoard.appendChild(cellElement) : chessBoard.insertBefore(cellElement, cellElementTemp);
				cellElementTemp = cellElement;
			}	
		}
	}

	function createInverseGrid() {			
		var chessBoard = emptyChessBoard();
		var backgroundColor, cellElementTemp, playerColor, playerInitial;

		for(let i = 8; i >= 1; i--) {
			
			backgroundColor = setCellColor(backgroundColor);
			for(let j = 8; j >= 1; j--) {

				switch (i) {
					case 1:							
						playerColor = 'black';
						playerInitial = setFirstRow(j);
						break;
					case 2:
						playerColor = 'black';
						playerInitial = inputData.playerText.pawn;
						break;
					case 7:
						playerColor = inputData.whitePlayerColor;
						playerInitial = inputData.playerText.pawn;
						break;
					case 8:
						playerColor = inputData.whitePlayerColor;
						playerInitial = setFirstRow(j);
						break;
					default:
						playerColor = '';
						playerInitial = '';
						break;							
				}
				
				let cellElement = createCell(backgroundColor, j, i, '', playerInitial, playerColor);
				backgroundColor = setCellColor(backgroundColor);
				(i == 8 && j == 8) ? chessBoard.appendChild(cellElement) : chessBoard.insertBefore(cellElement, cellElementTemp);
				cellElementTemp = cellElement;
			}	
		}
	}
	
	document.getElementById('flipButton').addEventListener('click', function() {
		if(localStorage.getItem('chessFlip') === '0') {
			localStorage.setItem('chessFlip','1');
			createInverseGrid();
		}
		else {
			localStorage.setItem('chessFlip','0');
			createGrid();
		}
	});
	
	function init() {
		createGrid();
		localStorage.setItem('chessFlip','0');
	}

	inputData = {
		cellColorWhite: 'burlywood',
		cellColorBlack: 'brown',
		whitePlayerColor: 'white',
		playerText: { 
			pawn: 'p',
			rook: 'R',
			knight: 'k',
			bishop: 'B',
			king: 'K',
			queen: 'Q'
		}
	}
	init();
	
})();

