/* TODO: 
- Fill out the Cashflows object to make it rain
- Add passive animation to the wallet to attract attention there
*/

$(function() {
	var $benjamins;
	var moneyHomePosition;
	var $dragPrompt = $('#drag-prompt');
	var $personWallet = $('#person-wallet');
	var $flowerpot = $('#flowerpot');
	var $flower = $('#flower');
	var $charity = $('#charity');

	function createNewBenjamins() {
		// Initialize the benjamins on page load
		// Create a new dollar bill once the old one disappears
		$personWallet.before('<div class="interactive-target stationary" id="benjamins"></div>');
		$benjamins = $('#benjamins');
		
		// Defines where the money goes back to if the user doesn't drop it anywhere
		moneyHomePosition = {
			top: 108,
			left: 22,
			opacity: 0
		};

		$benjamins.draggable({
			// From http://stackoverflow.com/a/5848800
			// Reverts the money to your wallet if you don't drag it into the pot or the charity
			revert: function(event, ui) {
				disappearIntoPosition(moneyHomePosition);
				return !event;
			},
			containment: 'document',
			start: function(event, ui) {
				$(this).removeClass('stationary');
			}
		});
	}

	$flowerpot.droppable({
		drop: function(event, ui) {
			moneyHomePosition = {top: 108, left: 300, opacity: 0};
			disappearIntoPosition(moneyHomePosition);
			$flower.grow();
		},
		tolerance: 'touch',
		hoverClass: 'dragover-hover'
	});
	$charity.droppable({
		drop: function(event, ui) {
			moneyHomePosition = {top: 108, left: 600, opacity: 0};
			disappearIntoPosition(moneyHomePosition);
		},
		tolerance: 'touch',
		hoverClass: 'dragover-hover'
	});


	$flower.grow = function() {
		$flower.addClass('grown');
	};

	function disappearIntoPosition(position) {
		$dragPrompt.fadeOut(400, function(){$dragPrompt.remove();});
		$benjamins.animate(position,500,function(){
			$benjamins.remove();
			createNewBenjamins();
		});
	}

	createNewBenjamins();

	function cashflows() {
		
	}
});
