define(["jquery", "bootstrap.min"], function($){
   var icons = $("#icons span");
   var getSize = function() {
      var size = $("#svg-size").val();
      size = size.replace(/\D+/, '');
      return size;
   }

   // Activate the tooltips
   $(icons).tooltip();

   // Fetch svg file for the icon selected
   // Show it in the svg-container and update size/colour
   $(icons).on("click", function(e){
      var iconName = $(this).data("original-title");
      var fileName = iconName.replace("medical-icon-", "") + ".svg";
      var filePath = "packages/svg/" + fileName;
      $.get(filePath).done(function(data){
         var icon = $(data).find("svg");
         $("#svg-container").html(icon);
         $("#svg-size").trigger("keyup");
         $("#svg-colour").trigger("change");
      }).fail(function(){
         console.log("Could not find: " + filePath);
         $("#svg-container").html("<p>Failed to get svg file</p><p>:(</p>");
      });
   });


   // Convert svg -> png
   // https://gist.github.com/gustavohenke/9073132
   $("#save-icon").on("click", function(e){
      e.preventDefault();

      var size = getSize();
      var svg = $("#svg-container svg")[0];
      var svgData = new XMLSerializer().serializeToString(svg);
      var canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext("2d");
      var img = document.createElement("img");
      img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
      img.onload = function() {
         ctx.drawImage(img, 0, 0);

         var url = canvas.toDataURL("image/png");
         console.log("PNG dataUri: " + url);
         window.open(url, "_blank");
      };
   });

   $("#svg-colour").on("change keyup", function() {
      var colour = $(this).val();
      $.each($("#svg-container svg path"), function(index, path){
         $(path).attr("fill", colour);
      })
   });

   $("#svg-size").on("change keyup", function() {
      var size = getSize();
      var svg = $("#svg-container svg")[0];
      svg.setAttribute("width", size);
      svg.setAttribute("height", size)
   });

   // A very bad search/filter, but may be useful for those who
   // roughly know the icon names
   $("#search").on("keyup", function() {
      var searchTerm = $(this).val();
      $.each(icons, function(i, icon) {
         var title = $(icon).data("original-title");
         if (title.indexOf(searchTerm) === -1) {
            $(icon).addClass("hidden");
         } else {
            $(icon).removeClass("hidden");
         }
      });
   });
});
