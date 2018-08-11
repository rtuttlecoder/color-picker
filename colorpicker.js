var $el, hueValue = 170, x, y, opacValue = 1;

function huetorgb(m1, m2, h) {
       if( h < 0 ) h = h + 1;
  else if( h > 1 ) h = h - 1;

       if( h*6 < 1 ) return m1+(m2-m1)*h*6;
  else if( h*2 < 1 ) return m2;
  else if( h*3 < 2 ) return m1+(m2-m1)*(2/3-h)*6;
  else               return m1;
}

function hsltorgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  var m2 = (l <= 0.5) ? l*(s+1) : l+s-(l*s),
    m1 = l*2-m2,
    r = parseInt(huetorgb(m1, m2, h+1/3)*255),
    g = parseInt(huetorgb(m1, m2, h)*255),
    b = parseInt(huetorgb(m1, m2, h-1/3)*255);
  return [r, g, b];
}

function buildGrid(hue, opac) {

  $("#swatch-table").empty();

  for (x=0;x<10;++x) {
  
    $("<tr />", {
    
      "id": "row-" + x
    
    }).appendTo("#swatch-table");
          
    for (y=0; y<10; ++y) {
    
      hslaString = "hsla(" + hue + ", " + ((x*10)+5) + "%, " + ((y*10)+5) + "%, " + opac + ")";

      rgb = hsltorgb(hue, (x*10)+5, (y*10)+5);

      rgbaString = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opac + ")";
            
      $("<td />", {
      
        "class": "color-block",
        "css": {
          "background": hslaString
        }
      
      }).data("hsla",hslaString).data("rgba",rgbaString).click(function(){

        $(this).css("background",$.data(this,"rgba"));

        $("#color-info").html(
          
          "<span style='background: "+$.data(this,"hsla")+"';><strong>"+$.data(this,"hsla")+"</strong></span>"+
          "<span style='background: "+$.data(this,"rgba")+"';><strong>"+$.data(this,"rgba")+"</strong></span>"
        
        );

      }).html("&nbsp;").appendTo("#row-" + x);
    
    };
    
  };

};

$(function() {

  buildGrid(hueValue, opacValue);
  
  $("#enter-area").draggable({
    handle: "#handle",
    contain: "body"
  });
  
  $('#slider-hue').slider({
      min: 0,
      max: 360,
      value: 170,
      slide: function(event, ui) {
          hueValue = ui.value;
          buildGrid(hueValue, opacValue);
      }
  });
  
  $('#slider-opacity').slider({
      min: 0,
      max: 1,
      value: 1,
      step: 0.01,
      slide: function(event, ui) {
          opacValue = ui.value;
          buildGrid(hueValue, opacValue);
      }
  });
  
  $(window).resize(function() {
    $("#table-wrap").height($(window).height() - 77);
  }).trigger("resize");

  $("tr:nth-child(5) td:nth-child(5)").click();
  
});