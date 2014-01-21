define(["jquery", "bootstrap.min", "jquery.highlight"], function($) {
 
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	  var msViewportStyle = document.createElement("style")
	  msViewportStyle.appendChild(
	    document.createTextNode(
	      "@-ms-viewport{width:auto!important}"
	    )
	  )
	  document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}
 
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        $('pre.code').highlight({
            source:false, 
            zebra:false, 
            indent:'tabs', 
            list:'ul',
            attribute: 'data-language'
        });
        $(".collapse").collapse();    
    });
});
