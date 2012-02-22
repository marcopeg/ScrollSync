

;(function($){
	
	var _syncs = [], _scrollSyncStep;
	
	
	
	/**
	 * Plugin's Info and Defaults
	 */
	$.scrollSync = {
		version: 		'1.0',
		author:			'Marco Pegoraro',
		authorMail:		'marco(dot)pegoraro(at)gmail(dot)com',
		git:			'',
		doc:			'',
		
		defaults: {
			ratio: 		1,
			sync: 		'>div',
			offset: 	0,
			
			syncAttr:	'rel',
			easing:		'swing',
			duration:	100
		}
	
	};
	
	
	

	/**
	 * jQuery Extension - The Plugin
	 */
	$.fn.scrollSync = function( cfg ) {
		
		// Build a local configuration
		cfg = $.extend({},$.scrollSync.defaults,cfg);
		
		
		$(this).each(function(){
			
			var obj = {
				_:		this,
				$:		$(this),
				cfg:	$.extend({},{},cfg)
			}
			
			var winH 	= $(window).height();
			var docH 	= $(document).height();
			
			
			
			// Setup default styles attribute to setup a window's height based column.
			// This colum will be moved responding to the document.scroll() event.
			obj.$.css({
				position:	'fixed',
				top:		0,
				height:		docH * obj.cfg.ratio 
			});
			
			
			
			// Loop throught items to be synced with.
			// Items are disposed vertically with proportions to their target related items identified by the attribute
			// specified in the "syncAttr" config property.
			//
			// This collection of items is searched inside target object by the "sync" path
			obj.$.find(obj.cfg.sync).each(function(){
				
				var $obj = $(this);
				var $rel = $($obj.attr(obj.cfg.syncAttr));
				
				if ( !$rel.length ) return;
				
				$obj.css({
					position: 	'absolute',
					top: 		$rel.offset().top * obj.cfg.ratio
				});
				
			
			});
			
			// Queque to the syncs collection.
			_syncs.push( obj );
			
			// Perform the first sync.
			_scrollSyncStep.call( obj, $(document).scrollTop() );
		
		});
		
	}; // EndOf: "$.fn.scrollSync()" ###
	
	
	
	
	
	/**
	 * Internal scroll logic.
	 * It moves synced columns to position it within the document scroll value.
	 */
	var _scrollSyncStep = function( scrollTop ) {
	
		var obj = this;
		
		obj.$.stop().animate({
			
			top: 0 - ( ( scrollTop + obj.cfg.offset ) * obj.cfg.ratio ) + obj.cfg.offset
			
		},obj.cfg.duration, obj.cfg.easing );
		
	}; // EndOf: "_scrollSyncStep()" ###
	
	
	
	
	/**
	 * Scroll Event Listener
	 */
	$(window).scroll(function(){
		
		var scrollTop = $(document).scrollTop();
		
		for ( var i=0; i<_syncs.length; i++ ) {
			
			_scrollSyncStep.call( _syncs[i], scrollTop );
			
		}
		
	});
	 
	 
})(jQuery);