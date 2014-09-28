$(document).ready(function(){

	// Card Object Constructor
	function card(name, suit, value) {
		this.name = name;
		this.suit = suit;
		this.value = value;
	}
	var deck = new Array(); // 52 Deck of Cards
	var hand = new Array(); // Player's Hand
	// Card Objects
	// Hearts
	deck[0] = new card("Ace", "Hearts", 11);
	deck[1] = new card("Two", "Hearts", 2);
	deck[2] = new card("Three", "Hearts", 3);
	deck[3] = new card("Four", "Hearts", 4);
	deck[4] = new card("Five", "Hearts", 5);
	deck[5] = new card("Six", "Hearts", 6);
	deck[6] = new card("Seven", "Hearts", 7);
	deck[7] = new card("Eight", "Hearts", 8);
	deck[8] = new card("Nine", "Hearts", 9);
	deck[9] = new card("Ten", "Hearts", 10);
	deck[10] = new card("Jack", "Hearts", 10);
	deck[11] = new card("Queen", "Hearts", 10);
	deck[12] = new card("King", "Hearts", 10);

	// Diamonds
	deck[13] = new card("Ace", "Diamonds", 11);
	deck[14] = new card("Two", "Diamonds", 2);
	deck[15] = new card("Three", "Diamonds", 3);
	deck[16] = new card("Four", "Diamonds", 4);
	deck[17] = new card("Five", "Diamonds", 5);
	deck[18] = new card("Six", "Diamonds", 6);
	deck[19] = new card("Seven", "Diamonds", 7);
	deck[20] = new card("Eight", "Diamonds", 8);
	deck[21] = new card("Nine", "Diamonds", 9);
	deck[22] = new card("Ten", "Diamonds", 10);
	deck[23] = new card("Jack", "Diamonds", 10);
	deck[24] = new card("Queen", "Diamonds", 10);
	deck[25] = new card("King", "Diamonds", 10);

	// Clubs
	deck[26] = new card("Ace", "Clubs", 11);
	deck[27] = new card("Two", "Clubs", 2);
	deck[28] = new card("Three", "Clubs", 3);
	deck[29] = new card("Four", "Clubs", 4);
	deck[30] = new card("Five", "Clubs", 5);
	deck[31] = new card("Six", "Clubs", 6);
	deck[32] = new card("Seven", "Clubs", 7);
	deck[33] = new card("Eight", "Clubs", 8);
	deck[34] = new card("Nine", "Clubs", 9);
	deck[35] = new card("Ten", "Clubs", 10);
	deck[36] = new card("Jack", "Clubs", 10);
	deck[37] = new card("Queen", "Clubs", 10);
	deck[38] = new card("King", "Clubs", 10);

	// Spades
	deck[39] = new card("Ace", "Spades", 11);
	deck[40] = new card("Two", "Spades", 2);
	deck[41] = new card("Three", "Spades", 3);
	deck[42] = new card("Four", "Spades", 4);
	deck[43] = new card("Five", "Spades", 5);
	deck[44] = new card("Six", "Spades", 6);
	deck[45] = new card("Seven", "Spades", 7);
	deck[46] = new card("Eight", "Spades", 8);
	deck[47] = new card("Nine", "Spades", 9);
	deck[48] = new card("Ten", "Spades", 10);
	deck[49] = new card("Jack", "Spades", 10);
	deck[50] = new card("Queen", "Spades", 10);
	deck[51] = new card("King", "Spades", 10);

	// Get a random card
	function getRandomCard(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	// Reset the game back to the beginning
	function resetGame() {
		$('#hdrTotal').html("");
		$('#hdrResult').html("");
		$('#my_hand').empty();
//		toggle used to hide/show controls;
		$('#btnDeal').toggle();
		$('#btnStick').toggle();
		$('#btnRestart').toggle();

	}

	function EndGame(total, resultString) {
		$("#hdrResult").html(resultString);
		hand.length = 0;
//		toggle used to hide/show controls;
		$('#btnDeal').toggle();
		$('#btnStick').toggle();
		$('#btnRestart').toggle();
	}
	// Deal either 2 cards at start, or 1 card when user chooses to hit
	function Deal (n) {
		var i = 0;
		while (i < n) {
			var card = getRandomCard(0, 51);
			// if card has not been dealt, add to hand
			if ($.inArray(card, hand) === -1) {
				hand[hand.length] = card;
				i++;
			} else {   // else try again
				continue;
			}
			$('#my_hand').append("<img src='images/cards/" + deck[card].suit + "/" + deck[card].name + ".jpg'>");
		}
	}

	function Hand_Total(stick) {
		var total = 0; // keep running total of hand
		var resultString = ""; // Hold result of hand
		for (var i = 0; i < hand.length; i++) {
			total += deck[hand[i]].value;
		}
//		alert(total);
		$("#hdrTotal").html("Total: " + total);

		if (stick) { // if user chooses not to hit
			if (total > 17 && total <= 21) {
				resultString = "You beat the dealer!";
				EndGame(total, resultString);
			} else {
				resultString = "Dealer Wins!";
				EndGame(total, resultString);
			}
		} else { // else if user wins
			if (total === 21) {
				resultString = "You have 21! You Win!";
				EndGame(total, resultString);
			}
			if (total > 21) {
				resultString = "BUST! You Lose!";
				EndGame(total, resultString);
			}
			if (hand.length === 5 && !(total > 21)) {
				resultString = "Five Card WIN!";
				EndGame(total, resultString);
			}
		}
	}

	$('#btnDeal').click(function() {
		if (hand.length == 0) { // no cards yet dealth, so deal 2 cards
			Deal(2);
		} else if (hand.length <= 5) { // user chooses to hit after initial 2 cards or more
			Deal(1);
		}
		Hand_Total();
	});
	
	$('#btnStick').click(function() {
		var stick = true;
		Hand_Total(stick);
	});

	$('#btnRestart').click(function() {
		resetGame();
	});
	$('#btnRestart').toggle();

}); // End document.ready