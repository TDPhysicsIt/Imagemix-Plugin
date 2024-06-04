/*
Image-Mix-Plugin
Two Image-Boxes
Mix in Fullscreen-Mode
Auto-Mix
Screenrecord-Mode with Microphone
(C) 2024 Thomas Dittmar
*/

(function($) {
  $.fn.imageMix = function(imgoptions) {
    var imgsettings = $.extend({
      "path": "file:///C:/Users/sonvt/OneDrive/Bilder/",
      "image": ["djset.jpg", "videomix.jpg"],
      "imagelistBackground": "#303030",
      "imageCanvas": "#202020",
      "galleryCols": 6
    },imgoptions);
    
    var imageelement = this;
    
    var imgmain = $("<div/>");
    imgmain.css({
      "width": "98%",
      "height": "96%",
      "background": "#151515",
      "border": "4px outset grey",
      "padding": "12px",
      "overflow": "auto"
    });
    
    imageelement.html(imgmain);
    
    var imgArea1 = $("<div/>");
    imgArea1.css({
      "width": "99%",
      "background": "#212121",
      "display": "flex",
      "flex-direction": "row",
      "text-align": "left",
      "margin-bottom": "6px"
    });
    
    imgArea1.appendTo(imgmain);
    
    var imgplayerArea1 = $("<div/>");
    imgplayerArea1.css({
      "width": "42%",
      "height": "440px",
      "background": "#303030",
    });
    
    imgplayerArea1.appendTo(imgArea1);
    
    var imgTools1 = $("<div/>");
    imgTools1.css({
      "width": "16%",
      "height": "440px",
      "background": "#202020",
    });
    
    imgTools1.appendTo(imgArea1);
    
    var imgplayerArea2 = $("<div/>");
    imgplayerArea2.css({
      "width": "42%",
      "height": "440px",
      "background": "#303030",
    });
    
    imgplayerArea2.appendTo(imgArea1);
    
    var imgbox1 = $("<img id='imgbox1'/>");
    imgbox1.css({
      "width": "100%",
      "height": "100%"
    }).attr("src", imgsettings.path+""+imgsettings.image[0]).appendTo(imgplayerArea1);
    
    var imgbox2 = $("<img id='imgbox2'/>");
    imgbox2.css({
      "width": "100%",
      "height": "100%"
    }).attr("src", imgsettings.path+""+imgsettings.image[1]).appendTo(imgplayerArea2);
    
    var currentImage = 0;
    
    var imgcrossfadeBox = $("<div/>");
    imgcrossfadeBox.css({
      "width": "100%",
      "text-align": "center",
    });
    
    imgcrossfadeBox.appendTo(imgTools1);
    
    var imgcrossfadeImg = $("<img/>");
    imgcrossfadeImg.css({
      "width": "200px",
      "height": "100px"
    })
      .attr("src", "Symbole/Fade.png");
    
    imgcrossfadeImg.appendTo(imgcrossfadeBox);
    
    var imgcrfadeBox1 = $("<div/>");
    imgcrfadeBox1.css({
      "width": "100%",
      "text-align": "center",
      "margin-top": "6px"
    });
    
    imgcrfadeBox1.appendTo(imgTools1);
    
    var imgfader1 = $("<input type='range' class='slider' style='width:200px; height:20px; background:#00a3ff;'/>");
    imgfader1.attr({
      "max": 1,
      "min": 0,
      "step": 0.01,
      "value": 1
    });
    
    imgfader1.appendTo(imgcrfadeBox1);
    
    var imgcrfadeBox2 = $("<div/>");
    imgcrfadeBox2.css({
      "width": "100%",
      "text-align": "center",
      "margin-top": "6px"
    });
    
    imgcrfadeBox2.appendTo(imgTools1);
    
    var imgfader2 = $("<input type='range' class='slider' style='width:200px; height:20px; background:#00a3ff;'/>");
    imgfader2.attr({
      "max": 1,
      "min": 0,
      "step": 0.01,
      "value": 0
    });
    
    imgfader2.appendTo(imgcrfadeBox2);
    
    var imgcrfadeAttr1 = $("<div/>");
    imgcrfadeAttr1.css({
      "width": "100%",
      "text-align": "center",
      "margin-top": "6px"
    });
    
    imgcrfadeAttr1.appendTo(imgTools1);
    
    var imgcrossFadeMode = $("<select style='width:140px; height:40px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset grey; border-radius:6px;'><option value='Fade'>Fade</option><option value='FadeOut'>FadeOut</option><option value='FadeIn'>FadeIn</option><option value='FadeInFast'>FadeInFast</option><option value='FadeTO'>FadeTimeOut</option></select>");
    imgcrossFadeMode.appendTo(imgcrfadeAttr1);
    
    var imgcrossFadeTime = $("<input type='number' style='width:60px; height:30px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset grey; margin-left:6px; border-radius:6px;'>");
    imgcrossFadeTime.attr({
      "max": 30,
      "min": 0.1,
      "step": 0.1,
      "value": 10
    });
    
    imgcrossFadeTime.appendTo(imgcrfadeAttr1);
    
    var imgcrfadeAttr2 = $("<div/>");
    imgcrfadeAttr2.css({
      "width": "100%",
      "text-align": "center",
      "margin-top": "6px"
    });
    
    imgcrfadeAttr2.appendTo(imgTools1);
    
    var imgEffectMode = $('<select style="width:220px; height:40px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset grey; border-radius:6px;"><option value="" style="background:#151515;">No Filter</option><optgroup style="background:green; font-weight:bold; color:yellow;" label="Color &amp; Fading-Effects"><option value="filter1" style="background:#151515; color:white;">Fade Blur</option><option value="filter2" style="background:#151515; color:white;">Fade Dark</option><option value="filter3" style="background:#151515; color:white;">Fade Gray</option><option value="filter4" style="background:#151515; color:white;">Fade Full</option></optgroup><optgroup style="background:red; font-weight:bold; color:yellow;" label="Standard Move-Effects"><option value="filter5" style="background:#151515; color:white;">Zoom InOut</option><option value="filter6" style="background:#151515; color:white;">Zoom OutIn</option><option value="filter7" style="background:#151515; color:white;">Compress Horizontal</option><option value="filter8" style="background:#151515; color:white;">Compress Vertical</option><option value="filter9" style="background:#151515; color:white;">Compress &amp; Rotate horizontal</option><option value="filter10" style="background:#151515; color:white;">Compress &amp; Rotate vertical</option><option value="filter11" style="background:#151515; color:white;">SlideOut horizontal</option><option value="filter12" style="background:#151515; color:white;">SlideOut vertical</option><option value="filter13" style="background:#151515; color:white;">SlideOut diagonal</option><option value="filter14" style="background:#151515; color:white;">SlideOut &amp; compress horizontal</option><option value="filter15" style="background:#151515; color:white;">SlideOut &amp; compress vertical</option><option value="filter16" style="background:#151515; color:white;">SlideOut &amp; compress diagonal</option><option value="filter17" style="background:#151515; color:white;">SlideOut &amp; rotate horizontal</option><option value="filter18" style="background:#151515; color:white;">SlideOut &amp; rotate vertical</option><option value="filter19" style="background:#151515; color:white;">Stretch horizontal</option><option value="filter20" style="background:#151515; color:white;">Stretch vertical</option><option value="filter21" style="background:#151515; color:white;">Stretch diagonal from left to right</option><option value="filter22" style="background:#151515; color:white;">Stretch diagonal from right to left</option><option value="filter23" style="background:#151515; color:white;">Stretch diagonal from top to bottom</option><option value="filter24" style="background:#151515; color:white;">Stretch diagonal from bottom to top</option><option value="filter25" style="background:#151515; color:white;">Pop &amp; Compress horizontal</option><option value="filter26" style="background:#151515; color:white;">Pop &amp; Compress vertical</option><option value="filter27" style="background:#151515; color:white;">Pop &amp; Compress diagonal</option><option value="filter28" style="background:#151515; color:white;">Pop &amp; Rotate horizontal</option><option value="filter29" style="background:#151515; color:white;">Pop &amp; Rotate vertical</option><option value="filter30" style="background:#151515; color:white;">Pop &amp; Rotate diagonal</option></optgroup><optgroup style="background:navy; font-weight:bold; color:yellow;" label="Ellipse Moving-Effects"><option value="filter31" style="background:#151515; color:white;">Zoom-Elipse InOut</option><option value="filter32" style="background:#151515; color:white;">Compress-Elipse Horizontal</option><option value="filter33" style="background:#151515; color:white;">Compress-Elipse Vertical</option><option value="filter34" style="background:#151515; color:white;">Compress &amp; Rotate-Elipse horizontal</option><option value="filter35" style="background:#151515; color:white;">Compress &amp; Rotate-Elipse vertical</option><option value="filter36" style="background:#151515; color:white;">SlideOut &amp; compress-Elipse horizontal</option><option value="filter37" style="background:#151515; color:white;">SlideOut &amp; compress-Elipse vertical</option><option value="filter38" style="background:#151515; color:white;">SlideOut &amp; compress-Elipse diagonal</option><option value="filter39" style="background:#151515; color:white;">SlideOut &amp; rotate-Elipse horizontal</option><option value="filter40" style="background:#151515; color:white;">SlideOut &amp; rotate-Elipse vertical</option><option value="filter41" style="background:#151515; color:white;">Pop &amp; Compress-Elipse horizontal</option><option value="filter42" style="background:#151515; color:white;">Pop &amp; Compress-Elipse vertical</option><option value="filter43" style="background:#151515; color:white;">Pop &amp; Compress-Elipse diagonal</option><option value="filter44" style="background:#151515; color:white;">Pop &amp; Rotate-Elipse horizontal</option><option value="filter45" style="background:#151515; color:white;">Pop &amp; Rotate-Elipse vertical</option><option value="filter46" style="background:#151515; color:white;">Pop &amp; Rotate-Elipse diagonal</option></optgroup><optgroup style="background:purple; font-weight:bold; color:yellow;" label="3D-Standard Moving-Effects"><option value="filter47" style="background:#151515; color:white;">SlideOut horizontal 3D</option><option value="filter48" style="background:#151515; color:white;">SlideOut vertical 3D</option><option value="filter49" style="background:#151515; color:white;">SlideOut diagonal 3D</option><option value="filter50" style="background:#151515; color:white;">SlideOut &amp; compress horizontal 3D</option><option value="filter51" style="background:#151515; color:white;">SlideOut &amp; compress vertical 3D</option><option value="filter52" style="background:#151515; color:white;">SlideOut &amp; compress diagonal 3D</option><option value="filter53" style="background:#151515; color:white;">Pop &amp; Compress horizontal 3D</option><option value="filter54" style="background:#151515; color:white;">Pop &amp; Compress vertical 3D</option><option value="filter55" style="background:#151515; color:white;">Pop &amp; Compress diagonal 3D</option><option value="filter56" style="background:#151515; color:white;">Rotate 3D horizontal left</option><option value="filter57" style="background:#151515; color:white;">Rotate 3D horizontal right</option><option value="filter58" style="background:#151515; color:white;">Rotate 3D vertical up</option><option value="filter59" style="background:#151515; color:white;">Rotate 3D vertical down</option><option value="filter60" style="background:#151515; color:white;">Rotate 3D diagonal up-left</option><option value="filter61" style="background:#151515; color:white;">Rotate 3D diagonal down-right</option></optgroup><optgroup style="background:green; font-weight:bold; color:yellow;" label="3D-Spin- &amp; Moving-Effects"><option value="filter62" style="background:#151515; color:white;">SlideOut horizontal, Spin horizontal &amp; compress 3D</option><option value="filter63" style="background:#151515; color:white;">SlideOut vertical, Spin horizontal &amp; compress 3D</option><option value="filter64" style="background:#151515; color:white;">SlideOut diagonal, Spin horizontal &amp; compress 3D</option><option value="filter65" style="background:#151515; color:white;">SlideOut horizontal, Spin vertical &amp; compress 3D</option><option value="filter66" style="background:#151515; color:white;">SlideOut vertical, Spin vertical &amp; compress 3D</option><option value="filter67" style="background:#151515; color:white;">SlideOut diagonal, Spin vertical &amp; compress 3D</option><option value="filter68" style="background:#151515; color:white;">SlideOut horizontal, Spin diagonal &amp; compress 3D</option><option value="filter69" style="background:#151515; color:white;">SlideOut vertical, Spin diagonal &amp; compress 3D</option><option value="filter70" style="background:#151515; color:white;">SlideOut diagonal, Spin diagonal &amp; compress 3D</option><option value="filter71" style="background:#151515; color:white;">Pop horizontal, Spin horizontal &amp; compress 3D</option><option value="filter72" style="background:#151515; color:white;">Pop vertical, Spin horizontal &amp; compress 3D</option><option value="filter73" style="background:#151515; color:white;">Pop diagonal, Spin horizontal &amp; compress 3D</option><option value="filter74" style="background:#151515; color:white;">Pop horizontal, Spin vertical &amp; compress 3D</option><option value="filter75" style="background:#151515; color:white;">Pop vertical, Spin vertical &amp; compress 3D</option><option value="filter76" style="background:#151515; color:white;">Pop diagonal, Spin vertical &amp; compress 3D</option><option value="filter77" style="background:#151515; color:white;">Pop horizontal, Spin diagonal &amp; compress 3D</option><option value="filter78" style="background:#151515; color:white;">Pop vertical, Spin diagonal &amp; compress 3D</option><option value="filter79" style="background:#151515; color:white;">Pop diagonal, Spin diagonal &amp; compress 3D</option></optgroup><optgroup style="background:red; font-weight:bold; color:yellow;" label="Stretch Moving-Effects"><option value="filter80" style="background:#151515; color:white;">Stretch diagonal left-right &amp; compress</option><option value="filter81" style="background:#151515; color:white;">Stretch diagonal right-left &amp; compress</option><option value="filter82" style="background:#151515; color:white;">Stretch diagonal top-bottom &amp; compress</option><option value="filter83" style="background:#151515; color:white;">Stretch diagonal bottom-top &amp; compress</option><option value="filter84" style="background:#151515; color:white;">Stretch diagonal left-right, SlideOut horizontal &amp; compress</option><option value="filter85" style="background:#151515; color:white;">Stretch diagonal right-left, SlideOut horizontal &amp; compress</option><option value="filter86" style="background:#151515; color:white;">Stretch diagonal top-bottom, SlideOut horizontal &amp; compress</option><option value="filter87" style="background:#151515; color:white;">Stretch diagonal bottom-top, SlideOut horizontal &amp; compress</option><option value="filter88" style="background:#151515; color:white;">Stretch diagonal left-right, SlideOut vertical &amp; compress</option><option value="filter89" style="background:#151515; color:white;">Stretch diagonal right-left, SlideOut vertical &amp; compress</option><option value="filter90" style="background:#151515; color:white;">Stretch diagonal top-bottom, SlideOut vertical &amp; compress</option><option value="filter91" style="background:#151515; color:white;">Stretch diagonal bottom-top, SlideOut vertical &amp; compress</option><option value="filter92" style="background:#151515; color:white;">Stretch diagonal left-right, SlideOut diagonal &amp; compress</option><option value="filter93" style="background:#151515; color:white;">Stretch diagonal right-left, SlideOut diagonal &amp; compress</option><option value="filter94" style="background:#151515; color:white;">Stretch diagonal top-bottom, SlideOut diagonal &amp; compress</option><option value="filter95" style="background:#151515; color:white;">Stretch diagonal bottom-top, SlideOut diagonal &amp; compress</option><option value="filter96" style="background:#151515; color:white;">Stretch diagonal left-right, Pop diagonal &amp; compress</option><option value="filter97" style="background:#151515; color:white;">Stretch diagonal right-left, Pop diagonal &amp; compress</option><option value="filter98" style="background:#151515; color:white;">Stretch diagonal top-bottom, Pop diagonal &amp; compress</option><option value="filter99" style="background:#151515; color:white;">Stretch diagonal bottom-top, Pop diagonal &amp; compress</option></optgroup><optgroup style="background:navy; font-weight:bold; color:yellow;" label="FadeOut Moving-Effects"><option value="filter100" style="background:#151515; color:white;">Zoom-FadeOut InOut</option><option value="filter101" style="background:#151515; color:white;">Zoom-FadeOut OutIn</option><option value="filter102" style="background:#151515; color:white;">Compress-FadeOut Horizontal</option><option value="filter103" style="background:#151515; color:white;">Compress-FadeOut Vertical</option><option value="filter104" style="background:#151515; color:white;">Compress &amp; Rotate-FadeOut horizontal</option><option value="filter105" style="background:#151515; color:white;">Compress &amp; Rotate-FadeOut vertical</option><option value="filter106" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut horizontal</option><option value="filter107" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut vertical</option><option value="filter108" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut diagonal</option><option value="filter109" style="background:#151515; color:white;">SlideOut &amp; rotate-FadeOut horizontal</option><option value="filter110" style="background:#151515; color:white;">SlideOut &amp; rotate-FadeOut vertical</option><option value="filter111" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut horizontal</option><option value="filter112" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut vertical</option><option value="filter113" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut diagonal</option><option value="filter114" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut horizontal</option><option value="filter115" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut vertical</option><option value="filter116" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut diagonal</option></optgroup><optgroup style="background:purple; font-weight:bold; color:yellow;" label="FadeOut &amp; Ellipse Moving-Effects"><option value="filter117" style="background:#151515; color:white;">Zoom-FadeOut-Ellipse InOut</option><option value="filter118" style="background:#151515; color:white;">Zoom-FadeOut-Ellipse OutIn</option><option value="filter119" style="background:#151515; color:white;">Compress-FadeOut-Ellipse Horizontal</option><option value="filter120" style="background:#151515; color:white;">Compress-FadeOut-Ellipse Vertical</option><option value="filter121" style="background:#151515; color:white;">Compress &amp; Rotate-FadeOut-Ellipse horizontal</option><option value="filter122" style="background:#151515; color:white;">Compress &amp; Rotate-FadeOut-Ellipse vertical</option><option value="filter123" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut-Ellipse horizontal</option><option value="filter124" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut-Ellipse vertical</option><option value="filter125" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut-Ellipse diagonal</option><option value="filter126" style="background:#151515; color:white;">SlideOut &amp; rotate-FadeOut-Ellipse horizontal</option><option value="filter127" style="background:#151515; color:white;">SlideOut &amp; rotate-FadeOut-Ellipse vertical</option><option value="filter128" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut-Ellipse horizontal</option><option value="filter129" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut-Ellipse vertical</option><option value="filter130" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut-Ellipse diagonal</option><option value="filter131" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut-Ellipse horizontal</option><option value="filter132" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut-Ellipse vertical</option><option value="filter133" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut-Ellipse diagonal</option></optgroup><optgroup style="background:green; font-weight:bold; color:yellow;" label="3D-Fading-Moving-Effects"><option value="filter134" style="background:#151515; color:white;">SlideOut horizontal 3D-FadeOut</option><option value="filter135" style="background:#151515; color:white;">SlideOut vertical 3D-FadeOut</option><option value="filter136" style="background:#151515; color:white;">SlideOut diagonal 3D-FadeOut</option><option value="filter137" style="background:#151515; color:white;">SlideOut &amp; compress horizontal 3D-FadeOut</option><option value="filter138" style="background:#151515; color:white;">SlideOut &amp; compress vertical 3D-FadeOut</option><option value="filter139" style="background:#151515; color:white;">SlideOut &amp; compress diagonal 3D-FadeOut</option><option value="filter140" style="background:#151515; color:white;">Pop &amp; Compress horizontal 3D-FadeOut</option><option value="filter141" style="background:#151515; color:white;">Pop &amp; Compress vertical 3D-FadeOut</option><option value="filter142" style="background:#151515; color:white;">Pop &amp; Compress diagonal 3D-FadeOut</option><option value="filter143" style="background:#151515; color:white;">Rotate 3D-FadeOut horizontal left</option><option value="filter144" style="background:#151515; color:white;">Rotate-FadeOut 3D horizontal right</option><option value="filter145" style="background:#151515; color:white;">Rotate-FadeOut 3D vertical up</option><option value="filter146" style="background:#151515; color:white;">Rotate-FadeOut 3D vertical down</option><option value="filter147" style="background:#151515; color:white;">Rotate-FadeOut 3D diagonal up-left</option><option value="filter148" style="background:#151515; color:white;">Rotate-FadeOut 3D diagonal down-right</option></optgroup><optgroup style="background:red; font-weight:bold; color:yellow;" label="3D-Fading-Spin- &amp; Moving-Effects"><option value="filter149" style="background:#151515; color:white;">SlideOut horizontal, Spin horizontal &amp; compress 3D-Fading</option><option value="filter150" style="background:#151515; color:white;">SlideOut vertical, Spin horizontal &amp; compress 3D-Fading</option><option value="filter151" style="background:#151515; color:white;">SlideOut diagonal, Spin horizontal &amp; compress 3D-Fading</option><option value="filter152" style="background:#151515; color:white;">SlideOut horizontal, Spin vertical &amp; compress 3D-Fading</option><option value="filter153" style="background:#151515; color:white;">SlideOut vertical, Spin vertical &amp; compress 3D-Fading</option><option value="filter154" style="background:#151515; color:white;">SlideOut diagonal, Spin vertical &amp; compress 3D-Fading</option><option value="filter155" style="background:#151515; color:white;">SlideOut horizontal, Spin diagonal &amp; compress 3D-Fading</option><option value="filter156" style="background:#151515; color:white;">SlideOut vertical, Spin diagonal &amp; compress 3D-Fading</option><option value="filter157" style="background:#151515; color:white;">SlideOut diagonal, Spin diagonal &amp; compress 3D-Fading</option><option value="filter158" style="background:#151515; color:white;">Pop horizontal, Spin horizontal &amp; compress 3D-Fading</option><option value="filter159" style="background:#151515; color:white;">Pop vertical, Spin horizontal &amp; compress 3D-Fading</option><option value="filter160" style="background:#151515; color:white;">Pop diagonal, Spin horizontal &amp; compress 3D-Fading</option><option value="filter161" style="background:#151515; color:white;">Pop horizontal, Spin vertical &amp; compress 3D-Fading</option><option value="filter162" style="background:#151515; color:white;">Pop vertical, Spin vertical &amp; compress 3D-Fading</option><option value="filter163" style="background:#151515; color:white;">Pop diagonal, Spin vertical &amp; compress 3D-Fading</option><option value="filter164" style="background:#151515; color:white;">Pop horizontal, Spin diagonal &amp; compress 3D-Fading</option><option value="filter165" style="background:#151515; color:white;">Pop vertical, Spin diagonal &amp; compress 3D-Fading</option><option value="filter166" style="background:#151515; color:white;">Pop diagonal, Spin diagonal &amp; compress 3D-Fading</option></optgroup><optgroup style="background:navy; font-weight:bold; color:yellow;" label="Stretch Moving-Fading-Effects"><option value="filter167" style="background:#151515; color:white;">Stretch-Fading diagonal left-right &amp; compress</option><option value="filter168" style="background:#151515; color:white;">Stretch-Fading diagonal right-left &amp; compress</option><option value="filter169" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom &amp; compress</option><option value="filter170" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top &amp; compress</option><option value="filter171" style="background:#151515; color:white;">Stretch-Fading diagonal left-right, SlideOut horizontal &amp; compress</option><option value="filter172" style="background:#151515; color:white;">Stretch-Fading diagonal right-left, SlideOut horizontal &amp; compress</option><option value="filter173" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom, SlideOut horizontal &amp; compress</option><option value="filter174" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top, SlideOut horizontal &amp; compress</option><option value="filter175" style="background:#151515; color:white;">Stretch-Fading diagonal left-right, SlideOut vertical &amp; compress</option><option value="filter176" style="background:#151515; color:white;">Stretch-Fading diagonal right-left, SlideOut vertical &amp; compress</option><option value="filter177" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom, SlideOut vertical &amp; compress</option><option value="filter178" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top, SlideOut vertical &amp; compress</option><option value="filter179" style="background:#151515; color:white;">Stretch-Fading diagonal left-right, SlideOut diagonal &amp; compress</option><option value="filter180" style="background:#151515; color:white;">Stretch-Fading diagonal right-left, SlideOut diagonal &amp; compress</option><option value="filter181" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom, SlideOut diagonal &amp; compress</option><option value="filter182" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top, SlideOut diagonal &amp; compress</option><option value="filter183" style="background:#151515; color:white;">Stretch-Fading diagonal left-right, Pop diagonal &amp; compress</option><option value="filter184" style="background:#151515; color:white;">Stretch-Fading diagonal right-left, Pop diagonal &amp; compress</option><option value="filter185" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom, Pop diagonal &amp; compress</option><option value="filter186" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top, Pop diagonal &amp; compress</option></optgroup><optgroup style="background:purple; font-weight:bold; color:yellow;" label="FadeOut Spin-Moving-Effects"><option value="filter187" style="background:#151515; color:white;">Zoom-Spin-FadeOut InOut</option><option value="filter188" style="background:#151515; color:white;">Zoom-Spin-FadeOut OutIn</option><option value="filter189" style="background:#151515; color:white;">Compress-Spin-FadeOut Horizontal</option><option value="filter190" style="background:#151515; color:white;">Compress-Spin-FadeOut Vertical</option><option value="filter191" style="background:#151515; color:white;">Compress &amp; Rotate-Spin-FadeOut horizontal</option><option value="filter192" style="background:#151515; color:white;">Compress &amp; Rotate-Spin-FadeOut vertical</option><option value="filter193" style="background:#151515; color:white;">SlideOut &amp; compress-Spin-FadeOut horizontal</option><option value="filter194" style="background:#151515; color:white;">SlideOut &amp; compress-Spin-FadeOut vertical</option><option value="filter195" style="background:#151515; color:white;">SlideOut &amp; compress-Spin-FadeOut diagonal</option><option value="filter196" style="background:#151515; color:white;">SlideOut &amp; rotate-Spin-FadeOut horizontal</option><option value="filter197" style="background:#151515; color:white;">SlideOut &amp; rotate-Spin-FadeOut vertical</option><option value="filter198" style="background:#151515; color:white;">Pop &amp; Compress-Spin-FadeOut horizontal</option><option value="filter199" style="background:#151515; color:white;">Pop &amp; Compress-Spin-FadeOut vertical</option><option value="filter200" style="background:#151515; color:white;">Pop &amp; Compress-Spin-FadeOut diagonal</option><option value="filter201" style="background:#151515; color:white;">Pop &amp; Rotate-Spin-FadeOut horizontal</option><option value="filter202" style="background:#151515; color:white;">Pop &amp; Rotate-Spin-FadeOut vertical</option><option value="filter203" style="background:#151515; color:white;">Pop &amp; Rotate-Spin-FadeOut diagonal</option></optgroup><optgroup label="Parable-Horizontal SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter204" style="background:#151515; color:white;">Parable-Horizontal Compress</option><option value="filter205" style="background:#151515; color:white;">Parable-Horizontal Rotate horizontal</option><option value="filter206" style="background:#151515; color:white;">Parable-Horizontal Rotate vertical</option><option value="filter207" style="background:#151515; color:white;">Parable-Horizontal Rotate 3D-horizontal</option><option value="filter208" style="background:#151515; color:white;">Parable-Horizontal Rotate 3D-vertical</option><option value="filter209" style="background:#151515; color:white;">Parable-Horizontal Rotate 3D-diagonal</option><option value="filter210" style="background:#151515; color:white;">Parable-Horizontal Rotate 2D</option></optgroup><optgroup label="Parable-Horizontal SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter211" style="background:#151515; color:white;">Parable-Horizontal Elipse-Compress</option><option value="filter212" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate horizontal</option><option value="filter213" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate vertical</option><option value="filter214" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate 3D-horizontal</option><option value="filter215" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate 3D-vertical</option><option value="filter216" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate 3D-diagonal</option><option value="filter217" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate 2D</option></optgroup><optgroup label="Parable-Horizontal SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter218" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Compress</option><option value="filter219" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate horizontal</option><option value="filter220" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate vertical</option><option value="filter221" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate 3D-horizontal</option><option value="filter222" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate 3D-vertical</option><option value="filter223" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate 3D-diagonal</option><option value="filter224" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate 2D</option></optgroup><optgroup label="Parable-Vertical SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter225" style="background:#151515; color:white;">Parable-Vertical Compress</option><option value="filter226" style="background:#151515; color:white;">Parable-Vertical Rotate horizontal</option><option value="filter227" style="background:#151515; color:white;">Parable-Vertical Rotate vertical</option><option value="filter228" style="background:#151515; color:white;">Parable-Vertical Rotate 3D-horizontal</option><option value="filter229" style="background:#151515; color:white;">Parable-Vertical Rotate 3D-vertical</option><option value="filter230" style="background:#151515; color:white;">Parable-Vertical Rotate 3D-diagonal</option><option value="filter231" style="background:#151515; color:white;">Parable-Vertical Rotate 2D</option></optgroup><optgroup label="Parable-Vertical SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter232" style="background:#151515; color:white;">Parable-Vertical Elipse-Compress</option><option value="filter233" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate horizontal</option><option value="filter234" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate vertical</option><option value="filter235" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate 3D-horizontal</option><option value="filter236" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate 3D-vertical</option><option value="filter237" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate 3D-diagonal</option><option value="filter238" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate 2D</option></optgroup><optgroup label="Parable-Vertical SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter239" style="background:#151515; color:white;">Parable-Vertical FadeOut-Compress</option><option value="filter240" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate horizontal</option><option value="filter241" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate vertical</option><option value="filter242" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate 3D-horizontal</option><option value="filter243" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate 3D-vertical</option><option value="filter244" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate 3D-diagonal</option><option value="filter245" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate 2D</option></optgroup><optgroup label="Parable-Diagonal SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter246" style="background:#151515; color:white;">Parable-Diagonal Compress</option><option value="filter247" style="background:#151515; color:white;">Parable-Diagonal Rotate horizontal</option><option value="filter248" style="background:#151515; color:white;">Parable-Diagonal Rotate vertical</option><option value="filter249" style="background:#151515; color:white;">Parable-Diagonal Rotate 3D-horizontal</option><option value="filter250" style="background:#151515; color:white;">Parable-Diagonal Rotate 3D-vertical</option><option value="filter251" style="background:#151515; color:white;">Parable-Diagonal Rotate 3D-diagonal</option><option value="filter252" style="background:#151515; color:white;">Parable-Diagonal Rotate 2D</option></optgroup><optgroup label="Parable-Diagonal SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter253" style="background:#151515; color:white;">Parable-Diagonal Elipse-Compress</option><option value="filter254" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate horizontal</option><option value="filter255" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate vertical</option><option value="filter256" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate 3D-horizontal</option><option value="filter257" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate 3D-vertical</option><option value="filter258" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate 3D-diagonal</option><option value="filter259" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate 2D</option></optgroup><optgroup label="Parable-Diagonal SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter260" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Compress</option><option value="filter261" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate horizontal</option><option value="filter262" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate vertical</option><option value="filter263" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate 3D-horizontal</option><option value="filter264" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate 3D-vertical</option><option value="filter265" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate 3D-diagonal</option><option value="filter266" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate 2D</option></optgroup><optgroup label="Parable - 3D-Slide horizontal" style="background:green; font-family:; color:yellow; font-weight:bold;"><option value="filter267" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter268" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter269" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter270" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter271" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter272" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Parable - 3D-Slide vertical" style="background:red; font-family:; color:yellow; font-weight:bold;"><option value="filter273" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter274" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter275" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter276" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter277" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter278" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Parable - 3D-Slide diagonal" style="background:navy; font-family:; color:yellow; font-weight:bold;"><option value="filter279" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter280" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter281" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter282" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter283" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter284" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Cube-Parable-Horizontal SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter285" style="background:#151515; color:white;">Cube-Parable-Horizontal Compress</option><option value="filter286" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate horizontal</option><option value="filter287" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate vertical</option><option value="filter288" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate 3D-horizontal</option><option value="filter289" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate 3D-vertical</option><option value="filter290" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate 3D-diagonal</option><option value="filter291" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Horizontal SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter292" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Compress</option><option value="filter293" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate horizontal</option><option value="filter294" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate vertical</option><option value="filter295" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate 3D-horizontal</option><option value="filter296" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate 3D-vertical</option><option value="filter297" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate 3D-diagonal</option><option value="filter298" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Horizontal SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter299" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Compress</option><option value="filter300" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate horizontal</option><option value="filter301" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate vertical</option><option value="filter302" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate 3D-horizontal</option><option value="filter303" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate 3D-vertical</option><option value="filter304" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate 3D-diagonal</option><option value="filter305" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Vertical SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter306" style="background:#151515; color:white;">Cube-Parable-Vertical Compress</option><option value="filter307" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate horizontal</option><option value="filter308" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate vertical</option><option value="filter309" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate 3D-horizontal</option><option value="filter310" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate 3D-vertical</option><option value="filter311" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate 3D-diagonal</option><option value="filter312" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Vertical SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter313" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Compress</option><option value="filter314" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate horizontal</option><option value="filter315" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate vertical</option><option value="filter316" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate 3D-horizontal</option><option value="filter317" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate 3D-vertical</option><option value="filter318" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate 3D-diagonal</option><option value="filter319" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Vertical SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter320" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Compress</option><option value="filter321" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate horizontal</option><option value="filter322" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate vertical</option><option value="filter323" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate 3D-horizontal</option><option value="filter324" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate 3D-vertical</option><option value="filter325" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate 3D-diagonal</option><option value="filter326" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Diagonal SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter327" style="background:#151515; color:white;">Cube-Parable-Diagonal Compress</option><option value="filter328" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate horizontal</option><option value="filter329" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate vertical</option><option value="filter330" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate 3D-horizontal</option><option value="filter331" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate 3D-vertical</option><option value="filter332" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate 3D-diagonal</option><option value="filter333" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Diagonal SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter334" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Compress</option><option value="filter335" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate horizontal</option><option value="filter336" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate vertical</option><option value="filter337" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate 3D-horizontal</option><option value="filter338" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate 3D-vertical</option><option value="filter339" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate 3D-diagonal</option><option value="filter340" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Diagonal SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter341" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Compress</option><option value="filter342" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate horizontal</option><option value="filter343" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate vertical</option><option value="filter344" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate 3D-horizontal</option><option value="filter345" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate 3D-vertical</option><option value="filter346" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate 3D-diagonal</option><option value="filter347" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate 2D</option></optgroup><optgroup label="Cube-Parable - 3D-Slide horizontal" style="background:green; font-family:; color:yellow; font-weight:bold;"><option value="filter348" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter349" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter350" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter351" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter352" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter353" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Cube-Parable - 3D-Slide vertical" style="background:red; font-family:; color:yellow; font-weight:bold;"><option value="filter354" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter355" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter356" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter357" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter358" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter359" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Cube-Parable - 3D-Slide diagonal" style="background:navy; font-family:; color:yellow; font-weight:bold;"><option value="filter360" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter361" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter362" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter363" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter364" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter365" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Zoom-Parable - Standard" style="background:green; color:yellow; font-weight:bold;"><option value="filter366" style="background:#151515; color:white;">Zoom</option><option value="filter367" style="background:#151515; color:white;">Zoom &amp; Slide horizontal</option><option value="filter368" style="background:#151515; color:white;">Zoom &amp; Slide vertical</option><option value="filter369" style="background:#151515; color:white;">Zoom &amp; Slide diagonal</option><option value="filter370" style="background:#151515; color:white;">Zoom &amp; Pop horizontal</option><option value="filter371" style="background:#151515; color:white;">Zoom &amp; Pop vertical</option><option value="filter372" style="background:#151515; color:white;">Zoom &amp; Pop diagonal</option><option value="filter373" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable</option><option value="filter374" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable</option><option value="filter375" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable</option><option value="filter376" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable</option><option value="filter377" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable</option><option value="filter378" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable</option></optgroup><optgroup label="Zoom-Parable - Ellipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter379" style="background:#151515; color:white;">Zoom - Ellipse</option><option value="filter380" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Ellipse</option><option value="filter381" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Ellipse</option><option value="filter382" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Ellipse</option><option value="filter383" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - Ellipse</option><option value="filter384" style="background:#151515; color:white;">Zoom &amp; Pop vertical - Ellipse</option><option value="filter385" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - Ellipse</option><option value="filter386" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - Ellipse</option><option value="filter387" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - Ellipse</option><option value="filter388" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - Ellipse</option><option value="filter389" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parbable - Ellipse</option><option value="filter390" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - Ellipse</option><option value="filter391" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable - Ellipse</option></optgroup><optgroup label="Zoom-Parable - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter392" style="background:#151515; color:white;">Zoom - FadeOut</option><option value="filter393" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - FadeOut</option><option value="filter394" style="background:#151515; color:white;">Zoom &amp; Slide vertical - FadeOut</option><option value="filter395" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - FadeOut</option><option value="filter396" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - FadeOut</option><option value="filter397" style="background:#151515; color:white;">Zoom &amp; Pop vertical - FadeOut</option><option value="filter398" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - FadeOut</option><option value="filter399" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - FadeOut</option><option value="filter400" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - FadeOut</option><option value="filter401" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - FadeOut</option><option value="filter402" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable - FadeOut</option><option value="filter403" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - FadeOut</option><option value="filter404" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parbable - FadeOut</option></optgroup><optgroup label="Zoom-Parable - 3D Turn-90deg X-Axis" style="background:purple; color:yellow; font-weight:bold;"><option value="filter405" style="background:#151515; color:white;">Zoom - 3D Turn-90deg X-Axis</option><option value="filter406" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - 3D Turn-90deg X-Axis</option><option value="filter407" style="background:#151515; color:white;">Zoom &amp; Slide vertical - 3D Turn-90deg X-Axis</option><option value="filter408" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - 3D Turn-90deg X-Axis</option><option value="filter409" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - 3D Turn-90deg X-Axis</option><option value="filter410" style="background:#151515; color:white;">Zoom &amp; Pop vertical - 3D Turn-90deg X-Axis</option><option value="filter411" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - 3D Turn-90deg X-Axis</option><option value="filter412" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - 3D Turn-90deg X-Axis</option><option value="filter413" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - 3D Turn-90deg X-Axis</option><option value="filter414" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - 3D Turn-90deg X-Axis</option><option value="filter415" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable - 3D Turn-90deg X-Axis</option><option value="filter416" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - 3D Turn-90deg X-Axis</option><option value="filter417" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable - 3D Turn-90deg X-Axis</option></optgroup><optgroup label="Zoom-Parable - 3D Turn-90deg Y-Axis" style="background:#4B088A; color:yellow; font-weight:bold;"><option value="filter418" style="background:#151515; color:white;">Zoom - 3D Turn-90deg Y-Axis</option><option value="filter419" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - 3D Turn-90deg Y-Axis</option><option value="filter420" style="background:#151515; color:white;">Zoom &amp; Slide vertical - 3D Turn-90deg Y-Axis</option><option value="filter421" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - 3D Turn-90deg Y-Axis</option><option value="filter422" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - 3D Turn-90deg Y-Axis</option><option value="filter423" style="background:#151515; color:white;">Zoom &amp; Pop vertical - 3D Turn-90deg Y-Axis</option><option value="filter424" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - 3D Turn-90deg Y-Axis</option><option value="filter425" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - 3D Turn-90deg Y-Axis</option><option value="filter426" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - 3D Turn-90deg Y-Axis</option><option value="filter427" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - 3D Turn-90deg Y-Axis</option><option value="filter428" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable - 3D Turn-90deg Y-Axis</option><option value="filter429" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - 3D Turn-90deg Y-Axis</option><option value="filter430" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable - 3D Turn-90deg Y-Axis</option></optgroup><optgroup label="Zoom-Parable - 3D Turn-90deg XY-Axis" style="background:purple; color:yellow; font-weight:bold;"><option value="filter431" style="background:#151515; color:white;">Zoom - 3D Turn-90deg XY-Axis</option><option value="filter432" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - 3D Turn-90deg XY-Axis</option><option value="filter433" style="background:#151515; color:white;">Zoom &amp; Slide vertical - 3D Turn-90deg XY-Axis</option><option value="filter434" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - 3D Turn-90deg XY-Axis</option><option value="filter435" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - 3D Turn-90deg XY-Axis</option><option value="filter436" style="background:#151515; color:white;">Zoom &amp; Pop vertical - 3D Turn-90deg XY-Axis</option><option value="filter437" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - 3D Turn-90deg XY-Axis</option><option value="filter438" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - 3D Turn-90deg XY-Axis</option><option value="filter439" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - 3D Turn-90deg XY-Axis</option><option value="filter440" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - 3D Turn-90deg XY-Axis</option><option value="filter441" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable - 3D Turn-90deg XY-Axis</option><option value="filter442" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - 3D Turn-90deg XY-Axis</option><option value="filter443" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable - 3D Turn-90deg XY-Axis</option></optgroup></select>');
    imgEffectMode.appendTo(imgcrfadeAttr2);
    
    var imgChangeArea = $("<div/>");
    imgChangeArea.css({
      "width": "100%",
      "text-align": "center",
      "margin-top": "12px"
    });
    
    imgChangeArea.appendTo(imgTools1);
    
    var imgChangeBtn = $("<button class='toolbuttons20'>Change Image</button>");
    imgChangeBtn.appendTo(imgChangeArea);
    
    var imgWidth = $("<input type='number' style='width:45px; height:30px; font-weight:bold; font-size: 12px; color:white; background: #212121; border: 4px outset grey; margin-left:6px; margin-top:6px; border-radius:6px;'>");
    imgWidth.attr({
      "max": 2,
      "min": -2,
      "step": 0.01,
      "value": 1
    }).appendTo(imgChangeArea);
    
    var imgHeight = $("<input type='number' style='width:45px; height:30px; font-weight:bold; font-size: 12px; color:white; background: #212121; border: 4px outset grey; margin-left:6px; margin-top:6px; border-radius:6px;'>");
    imgHeight.attr({
      "max": 2,
      "min": -2,
      "step": 0.01,
      "value": 1
    }).appendTo(imgChangeArea);
    
    var imgWidth2 = $("<input type='number' style='width:45px; height:30px; font-weight:bold; font-size: 12px; color:white; background: #212121; border: 4px outset grey; margin-left:6px; margin-top:6px; border-radius:6px;'>");
    imgWidth2.attr({
      "max": 2,
      "min": -2,
      "step": 0.01,
      "value": 1
    }).appendTo(imgChangeArea);
    
    var imgHeight2 = $("<input type='number' style='width:45px; height:30px; font-weight:bold; font-size: 12px; color:white; background: #212121; border: 4px outset grey; margin-left:6px; margin-top:6px; border-radius:6px;'>");
    imgHeight2.attr({
      "max": 2,
      "min": -2,
      "step": 0.01,
      "value": 1
    }).appendTo(imgChangeArea);
    
    var imgFullscreen1 = $("<button class='toolbuttons21'><img class='imgSymbol' src='Symbole/fullscreen.png' style='width:16px; height:16px;'>&nbsp;Fsc Left</button>");
    imgFullscreen1.appendTo(imgChangeArea);
    
    var imgFullscreen2 = $("<button class='toolbuttons21'><img class='imgSymbol' src='Symbole/fullscreen.png' style='width:16px; height:16px;'>&nbsp;Fsc Right</button>");
    imgFullscreen2.appendTo(imgChangeArea);
    
    var imgmediaLibArea = $("<div/>");
    imgmediaLibArea.css({
      "width": "98.6%",
      "display": "flex",
      "flex-direction": "row",
      "border": "2px solid rgba(255, 255, 255, 0.6)"
    });
    
    imgmediaLibArea.appendTo(imgmain);
    
    var imgtrackLib = $("<div/>");
    imgtrackLib.css({
      "width": "58%",
      "height": "220px",
      "border": "2px outset rgba(255, 255, 255, 0.8)",
      "overflow": "auto",
      "background": imgsettings.imagelistBackground
    });
    
    imgtrackLib.appendTo(imgmediaLibArea);
    
     var imgtrackLibList = $("<ul id='imgtracklist'></ul>");
    imgtrackLibList.css({
      "width": "99%",
      "padding": "1px",
      "margin": "1px",
      "list-style": "none",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
      "cursor": "pointer"
    });
    
    imgtrackLibList.appendTo(imgtrackLib);
    
    var imgmediaTracks = [];
    for (var i=0; i<imgsettings.image.length; i++) {
      imgmediaTracks.push("<li style='padding-top:4px; padding-bottom:4px;'>"+imgsettings.image[i]+"</li>");
    }
    
    imgtrackLibList.html(imgmediaTracks.join(""));
    
    $("#imgtracklist li:eq("+currentImage+")").addClass("imgselTrack");
    
    var imgmixerBox = $("<div/>");
    imgmixerBox.css({
      "width": "98.6%",
      "height": "220px",
      "overflow": "auto",
      "background": "#151515",
      "display": "none",
    });
    
    imgmixerBox.appendTo(imgmain);
    
    var imgmixerArea1 = $("<div/>");
    imgmixerArea1.css({
      "width": "99.8%",
      "height": "150px",
      "background": "#151515",
      "display": "flex",
      "flex-direction": "row",
      "border": "2px solid rgba(255, 255, 255, 0.6)"
    });
    
    imgmixerArea1.appendTo(imgmixerBox);
    
    var imgmixerArea2 = $("<div/>");
    imgmixerArea2.css({
      "width": "99.8%",
      "height": "60px",
      "background": "#151515",
      "display": "flex",
      "flex-direction": "row",
      "border": "2px solid rgba(255, 255, 255, 0.6)"
    });
    
    imgmixerArea2.appendTo(imgmixerBox);
    
    var imgfilterbox1 = $("<div/>");
    imgfilterbox1.css({
      "width": "50%",
      "height": "100%",
      "background": "#151515",
      "border": "2px solid rgba(255, 255, 255, 0.6)"
    });
    
    imgfilterbox1.appendTo(imgmixerArea1);
    
    var imgfilterrow1 = $("<div/>");
    imgfilterrow1.css({
      "width": "100%",
      "height": "50px",
      "display": "flex",
      "flex-direction": "row",
    });
    
    imgfilterrow1.appendTo(imgfilterbox1);
    
    var imgfilterrow2 = $("<div/>");
    imgfilterrow2.css({
      "width": "100%",
      "height": "50px",
      "display": "flex",
      "flex-direction": "row",
    });
    
    imgfilterrow2.appendTo(imgfilterbox1);
    
    var imgfilterrow3 = $("<div/>");
    imgfilterrow3.css({
      "width": "100%",
      "height": "50px",
      "display": "flex",
      "flex-direction": "row",
    });
    
    imgfilterrow3.appendTo(imgfilterbox1);
    
    var imgfilterbox2 = $("<div/>");
    imgfilterbox2.css({
      "width": "50%",
      "height": "100%",
      "background": "#151515",
      "border": "2px solid rgba(255, 255, 255, 0.6)"
    });
    
    imgfilterbox2.appendTo(imgmixerArea1);
    
    var imgfilterrow4 = $("<div/>");
    imgfilterrow4.css({
      "width": "100%",
      "height": "50px",
      "display": "flex",
      "flex-direction": "row",
    });
    
    imgfilterrow4.appendTo(imgfilterbox2);
  
  	var imgfilterrow5 = $("<div/>");
    imgfilterrow5.css({
      "width": "100%",
      "height": "50px",
      "display": "flex",
      "flex-direction": "row",
    });
    
    imgfilterrow5.appendTo(imgfilterbox2);
  
  	var imgfilterrow6 = $("<div/>");
    imgfilterrow6.css({
      "width": "100%",
      "height": "50px",
      "display": "flex",
      "flex-direction": "row",
    });
    
    imgfilterrow6.appendTo(imgfilterbox2);
    
    var imgblurtxt1 = $("<div/>");
  	imgblurtxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Blur").appendTo(imgfilterrow1);
  
  	var imgblurbox1 = $("<div/>");
  	imgblurbox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow1);
  
  	var imgblurfilter1 = $("<input type='range' class='slider'>");
    imgblurfilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 20,
      "min": 0,
      "step": 0.01,
      "value": 0
    }).appendTo(imgblurbox1);
    
    var imgbrighttxt1 = $("<div/>");
  	imgbrighttxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Brightness").appendTo(imgfilterrow1);
  
  	var imgbrightbox1 = $("<div/>");
  	imgbrightbox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow1);
  
  	var imgbrightfilter1 = $("<input type='range' class='slider'>");
    imgbrightfilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 500,
      "min": 0,
      "step": 1,
      "value": 100
    }).appendTo(imgbrightbox1);
    
    var imgcontrasttxt1 = $("<div/>");
  	imgcontrasttxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Contrast").appendTo(imgfilterrow1);
  
  	var imgcontrastbox1 = $("<div/>");
  	imgcontrastbox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow1);
  
  	var imgcontrastfilter1 = $("<input type='range' class='slider'>");
    imgcontrastfilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 500,
      "min": 0,
      "step": 1,
      "value": 100
    }).appendTo(imgcontrastbox1);
    
    var imghuetxt1 = $("<div/>");
  	imghuetxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Hue-Rotate").appendTo(imgfilterrow2);
  
  	var imghuebox1 = $("<div/>");
  	imghuebox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow2);
  
  	var imghuefilter1 = $("<input type='range' class='slider'>");
    imghuefilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 360,
      "min": 0,
      "step": 1,
      "value": 0
    }).appendTo(imghuebox1);
    
    var imggraytxt1 = $("<div/>");
  	imggraytxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Grayscale").appendTo(imgfilterrow2);
  
  	var imggraybox1 = $("<div/>");
  	imggraybox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow2);
  
  	var imggrayfilter1 = $("<input type='range' class='slider'>");
    imggrayfilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 100,
      "min": 0,
      "step": 0.01,
      "value": 0
    }).appendTo(imggraybox1);
    
    var imginverttxt1 = $("<div/>");
  	imginverttxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Negativ").appendTo(imgfilterrow2);
  
  	var imginvertbox1 = $("<div/>");
  	imginvertbox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow2);
  
  	var imginvertfilter1 = $("<input type='range' class='slider'>");
    imginvertfilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 100,
      "min": 0,
      "step": 1,
      "value": 0
    }).appendTo(imginvertbox1);
    
    var imgopacitytxt1 = $("<div/>");
  	imgopacitytxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Opacity").appendTo(imgfilterrow3);
  
  	var imgopacitybox1 = $("<div/>");
  	imgopacitybox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow3);
  
  	var imgopacityfilter1 = $("<input type='range' class='slider'>");
    imgopacityfilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 1,
      "min": 0,
      "step": 0.01,
      "value": 1
    }).appendTo(imgopacitybox1);
    
    var imgsepiatxt1 = $("<div/>");
  	imgsepiatxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Sepia").appendTo(imgfilterrow3);
  
  	var imgsepiabox1 = $("<div/>");
  	imgsepiabox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow3);
  
  	var imgsepiafilter1 = $("<input type='range' class='slider'>");
    imgsepiafilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 100,
      "min": 0,
      "step": 0.01,
      "value": 0
    }).appendTo(imgsepiabox1);
    
    var imgsattxt1 = $("<div/>");
  	imgsattxt1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Saturate").appendTo(imgfilterrow3);
  
  	var imgsatbox1 = $("<div/>");
  	imgsatbox1.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow3);
  
  	var imgsatfilter1 = $("<input type='range' class='slider'>");
    imgsatfilter1.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 500,
      "min": 0,
      "step": 1,
      "value": 100
    }).appendTo(imgsatbox1);
    
    
    var imgblurtxt2 = $("<div/>");
  	imgblurtxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Blur").appendTo(imgfilterrow4);
  
  	var imgblurbox2 = $("<div/>");
  	imgblurbox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow4);
  
  	var imgblurfilter2 = $("<input type='range' class='slider'>");
    imgblurfilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 20,
      "min": 0,
      "step": 0.01,
      "value": 0
    }).appendTo(imgblurbox2);
    
    var imgbrighttxt2 = $("<div/>");
  	imgbrighttxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Brightness").appendTo(imgfilterrow4);
  
  	var imgbrightbox2 = $("<div/>");
  	imgbrightbox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow4);
  
  	var imgbrightfilter2 = $("<input type='range' class='slider'>");
    imgbrightfilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 500,
      "min": 0,
      "step": 1,
      "value": 100
    }).appendTo(imgbrightbox2);
    
    var imgcontrasttxt2 = $("<div/>");
  	imgcontrasttxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Contrast").appendTo(imgfilterrow4);
  
  	var imgcontrastbox2 = $("<div/>");
  	imgcontrastbox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow4);
  
  	var imgcontrastfilter2 = $("<input type='range' class='slider'>");
    imgcontrastfilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 500,
      "min": 0,
      "step": 1,
      "value": 100
    }).appendTo(imgcontrastbox2);
    
    var imghuetxt2 = $("<div/>");
  	imghuetxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Hue-Rotate").appendTo(imgfilterrow5);
  
  	var imghuebox2 = $("<div/>");
  	imghuebox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow5);
  
  	var imghuefilter2 = $("<input type='range' class='slider'>");
    imghuefilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 360,
      "min": 0,
      "step": 1,
      "value": 0
    }).appendTo(imghuebox2);
    
    var imggraytxt2 = $("<div/>");
  	imggraytxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Grayscale").appendTo(imgfilterrow5);
  
  	var imggraybox2 = $("<div/>");
  	imggraybox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow5);
  
  	var imggrayfilter2 = $("<input type='range' class='slider'>");
    imggrayfilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 100,
      "min": 0,
      "step": 0.01,
      "value": 0
    }).appendTo(imggraybox2);
    
    var imginverttxt2 = $("<div/>");
  	imginverttxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Negativ").appendTo(imgfilterrow5);
  
  	var imginvertbox2 = $("<div/>");
  	imginvertbox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow5);
  
  	var imginvertfilter2 = $("<input type='range' class='slider'>");
    imginvertfilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 100,
      "min": 0,
      "step": 1,
      "value": 0
    }).appendTo(imginvertbox2);
    
    var imgopacitytxt2 = $("<div/>");
  	imgopacitytxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Opacity").appendTo(imgfilterrow6);
  
  	var imgopacitybox2 = $("<div/>");
  	imgopacitybox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow6);
  
  	var imgopacityfilter2 = $("<input type='range' class='slider'>");
    imgopacityfilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 1,
      "min": 0,
      "step": 0.01,
      "value": 1
    }).appendTo(imgopacitybox2);
    
    var imgsepiatxt2 = $("<div/>");
  	imgsepiatxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Sepia").appendTo(imgfilterrow6);
  
  	var imgsepiabox2 = $("<div/>");
  	imgsepiabox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow6);
  
  	var imgsepiafilter2 = $("<input type='range' class='slider'>");
    imgsepiafilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 100,
      "min": 0,
      "step": 0.01,
      "value": 0
    }).appendTo(imgsepiabox2);
    
    var imgsattxt2 = $("<div/>");
  	imgsattxt2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "font-family": "Century Gothic",
      "text-align": "right"
    }).text("Saturate").appendTo(imgfilterrow6);
  
  	var imgsatbox2 = $("<div/>");
  	imgsatbox2.css({
      "width": "15%",
      "height": "50px",
      "margin-left": "6px",
      "margin-top": "2px"
    }).appendTo(imgfilterrow6);
  
  	var imgsatfilter2 = $("<input type='range' class='slider'>");
    imgsatfilter2.css({
      "width": "96%",
      "height": "20px",
      "background": "linear-gradient(to right, #151515, silver, #151515)",
      "border": "6px outset silver"
    })
      .attr({
      "max": 500,
      "min": 0,
      "step": 1,
      "value": 100
    }).appendTo(imgsatbox2);
    
    var imgbuttonbox1 = $("<div/>");
    imgbuttonbox1.css({
      "width": "50%",
      "height": "100%",
      "background": "#151515",
      "border": "2px solid rgba(255, 255, 255, 0.6)"
    });
    
    imgbuttonbox1.appendTo(imgmixerArea2);
  
  	var imgresetBtn1 = $("<button class='toolbuttons10'>Reset Videofilter</button>");
    imgresetBtn1.appendTo(imgbuttonbox1);
  
  	var imgbuttonbox2 = $("<div/>");
    imgbuttonbox2.css({
      "width": "50%",
      "height": "100%",
      "background": "#151515",
      "border": "2px solid rgba(255, 255, 255, 0.6)"
    });
    
    imgbuttonbox2.appendTo(imgmixerArea2);
  
  	var imgresetBtn2 = $("<button class='toolbuttons10'>Reset Videofilter</button>");
    imgresetBtn2.appendTo(imgbuttonbox2);
    
    var imgtoolbarArea = $("<div/>");
    imgtoolbarArea.css({
      "width": "42%",
      "height": "220px",
      "background": "#202020",
      "border": "2px solid rgba(255, 255, 255, 0.8)",
      "display": "flex",
      "flex-direction": "row",
      "text-align": "left"
    });
    
    imgtoolbarArea.appendTo(imgmediaLibArea);
    
    var imgtrackToolbar = $("<div/>");
    imgtrackToolbar.css({
      "width": "100%",
      "height": "200px",
      "background": "#151515",
      "border": "1px solid rgba(255, 255, 255, 0.8)",
      "text-align": "left",
      "padding-top": "18px",
    });
    
    imgtrackToolbar.appendTo(imgtoolbarArea);
    
    var imgtrackToolbar2 = $("<div/>");
    imgtrackToolbar2.css({
      "width": "98.6%",
      "height": "60px",
      "background": "#202020",
      "border": "1px solid rgba(255, 255, 255, 0.8)",
      "text-align": "left",
      "padding-top": "18px"
    });
    
    imgtrackToolbar2.appendTo(imgmain);
    
    var imgplayerNumber = $("<select style='width:160px; height:50px; font-weight:bold; font-size: 20px; color:white; background: #212121; border: 4px outset silver; border-radius:6px; margin-left:9px;'></select>");
    imgplayerNumber.appendTo(imgtrackToolbar);
    
    var imgplayerOptions = $("<option value='imgplayer1'>Player 1</option><option value='imgplayer2'>Player 2</option>");
    imgplayerOptions.appendTo(imgplayerNumber);
    
    var imgpath = $("<input type='text'/>");
    imgpath.css({
      "width": "540px",
      "height": "40px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "margin-left": "9px",
      "background": "#000029",
      "border-radius": "6px"
    }).val(imgsettings.path);
    
    imgpath.appendTo(imgtrackToolbar);
    
    var imgtrackLoadBtn = $("<button class='toolbuttons22'><img src='Symbole/open.png' style='width:16px; height:16px;'>&nbsp;Load Image</button>");
    imgtrackLoadBtn.css({
      "width": "180px",
      "height": "50px",
      "font-size": "18px",
      "margin-left": "9px",
      "background": "#000029",
      "border": "4px outset silver"
    });
    
    imgtrackLoadBtn.appendTo(imgtrackToolbar);
    
    var imgtrackFile = $("<input type='file' style='display:none;' accept='image/*'/>");
    imgtrackFile.appendTo(imgtrackToolbar);
    
    var imgtrackName = $("<input type='text' placeholder='Imagename'>");
    imgtrackName.css({
      "width": "250px",
      "height": "40px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "margin-left": "9px",
      "margin-top": "16px",
      "background": "#212121",
      "border-radius": "6px",
    });
    
    imgtrackName.appendTo(imgtrackToolbar);
    
    var imgaddTrackBtn = $("<button class='toolbuttons'>+</button>");
    imgaddTrackBtn.css({
      "width": "50px",
      "height": "50px",
      "font-size": "18px",
      "margin-left": "9px",
      "margin-top": "16px",
      "background": "#002929",
      "border-radius": "50%",
      "border": "4px outset silver"
    });
    
    imgaddTrackBtn.appendTo(imgtrackToolbar);
    
    var imgtrackMultiFile = $("<input type='file' style='display:none;' accept='image/*' multiple/>");
    imgtrackMultiFile.appendTo(imgtrackToolbar);
    
    var imgaddTrackMultiBtn = $("<button class='toolbuttons'><img src='Symbole/plist2.png' style='width:16px; height:16px;'>&nbsp;Multiple Images</button>");
    imgaddTrackMultiBtn.css({
      "width": "200px",
      "height": "50px",
      "font-size": "18px",
      "margin-left": "9px",
      "margin-top": "16px",
      "background": "#000029",
      "border-radius": "6px",
      "border": "4px outset silver"
    });
    
    imgaddTrackMultiBtn.appendTo(imgtrackToolbar);
    
    var imgtrackListFile = $("<input type='file' style='display:none;' id='imgtrackListFile' accept='.html, .htm'/>");
    imgtrackListFile.appendTo(imgtrackToolbar2);
    
    var imgtrackListCode = $("<input type='text' id='imgtrackListCode' style='display:none;'/>");
    imgtrackListCode.appendTo(imgtrackToolbar2);
    
    var imgtrackListLoadBtn = $("<button class='toolbuttons5'><img src='Symbole/open.png' style='width:16px; height:16px;'>&nbsp;Load Imagelist</button>");
    imgtrackListLoadBtn.css({
      "width": "200px",
      "height": "50px",
      "font-size": "20px",
      "margin-left": "9px",
      "background": "#000029",
      "border": "4px outset silver"
    });
    
    imgtrackListLoadBtn.appendTo(imgtrackToolbar2);
    
    var imgaddTrackListBtn = $("<button class='toolbuttons'>+</button>");
    imgaddTrackListBtn.css({
      "width": "50px",
      "height": "50px",
      "font-size": "20px",
      "margin-left": "9px",
      "background": "#000029",
      "border-radius": "50%",
      "border": "4px outset silver"
    });
    
    imgaddTrackListBtn.appendTo(imgtrackToolbar2);
    
    var imgtrackCountUpBtn = $("<button class='toolbuttons'>&laquo; Rewind</button>");
    imgtrackCountUpBtn.css({
      "width": "150px",
      "height": "50px",
      "font-size": "20px",
      "margin-left": "9px",
      "margin-top": "16px",
      "background": "#292900",
      "border-radius": "6px",
      "border": "4px outset silver"
    });
    
    imgtrackCountUpBtn.appendTo(imgtrackToolbar);
    
    var imgtrackCountDownBtn = $("<button class='toolbuttons'>&raquo; Forward</button>");
    imgtrackCountDownBtn.css({
      "width": "150px",
      "height": "50px",
      "font-size": "20px",
      "margin-left": "9px",
      "margin-top": "16px",
      "background": "#292900",
      "border-radius": "6px",
      "border": "4px outset silver"
    });
    
    imgtrackCountDownBtn.appendTo(imgtrackToolbar);
    
    var imgtrackUpBtn = $("<button class='toolbuttons'>&uArr; Image Up</button>");
    imgtrackUpBtn.css({
      "width": "190px",
      "height": "50px",
      "font-size": "20px",
      "margin-left": "9px",
      "margin-top": "16px",
      "background": "#290000",
      "border-radius": "6px",
      "border": "4px outset silver"
    });
    
    imgtrackUpBtn.appendTo(imgtrackToolbar);
    
    var imgtrackDownBtn = $("<button class='toolbuttons'>&dArr; Image Down</button>");
    imgtrackDownBtn.css({
      "width": "190px",
      "height": "50px",
      "font-size": "20px",
      "margin-left": "9px",
      "margin-top": "16px",
      "background": "#290000",
      "border-radius": "6px",
      "border": "4px outset silver"
    });
    
    imgtrackDownBtn.appendTo(imgtrackToolbar);
    
    var imgtrackSaveTxt = $("<input type='text' id='imgtrackSaveTxt' placeholder='Trackname' value='2playersImagelist'/>");
    imgtrackSaveTxt.css({
      "width": "350px",
      "height": "40px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "margin-left": "9px",
      "background": "#212121",
      "border-radius": "6px",
    });
    
    imgtrackSaveTxt.appendTo(imgtrackToolbar2);
    
    var imgtrackSaveBtn = $("<button class='toolbuttons5'><img src='Symbole/export.png' style='width:16px; height:16px;'>&nbsp;Save Tracklist</button>");
    imgtrackSaveBtn.css({
      "width": "250px",
      "height": "50px",
      "font-size": "20px",
      "margin-left": "9px",
      "background": "#000029",
      "border": "4px outset silver"
    });
    
    imgtrackSaveBtn.appendTo(imgtrackToolbar2);
    
    var imgtrackDelBtn = $("<button class='toolbuttons'><img src='Symbole/delete.png' style='width:20px; height:20px;'></button>");
    imgtrackDelBtn.css({
      "width": "50px",
      "height": "50px",
      "font-size": "16px",
      "margin-left": "9px",
      "background": "#290000",
      "border-radius": "50%",
      "border": "4px outset silver"
    });
    
    imgtrackDelBtn.appendTo(imgtrackToolbar2);
    
    var imgtracklistDelBtn = $("<button class='toolbuttons'><img src='Symbole/delete2.png' style='width:20px; height:20px; filter:invert(100%);'></button>");
    imgtracklistDelBtn.css({
      "width": "50px",
      "height": "50px",
      "font-size": "16px",
      "margin-left": "9px",
      "background": "#290000",
      "border-radius": "50%",
      "border": "4px outset silver"
    });
    
    imgtracklistDelBtn.appendTo(imgtrackToolbar2);
    
    var imgfiltermix = $("<button class='toolbuttons11'>Videofilter</button>");
    imgfiltermix.appendTo(imgtrackToolbar2);
    
    imgfiltermix.on("click", function() {
      imgmediaLibArea.toggle();
      imgmixerBox.toggle();
    });
    
    var imgplayBtn = $("<button class='toolbuttons5'>Zoom Imagelist</button>");
    imgplayBtn.appendTo(imgtrackToolbar2);
    
    var imgrecmodBtn = $("<button class='toolbuttons9'>");
    imgrecmodBtn.css({
      "border-color": "silver"
    }).html("<img src='Symbole/rec.png' style='width:18px; height: 18px; margin-right: 6px;'>Record").appendTo(imgtrackToolbar2);
    
    var crossfadeLoader = $("<div/>");
    crossfadeLoader.css({
      "width": "0px",
      "height": "6px",
      "background": "lime",
      "position": "absolute",
      "z-index": "1500",
      "left": "0px",
      "top": "0px",
      "display": "none"
    }).appendTo(imageelement);
    
    var crossfadeToolbar = $("<div/>");
    crossfadeToolbar.css({
      "width": "1300px",
      "padding-bottom": "12px",
      "text-align": "left",
      "position": "absolute",
      "z-index": "1900",
      "left": "10px",
      "top": "10px",
      "background": "rgba(20, 20, 20, 0.6)",
      "display": "none"
    }).appendTo(imageelement);
    
    var toolbaropener = $("<img src='Symbole/plist2.png'/>");
    toolbaropener.css({
      "width": "60px",
      "height": "60px",
      "position": "absolute",
      "z-index": "1800",
      "left": "10px",
      "top": "10px",
      "cursor": "pointer",
      "display": "none"
    }).appendTo(imageelement);
    
    var togglePlayPause = $("<button class='toolbuttons22'>&#9654; Play/Pause</button>");
    togglePlayPause.appendTo(crossfadeToolbar);
    
    var imgcrossFadeMode2 = $("<select style='width:160px; height:40px; margin-left:9px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset grey; border-radius:6px;'><option value='Fade'>Fade</option><option value='FadeOut'>FadeOut</option><option value='FadeIn'>FadeIn</option><option value='FadeInFast'>FadeInFast</option><option value='FadeTO'>FadeTimeOut</option></select>");
    imgcrossFadeMode2.appendTo(crossfadeToolbar);
    
    var imgEffectMode2 = $('<select style="width:260px; height:40px; margin-left:9px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset grey; border-radius:6px;"><option value="" style="background:#151515;">No Filter</option><optgroup style="background:green; font-weight:bold; color:yellow;" label="Color &amp; Fading-Effects"><option value="filter1" style="background:#151515; color:white;">Fade Blur</option><option value="filter2" style="background:#151515; color:white;">Fade Dark</option><option value="filter3" style="background:#151515; color:white;">Fade Gray</option><option value="filter4" style="background:#151515; color:white;">Fade Full</option></optgroup><optgroup style="background:red; font-weight:bold; color:yellow;" label="Standard Move-Effects"><option value="filter5" style="background:#151515; color:white;">Zoom InOut</option><option value="filter6" style="background:#151515; color:white;">Zoom OutIn</option><option value="filter7" style="background:#151515; color:white;">Compress Horizontal</option><option value="filter8" style="background:#151515; color:white;">Compress Vertical</option><option value="filter9" style="background:#151515; color:white;">Compress &amp; Rotate horizontal</option><option value="filter10" style="background:#151515; color:white;">Compress &amp; Rotate vertical</option><option value="filter11" style="background:#151515; color:white;">SlideOut horizontal</option><option value="filter12" style="background:#151515; color:white;">SlideOut vertical</option><option value="filter13" style="background:#151515; color:white;">SlideOut diagonal</option><option value="filter14" style="background:#151515; color:white;">SlideOut &amp; compress horizontal</option><option value="filter15" style="background:#151515; color:white;">SlideOut &amp; compress vertical</option><option value="filter16" style="background:#151515; color:white;">SlideOut &amp; compress diagonal</option><option value="filter17" style="background:#151515; color:white;">SlideOut &amp; rotate horizontal</option><option value="filter18" style="background:#151515; color:white;">SlideOut &amp; rotate vertical</option><option value="filter19" style="background:#151515; color:white;">Stretch horizontal</option><option value="filter20" style="background:#151515; color:white;">Stretch vertical</option><option value="filter21" style="background:#151515; color:white;">Stretch diagonal from left to right</option><option value="filter22" style="background:#151515; color:white;">Stretch diagonal from right to left</option><option value="filter23" style="background:#151515; color:white;">Stretch diagonal from top to bottom</option><option value="filter24" style="background:#151515; color:white;">Stretch diagonal from bottom to top</option><option value="filter25" style="background:#151515; color:white;">Pop &amp; Compress horizontal</option><option value="filter26" style="background:#151515; color:white;">Pop &amp; Compress vertical</option><option value="filter27" style="background:#151515; color:white;">Pop &amp; Compress diagonal</option><option value="filter28" style="background:#151515; color:white;">Pop &amp; Rotate horizontal</option><option value="filter29" style="background:#151515; color:white;">Pop &amp; Rotate vertical</option><option value="filter30" style="background:#151515; color:white;">Pop &amp; Rotate diagonal</option></optgroup><optgroup style="background:navy; font-weight:bold; color:yellow;" label="Ellipse Moving-Effects"><option value="filter31" style="background:#151515; color:white;">Zoom-Elipse InOut</option><option value="filter32" style="background:#151515; color:white;">Compress-Elipse Horizontal</option><option value="filter33" style="background:#151515; color:white;">Compress-Elipse Vertical</option><option value="filter34" style="background:#151515; color:white;">Compress &amp; Rotate-Elipse horizontal</option><option value="filter35" style="background:#151515; color:white;">Compress &amp; Rotate-Elipse vertical</option><option value="filter36" style="background:#151515; color:white;">SlideOut &amp; compress-Elipse horizontal</option><option value="filter37" style="background:#151515; color:white;">SlideOut &amp; compress-Elipse vertical</option><option value="filter38" style="background:#151515; color:white;">SlideOut &amp; compress-Elipse diagonal</option><option value="filter39" style="background:#151515; color:white;">SlideOut &amp; rotate-Elipse horizontal</option><option value="filter40" style="background:#151515; color:white;">SlideOut &amp; rotate-Elipse vertical</option><option value="filter41" style="background:#151515; color:white;">Pop &amp; Compress-Elipse horizontal</option><option value="filter42" style="background:#151515; color:white;">Pop &amp; Compress-Elipse vertical</option><option value="filter43" style="background:#151515; color:white;">Pop &amp; Compress-Elipse diagonal</option><option value="filter44" style="background:#151515; color:white;">Pop &amp; Rotate-Elipse horizontal</option><option value="filter45" style="background:#151515; color:white;">Pop &amp; Rotate-Elipse vertical</option><option value="filter46" style="background:#151515; color:white;">Pop &amp; Rotate-Elipse diagonal</option></optgroup><optgroup style="background:purple; font-weight:bold; color:yellow;" label="3D-Standard Moving-Effects"><option value="filter47" style="background:#151515; color:white;">SlideOut horizontal 3D</option><option value="filter48" style="background:#151515; color:white;">SlideOut vertical 3D</option><option value="filter49" style="background:#151515; color:white;">SlideOut diagonal 3D</option><option value="filter50" style="background:#151515; color:white;">SlideOut &amp; compress horizontal 3D</option><option value="filter51" style="background:#151515; color:white;">SlideOut &amp; compress vertical 3D</option><option value="filter52" style="background:#151515; color:white;">SlideOut &amp; compress diagonal 3D</option><option value="filter53" style="background:#151515; color:white;">Pop &amp; Compress horizontal 3D</option><option value="filter54" style="background:#151515; color:white;">Pop &amp; Compress vertical 3D</option><option value="filter55" style="background:#151515; color:white;">Pop &amp; Compress diagonal 3D</option><option value="filter56" style="background:#151515; color:white;">Rotate 3D horizontal left</option><option value="filter57" style="background:#151515; color:white;">Rotate 3D horizontal right</option><option value="filter58" style="background:#151515; color:white;">Rotate 3D vertical up</option><option value="filter59" style="background:#151515; color:white;">Rotate 3D vertical down</option><option value="filter60" style="background:#151515; color:white;">Rotate 3D diagonal up-left</option><option value="filter61" style="background:#151515; color:white;">Rotate 3D diagonal down-right</option></optgroup><optgroup style="background:green; font-weight:bold; color:yellow;" label="3D-Spin- &amp; Moving-Effects"><option value="filter62" style="background:#151515; color:white;">SlideOut horizontal, Spin horizontal &amp; compress 3D</option><option value="filter63" style="background:#151515; color:white;">SlideOut vertical, Spin horizontal &amp; compress 3D</option><option value="filter64" style="background:#151515; color:white;">SlideOut diagonal, Spin horizontal &amp; compress 3D</option><option value="filter65" style="background:#151515; color:white;">SlideOut horizontal, Spin vertical &amp; compress 3D</option><option value="filter66" style="background:#151515; color:white;">SlideOut vertical, Spin vertical &amp; compress 3D</option><option value="filter67" style="background:#151515; color:white;">SlideOut diagonal, Spin vertical &amp; compress 3D</option><option value="filter68" style="background:#151515; color:white;">SlideOut horizontal, Spin diagonal &amp; compress 3D</option><option value="filter69" style="background:#151515; color:white;">SlideOut vertical, Spin diagonal &amp; compress 3D</option><option value="filter70" style="background:#151515; color:white;">SlideOut diagonal, Spin diagonal &amp; compress 3D</option><option value="filter71" style="background:#151515; color:white;">Pop horizontal, Spin horizontal &amp; compress 3D</option><option value="filter72" style="background:#151515; color:white;">Pop vertical, Spin horizontal &amp; compress 3D</option><option value="filter73" style="background:#151515; color:white;">Pop diagonal, Spin horizontal &amp; compress 3D</option><option value="filter74" style="background:#151515; color:white;">Pop horizontal, Spin vertical &amp; compress 3D</option><option value="filter75" style="background:#151515; color:white;">Pop vertical, Spin vertical &amp; compress 3D</option><option value="filter76" style="background:#151515; color:white;">Pop diagonal, Spin vertical &amp; compress 3D</option><option value="filter77" style="background:#151515; color:white;">Pop horizontal, Spin diagonal &amp; compress 3D</option><option value="filter78" style="background:#151515; color:white;">Pop vertical, Spin diagonal &amp; compress 3D</option><option value="filter79" style="background:#151515; color:white;">Pop diagonal, Spin diagonal &amp; compress 3D</option></optgroup><optgroup style="background:red; font-weight:bold; color:yellow;" label="Stretch Moving-Effects"><option value="filter80" style="background:#151515; color:white;">Stretch diagonal left-right &amp; compress</option><option value="filter81" style="background:#151515; color:white;">Stretch diagonal right-left &amp; compress</option><option value="filter82" style="background:#151515; color:white;">Stretch diagonal top-bottom &amp; compress</option><option value="filter83" style="background:#151515; color:white;">Stretch diagonal bottom-top &amp; compress</option><option value="filter84" style="background:#151515; color:white;">Stretch diagonal left-right, SlideOut horizontal &amp; compress</option><option value="filter85" style="background:#151515; color:white;">Stretch diagonal right-left, SlideOut horizontal &amp; compress</option><option value="filter86" style="background:#151515; color:white;">Stretch diagonal top-bottom, SlideOut horizontal &amp; compress</option><option value="filter87" style="background:#151515; color:white;">Stretch diagonal bottom-top, SlideOut horizontal &amp; compress</option><option value="filter88" style="background:#151515; color:white;">Stretch diagonal left-right, SlideOut vertical &amp; compress</option><option value="filter89" style="background:#151515; color:white;">Stretch diagonal right-left, SlideOut vertical &amp; compress</option><option value="filter90" style="background:#151515; color:white;">Stretch diagonal top-bottom, SlideOut vertical &amp; compress</option><option value="filter91" style="background:#151515; color:white;">Stretch diagonal bottom-top, SlideOut vertical &amp; compress</option><option value="filter92" style="background:#151515; color:white;">Stretch diagonal left-right, SlideOut diagonal &amp; compress</option><option value="filter93" style="background:#151515; color:white;">Stretch diagonal right-left, SlideOut diagonal &amp; compress</option><option value="filter94" style="background:#151515; color:white;">Stretch diagonal top-bottom, SlideOut diagonal &amp; compress</option><option value="filter95" style="background:#151515; color:white;">Stretch diagonal bottom-top, SlideOut diagonal &amp; compress</option><option value="filter96" style="background:#151515; color:white;">Stretch diagonal left-right, Pop diagonal &amp; compress</option><option value="filter97" style="background:#151515; color:white;">Stretch diagonal right-left, Pop diagonal &amp; compress</option><option value="filter98" style="background:#151515; color:white;">Stretch diagonal top-bottom, Pop diagonal &amp; compress</option><option value="filter99" style="background:#151515; color:white;">Stretch diagonal bottom-top, Pop diagonal &amp; compress</option></optgroup><optgroup style="background:navy; font-weight:bold; color:yellow;" label="FadeOut Moving-Effects"><option value="filter100" style="background:#151515; color:white;">Zoom-FadeOut InOut</option><option value="filter101" style="background:#151515; color:white;">Zoom-FadeOut OutIn</option><option value="filter102" style="background:#151515; color:white;">Compress-FadeOut Horizontal</option><option value="filter103" style="background:#151515; color:white;">Compress-FadeOut Vertical</option><option value="filter104" style="background:#151515; color:white;">Compress &amp; Rotate-FadeOut horizontal</option><option value="filter105" style="background:#151515; color:white;">Compress &amp; Rotate-FadeOut vertical</option><option value="filter106" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut horizontal</option><option value="filter107" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut vertical</option><option value="filter108" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut diagonal</option><option value="filter109" style="background:#151515; color:white;">SlideOut &amp; rotate-FadeOut horizontal</option><option value="filter110" style="background:#151515; color:white;">SlideOut &amp; rotate-FadeOut vertical</option><option value="filter111" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut horizontal</option><option value="filter112" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut vertical</option><option value="filter113" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut diagonal</option><option value="filter114" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut horizontal</option><option value="filter115" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut vertical</option><option value="filter116" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut diagonal</option></optgroup><optgroup style="background:purple; font-weight:bold; color:yellow;" label="FadeOut &amp; Ellipse Moving-Effects"><option value="filter117" style="background:#151515; color:white;">Zoom-FadeOut-Ellipse InOut</option><option value="filter118" style="background:#151515; color:white;">Zoom-FadeOut-Ellipse OutIn</option><option value="filter119" style="background:#151515; color:white;">Compress-FadeOut-Ellipse Horizontal</option><option value="filter120" style="background:#151515; color:white;">Compress-FadeOut-Ellipse Vertical</option><option value="filter121" style="background:#151515; color:white;">Compress &amp; Rotate-FadeOut-Ellipse horizontal</option><option value="filter122" style="background:#151515; color:white;">Compress &amp; Rotate-FadeOut-Ellipse vertical</option><option value="filter123" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut-Ellipse horizontal</option><option value="filter124" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut-Ellipse vertical</option><option value="filter125" style="background:#151515; color:white;">SlideOut &amp; compress-FadeOut-Ellipse diagonal</option><option value="filter126" style="background:#151515; color:white;">SlideOut &amp; rotate-FadeOut-Ellipse horizontal</option><option value="filter127" style="background:#151515; color:white;">SlideOut &amp; rotate-FadeOut-Ellipse vertical</option><option value="filter128" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut-Ellipse horizontal</option><option value="filter129" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut-Ellipse vertical</option><option value="filter130" style="background:#151515; color:white;">Pop &amp; Compress-FadeOut-Ellipse diagonal</option><option value="filter131" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut-Ellipse horizontal</option><option value="filter132" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut-Ellipse vertical</option><option value="filter133" style="background:#151515; color:white;">Pop &amp; Rotate-FadeOut-Ellipse diagonal</option></optgroup><optgroup style="background:green; font-weight:bold; color:yellow;" label="3D-Fading-Moving-Effects"><option value="filter134" style="background:#151515; color:white;">SlideOut horizontal 3D-FadeOut</option><option value="filter135" style="background:#151515; color:white;">SlideOut vertical 3D-FadeOut</option><option value="filter136" style="background:#151515; color:white;">SlideOut diagonal 3D-FadeOut</option><option value="filter137" style="background:#151515; color:white;">SlideOut &amp; compress horizontal 3D-FadeOut</option><option value="filter138" style="background:#151515; color:white;">SlideOut &amp; compress vertical 3D-FadeOut</option><option value="filter139" style="background:#151515; color:white;">SlideOut &amp; compress diagonal 3D-FadeOut</option><option value="filter140" style="background:#151515; color:white;">Pop &amp; Compress horizontal 3D-FadeOut</option><option value="filter141" style="background:#151515; color:white;">Pop &amp; Compress vertical 3D-FadeOut</option><option value="filter142" style="background:#151515; color:white;">Pop &amp; Compress diagonal 3D-FadeOut</option><option value="filter143" style="background:#151515; color:white;">Rotate 3D-FadeOut horizontal left</option><option value="filter144" style="background:#151515; color:white;">Rotate-FadeOut 3D horizontal right</option><option value="filter145" style="background:#151515; color:white;">Rotate-FadeOut 3D vertical up</option><option value="filter146" style="background:#151515; color:white;">Rotate-FadeOut 3D vertical down</option><option value="filter147" style="background:#151515; color:white;">Rotate-FadeOut 3D diagonal up-left</option><option value="filter148" style="background:#151515; color:white;">Rotate-FadeOut 3D diagonal down-right</option></optgroup><optgroup style="background:red; font-weight:bold; color:yellow;" label="3D-Fading-Spin- &amp; Moving-Effects"><option value="filter149" style="background:#151515; color:white;">SlideOut horizontal, Spin horizontal &amp; compress 3D-Fading</option><option value="filter150" style="background:#151515; color:white;">SlideOut vertical, Spin horizontal &amp; compress 3D-Fading</option><option value="filter151" style="background:#151515; color:white;">SlideOut diagonal, Spin horizontal &amp; compress 3D-Fading</option><option value="filter152" style="background:#151515; color:white;">SlideOut horizontal, Spin vertical &amp; compress 3D-Fading</option><option value="filter153" style="background:#151515; color:white;">SlideOut vertical, Spin vertical &amp; compress 3D-Fading</option><option value="filter154" style="background:#151515; color:white;">SlideOut diagonal, Spin vertical &amp; compress 3D-Fading</option><option value="filter155" style="background:#151515; color:white;">SlideOut horizontal, Spin diagonal &amp; compress 3D-Fading</option><option value="filter156" style="background:#151515; color:white;">SlideOut vertical, Spin diagonal &amp; compress 3D-Fading</option><option value="filter157" style="background:#151515; color:white;">SlideOut diagonal, Spin diagonal &amp; compress 3D-Fading</option><option value="filter158" style="background:#151515; color:white;">Pop horizontal, Spin horizontal &amp; compress 3D-Fading</option><option value="filter159" style="background:#151515; color:white;">Pop vertical, Spin horizontal &amp; compress 3D-Fading</option><option value="filter160" style="background:#151515; color:white;">Pop diagonal, Spin horizontal &amp; compress 3D-Fading</option><option value="filter161" style="background:#151515; color:white;">Pop horizontal, Spin vertical &amp; compress 3D-Fading</option><option value="filter162" style="background:#151515; color:white;">Pop vertical, Spin vertical &amp; compress 3D-Fading</option><option value="filter163" style="background:#151515; color:white;">Pop diagonal, Spin vertical &amp; compress 3D-Fading</option><option value="filter164" style="background:#151515; color:white;">Pop horizontal, Spin diagonal &amp; compress 3D-Fading</option><option value="filter165" style="background:#151515; color:white;">Pop vertical, Spin diagonal &amp; compress 3D-Fading</option><option value="filter166" style="background:#151515; color:white;">Pop diagonal, Spin diagonal &amp; compress 3D-Fading</option></optgroup><optgroup style="background:navy; font-weight:bold; color:yellow;" label="Stretch Moving-Fading-Effects"><option value="filter167" style="background:#151515; color:white;">Stretch-Fading diagonal left-right &amp; compress</option><option value="filter168" style="background:#151515; color:white;">Stretch-Fading diagonal right-left &amp; compress</option><option value="filter169" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom &amp; compress</option><option value="filter170" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top &amp; compress</option><option value="filter171" style="background:#151515; color:white;">Stretch-Fading diagonal left-right, SlideOut horizontal &amp; compress</option><option value="filter172" style="background:#151515; color:white;">Stretch-Fading diagonal right-left, SlideOut horizontal &amp; compress</option><option value="filter173" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom, SlideOut horizontal &amp; compress</option><option value="filter174" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top, SlideOut horizontal &amp; compress</option><option value="filter175" style="background:#151515; color:white;">Stretch-Fading diagonal left-right, SlideOut vertical &amp; compress</option><option value="filter176" style="background:#151515; color:white;">Stretch-Fading diagonal right-left, SlideOut vertical &amp; compress</option><option value="filter177" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom, SlideOut vertical &amp; compress</option><option value="filter178" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top, SlideOut vertical &amp; compress</option><option value="filter179" style="background:#151515; color:white;">Stretch-Fading diagonal left-right, SlideOut diagonal &amp; compress</option><option value="filter180" style="background:#151515; color:white;">Stretch-Fading diagonal right-left, SlideOut diagonal &amp; compress</option><option value="filter181" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom, SlideOut diagonal &amp; compress</option><option value="filter182" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top, SlideOut diagonal &amp; compress</option><option value="filter183" style="background:#151515; color:white;">Stretch-Fading diagonal left-right, Pop diagonal &amp; compress</option><option value="filter184" style="background:#151515; color:white;">Stretch-Fading diagonal right-left, Pop diagonal &amp; compress</option><option value="filter185" style="background:#151515; color:white;">Stretch-Fading diagonal top-bottom, Pop diagonal &amp; compress</option><option value="filter186" style="background:#151515; color:white;">Stretch-Fading diagonal bottom-top, Pop diagonal &amp; compress</option></optgroup><optgroup style="background:purple; font-weight:bold; color:yellow;" label="FadeOut Spin-Moving-Effects"><option value="filter187" style="background:#151515; color:white;">Zoom-Spin-FadeOut InOut</option><option value="filter188" style="background:#151515; color:white;">Zoom-Spin-FadeOut OutIn</option><option value="filter189" style="background:#151515; color:white;">Compress-Spin-FadeOut Horizontal</option><option value="filter190" style="background:#151515; color:white;">Compress-Spin-FadeOut Vertical</option><option value="filter191" style="background:#151515; color:white;">Compress &amp; Rotate-Spin-FadeOut horizontal</option><option value="filter192" style="background:#151515; color:white;">Compress &amp; Rotate-Spin-FadeOut vertical</option><option value="filter193" style="background:#151515; color:white;">SlideOut &amp; compress-Spin-FadeOut horizontal</option><option value="filter194" style="background:#151515; color:white;">SlideOut &amp; compress-Spin-FadeOut vertical</option><option value="filter195" style="background:#151515; color:white;">SlideOut &amp; compress-Spin-FadeOut diagonal</option><option value="filter196" style="background:#151515; color:white;">SlideOut &amp; rotate-Spin-FadeOut horizontal</option><option value="filter197" style="background:#151515; color:white;">SlideOut &amp; rotate-Spin-FadeOut vertical</option><option value="filter198" style="background:#151515; color:white;">Pop &amp; Compress-Spin-FadeOut horizontal</option><option value="filter199" style="background:#151515; color:white;">Pop &amp; Compress-Spin-FadeOut vertical</option><option value="filter200" style="background:#151515; color:white;">Pop &amp; Compress-Spin-FadeOut diagonal</option><option value="filter201" style="background:#151515; color:white;">Pop &amp; Rotate-Spin-FadeOut horizontal</option><option value="filter202" style="background:#151515; color:white;">Pop &amp; Rotate-Spin-FadeOut vertical</option><option value="filter203" style="background:#151515; color:white;">Pop &amp; Rotate-Spin-FadeOut diagonal</option></optgroup><optgroup label="Parable-Horizontal SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter204" style="background:#151515; color:white;">Parable-Horizontal Compress</option><option value="filter205" style="background:#151515; color:white;">Parable-Horizontal Rotate horizontal</option><option value="filter206" style="background:#151515; color:white;">Parable-Horizontal Rotate vertical</option><option value="filter207" style="background:#151515; color:white;">Parable-Horizontal Rotate 3D-horizontal</option><option value="filter208" style="background:#151515; color:white;">Parable-Horizontal Rotate 3D-vertical</option><option value="filter209" style="background:#151515; color:white;">Parable-Horizontal Rotate 3D-diagonal</option><option value="filter210" style="background:#151515; color:white;">Parable-Horizontal Rotate 2D</option></optgroup><optgroup label="Parable-Horizontal SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter211" style="background:#151515; color:white;">Parable-Horizontal Elipse-Compress</option><option value="filter212" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate horizontal</option><option value="filter213" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate vertical</option><option value="filter214" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate 3D-horizontal</option><option value="filter215" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate 3D-vertical</option><option value="filter216" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate 3D-diagonal</option><option value="filter217" style="background:#151515; color:white;">Parable-Horizontal Elipse-Rotate 2D</option></optgroup><optgroup label="Parable-Horizontal SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter218" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Compress</option><option value="filter219" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate horizontal</option><option value="filter220" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate vertical</option><option value="filter221" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate 3D-horizontal</option><option value="filter222" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate 3D-vertical</option><option value="filter223" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate 3D-diagonal</option><option value="filter224" style="background:#151515; color:white;">Parable-Horizontal FadeOut-Rotate 2D</option></optgroup><optgroup label="Parable-Vertical SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter225" style="background:#151515; color:white;">Parable-Vertical Compress</option><option value="filter226" style="background:#151515; color:white;">Parable-Vertical Rotate horizontal</option><option value="filter227" style="background:#151515; color:white;">Parable-Vertical Rotate vertical</option><option value="filter228" style="background:#151515; color:white;">Parable-Vertical Rotate 3D-horizontal</option><option value="filter229" style="background:#151515; color:white;">Parable-Vertical Rotate 3D-vertical</option><option value="filter230" style="background:#151515; color:white;">Parable-Vertical Rotate 3D-diagonal</option><option value="filter231" style="background:#151515; color:white;">Parable-Vertical Rotate 2D</option></optgroup><optgroup label="Parable-Vertical SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter232" style="background:#151515; color:white;">Parable-Vertical Elipse-Compress</option><option value="filter233" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate horizontal</option><option value="filter234" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate vertical</option><option value="filter235" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate 3D-horizontal</option><option value="filter236" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate 3D-vertical</option><option value="filter237" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate 3D-diagonal</option><option value="filter238" style="background:#151515; color:white;">Parable-Vertical Elipse-Rotate 2D</option></optgroup><optgroup label="Parable-Vertical SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter239" style="background:#151515; color:white;">Parable-Vertical FadeOut-Compress</option><option value="filter240" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate horizontal</option><option value="filter241" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate vertical</option><option value="filter242" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate 3D-horizontal</option><option value="filter243" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate 3D-vertical</option><option value="filter244" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate 3D-diagonal</option><option value="filter245" style="background:#151515; color:white;">Parable-Vertical FadeOut-Rotate 2D</option></optgroup><optgroup label="Parable-Diagonal SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter246" style="background:#151515; color:white;">Parable-Diagonal Compress</option><option value="filter247" style="background:#151515; color:white;">Parable-Diagonal Rotate horizontal</option><option value="filter248" style="background:#151515; color:white;">Parable-Diagonal Rotate vertical</option><option value="filter249" style="background:#151515; color:white;">Parable-Diagonal Rotate 3D-horizontal</option><option value="filter250" style="background:#151515; color:white;">Parable-Diagonal Rotate 3D-vertical</option><option value="filter251" style="background:#151515; color:white;">Parable-Diagonal Rotate 3D-diagonal</option><option value="filter252" style="background:#151515; color:white;">Parable-Diagonal Rotate 2D</option></optgroup><optgroup label="Parable-Diagonal SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter253" style="background:#151515; color:white;">Parable-Diagonal Elipse-Compress</option><option value="filter254" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate horizontal</option><option value="filter255" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate vertical</option><option value="filter256" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate 3D-horizontal</option><option value="filter257" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate 3D-vertical</option><option value="filter258" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate 3D-diagonal</option><option value="filter259" style="background:#151515; color:white;">Parable-Diagonal Elipse-Rotate 2D</option></optgroup><optgroup label="Parable-Diagonal SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter260" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Compress</option><option value="filter261" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate horizontal</option><option value="filter262" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate vertical</option><option value="filter263" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate 3D-horizontal</option><option value="filter264" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate 3D-vertical</option><option value="filter265" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate 3D-diagonal</option><option value="filter266" style="background:#151515; color:white;">Parable-Diagonal FadeOut-Rotate 2D</option></optgroup><optgroup label="Parable - 3D-Slide horizontal" style="background:green; font-family:; color:yellow; font-weight:bold;"><option value="filter267" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter268" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter269" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter270" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter271" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter272" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Parable - 3D-Slide vertical" style="background:red; font-family:; color:yellow; font-weight:bold;"><option value="filter273" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter274" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter275" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter276" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter277" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter278" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Parable - 3D-Slide diagonal" style="background:navy; font-family:; color:yellow; font-weight:bold;"><option value="filter279" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter280" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter281" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter282" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter283" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter284" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Cube-Parable-Horizontal SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter285" style="background:#151515; color:white;">Cube-Parable-Horizontal Compress</option><option value="filter286" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate horizontal</option><option value="filter287" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate vertical</option><option value="filter288" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate 3D-horizontal</option><option value="filter289" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate 3D-vertical</option><option value="filter290" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate 3D-diagonal</option><option value="filter291" style="background:#151515; color:white;">Cube-Parable-Horizontal Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Horizontal SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter292" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Compress</option><option value="filter293" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate horizontal</option><option value="filter294" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate vertical</option><option value="filter295" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate 3D-horizontal</option><option value="filter296" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate 3D-vertical</option><option value="filter297" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate 3D-diagonal</option><option value="filter298" style="background:#151515; color:white;">Cube-Parable-Horizontal Elipse-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Horizontal SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter299" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Compress</option><option value="filter300" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate horizontal</option><option value="filter301" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate vertical</option><option value="filter302" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate 3D-horizontal</option><option value="filter303" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate 3D-vertical</option><option value="filter304" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate 3D-diagonal</option><option value="filter305" style="background:#151515; color:white;">Cube-Parable-Horizontal FadeOut-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Vertical SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter306" style="background:#151515; color:white;">Cube-Parable-Vertical Compress</option><option value="filter307" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate horizontal</option><option value="filter308" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate vertical</option><option value="filter309" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate 3D-horizontal</option><option value="filter310" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate 3D-vertical</option><option value="filter311" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate 3D-diagonal</option><option value="filter312" style="background:#151515; color:white;">Cube-Parable-Vertical Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Vertical SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter313" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Compress</option><option value="filter314" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate horizontal</option><option value="filter315" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate vertical</option><option value="filter316" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate 3D-horizontal</option><option value="filter317" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate 3D-vertical</option><option value="filter318" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate 3D-diagonal</option><option value="filter319" style="background:#151515; color:white;">Cube-Parable-Vertical Elipse-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Vertical SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter320" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Compress</option><option value="filter321" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate horizontal</option><option value="filter322" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate vertical</option><option value="filter323" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate 3D-horizontal</option><option value="filter324" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate 3D-vertical</option><option value="filter325" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate 3D-diagonal</option><option value="filter326" style="background:#151515; color:white;">Cube-Parable-Vertical FadeOut-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Diagonal SlideOut-Effects" style="background:green; color:yellow; font-weight:bold;"><option value="filter327" style="background:#151515; color:white;">Cube-Parable-Diagonal Compress</option><option value="filter328" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate horizontal</option><option value="filter329" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate vertical</option><option value="filter330" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate 3D-horizontal</option><option value="filter331" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate 3D-vertical</option><option value="filter332" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate 3D-diagonal</option><option value="filter333" style="background:#151515; color:white;">Cube-Parable-Diagonal Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Diagonal SlideOut-Effects - Elipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter334" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Compress</option><option value="filter335" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate horizontal</option><option value="filter336" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate vertical</option><option value="filter337" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate 3D-horizontal</option><option value="filter338" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate 3D-vertical</option><option value="filter339" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate 3D-diagonal</option><option value="filter340" style="background:#151515; color:white;">Cube-Parable-Diagonal Elipse-Rotate 2D</option></optgroup><optgroup label="Cube-Parable-Diagonal SlideOut-Effects - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter341" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Compress</option><option value="filter342" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate horizontal</option><option value="filter343" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate vertical</option><option value="filter344" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate 3D-horizontal</option><option value="filter345" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate 3D-vertical</option><option value="filter346" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate 3D-diagonal</option><option value="filter347" style="background:#151515; color:white;">Cube-Parable-Diagonal FadeOut-Rotate 2D</option></optgroup><optgroup label="Cube-Parable - 3D-Slide horizontal" style="background:green; font-family:; color:yellow; font-weight:bold;"><option value="filter348" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter349" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter350" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter351" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter352" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter353" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Cube-Parable - 3D-Slide vertical" style="background:red; font-family:; color:yellow; font-weight:bold;"><option value="filter354" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter355" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter356" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter357" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter358" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter359" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Cube-Parable - 3D-Slide diagonal" style="background:navy; font-family:; color:yellow; font-weight:bold;"><option value="filter360" style="background:#151515; color:white;">3D-Compress - X-Axis</option><option value="filter361" style="background:#151515; color:white;">3D-Compress - Y-Axis</option><option value="filter362" style="background:#151515; color:white;">3D-Compress - X-Axis - Ellipse</option><option value="filter363" style="background:#151515; color:white;">3D-Compress - Y-Axis - Ellipse</option><option value="filter364" style="background:#151515; color:white;">3D-Compress - X-Axis - FadeOut</option><option value="filter365" style="background:#151515; color:white;">3D-Compress - Y-Axis - FadeOut</option></optgroup><optgroup label="Zoom-Parable - Standard" style="background:green; color:yellow; font-weight:bold;"><option value="filter366" style="background:#151515; color:white;">Zoom</option><option value="filter367" style="background:#151515; color:white;">Zoom &amp; Slide horizontal</option><option value="filter368" style="background:#151515; color:white;">Zoom &amp; Slide vertical</option><option value="filter369" style="background:#151515; color:white;">Zoom &amp; Slide diagonal</option><option value="filter370" style="background:#151515; color:white;">Zoom &amp; Pop horizontal</option><option value="filter371" style="background:#151515; color:white;">Zoom &amp; Pop vertical</option><option value="filter372" style="background:#151515; color:white;">Zoom &amp; Pop diagonal</option><option value="filter373" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable</option><option value="filter374" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable</option><option value="filter375" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable</option><option value="filter376" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable</option><option value="filter377" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable</option><option value="filter378" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable</option></optgroup><optgroup label="Zoom-Parable - Ellipse" style="background:red; color:yellow; font-weight:bold;"><option value="filter379" style="background:#151515; color:white;">Zoom - Ellipse</option><option value="filter380" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Ellipse</option><option value="filter381" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Ellipse</option><option value="filter382" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Ellipse</option><option value="filter383" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - Ellipse</option><option value="filter384" style="background:#151515; color:white;">Zoom &amp; Pop vertical - Ellipse</option><option value="filter385" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - Ellipse</option><option value="filter386" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - Ellipse</option><option value="filter387" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - Ellipse</option><option value="filter388" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - Ellipse</option><option value="filter389" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parbable - Ellipse</option><option value="filter390" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - Ellipse</option><option value="filter391" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable - Ellipse</option></optgroup><optgroup label="Zoom-Parable - FadeOut" style="background:navy; color:yellow; font-weight:bold;"><option value="filter392" style="background:#151515; color:white;">Zoom - FadeOut</option><option value="filter393" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - FadeOut</option><option value="filter394" style="background:#151515; color:white;">Zoom &amp; Slide vertical - FadeOut</option><option value="filter395" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - FadeOut</option><option value="filter396" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - FadeOut</option><option value="filter397" style="background:#151515; color:white;">Zoom &amp; Pop vertical - FadeOut</option><option value="filter398" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - FadeOut</option><option value="filter399" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - FadeOut</option><option value="filter400" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - FadeOut</option><option value="filter401" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - FadeOut</option><option value="filter402" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable - FadeOut</option><option value="filter403" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - FadeOut</option><option value="filter404" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parbable - FadeOut</option></optgroup><optgroup label="Zoom-Parable - 3D Turn-90deg X-Axis" style="background:purple; color:yellow; font-weight:bold;"><option value="filter405" style="background:#151515; color:white;">Zoom - 3D Turn-90deg X-Axis</option><option value="filter406" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - 3D Turn-90deg X-Axis</option><option value="filter407" style="background:#151515; color:white;">Zoom &amp; Slide vertical - 3D Turn-90deg X-Axis</option><option value="filter408" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - 3D Turn-90deg X-Axis</option><option value="filter409" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - 3D Turn-90deg X-Axis</option><option value="filter410" style="background:#151515; color:white;">Zoom &amp; Pop vertical - 3D Turn-90deg X-Axis</option><option value="filter411" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - 3D Turn-90deg X-Axis</option><option value="filter412" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - 3D Turn-90deg X-Axis</option><option value="filter413" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - 3D Turn-90deg X-Axis</option><option value="filter414" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - 3D Turn-90deg X-Axis</option><option value="filter415" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable - 3D Turn-90deg X-Axis</option><option value="filter416" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - 3D Turn-90deg X-Axis</option><option value="filter417" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable - 3D Turn-90deg X-Axis</option></optgroup><optgroup label="Zoom-Parable - 3D Turn-90deg Y-Axis" style="background:#4B088A; color:yellow; font-weight:bold;"><option value="filter418" style="background:#151515; color:white;">Zoom - 3D Turn-90deg Y-Axis</option><option value="filter419" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - 3D Turn-90deg Y-Axis</option><option value="filter420" style="background:#151515; color:white;">Zoom &amp; Slide vertical - 3D Turn-90deg Y-Axis</option><option value="filter421" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - 3D Turn-90deg Y-Axis</option><option value="filter422" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - 3D Turn-90deg Y-Axis</option><option value="filter423" style="background:#151515; color:white;">Zoom &amp; Pop vertical - 3D Turn-90deg Y-Axis</option><option value="filter424" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - 3D Turn-90deg Y-Axis</option><option value="filter425" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - 3D Turn-90deg Y-Axis</option><option value="filter426" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - 3D Turn-90deg Y-Axis</option><option value="filter427" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - 3D Turn-90deg Y-Axis</option><option value="filter428" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable - 3D Turn-90deg Y-Axis</option><option value="filter429" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - 3D Turn-90deg Y-Axis</option><option value="filter430" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable - 3D Turn-90deg Y-Axis</option></optgroup><optgroup label="Zoom-Parable - 3D Turn-90deg XY-Axis" style="background:purple; color:yellow; font-weight:bold;"><option value="filter431" style="background:#151515; color:white;">Zoom - 3D Turn-90deg XY-Axis</option><option value="filter432" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - 3D Turn-90deg XY-Axis</option><option value="filter433" style="background:#151515; color:white;">Zoom &amp; Slide vertical - 3D Turn-90deg XY-Axis</option><option value="filter434" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - 3D Turn-90deg XY-Axis</option><option value="filter435" style="background:#151515; color:white;">Zoom &amp; Pop horizontal - 3D Turn-90deg XY-Axis</option><option value="filter436" style="background:#151515; color:white;">Zoom &amp; Pop vertical - 3D Turn-90deg XY-Axis</option><option value="filter437" style="background:#151515; color:white;">Zoom &amp; Pop diagonal - 3D Turn-90deg XY-Axis</option><option value="filter438" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Parable - 3D Turn-90deg XY-Axis</option><option value="filter439" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Parable - 3D Turn-90deg XY-Axis</option><option value="filter440" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Parable - 3D Turn-90deg XY-Axis</option><option value="filter441" style="background:#151515; color:white;">Zoom &amp; Slide horizontal - Cube-Parable - 3D Turn-90deg XY-Axis</option><option value="filter442" style="background:#151515; color:white;">Zoom &amp; Slide vertical - Cube-Parable - 3D Turn-90deg XY-Axis</option><option value="filter443" style="background:#151515; color:white;">Zoom &amp; Slide diagonal - Cube-Parable - 3D Turn-90deg XY-Axis</option></optgroup></select>');
    imgEffectMode2.appendTo(crossfadeToolbar);
    
    var imgcrossFadeTime2 = $("<input type='number' style='width:80px; height:30px; margin-left:9px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset grey; margin-left:6px; border-radius:6px;'>");
    imgcrossFadeTime2.attr({
      "max": 30,
      "min": 0.1,
      "step": 0.1,
      "value": 10
    });
    
    imgcrossFadeTime2.appendTo(crossfadeToolbar);
    
    var loaderduration = $("<input type='number' style='width:80px; height:30px; margin-left:9px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset grey; margin-left:6px; border-radius:6px;'>");
    loaderduration.attr({
      "max": 20,
      "min": 0.1,
      "step": 0.1,
      "value": 6
    });
        
    loaderduration.appendTo(crossfadeToolbar);
    
    var rotlevel = $("<input type='number' style='width:80px; height:30px; margin-left:9px; font-weight:bold; font-size: 16px; color:white; background: #212121; border: 4px outset grey; margin-left:6px; border-radius:6px;'>");
    rotlevel.attr({
      "max": 20,
      "min": 1,
      "step": 1,
      "value": 1
    }).appendTo(crossfadeToolbar);
    
    var imggalleryBtn = $("<button class='toolbuttons23'><img src='Symbole/img.png' style='width:16px; height:16px;'>&nbsp;Gallery</button>");
    imggalleryBtn.appendTo(crossfadeToolbar);
    
    var exitfullBtn = $("<button class='toolbuttons4'><img src='Symbole/fullscreenoff.png'></button>");
    exitfullBtn.appendTo(crossfadeToolbar);
    
    var toolbarCloseBtn = $("<button class='toolbuttons3'>X</button>");
    toolbarCloseBtn.appendTo(crossfadeToolbar);
    
    toolbarCloseBtn.on("click", function() {
      crossfadeToolbar.hide();
    });
    
    var imgCanvas = $("<div/>");
    imgCanvas.css({
      "width": "100%",
      "height": "100%",
      "position": "absolute",
      "z-index": 1200,
      "left": "0px",
      "top": "0px",
      "background": imgsettings.imageCanvas,
      "display": "none"
    }).appendTo(imageelement);
    
    var imggallery = $("<div/>");
    imggallery.css({
      "width": "99%",
      "height": "100%",
      "background": "rgba(30, 30, 30, 0.75)",
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "z-index": "1500",
      "display": "none"
    });
    
    imggallery.appendTo(imageelement);
    
    var imggalleryHead = $("<div/>");
    imggalleryHead.css({
      "width": "100%",
      "height": "30px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left"
    }).text("Image-Gallery");
    
    imggalleryHead.appendTo(imggallery);
    
    var imggalleryClose = $("<button class='closeBtn'>X</button>");
    imggalleryClose.appendTo(imggalleryHead);
    
    var imggalleryItem = $("<div id='imggalleryList'></div>");
    imggalleryItem.css({
      "width": "98%",
      "height": "90%",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "padding": "16px",
      "background": "rgba(15, 15, 15, 0.9)",
      "overflow": "auto"
    });
    
    imggalleryItem.appendTo(imggallery);
    
    function setimgGallery() {
      var galleryCols = [];
      var galleryRows = [];
      var rowNumber = Math.ceil($("#imgtracklist li").length/imgsettings.galleryCols);
      
      for (var x=0; x<imgsettings.galleryCols; x++) {
        galleryCols.push("<td name='"+imgpath.val()+""+$("#imgtracklist li:eq("+x+")").text()+"' style='width:"+100/imgsettings.galleryCols+"%; height:150px; background:url(Symbole/img.png); background-size:60%; text-align:center; font-size:16px; font-weight:bold; color:white; border:2px outset rgba(255, 255, 255, 0.8); cursor:pointer;'></td>");
      }
      
      for (var y=0; y<rowNumber; y++) {
        galleryRows.push("<tr>"+galleryCols.join("")+"</tr>");
      }
      
      imggalleryItem.html("<table style='width:99%;'>"+galleryRows.join("")+"</table>");
      
      for (var z=0; z<$("#imgtracklist li").length; z++) {
        $("#imggalleryList td:eq("+z+")").html("<img style='width:"+window.screen.availWidth*0.9/imgsettings.galleryCols+"px; border:4px outset white;' src='"+imgpath.val()+""+$("#imgtracklist li:eq("+z+")").text()+"'>").attr("name", imgpath.val()+""+$("#imgtracklist li:eq("+z+")").text());
      }
    }
    
    imggalleryBtn.on("click", function() {
      setimgGallery();
      imggallery.show();
    });
    
    imggalleryClose.on("click", function() {
      imggallery.hide();
    });
    
    imggalleryItem.on("mouseenter", function() {
      $("#imggalleryList td").on("click", function() {
        var imggcells = $(this).index();
        var imggrows = $(this).parent().index();
        var imggNumbers = $("#imggalleryList table tr:eq(0) td").length;
        var imggCont = $(this).html();
      
        if (imggCont  !== "") {
          currentImage = imggrows * imggNumbers + imggcells;
          
          if (imgplayerNumber.val() === "imgplayer1") {
            imgbox1.attr("src",$(this).attr("name"));
          } else if (imgplayerNumber.val() === "imgplayer2") {
            imgbox2.attr("src",$(this).attr("name"));
          }
         }

      imggallery.hide();
       });
    });
    
    function imgtrackForward() {
      $("#imgtracklist li").removeClass("imgselTrack");
      currentImage++;
      
      if (currentImage == $("#imgtracklist li").length) {
        currentImage = 0;
      }
      
      $("#imgtracklist li:eq("+currentImage+")").addClass("imgselTrack");
    }
    
    function imgtrackReverse() {
      $("#imgtracklist li").removeClass("imgselTrack");
      currentImage--;
      
      if (currentImage == -1) {
        currentImage = $("#imgtracklist li").length - 1;
      }
      
      $("#imgtracklist li:eq("+currentImage+")").addClass("imgselTrack");
    }
    
    function setimgPosition() {
    var itrArea = imgtrackLib.height();
    var itrHead = $("#imgtracklist li").outerHeight();
    var itrTrack = $("#imgtracklist li").outerHeight();
    var itrPos = currentImage * itrTrack + itrHead;
    var itrScroll = itrPos - itrArea + 30;

    if (itrPos > itrArea) {
       imgtrackLib.animate({ scrollTop: itrScroll + "px" }, 10);
     } else if (currentImage === 0) {
       imgtrackLib.animate({ scrollTop: "-100px" }, 10);
     }
    }
    
    function loadImage(imgplayer) {
      var imgtrack = $("#imgtracklist li:eq("+currentImage+")").text();
      $("#"+imgplayer).attr("src", imgpath.val()+imgtrack);
    }
    
    imgtrackLibList.on("mouseenter", function() {
      $("#imgtracklist li").on("click", function() {
        $("#imgtracklist li").removeClass("imgselTrack");
        currentImage = $(this).index();
        $(this).addClass("imgselTrack");
      });
      
      $("#imgtracklist li").on("dblclick", function() {
        var iplNumb = imgplayerNumber.val();
        
        if (iplNumb === "imgplayer1") {
          imgbox1.attr("src", imgpath.val()+$(this).text());
          
        } else if (iplNumb === "imgplayer2") {
          imgbox2.attr("src", imgpath.val()+$(this).text());
        }
      });
      
      $("#imgtracklist li").on("mouseenter", function() {
        $(this).css("background", "#00b7ff");
      });
      
      $("#imgtracklist li").on("mouseleave", function() {
        $(this).css("background", "none");
      });
    });
    
    imgtrackLibList.on("mouseleave", function() {
      $("#imgtracklist li").off("click").off("mouseenter").off("mouseleave").off("dblclick");
    });
    
    imgtrackCountDownBtn.on("click", function() {
      var iplNumb = imgplayerNumber.val();
      var loadedImages = imgtrackLibList.html();
      
      if (loadedImages !== "") {
        imgtrackForward();
      	setimgPosition();
      
      	if (iplNumb === "imgplayer1") {
          loadImage("imgbox1");
      	} else if (iplNumb === "imgplayer2") {
          loadImage("imgbox2");
      	}
      }
    });
    
    imgtrackCountUpBtn.on("click", function() {
      var iplNumb = imgplayerNumber.val();
      var loadedImages = imgtrackLibList.html();
      
      if (loadedImages !== "") {
        imgtrackReverse();
      	setimgPosition();
      
      	if (iplNumb === "imgplayer1") {
          loadImage("imgbox1");
      	} else if (iplNumb === "imgplayer2") {
          loadImage("imgbox2");
      	}
      }
    });
    
    var imginfoMod = $("<div/>");
    imginfoMod.css({
      "background": "212121",
      "border": "2px outset rgba(255, 255, 255, 0.8)",
      "width": "600px",
      "position": "fixed",
      "left": "20px",
      "top": "20px",
      "z-index": "250",
      "display": "none"
    }).appendTo(imageelement);
    
    var imginfoHead = $("<div/>");
    imginfoHead.css({
      "width": "98.6%",
      "height": "30px",
      "font-size": "20px",
      "background": "#292929",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
      "padding": "4px"
    }).text("Modal-Message").appendTo(imginfoMod);
    
    var imginfoCloseBtn = $("<button class='closeBtn'>X</button>");
    imginfoCloseBtn.appendTo(imginfoHead);
    
    var imginfoMain = $("<div/>");
    imginfoMain.css({
      "width": "100%",
      "height": "140px",
      "text-align": "left",
      "background": "#151515",
      "display": "flex",
      "flext-direction": "row"
    }).appendTo(imginfoMod);
    
    var imginfoImgBox = $("<div/>");
    imginfoImgBox.css({
      "width": "30%",
      "height": "140px",
      "text-align": "center"
    }).appendTo(imginfoMain);
    
    var imginfoSymbol = $("<img src='Symbole/info.png'/>");
    imginfoSymbol.css({
      "margin-top": "20px"
    });
    imginfoSymbol.appendTo(imginfoImgBox);
    
    var imginfoTextBox = $("<div/>");
    imginfoTextBox.css({
      "width": "70%",
      "height": "140px",
      "text-align": "left",
      "font-weight": "bold",
      "color": "white",
      "font-size": "25px",
      "padding-top": "20px"
    }).html("Info-Text!").appendTo(imginfoMain);
    
    var imginfoFoot = $("<div/>");
    imginfoFoot.css({
      "width": "98.6%",
      "height": "30px",
      "font-size": "20px",
      "background": "#151515",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center",
      "padding": "4px",
      "border-top": "1px solid rgba(255, 255, 255, 0.8)"
    }).appendTo(imginfoMod);
    
    var imginfoFootBtn = $("<button class='toolbuttons9'>Close</button>");
    imginfoFootBtn.css({
      "width": "120px",
      "height": "26px",
      "font-size": "16px",
      "background": "#303030",
      "border": "2px outset grey"
    });
    imginfoFootBtn.appendTo(imginfoFoot);
    
    imginfoCloseBtn.on("click", function() {
      imginfoMod.hide();
    });
    
    imginfoFootBtn.on("click", function() {
      imginfoMod.hide();
    });
    
    function addImages(evt) {
    var imultiaudiofiles = evt.target.files;
    var imaudioext = $(this)[0].value;
    var ioutput = [];

    for (var i = 0, f; f = imultiaudiofiles[i]; i++) {
      ioutput.push("<li style='padding-top:4px; padding-bottom:4px;'>" + f.name + "</li>");
     }
     imgtrackLibList.append(ioutput.join(""));
     imginfoTextBox.html("Imageload successfull!<br>"+i+ " Images loaded!<br>"+$("#imgtracklist li").length+" Images in Imagelist!");
     imginfoMod.animate({left: imageelement.width()/2 - imginfoMod.width()/2 + "px", top: imageelement.height()/2 - imginfoMod.height()/2 + "px"},1).show();
  }
    
    imgtrackMultiFile.on("change", addImages);
    imgaddTrackMultiBtn.on("click", function() {
      imgtrackMultiFile.click();
    });
    
    var imginfoBox = $("<div/>");
  	imginfoBox.css({
      "width": "240px",
      "height": "25px",
      "background": "rgba(15, 15, 15, 0.9)",
      "font-size": "16px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center",
      "border-radius": "6px",
      "border": "1px solid white",
      "position": "absolute",
      "z-index": "2000",
      "padding-top": "6px",
      "left": "100",
      "top": "20",
      "display": "none"
  	});
  
    imginfoBox.text("Tool-Title");
    imginfoBox.appendTo(imageelement);
    
    function imgshowTitle(info) {
      imginfoBox.text(info);
  	}
    
    imgcrossFadeMode.on("mouseenter", function() {
      imgshowTitle("Crossfade-Mode");
  	});
    
    imgcrossFadeMode.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgcrossFadeMode.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgcrossFadeTime.on("mouseenter", function() {
      imgshowTitle("Crossfade-Time");
  	});
    
    imgcrossFadeTime.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgcrossFadeTime.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgEffectMode.on("mouseenter", function() {
      imgshowTitle("Crossfade-Effect");
  	});
    
    imgEffectMode.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgEffectMode.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgFullscreen1.on("click", function() {
      var iscaleWidth = imgWidth.val();
      var iscaleHeight = imgHeight.val();
      var iscaleWidth2 = imgWidth2.val();
      var iscaleHeight2 = imgHeight2.val();
      
      imgbox1.addClass("imgfullScreen1").css("z-index",1291);
      imgbox2.addClass("imgfullScreen2").css("z-index",1290);
      $("body").css("overflow","hidden");
      imgbox1.css({"transform": "scale("+iscaleWidth+", "+iscaleHeight+")", "border-radius": "0px"});
      imgbox2.css({"transform": "scale("+iscaleWidth2+", "+iscaleHeight2+")", "border-radius": "0px"});
      crossfadeLoader.show();
      imgplayerNumber.val("imgplayer1");
      imgfader1.val(1);
      imgfader2.val(0);
      imgCanvas.show();
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
      
      imgFullscreen2.css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    imgFullscreen2.on("click", function() {
      var iscaleWidth = imgWidth.val();
      var iscaleHeight = imgHeight.val();
      var iscaleWidth2 = imgWidth2.val();
      var iscaleHeight2 = imgHeight2.val();
      
      imgbox1.addClass("imgfullScreen1").css("z-index",1290);
      imgbox2.addClass("imgfullScreen2").css("z-index",1291);
      $("body").css("overflow","hidden");
      imgbox1.css({"transform": "scale("+iscaleWidth+", "+iscaleHeight+")", "border-radius": "0px"});
      imgbox2.css({"transform": "scale("+iscaleWidth2+", "+iscaleHeight2+")", "border-radius": "0px"});
      imgCanvas.show();
      crossfadeLoader.show();
      imgfader1.val(0);
      imgfader2.val(1);
      imgplayerNumber.val("imgplayer2");
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
      
      imgFullscreen1.css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "lime"
      });
    });
    
    exitfullBtn.on("click", function() {
      imgbox1.removeClass("imgfullScreen1");
      imgbox2.removeClass("imgfullScreen2");
      imgFullscreen1.removeAttr("style");
      imgFullscreen2.removeAttr("style");
      imgCanvas.hide();
      imgbox1.css({"transform": "scale(1,1)", "border-radius": "0px"});
      imgbox2.css({"transform": "scale(1,1)", "border-radius": "0px"});
      crossfadeLoader.stop().hide();
      togglePlayPause.removeAttr("style");
      crossfadeToolbar.hide();
      imggallery.hide();
      toolbaropener.hide();
    });
    
    var toolbartimer;
    
    imgbox1.on("mousemove", function() {
      if (imgFullscreen1.attr("style")) {
        clearTimeout(toolbartimer);
        toolbaropener.show();
      	toolbartimer = setTimeout(function() {
        toolbaropener.hide();
      	},6000);
      }
    });
    
    imgbox2.on("mousemove", function() {
      if (imgFullscreen2.attr("style")) {
        clearTimeout(toolbartimer);
        toolbaropener.show();
      	toolbartimer = setTimeout(function() {
        toolbaropener.hide();
      	},6000);
      }
    });
    
    toolbaropener.on("click", function() {
      crossfadeToolbar.show();
      $(this).hide();
    });
    
    imgcrossFadeMode2.on("mouseenter", function() {
      imgshowTitle("Crossfade-Mode");
  	});
    
    imgcrossFadeMode2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgcrossFadeMode2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgcrossFadeTime2.on("mouseenter", function() {
      imgshowTitle("Crossfade-Time");
  	});
    
    imgcrossFadeTime2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgcrossFadeTime2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgEffectMode2.on("mouseenter", function() {
      imgshowTitle("Crossfade-Effect");
  	});
    
    imgEffectMode2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgEffectMode2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    loaderduration.on("mouseenter", function() {
      imgshowTitle("Image-Time");
  	});
    
    loaderduration.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    loaderduration.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    rotlevel.on("mouseenter", function() {
      imgshowTitle("Rotation-Number");
  	});
    
    rotlevel.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    rotlevel.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgtrackLoadBtn.click(function() {
	  imgtrackFile.click();
    });
    
    imgtrackFile.change(function(evt) {
	  var ifile = evt.currentTarget.files[0];
	  var iobjectUrl = URL.createObjectURL(ifile);
	  var iplNumb = imgplayerNumber.val();

	  if (iplNumb === "imgplayer1") {
  	      imgbox1.attr("src",iobjectUrl);
		} else if (iplNumb === "imgplayer2") {
  		  imgbox2.attr("src",iobjectUrl);
        }
	  imgtrackName.val(ifile.name);
    });
    
    var imgalertMod = $("<div/>");
    imgalertMod.css({
      "background": "212121",
      "border": "2px outset rgba(255, 255, 255, 0.8)",
      "width": "600px",
      "position": "fixed",
      "left": "20px",
      "top": "20px",
      "z-index": "1800",
      "display": "none"
    }).appendTo(imageelement);
    
    var imgalertHead = $("<div/>");
    imgalertHead.css({
      "width": "98.6%",
      "height": "30px",
      "font-size": "20px",
      "background": "#292929",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
      "padding": "4px",
    }).text("Modal-Message").appendTo(imgalertMod);
    
    var imgalertClosBtn = $("<button class='closeBtn'>X</button>");
    imgalertClosBtn.appendTo(imgalertHead);
    
    var imgalertMain = $("<div/>");
    imgalertMain.css({
      "width": "100%",
      "height": "140px",
      "text-align": "left",
      "background": "#151515",
      "display": "flex",
      "flext-direction": "row"
    }).appendTo(imgalertMod);
    
     var imgalertImgBox = $("<div/>");
     imgalertImgBox.css({
      "width": "30%",
      "height": "140px",
      "text-align": "center"
    }).appendTo(imgalertMain);
    
    var imgalertSymbol = $("<img src='Symbole/alert.png'/>");
    imgalertSymbol.css({
      "margin-top": "20px"
    });
    imgalertSymbol.appendTo(imgalertImgBox);
    
    var imgalertTextBox = $("<div/>");
    imgalertTextBox.css({
      "width": "70%",
      "height": "140px",
      "text-align": "left",
      "font-weight": "bold",
      "color": "white",
      "font-size": "25px",
      "padding-top": "20px"
    }).html("Alert-Warning!").appendTo(imgalertMain);
    
    var imgalertFoot = $("<div/>");
    imgalertFoot.css({
      "width": "98.6%",
      "height": "30px",
      "font-size": "20px",
      "background": "#151515",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center",
      "padding": "4px",
      "border-top": "1px solid rgba(255, 255, 255, 0.8)"
    }).appendTo(imgalertMod);
    
    var imgalertFootBtn = $("<button class='toolbuttons9'>Close</button>");
    imgalertFootBtn.css({
      "width": "120px",
      "height": "26px",
      "font-size": "16px",
      "background": "#303030",
      "border": "2px outset grey"
    });
    imgalertFootBtn.appendTo(imgalertFoot);
    
    imgalertFootBtn.on("click", function() {
      imgalertMod.hide();
    });
    
    imgalertFootBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgalertFootBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#303030",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgaddTrackBtn.click(function() {
  	  var itrname = imgtrackName.val();
  	  $("#imgtracklist li").removeClass("imgselTrack");
      if (itrname !== "") {
        imgtrackLibList.append("<li style='padding-top:4px; padding-bottom:4px;'>"+itrname+"</li>");
        $("#imgtracklist li:eq(0)").addClass("imgselTrack");
      } else {
        imgalertMod.animate({left: imageelement.width()/2 - imgalertMod.width()/2, top: imageelement.height()/2 - imgalertMod.height()/2},1).show();
        imgalertTextBox.html("Please import A Image-File!");
      }
	});
    
    function imgimportFile(ifilefield, itargetfield, istorefield) {
	  var iasText = document.getElementById(ifilefield);
	  var itextbox = document.getElementById(itargetfield);

        var ifile = iasText.files[0];
        var itextType = /text.*/;

        if (ifile.type.match(itextType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                itextbox.value = reader.result;
                document.getElementById(istorefield).value = ifile.name;
            };

            reader.readAsText(ifile);    
        	} else {
            itextbox.value = "Dateityp nicht unterstützt";
        	}
	  }
    
    imgtrackListFile.on("change", function() {
      imgimportFile("imgtrackListFile","imgtrackListCode","imgtrackSaveTxt");
      imgaddTrackListBtn.css({
        "background":"linear-gradient(to right, navy, skyblue, navy)"
      });
    });
    
    imgtrackListLoadBtn.on("click", function() {
      imgtrackListFile.click();
    });
    
    imgaddTrackListBtn.click(function(evt) {
	  var ilistcode = imgtrackListCode.val();
  
	  if (ilistcode.substring(1, 4) !== "li ") {
    	imgalertMod.animate({left: imageelement.width()/2 - imgalertMod.width()/2 + "px", top: imageelement.height()/2 - imgalertMod.height()/2 + "px"},1).show();
		imgalertTextBox.html("This File is no Playlist!");  
		} else {
          if (evt.ctrlKey) {
            $("#imgtracklist li").removeClass("imgselTrack");
            imgtrackLibList.append(ilistcode);
          } else if (evt.shiftKey) {
            $("#imgtracklist li").removeClass("imgselTrack");
            imgtrackLibList.prepend(ilistcode);
          } else {
            imgtrackLibList.html(ilistcode);
          }
	
    	  $(".imgselTrack:eq(0)").each(function() {
      		currentImage = $(this).index();
    		});
          
          imginfoMod.animate({left: imageelement.width()/2 - imginfoMod.width()/2 + "px", top: imageelement.height()/2 - imginfoMod.height()/2 + "px"},1).show();
		  imginfoTextBox.html("Fileload succesfull!<br>"+$("#imgtracklist li").length+ " Images are in this Playlist!");
    	}
    });
    
    imgtrackUpBtn.click(function(){
    $(".imgselTrack:eq(0)").each( function(i,x) {
        var inewPos = $("#imgtracklist li").index(this) - 1;
        if (inewPos > -1) {
          $("#imgtracklist li").eq(inewPos).before("<li style='"+$(this).attr("style")+"' class='imgselTrack'>"+$(this).text()+"</li>");
          currentImage = inewPos;
          $(this).remove();
        	}
    	});
	 });
    
    imgtrackDownBtn.click(function(){
    var icountOptions = $("#imgtracklist li").length;
    $(".imgselTrack:eq(0)").each( function() {
        var inewPos = $("#imgtracklist li").index(this) + 1;
        if (inewPos < icountOptions) {
          $("#imgtracklist li").eq(inewPos).after("<li style='"+$(this).attr("style")+"' class='imgselTrack'>"+$(this).text()+"</li>");
          currentImage = inewPos;
          $(this).remove();
        	}
    	});
	});
    
    imgtrackDelBtn.click(function() {
	  $(".imgselTrack:eq(0)").each(function() {
	  $(this).remove();
        });
      });
    
    function iexp2htm(ifilename, ielId, mimeType) {
      var ielHtml = document.getElementById(ielId).innerHTML;
      var ilink = document.createElement('a');
      mimeType = mimeType || 'text/html';

      ilink.setAttribute('download', ifilename);
      ilink.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(ielHtml));
      ilink.click(); 
	}
    
    imgtrackSaveBtn.click(function(evt) {
	  var isavename = imgtrackSaveTxt.val();
	  
    if (evt.ctrlKey) {
      imgsaveTracklist();
      $(this).animate({borderColor: "lime"},100).delay(2000).animate({borderColor: "silver"},100);
  		} else {
      iexp2htm(isavename+'.html','imgtracklist','text/html');
        }
      });
    
    imgtrackLoadBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgtrackLoadBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgaddTrackMultiBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgaddTrackMultiBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgaddTrackBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgaddTrackBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackUpBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgtrackUpBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackDownBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgtrackDownBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackCountUpBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363600, yellow, #363600)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgtrackCountUpBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackCountDownBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363600, yellow, #363600)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgtrackCountDownBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackListLoadBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgtrackListLoadBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgaddTrackListBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgaddTrackListBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackSaveBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, navy, skyblue, navy)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgtrackSaveBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#000029",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackDelBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackDelBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imginfoFootBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imginfoFootBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#303030",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgaddTrackMultiBtn.on("mouseenter", function() {
      imginfoBox.text("Load Images");
    });
    
    imgaddTrackBtn.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgaddTrackBtn.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgFullscreen1.on("mouseenter", function() {
      imginfoBox.text("Fullscreen Left Image");
    });
    
    imgFullscreen1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgFullscreen1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgFullscreen2.on("mouseenter", function() {
      imginfoBox.text("Fullscreen Right Image");
    });
    
    imgFullscreen2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgFullscreen2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgWidth.on("mouseenter", function() {
      imginfoBox.text("Imagewidth Left Image " + imgWidth.val());
    });
    
    imgWidth.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgWidth.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgWidth2.on("mouseenter", function() {
      imginfoBox.text("Imagewidth Right Image " + imgWidth2.val());
    });
    
    imgWidth2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgWidth2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    
    imgHeight.on("mouseenter", function() {
      imginfoBox.text("Imageheight Left Image " + imgHeight.val());
    });
    
    imgHeight.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgHeight.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgHeight2.on("mouseenter", function() {
      imginfoBox.text("Imageheight Right Image " + imgHeight2.val());
    });
    
    imgHeight2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgHeight2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    var imgconfirmMod = $("<div/>");
    imgconfirmMod.css({
      "background": "212121",
      "border": "2px outset rgba(255, 255, 255, 0.8)",
      "width": "600px",
      "position": "fixed",
      "left": "20px",
      "top": "20px",
      "z-index": "250",
      "display": "none"
    }).appendTo(imageelement);
    
    var imgconfirmHead = $("<div/>");
    imgconfirmHead.css({
      "width": "98.6%",
      "height": "30px",
      "font-size": "20px",
      "background": "#292929",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
      "padding": "4px",
    }).text("Modal-Message").appendTo(imgconfirmMod);
    
    var imgconfirmClosBtn = $("<button class='closeBtn'>X</button>");
    imgconfirmClosBtn.appendTo(imgconfirmHead);
    
    var imgconfirmMain = $("<div/>");
    imgconfirmMain.css({
      "width": "100%",
      "height": "140px",
      "text-align": "left",
      "background": "#151515",
      "display": "flex",
      "flext-direction": "row"
    }).appendTo(imgconfirmMod);
    
    var imgconfirmImgBox = $("<div/>");
    imgconfirmImgBox.css({
      "width": "30%",
      "height": "140px",
      "text-align": "center"
    }).appendTo(imgconfirmMain);
    
    var imgconfirmSymbol = $("<img src='Symbole/confirm.png'/>");
    imgconfirmSymbol.css({
      "margin-top": "20px"
    });
    imgconfirmSymbol.appendTo(imgconfirmImgBox);
    
    var imgconfirmTextBox = $("<div/>");
    imgconfirmTextBox.css({
      "width": "70%",
      "height": "140px",
      "text-align": "left",
      "font-weight": "bold",
      "color": "white",
      "font-size": "25px",
      "padding-top": "20px"
    }).html("Alert-Warning!").appendTo(imgconfirmMain);
    
    var imgconfirmFoot = $("<div/>");
    imgconfirmFoot.css({
      "width": "98.6%",
      "height": "30px",
      "font-size": "20px",
      "background": "#151515",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center",
      "padding": "4px",
      "border-top": "1px solid rgba(255, 255, 255, 0.8)"
    }).appendTo(imgconfirmMod);
    
    var imgconfirmFootBtn1 = $("<button class='toolbuttons9'>OK</button>");
    imgconfirmFootBtn1.css({
      "width": "120px",
      "height": "26px",
      "font-size": "16px",
      "background": "#303030",
      "border": "2px outset grey"
    });
    imgconfirmFootBtn1.appendTo(imgconfirmFoot);
    
    var imgconfirmFootBtn2 = $("<button class='toolbuttons9'>Abort</button>");
    imgconfirmFootBtn2.css({
      "width": "120px",
      "height": "26px",
      "font-size": "16px",
      "background": "#303030",
      "border": "2px outset grey",
      "margin-left": "4px"
    });
    imgconfirmFootBtn2.appendTo(imgconfirmFoot);
    
    imgtracklistDelBtn.on("click", function() {
      imgconfirmMod.animate({left: imageelement.width()/2 - imgconfirmMod.width()/2 + "px", top: imageelement.height()/2 - imgconfirmMod.height()/2 + "px"},1).show();
      imgconfirmTextBox.html("Will You Delete<br>the complete Imagelist?");
      imgconfirmFootBtn1.one("click", function() {
        imgtrackLibList.html("");
        imgconfirmMod.hide();
      });
    });
    
    imgconfirmClosBtn.on("click", function() {
      imgconfirmMod.hide();
    });
    
    imgconfirmFootBtn2.on("click", function() {
      imgconfirmMod.hide();
    });
    
    imgconfirmFootBtn1.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgconfirmFootBtn1.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#303030",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgconfirmFootBtn2.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgconfirmFootBtn2.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#303030",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtracklistDelBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtracklistDelBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgtracklistDelBtn.on("mouseenter", function() {
      imginfoBox.text("Delete Imagelist");
    });
    
    imgtracklistDelBtn.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgtracklistDelBtn.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgtrackDelBtn.on("mouseenter", function() {
      imginfoBox.text("Delete Image");
    });
    
    imgtrackDelBtn.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
    });
    
    imgtrackDelBtn.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    var imgnewTrackPosMod = $("<div/>");
    imgnewTrackPosMod.css({
      "width": "350px",
      "position": "absolute",
      "left": "30px",
      "top": "30px",
      "background": "rgba(15, 15, 15, 0.8)",
      "border": "4px outset white",
      "border-radius": "6px",
      "display": "none",
      "z-index": 250
    }).appendTo(imageelement);
    
    var imgnewPosArea = $("<div/>");
    imgnewPosArea.css({
      "width": "100%",
      "height": "40px",
      "padding": "4px",
      "text-align": "left"
    }).appendTo(imgnewTrackPosMod);
    
    var imgtrackNewpos = $("<input type='number'>");
    imgtrackNewpos.css({
      "width": "80px",
      "height": "40px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "background": "#212121",
      "border": "2px outset silver",
      "border-radius": "6px"
    }).appendTo(imgnewPosArea);
    
    var imgnewBtn = $("<button/>");
    imgnewBtn.css({
      "width": "80px",
      "height": "40px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "background": "#212121",
      "border": "2px outset silver",
      "border-radius": "6px",
      "margin-left": "6px",
      "cursor": "pointer"
    }).text("Set").appendTo(imgnewPosArea);
    
    var imgnewFirstBtn = $("<button/>");
    imgnewFirstBtn.css({
      "width": "80px",
      "height": "40px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "background": "#212121",
      "border": "2px outset silver",
      "border-radius": "6px",
      "margin-left": "6px",
      "cursor": "pointer"
    }).text("First").appendTo(imgnewPosArea);
    
    var imgnewLastBtn = $("<button/>");
    imgnewLastBtn.css({
      "width": "80px",
      "height": "40px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "background": "#212121",
      "border": "2px outset silver",
      "border-radius": "6px",
      "margin-left": "6px",
      "cursor": "pointer"
    }).text("Last").appendTo(imgnewPosArea);
    
    imgnewBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgnewBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgnewFirstBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgnewFirstBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgnewLastBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgnewLastBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgtrackUpBtn.on("contextmenu", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      imgnewTrackPosMod.animate({left: xPos - imgnewTrackPosMod.width()/2, top: yPos - imgnewTrackPosMod.height() - 16},1).show();
      return false;
    });
    
    imgtrackDownBtn.on("contextmenu", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      imgnewTrackPosMod.animate({left: xPos - imgnewTrackPosMod.width()/2, top: yPos - imgnewTrackPosMod.height() - 16},1).show();
      return false;
    });
    
    imgtrackNewpos.on("focus", function() {
      $(this).val($("#imgtracklist li").length);
      $(this).attr({
        "min": 1,
        "max": $("#imgtracklist li").length
    	});
    });
    
    var imgcloseNewTrack;
    
    imgnewTrackPosMod.on("mouseenter", function() {
      clearTimeout(imgcloseNewTrack);
    });
    
    imgnewTrackPosMod.on("mouseleave", function() {
      imgcloseNewTrack = setTimeout(function() {
        imgnewTrackPosMod.hide();
      },1600);
    });
    
    imgnewBtn.on("click", function() {
      var itrNew = imgtrackNewpos.val() - 1;
      $(".imgselTrack:eq(0)").each(function() {
        $("#imgtracklist li").removeClass("imgselTrack");
        $("#imgtracklist li:eq("+itrNew+")").before("<li style='"+$(this).attr("style")+"'>"+$(this).text()+"</li>");
        $("#imgtracklist li:eq("+itrNew+")").addClass("imgselTrack");
        currentImage = itrNew;
        $(this).remove();
      });
      
      imgnewTrackPosMod.hide();
      setimgPosition();
    });
    
    imgnewFirstBtn.on("click", function() {
      $(".imgselTrack:eq(0)").each(function() {
        $("#imgtracklist li").removeClass("imgselTrack");
        imgtrackLibList.prepend("<li style='"+$(this).attr("style")+"'>"+$(this).text()+"</li>");
        $("#imgtracklist li:eq(0)").addClass("imgselTrack");
        currentImage = 0;
        $(this).remove();
      });
      
      imgnewTrackPosMod.hide();
      setimgPosition();
    });
    
    imgnewLastBtn.on("click", function() {
      $(".imgselTrack:eq(0)").each(function() {
        $("#imgtracklist li").removeClass("imgselTrack");
        imgtrackLibList.append("<li style='"+$(this).attr("style")+"'>"+$(this).text()+"</li>");
        $("#imgtracklist li:eq(-1)").addClass("imgselTrack");
        currentImage = $("#imgtracklist li").length - 2;
        $(this).remove();
      });
      
      imgnewTrackPosMod.hide();
      setimgPosition();
    });
    
    function imgcrossfade121() {
      var imgfadeVal2 = parseFloat(imgfader2.val());
      var imgcrossTime = imgcrossFadeTime.val();
      imgfader2.val(imgfadeVal2 + 0.01).trigger("change");
      
      if (imgfadeVal2 < 1) {
        setTimeout(imgcrossfade121, imgcrossTime*10);
      }
    }
    
    function imgcrossfade122() {
      var imgfadeVal1 = imgfader1.val();
      var imgcrossTime = imgcrossFadeTime.val();
      imgfader1.val(imgfadeVal1 - 0.01).trigger("change");
      
      if (imgfadeVal1 > 0) {
        setTimeout(imgcrossfade122, imgcrossTime*10);
      }
    }
    
    function imgcrossfade123() {
      var imgfadeVal2 = parseFloat(imgfader2.val());
      var imgcrossTime = imgcrossFadeTime.val();
      imgfader2.val(imgfadeVal2 + 0.01).trigger("change");
      
      if (imgfadeVal2 < 1) {
        setTimeout(imgcrossfade123, imgcrossTime*5);
      }
    }
    
    function imgcrossfade124() {
      var imgfadeVal1 = imgfader1.val();
      var imgcrossTime = imgcrossFadeTime.val();
      imgfader1.val(imgfadeVal1 - 0.01).trigger("change");
      
      if (imgfadeVal1 > 0) {
        setTimeout(imgcrossfade124, imgcrossTime*5);
      }
    }
    
    function imgcrossfade231() {
      var imgfadeVal1 = parseFloat(imgfader1.val());
      var imgcrossTime = imgcrossFadeTime.val();
      imgfader1.val(imgfadeVal1 + 0.01).trigger("change");
      
      if (imgfadeVal1 < 1) {
        setTimeout(imgcrossfade231, imgcrossTime*10);
      }
    }
    
    function imgcrossfade232() {
      var imgfadeVal2 = imgfader2.val();
      var imgcrossTime = imgcrossFadeTime.val();
      imgfader2.val(imgfadeVal2 - 0.01).trigger("change");
      
      if (imgfadeVal2 > 0) {
        setTimeout(imgcrossfade232, imgcrossTime*10);
      }
    }
    
    function imgcrossfade233() {
      var imgfadeVal1 = parseFloat(imgfader1.val());
      var imgcrossTime = imgcrossFadeTime.val();
      imgfader1.val(imgfadeVal1 + 0.01).trigger("change");
      
      if (imgfadeVal1 < 1) {
        setTimeout(imgcrossfade233, imgcrossTime*5);
      }
    }
    
    function imgcrossfade234() {
      var imgfadeVal2 = imgfader2.val();
      var imgcrossTime = imgcrossFadeTime.val();
      imgfader2.val(imgfadeVal2 - 0.01).trigger("change");
      
      if (imgfadeVal2 > 0) {
        setTimeout(imgcrossfade234, imgcrossTime*5);
      }
    }
    
    function imgfadeOut1() {
      imgfader2.val(1).trigger("change");
    }
    
    function imgfadeOut2() {
      imgfader1.val(1).trigger("change");
    }
    
    function imgfadeIn1() {
      var imgcrossTime = imgcrossFadeTime.val();
      setTimeout(function() {
        imgfader1.val(0).trigger("change");
      }, imgcrossTime*1000);
    }
    
    function imgfadeIn2() {
      var imgcrossTime = imgcrossFadeTime.val();
      setTimeout(function() {
        imgfader2.val(0).trigger("change");
      }, imgcrossTime*1000);
    }
    
    
    
    function imgsetCrossFade1() {
      var imgcrMode = imgcrossFadeMode.val();
      var imgcrossTime = imgcrossFadeTime.val();
      
      if (imgcrMode === "Fade") {
        imgcrossfade121();
        imgcrossfade122();
        imgbox1.css("z-index",1292);
        imgbox2.css("z-index",1291);
      } else if (imgcrMode === "FadeOut") {
        imgfadeOut1();
        imgcrossfade122();
        imgbox1.css("z-index",1292);
        imgbox2.css("z-index",1291);
      } else if (imgcrMode === "FadeIn") {
        imgcrossfade121();
        imgfadeIn1();
        imgbox1.css("z-index",1291);
        imgbox2.css("z-index",1292);
      } else if (imgcrMode === "FadeInFast") {
        imgcrossfade123();
        imgcrossfade122();
        imgbox1.css("z-index",1292);
        imgbox2.css("z-index",1291);
      } else if (imgcrMode === "FadeTO") {
        imgcrossfade121();
        setTimeout(imgcrossfade124, imgcrossTime*500);
        imgbox1.css("z-index",1291);
        imgbox2.css("z-index",1292);
      }
    }
    
    function imgsetCrossFade2() {
      var imgcrMode = imgcrossFadeMode.val();
      var imgcrossTime = imgcrossFadeTime.val();
      
      if (imgcrMode === "Fade") {
        imgcrossfade231();
        imgcrossfade232();
        imgbox1.css("z-index",1291);
        imgbox2.css("z-index",1292);
      } else if (imgcrMode === "FadeOut") {
        imgfadeOut2();
        imgcrossfade232();
        imgbox1.css("z-index",1291);
        imgbox2.css("z-index",1292);
      } else if (imgcrMode === "FadeIn") {
        imgcrossfade231();
        imgfadeIn2();
        imgbox1.css("z-index",1292);
        imgbox2.css("z-index",1291);
      } else if (imgcrMode === "FadeInFast") {
        imgcrossfade233();
        imgcrossfade232();
        imgbox1.css("z-index",1291);
        imgbox2.css("z-index",1292);
      } else if (imgcrMode === "FadeTO") {
        imgcrossfade231();
        setTimeout(imgcrossfade234, imgcrossTime*500);
        imgbox1.css("z-index",1292);
        imgbox2.css("z-index",1291);
      }
    }
        
    function imgeffect1() {
	var imgmove1 = imgfader1.val();
	var imgfilter = imgEffectMode.val();
	var iwidescreen1 = imgWidth.val();
	var iheiscreen1 = imgHeight.val();
	var rotlv = rotlevel.val();
	var imgbright = imgmove1*100;
	var imgblur = (1-imgmove1)*100;
	var shrink1 = iwidescreen1*imgmove1;
	var shrinky1 = iheiscreen1*imgmove1;
	var expand1 = iwidescreen1*(3-2*imgmove1);
	var expand3 = iheiscreen1*(3-2*imgmove1);
	var compr1 = iwidescreen1*Math.pow(imgmove1,2);
	var compr3 = iheiscreen1*Math.pow(imgmove1,2);
	var rothori1 = iwidescreen1*imgmove1*Math.sin((4*rotlv+1)/2*Math.PI*imgmove1);
	var rotvert1 = iheiscreen1*imgmove1*Math.sin((4*rotlv+1)/2*Math.PI*imgmove1);
	var slihori1 = 100*(1-imgmove1);
	var silvert1 = -100*(1-imgmove1);
	var strhorilr1 = -90*iwidescreen1*(1-imgmove1);
	var strverttb1 = -90*iheiscreen1*(1-imgmove1);
	var strhorirl1 = 90*iwidescreen1*(1-imgmove1);
	var strvertbt1 = 90*iheiscreen1*(1-imgmove1);
	var pophori1 = 100*(1-imgmove1)*Math.sin((4*rotlv+1)/2*Math.PI*imgmove1);
	var popvert1 = -100*(1-imgmove1)*Math.sin((4*rotlv+1)/2*Math.PI*imgmove1);
	var slidia1 = -100*(1-Math.sqrt(imgmove1));
	var popdia1 = -100*(1-Math.sqrt(imgmove1))*Math.sin((4*rotlv+1)/2*Math.PI*imgmove1);
	var persp1 = 2000*(1-imgmove1);
	var rotdim1 = 90*(1-imgmove1);
	var rotdim2 = -90*(1-imgmove1);
	var rotdim5 = 360*rotlv*(1-imgmove1);
	var slihori11 = 400*(-2*Math.pow(imgmove1,2)+3*imgmove1-1);
	var silvert11 = 400*(2*Math.pow(imgmove1,2)-3*imgmove1+1);
	var slihori111 = 900*(16/3*Math.pow(imgmove1,3)-32/3*Math.pow(imgmove1,2)+19/3*imgmove1-1);
	var silvert111 = 900*(-16/3*Math.pow(imgmove1,3)+32/3*Math.pow(imgmove1,2)-19/3*imgmove1+1);
	var compr11 = iwidescreen1*(-3*Math.pow(imgmove1,2)+4*imgmove1);
	var compr33 = iheiscreen1*(-3*Math.pow(imgmove1,2)+4*imgmove1);
  
  
	if (imgfilter === "filter1") {
  	imgbox1.css({"filter":"blur("+imgblur+"px)"});
		} else if (imgfilter === "filter2") {
  	imgbox1.css({"filter":"brightness("+imgbright+"%)"});
        } else if (imgfilter === "filter3") {
  	imgbox1.css({"filter":"contrast("+imgbright+"%)"});
        } else if (imgfilter === "filter4") {
  	imgbox1.css({"filter":"opacity("+imgbright+"%)"});
        } else if (imgfilter === "filter5") {
 	 imgbox1.css({"transform":"scale("+shrink1+", "+shrinky1+")"});
        } else if (imgfilter === "filter6") {
 	 imgbox1.css({"transform":"scale("+expand1+", "+expand3+")"});
        } else if (imgfilter === "filter7") {
 	 imgbox1.css({"transform":"scale("+compr1+","+iheiscreen1+")"});
        } else if (imgfilter === "filter8") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+compr3+")"});
        } else if (imgfilter === "filter9") {
  	imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+")"});
        } else if (imgfilter === "filter10") {
  	imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+")"});
        } else if (imgfilter === "filter11") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translateX("+slihori1+"%)"});
        } else if (imgfilter === "filter12") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translateY("+silvert1+"%)"});
        } else if (imgfilter === "filter13") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter14") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%)"});
        } else if (imgfilter === "filter15") {
 	 imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%)"});
        } else if (imgfilter === "filter16") {
 	 imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter17") {
  	imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter18") {
  	imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+") translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter19") {
 	 imgbox1.css({"transform":"scale("+expand1+", "+compr1+")"});
        } else if (imgfilter === "filter20") {
  	imgbox1.css({"transform":"scale("+compr3+", "+expand3+")"});
        } else if (imgfilter === "filter21") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") skewX("+strhorilr1+"deg)"});
        } else if (imgfilter === "filter22") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") skewX("+strhorirl1+"deg)"});
        } else if (imgfilter === "filter23") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") skewY("+strverttb1+"deg)"});
        } else if (imgfilter === "filter24") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") skewY("+strvertbt1+"deg)"});
        } else if (imgfilter === "filter25") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%)"});
        } else if (imgfilter === "filter26") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%)"});
        } else if (imgfilter === "filter27") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%)"});
        } else if (imgfilter === "filter28") {
  	imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateX("+pophori1+"%)"});
        } else if (imgfilter === "filter29") {
  	imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateY("+popvert1+"%)"});
        } else if (imgfilter === "filter30") {
  	imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%)"});
        } else if (imgfilter === "filter31") {
  	imgbox1.css({"transform":"scale("+shrink1+", "+shrinky1+")","border-radius":"100%"});
        } else if (imgfilter === "filter32") {
  	imgbox1.css({"transform":"scale("+compr1+","+iheiscreen1+")","border-radius":"100%"});
        } else if (imgfilter === "filter33") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+compr3+")","border-radius":"100%"});
        } else if (imgfilter === "filter34") {
  	imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+")","border-radius":"100%"});
        } else if (imgfilter === "filter35") {
  	imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+")","border-radius":"100%"});
        } else if (imgfilter === "filter36") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter37") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter38") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter39") {
  	imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter40") {
  	imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+") translate("+slihori1+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter41") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter42") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter43") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter44") {
  	imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateX("+pophori1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter45") {
  	imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateY("+popvert1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter46") {
  	imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter47") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translateX("+slihori1+"%) perspective(1500px) rotate3d(0,1,0,60deg)"});
        } else if (imgfilter === "filter48") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter49") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter50") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) perspective(1500px) rotate3d(0,1,0,60deg)"});
        } else if (imgfilter === "filter51") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter52") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter53") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) perspective(1500px) rotate3d(0,1,0,60deg)"});
        } else if (imgfilter === "filter54") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter55") {
  	imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter56") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter57") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(0,1,0,"+rotdim2+"deg)"});
        } else if (imgfilter === "filter58") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter59") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(1,0,0,"+rotdim2+"deg)"});
        } else if (imgfilter === "filter60") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter61") {
  	imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(1,1,0,"+rotdim2+"deg)"});
        } else if (imgfilter === "filter62") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter63") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter64") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter65") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter66") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter67") {
  	imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter68") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter69") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter70") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter71") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter72") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter73") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+pophori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter74") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter75") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter76") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+pophori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter77") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter78") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter79") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+pophori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter80") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg)"});
        } else if (imgfilter === "filter81") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg)"});
        } else if (imgfilter === "filter82") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg)"});
        } else if (imgfilter === "filter83") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg)"});
        } else if (imgfilter === "filter84") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg) translateX("+slihori1+"%)"});
        } else if (imgfilter === "filter85") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg) translateX("+slihori1+"%)"});
        } else if (imgfilter === "filter86") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg) translateX("+slihori1+"%)"});
        } else if (imgfilter === "filter87") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg) translateX("+slihori1+"%)"});
        } else if (imgfilter === "filter88") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg) translateY("+silvert1+"%)"});
        } else if (imgfilter === "filter89") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg) translateY("+silvert1+"%)"});
        } else if (imgfilter === "filter90") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg) translateY("+silvert1+"%)"});
        } else if (imgfilter === "filter91") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg) translateY("+silvert1+"%)"});
        } else if (imgfilter === "filter92") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg) translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter93") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg) translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter94") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg) translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter95") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg) translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter96") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg) translate("+pophori1+"%,"+popdia1+"%)"});
        } else if (imgfilter === "filter97") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg) translate("+pophori1+"%,"+popdia1+"%)"});
        } else if (imgfilter === "filter98") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg) translate("+pophori1+"%,"+popdia1+"%)"});
        } else if (imgfilter === "filter99") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg) translate("+pophori1+"%,"+popdia1+"%)"});
        } else if (imgfilter === "filter100") {
  imgbox1.css({"transform":"scale("+shrink1+", "+shrinky1+")","opacity":imgmove1});
        } else if (imgfilter === "filter101") {
  imgbox1.css({"transform":"scale("+expand1+", "+expand3+")","opacity":imgmove1});
        } else if (imgfilter === "filter102") {
  imgbox1.css({"transform":"scale("+compr1+","+iheiscreen1+")","opacity":imgmove1});
        } else if (imgfilter === "filter103") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+compr3+")","opacity":imgmove1});
        } else if (imgfilter === "filter104") {
  imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+")","opacity":imgmove1});
        } else if (imgfilter === "filter105") {
  imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+")","opacity":imgmove1});
        } else if (imgfilter === "filter106") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter107") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter108") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter109") {
  imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter110") {
  imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+") translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter111") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter112") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter113") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter114") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateX("+pophori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter115") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateY("+popvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter116") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter117") {
  imgbox1.css({"transform":"scale("+shrink1+", "+shrinky1+")","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter118") {
  imgbox1.css({"transform":"scale("+expand1+", "+expand3+")","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter119") {
  imgbox1.css({"transform":"scale("+compr1+","+iheiscreen1+")","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter120") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+compr3+")","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter121") {
  imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+")","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter122") {
  imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+")","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter123") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter124") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter125") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter126") {
  imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter127") {
  imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+") translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter128") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter129") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter130") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter131") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateX("+pophori1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter132") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateY("+popvert1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter133") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%)","opacity":imgmove1,"border-radius":"100%"});
        } else if (imgfilter === "filter134") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translateX("+slihori1+"%) perspective(1500px) rotate3d(0,1,0,60deg)","opacity":imgmove1});
        } else if (imgfilter === "filter135") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter136") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter137") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) perspective(1500px) rotate3d(0,1,0,60deg)","opacity":imgmove1});
        } else if (imgfilter === "filter138") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter139") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter140") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) perspective(1500px) rotate3d(0,1,0,60deg)","opacity":imgmove1});
        } else if (imgfilter === "filter141") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter142") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter143") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(0,1,0,"+rotdim1+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter144") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(0,1,0,"+rotdim2+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter145") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(1,0,0,"+rotdim1+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter146") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(1,0,0,"+rotdim2+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter147") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(1,1,0,"+rotdim1+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter148") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+iheiscreen1+") perspective("+persp1+"px) rotate3d(1,1,0,"+rotdim2+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter149") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter150") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter151") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter152") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter153") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter154") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter155") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter156") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter157") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter158") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter159") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter160") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+pophori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter161") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter162") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter163") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+pophori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter164") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter165") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter166") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+pophori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter167") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter168") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter169") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter170") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter171") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg) translateX("+slihori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter172") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg) translateX("+slihori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter173") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg) translateX("+slihori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter174") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg) translateX("+slihori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter175") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg) translateY("+silvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter176") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg) translateY("+silvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter177") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg) translateY("+silvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter178") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg) translateY("+silvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter179") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg) translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter180") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg) translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter181") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg) translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter182") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg) translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter183") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorilr1+"deg) translate("+pophori1+"%,"+popdia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter184") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewX("+strhorirl1+"deg) translate("+pophori1+"%,"+popdia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter185") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strverttb1+"deg) translate("+pophori1+"%,"+popdia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter186") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") skewY("+strvertbt1+"deg) translate("+pophori1+"%,"+popdia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter187") {
  imgbox1.css({"transform":"scale("+shrink1+", "+shrinky1+") rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter188") {
  imgbox1.css({"transform":"scale("+expand1+", "+expand3+") rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter189") {
  imgbox1.css({"transform":"scale("+compr1+","+iheiscreen1+") rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter190") {
  imgbox1.css({"transform":"scale("+iwidescreen1+","+compr3+") rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter191") {
  imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+") rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter192") {
  imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+") rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter193") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateX("+slihori1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter194") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translateY("+silvert1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter195") {
  imgbox1.css({"transform":"scale("+shrink1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter196") {
  imgbox1.css({"transform":"scale("+rothori1+","+shrinky1+") translate("+slihori1+"%,"+slidia1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter197") {
  imgbox1.css({"transform":"scale("+shrink1+","+rotvert1+") translate("+slihori1+"%,"+slidia1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter198") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateX("+pophori1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter199") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translateY("+popvert1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter200") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter201") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateX("+pophori1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter202") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translateY("+popvert1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter203") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+popdia1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter204") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter205") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter206") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori11+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter207") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter208") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter209") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter210") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) rotate("+rotdim5+"deg)"});
        } else if (imgfilter === "filter211") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter212") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter213") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori11+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter214") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter215") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter216") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter217") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) rotate("+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter218") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter219") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter220") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori11+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter221") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter222") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter223") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter224") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter225") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%)"});
        } else if (imgfilter === "filter226") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%)"});
        } else if (imgfilter === "filter227") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori1+"%,"+silvert11+"%)"});
        } else if (imgfilter === "filter228") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter229") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter230") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter231") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) rotate("+rotdim5+"deg)"});
        } else if (imgfilter === "filter232") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter233") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter234") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori1+"%,"+silvert11+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter235") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter236") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter237") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter238") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) rotate("+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter239") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter240") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter241") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori1+"%,"+silvert11+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter242") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter243") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter244") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter245") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter246") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%)"});
        } else if (imgfilter === "filter247") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%)"});
        } else if (imgfilter === "filter248") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori11+"%,"+silvert11+"%)"});
        } else if (imgfilter === "filter249") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter250") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter251") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter252") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) rotate("+rotdim5+"deg)"});
        } else if (imgfilter === "filter253") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter254") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter255") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori11+"%,"+silvert11+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter256") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter257") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter258") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter259") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) rotate("+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter260") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter261") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter262") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori11+"%,"+silvert11+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter263") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter264") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter265") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter266") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter267") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter268") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter269") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter270") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter271") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter272") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter273") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter274") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter275") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter276") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter277") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter278") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter279") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter280") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter281") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter282") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter283") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter284") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori11+"%,"+silvert11+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter285") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter286") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter287") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori111+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter288") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter289") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter290") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter291") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) rotate("+rotdim5+"deg)"});
        } else if (imgfilter === "filter292") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter293") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter294") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori111+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter295") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter296") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter297") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter298") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) rotate("+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter299") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter300") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter301") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori111+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter302") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter303") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter304") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter305") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter306") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%)"});
        } else if (imgfilter === "filter307") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%)"});
        } else if (imgfilter === "filter308") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori1+"%,"+silvert111+"%)"});
        } else if (imgfilter === "filter309") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter310") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter311") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter312") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) rotate("+rotdim5+"deg)"});
        } else if (imgfilter === "filter313") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter314") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter315") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori1+"%,"+silvert111+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter316") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter317") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter318") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter319") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) rotate("+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter320") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter321") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter322") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori1+"%,"+silvert111+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter323") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter324") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter325") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter326") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter327") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%)"});
        } else if (imgfilter === "filter328") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%)"});
        } else if (imgfilter === "filter329") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori111+"%,"+silvert111+"%)"});
        } else if (imgfilter === "filter330") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter331") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter332") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)"});
        } else if (imgfilter === "filter333") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) rotate("+rotdim5+"deg)"});
        } else if (imgfilter === "filter334") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter335") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter336") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori111+"%,"+silvert111+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter337") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter338") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter339") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter340") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) rotate("+rotdim5+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter341") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter342") {
  imgbox1.css({"transform":"scale("+rothori1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter343") {
  imgbox1.css({"transform":"scale("+compr1+","+rotvert1+") translate("+slihori111+"%,"+silvert111+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter344") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter345") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter346") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter347") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) rotate("+rotdim5+"deg)","opacity":imgmove1});
        } else if (imgfilter === "filter348") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter349") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter350") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter351") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter352") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter353") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter354") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter355") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter356") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter357") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter358") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter359") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori1+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter360") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter361") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter362") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter363") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter364") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter365") {
  imgbox1.css({"transform":"scale("+compr1+","+compr3+") translate("+slihori111+"%,"+silvert111+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove1});
        } else if (imgfilter === "filter366") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+")"});
        } else if (imgfilter === "filter367") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+slihori1+"%)"});
        } else if (imgfilter === "filter368") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+silvert1+"%)"});
        } else if (imgfilter === "filter369") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter370") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+pophori1+"%)"});
        } else if (imgfilter === "filter371") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+popvert1+"%)"});
        } else if (imgfilter === "filter372") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+popdia1+"%)"});
        } else if (imgfilter === "filter373") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter374") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert11/2+"%)"});
        } else if (imgfilter === "filter375") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+silvert11/2+"%)"});
        } else if (imgfilter === "filter376") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/3+"%,"+slidia1+"%)"});
        } else if (imgfilter === "filter377") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert111/3+"%)"});
        } else if (imgfilter === "filter378") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/3+"%,"+silvert111/3+"%)"});
        } else if (imgfilter === "filter379") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+")","border-radius":"100%"});
        } else if (imgfilter === "filter380") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+slihori1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter381") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+silvert1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter382") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter383") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+pophori1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter384") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+popvert1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter385") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+popdia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter386") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter387") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert11/2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter388") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+silvert11/2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter389") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/3+"%,"+slidia1+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter390") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert111/3+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter391") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/3+"%,"+silvert111/3+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter392") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+")","opacity":imgmove1});
        } else if (imgfilter === "filter393") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+slihori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter394") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+silvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter395") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter396") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+pophori1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter397") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+popvert1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter398") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+popdia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter399") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter400") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert11/2+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter401") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+silvert11/2+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter402") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/3+"%,"+slidia1+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter403") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert111/3+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter404") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/3+"%,"+silvert111/3+"%)","opacity":imgmove1});
        } else if (imgfilter === "filter405") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter406") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+slihori1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter407") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter408") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter409") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+pophori1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter410") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+popvert1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter411") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter412") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter413") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert11/2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter414") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+silvert11/2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter415") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/4+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter416") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert111/4+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter417") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/4+"%,"+silvert111/4+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter418") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter419") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+slihori1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter420") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+silvert1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter421") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter422") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+pophori1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter423") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+popvert1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter424") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter425") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter426") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert11/2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter427") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+silvert11/2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter428") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/4+"%,"+slidia1+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter429") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert111/4+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter430") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/4+"%,"+silvert111/4+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter431") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter432") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+slihori1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter433") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+silvert1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter434") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter435") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateX("+pophori1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter436") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translateY("+popvert1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter437") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+popdia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter438") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter439") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert11/2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter440") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori11/2+"%,"+silvert11/2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter441") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/4+"%,"+slidia1+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter442") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori1+"%,"+silvert111/4+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        } else if (imgfilter === "filter443") {
  imgbox1.css({"transform":"scale("+compr11+","+compr33+") translate("+slihori111/4+"%,"+silvert111/4+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim1+"deg)"});
        }

   if (imgmove1 > 0.99 && imgfilter !== "") {
    imgbox1.css({"border-radius":"0px", "transform": "scale("+iwidescreen1+","+iheiscreen1+")", "opacity":"1"});
 		 }
	}
    
    function imgeffect2() {
	var imgmove2 = imgfader2.val();
	var imgfilter = imgEffectMode.val();
	var iwidescreen2 = imgWidth2.val();
	var iheiscreen2 = imgHeight2.val();
	var rotlv = rotlevel.val();
	var shrink2 = iwidescreen2*imgmove2;
	var shrinky2 = iheiscreen2*imgmove2;
	var imgbright2 = imgmove2*100;
	var imgblur2 = (1-imgmove2)*100;
	var expand2 = iwidescreen2*(3-2*imgmove2);
	var expand4 = iheiscreen2*(3-2*imgmove2);
	var compr2 = iwidescreen2*Math.pow(imgmove2,2);
	var compr4 = iheiscreen2*Math.pow(imgmove2,2);
	var rothori2 = iwidescreen2*imgmove2*Math.sin((4*rotlv+1)/2*Math.PI*imgmove2);
	var rotvert2 = iheiscreen2*imgmove2*Math.sin((4*rotlv+1)/2*Math.PI*imgmove2);
	var slihori2 = -100*(1-imgmove2);
	var silvert2 = 100*(1-imgmove2);
	var strhorilr2 = -90*iwidescreen2*(1-imgmove2);
	var strverttb2 = -90*iheiscreen2*(1-imgmove2);
	var strhorirl2 = 90*iwidescreen2*(1-imgmove2);
	var strvertbt2 = 90*iheiscreen2*(1-imgmove2);
	var slidia2 = -100*(1-Math.sqrt(imgmove2));
	var pophori2 = 100*(1-imgmove2)*Math.sin((4*rotlv+1)/2*Math.PI*imgmove2);
	var popvert2 = 100*(1-imgmove2)*Math.sin((4*rotlv+1)/2*Math.PI*imgmove2);
	var popdia2 = 100*(1-Math.sqrt(imgmove2))*Math.sin((4*rotlv+1)/2*Math.PI*imgmove2);
	var persp2 = 2000*(1-imgmove2);
	var rotdim3 = 90*(1-imgmove2);
	var rotdim4 = -90*(1-imgmove2);
	var rotdim6 = 360*rotlv*(1-imgmove2);
	var slihori22 = 400*(2*Math.pow(imgmove2,2)-3*imgmove2+1);
	var silvert22 = 400*(-2*Math.pow(imgmove2,2)+3*imgmove2-1);
	var slihori222 = 900*(-16/3*Math.pow(imgmove2,3)+32/3*Math.pow(imgmove2,2)-19/3*imgmove2+1);
	var silvert222 = 900*(16/3*Math.pow(imgmove2,3)-32/3*Math.pow(imgmove2,2)+19/3*imgmove2-1);
	var compr22 = iwidescreen2*(-3*Math.pow(imgmove2,2)+4*imgmove2);
	var compr44 = iheiscreen2*(-3*Math.pow(imgmove2,2)+4*imgmove2);
    
	if (imgfilter === "filter1") {
  imgbox2.css({"filter":"blur("+imgblur2+"px)"});
		} else if (imgfilter === "filter2") {
  imgbox2.css({"filter":"brightness("+imgbright2+"%)"});
        } else if (imgfilter === "filter3") {
  imgbox2.css({"filter":"contrast("+imgbright2+"%)"});
        } else if (imgfilter === "filter4") {
  imgbox2.css({"filter":"opacity("+imgbright2+"%)"});
        } else if (imgfilter === "filter5") {
  imgbox2.css({"transform":"scale("+shrink2+", "+shrinky2+")"});
        } else if (imgfilter === "filter6") {
  imgbox2.css({"transform":"scale("+expand2+", "+expand4+")"});
        } else if (imgfilter === "filter7") {
  imgbox2.css({"transform":"scale("+compr2+","+iheiscreen2+")"});
        } else if (imgfilter === "filter8") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+compr4+")"});
        } else if (imgfilter === "filter9") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+")"});
        } else if (imgfilter === "filter10") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+")"});
        } else if (imgfilter === "filter11") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translateX("+slihori2+"%)"});
        } else if (imgfilter === "filter12") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translateY("+silvert2+"%)"});
        } else if (imgfilter === "filter13") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter14") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%)"});
        } else if (imgfilter === "filter15") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%)"});
        } else if (imgfilter === "filter16") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter17") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter18") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+") translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter19") {
  imgbox2.css({"transform":"scale("+expand2+", "+compr2+")"});
        } else if (imgfilter === "filter20") {
  imgbox2.css({"transform":"scale("+compr4+", "+expand4+")"});
        } else if (imgfilter === "filter21") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") skewX("+strhorilr2+"deg)"});
        } else if (imgfilter === "filter22") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") skewX("+strhorirl2+"deg)"});
        } else if (imgfilter === "filter23") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") skewY("+strverttb2+"deg)"});
        } else if (imgfilter === "filter24") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") skewY("+strvertbt2+"deg)"});
        } else if (imgfilter === "filter25") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%)"});
        } else if (imgfilter === "filter26") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%)"});
        } else if (imgfilter === "filter27") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter28") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateX("+pophori2+"%)"});
        } else if (imgfilter === "filter29") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateY("+popvert2+"%)"});
        } else if (imgfilter === "filter30") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter31") {
  imgbox2.css({"transform":"scale("+shrink2+", "+shrinky2+")","border-radius":"100%"});
        } else if (imgfilter === "filter32") {
  imgbox2.css({"transform":"scale("+compr2+","+iheiscreen2+")","border-radius":"100%"});
        } else if (imgfilter === "filter33") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+compr4+")","border-radius":"100%"});
        } else if (imgfilter === "filter34") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+")","border-radius":"100%"});
        } else if (imgfilter === "filter35") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+")","border-radius":"100%"});
        } else if (imgfilter === "filter36") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter37") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter38") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter39") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter40") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+") translate("+slihori2+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter41") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter42") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter43") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter44") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateX("+pophori2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter45") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateY("+popvert2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter46") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter47") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translateX("+slihori2+"%) perspective(1500px) rotate3d(0,1,0,60deg)"});
        } else if (imgfilter === "filter48") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter49") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter50") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) perspective(1500px) rotate3d(0,1,0,60deg)"});
        } else if (imgfilter === "filter51") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter52") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter53") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) perspective(1500px) rotate3d(0,1,0,60deg)"});
        } else if (imgfilter === "filter54") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter55") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter56") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(0,1,0,"+rotdim3+"deg)"});
        } else if (imgfilter === "filter57") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter58") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(1,0,0,"+rotdim3+"deg)"});
        } else if (imgfilter === "filter59") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter60") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(1,1,0,"+rotdim3+"deg)"});
        } else if (imgfilter === "filter61") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter62") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter63") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter64") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter65") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter66") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter67") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter68") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter69") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter70") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter71") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter72") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter73") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+pophori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter74") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter75") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter76") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+pophori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter77") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter78") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter79") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+pophori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter80") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg)"});
        } else if (imgfilter === "filter81") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg)"});
        } else if (imgfilter === "filter82") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg)"});
        } else if (imgfilter === "filter83") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg)"});
        } else if (imgfilter === "filter84") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg) translateX("+slihori2+"%)"});
        } else if (imgfilter === "filter85") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg) translateX("+slihori2+"%)"});
        } else if (imgfilter === "filter86") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg) translateX("+slihori2+"%)"});
        } else if (imgfilter === "filter87") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg) translateX("+slihori2+"%)"});
        } else if (imgfilter === "filter88") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg) translateY("+silvert2+"%)"});
        } else if (imgfilter === "filter89") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg) translateY("+silvert2+"%)"});
        } else if (imgfilter === "filter90") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg) translateY("+silvert2+"%)"});
        } else if (imgfilter === "filter91") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg) translateY("+silvert2+"%)"});
        } else if (imgfilter === "filter92") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg) translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter93") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg) translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter94") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg) translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter95") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg) translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter96") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg) translate("+pophori2+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter97") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg) translate("+pophori2+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter98") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg) translate("+pophori2+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter99") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg) translate("+pophori2+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter100") {
  imgbox2.css({"transform":"scale("+shrink2+", "+shrinky2+")","opacity":imgmove2});
        } else if (imgfilter === "filter101") {
  imgbox2.css({"transform":"scale("+expand2+", "+expand4+")","opacity":imgmove2});
        } else if (imgfilter === "filter102") {
  imgbox2.css({"transform":"scale("+compr2+","+iheiscreen2+")","opacity":imgmove2});
        } else if (imgfilter === "filter103") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+compr4+")","opacity":imgmove2});
        } else if (imgfilter === "filter104") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+")","opacity":imgmove2});
        } else if (imgfilter === "filter105") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+")","opacity":imgmove2});
        } else if (imgfilter === "filter106") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter107") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter108") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter109") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter110") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+") translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter111") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter112") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter113") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter114") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateX("+pophori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter115") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateY("+popvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter116") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter117") {
  imgbox2.css({"transform":"scale("+shrink2+", "+shrinky2+")","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter118") {
  imgbox2.css({"transform":"scale("+expand2+", "+expand4+")","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter119") {
  imgbox2.css({"transform":"scale("+compr2+","+iheiscreen2+")","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter120") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+compr4+")","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter121") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+")","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter122") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+")","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter123") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter124") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter125") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter126") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter127") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+") translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter128") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter129") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter130") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter131") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateX("+pophori2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter132") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateY("+popvert2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter133") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%)","opacity":imgmove2,"border-radius":"100%"});
        } else if (imgfilter === "filter134") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translateX("+slihori2+"%) perspective(1500px) rotate3d(0,1,0,60deg)","opacity":imgmove2});
        } else if (imgfilter === "filter135") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter136") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter137") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) perspective(1500px) rotate3d(0,1,0,60deg)","opacity":imgmove2});
        } else if (imgfilter === "filter138") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter139") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter140") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) perspective(1500px) rotate3d(0,1,0,60deg)","opacity":imgmove2});
        } else if (imgfilter === "filter141") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter142") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter143") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(0,1,0,"+rotdim3+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter144") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(0,1,0,"+rotdim4+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter145") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(1,0,0,"+rotdim3+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter146") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(1,0,0,"+rotdim4+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter147") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(1,1,0,"+rotdim3+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter148") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+iheiscreen2+") perspective("+persp2+"px) rotate3d(1,1,0,"+rotdim4+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter149") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter150") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter151") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter152") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter153") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter154") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter155") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter156") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter157") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter158") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter159") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter160") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+pophori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter161") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter162") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter163") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+pophori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter164") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter165") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter166") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+pophori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter167") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter168") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter169") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter170") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter171") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg) translateX("+slihori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter172") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg) translateX("+slihori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter173") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg) translateX("+slihori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter174") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg) translateX("+slihori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter175") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg) translateY("+silvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter176") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg) translateY("+silvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter177") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg) translateY("+silvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter178") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg) translateY("+silvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter179") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg) translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter180") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg) translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter181") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg) translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter182") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg) translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter183") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorilr2+"deg) translate("+pophori2+"%,"+popdia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter184") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewX("+strhorirl2+"deg) translate("+pophori2+"%,"+popdia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter185") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strverttb2+"deg) translate("+pophori2+"%,"+popdia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter186") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") skewY("+strvertbt2+"deg) translate("+pophori2+"%,"+popdia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter187") {
  imgbox2.css({"transform":"scale("+shrink2+", "+shrinky2+") rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter188") {
  imgbox2.css({"transform":"scale("+expand2+", "+expand4+") rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter189") {
  imgbox2.css({"transform":"scale("+compr2+","+iheiscreen2+") rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter190") {
  imgbox2.css({"transform":"scale("+iwidescreen2+","+compr4+") rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter191") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+") rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter192") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+") rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter193") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateX("+slihori2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter194") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translateY("+silvert2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter195") {
  imgbox2.css({"transform":"scale("+shrink2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter196") {
  imgbox2.css({"transform":"scale("+rothori2+","+shrinky2+") translate("+slihori2+"%,"+slidia2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter197") {
  imgbox2.css({"transform":"scale("+shrink2+","+rotvert2+") translate("+slihori2+"%,"+slidia2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter198") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateX("+pophori2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter199") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translateY("+popvert2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter200") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter201") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateX("+pophori2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter202") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translateY("+popvert2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter203") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+popdia2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter204") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter205") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter206") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori22+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter207") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter208") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter209") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter210") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) rotate("+rotdim6+"deg)"});
        } else if (imgfilter === "filter211") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter212") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter213") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori22+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter214") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter215") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter216") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter217") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) rotate("+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter218") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter219") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter220") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori22+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter221") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter222") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter223") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter224") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+slidia2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter225") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%)"});
        } else if (imgfilter === "filter226") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%)"});
        } else if (imgfilter === "filter227") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori2+"%,"+silvert22+"%)"});
        } else if (imgfilter === "filter228") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter229") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter230") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter231") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) rotate("+rotdim6+"deg)"});
        } else if (imgfilter === "filter232") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter233") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter234") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori2+"%,"+silvert22+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter235") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter236") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter237") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter238") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) rotate("+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter239") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter240") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter241") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori2+"%,"+silvert22+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter242") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter243") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter244") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter245") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter246") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%)"});
        } else if (imgfilter === "filter247") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%)"});
        } else if (imgfilter === "filter248") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori22+"%,"+silvert22+"%)"});
        } else if (imgfilter === "filter249") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter250") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter251") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter252") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) rotate("+rotdim6+"deg)"});
        } else if (imgfilter === "filter253") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter254") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter255") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori22+"%,"+silvert22+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter256") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter257") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter258") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter259") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) rotate("+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter260") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter261") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter262") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori22+"%,"+silvert22+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter263") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter264") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter265") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter266") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter267") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter268") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter269") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter270") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter271") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter272") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter273") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter274") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter275") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter276") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter277") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter278") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter279") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter280") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter281") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter282") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter283") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter284") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori22+"%,"+silvert22+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter285") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter286") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter287") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori222+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter288") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter289") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter290") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter291") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) rotate("+rotdim6+"deg)"});
        } else if (imgfilter === "filter292") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter293") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter294") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori222+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter295") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter296") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter297") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter298") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) rotate("+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter299") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter300") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter301") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori222+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter302") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter303") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter304") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter305") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+slidia2+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter306") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%)"});
        } else if (imgfilter === "filter307") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%)"});
        } else if (imgfilter === "filter308") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori2+"%,"+silvert222+"%)"});
        } else if (imgfilter === "filter309") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter310") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter311") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter312") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) rotate("+rotdim6+"deg)"});
        } else if (imgfilter === "filter313") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter314") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter315") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori2+"%,"+silvert222+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter316") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter317") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter318") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter319") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) rotate("+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter320") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter321") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter322") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori2+"%,"+silvert222+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter323") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter324") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter325") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter326") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter327") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%)"});
        } else if (imgfilter === "filter328") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%)"});
        } else if (imgfilter === "filter329") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori222+"%,"+silvert222+"%)"});
        } else if (imgfilter === "filter330") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter331") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter332") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)"});
        } else if (imgfilter === "filter333") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) rotate("+rotdim6+"deg)"});
        } else if (imgfilter === "filter334") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter335") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter336") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori222+"%,"+silvert222+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter337") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter338") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter339") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter340") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) rotate("+rotdim6+"deg)","border-radius":"100%"});
        } else if (imgfilter === "filter341") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter342") {
  imgbox2.css({"transform":"scale("+rothori2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter343") {
  imgbox2.css({"transform":"scale("+compr2+","+rotvert2+") translate("+slihori222+"%,"+silvert222+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter344") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter345") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter346") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter347") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) rotate("+rotdim6+"deg)","opacity":imgmove2});
        } else if (imgfilter === "filter348") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter349") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter350") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter351") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter352") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter353") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter354") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter355") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter356") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter357") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter358") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter359") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori2+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter360") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,45deg)"});
        } else if (imgfilter === "filter361") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,45deg)"});
        } else if (imgfilter === "filter362") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter363") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,45deg)","border-radius":"100%"});
        } else if (imgfilter === "filter364") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(1,0,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter365") {
  imgbox2.css({"transform":"scale("+compr2+","+compr4+") translate("+slihori222+"%,"+silvert222+"%) perspective(1000px) rotate3d(0,1,0,45deg)","opacity":imgmove2});
        } else if (imgfilter === "filter366") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+")"});
        } else if (imgfilter === "filter367") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+slihori2+"%)"});
        } else if (imgfilter === "filter368") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+silvert2+"%)"});
        } else if (imgfilter === "filter369") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter370") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+pophori2+"%)"});
        } else if (imgfilter === "filter371") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+popvert2+"%)"});
        } else if (imgfilter === "filter372") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+popdia2+"%)"});
        } else if (imgfilter === "filter373") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter374") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert22/2+"%)"});
        } else if (imgfilter === "filter375") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+silvert22/2+"%)"});
        } else if (imgfilter === "filter376") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/3+"%,"+slidia2+"%)"});
        } else if (imgfilter === "filter377") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert222/3+"%)"});
        } else if (imgfilter === "filter378") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/3+"%,"+silvert222/3+"%)"});
        } else if (imgfilter === "filter379") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+")","border-radius":"100%"});
        } else if (imgfilter === "filter380") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+slihori2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter381") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+silvert2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter382") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter383") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+pophori2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter384") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+popvert2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter385") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+popdia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter386") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter387") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert22/2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter388") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+silvert22/2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter389") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/3+"%,"+slidia2+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter390") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert222/3+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter391") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/3+"%,"+silvert222/3+"%)","border-radius":"100%"});
        } else if (imgfilter === "filter392") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+")","opacity":imgmove2});
        } else if (imgfilter === "filter393") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+slihori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter394") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+silvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter395") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter396") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+pophori2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter397") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+popvert2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter398") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+popdia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter399") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter400") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert22/2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter401") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+silvert22/2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter402") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/3+"%,"+slidia2+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter403") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert222/3+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter404") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/3+"%,"+silvert222/3+"%)","opacity":imgmove2});
        } else if (imgfilter === "filter405") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter406") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+slihori2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter407") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter408") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter409") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+pophori2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter410") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+popvert2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter411") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter412") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter413") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert22/2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter414") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+silvert22/2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter415") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/4+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter416") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert222/4+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter417") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/4+"%,"+silvert222/4+"%) perspective(1000px) rotate3d(1,0,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter418") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter419") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+slihori2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter420") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+silvert2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter421") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter422") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+pophori2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter423") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+popvert2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter424") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter425") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter426") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert22/2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter427") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/2+"%,"+silvert22/2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter428") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/4+"%,"+slidia2+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter429") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert222/4+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter430") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/4+"%,"+silvert222/4+"%) perspective(1000px) rotate3d(0,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter431") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter432") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+slihori2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter433") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+silvert2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter434") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter435") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateX("+pophori2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter436") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translateY("+popvert2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter437") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+popdia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter438") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/3+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter439") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert22/3+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter440") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori22/3+"%,"+silvert22/3+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter441") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/6+"%,"+slidia2+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter442") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori2+"%,"+silvert222/6+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        } else if (imgfilter === "filter443") {
  imgbox2.css({"transform":"scale("+compr22+","+compr44+") translate("+slihori222/6+"%,"+silvert222/6+"%) perspective(1000px) rotate3d(1,1,0,"+rotdim4+"deg)"});
        }
  
  if (imgmove2 > 0.99 && imgfilter !== "") {
    imgbox2.css({"border-radius": "0px", "transform": "scale("+iwidescreen2+","+iheiscreen2+")", "opacity":"1"});
 		 }
	}
    
    imgfader1.on("change", function() {
       if (imgFullscreen1.attr("style")) {
         imgeffect1();
       }
    	});
    
     imgfader1.on("mousemove", function() {
      $(this).trigger("change");
    	});
    
    imgfader2.on("change", function() {
       if (imgFullscreen2.attr("style")) {
         imgeffect2();
       }
    	});
    
     imgfader2.on("mousemove", function() {
      $(this).trigger("change");
    	});
    
    function crossfadeControl() {
      if (parseFloat(imgfader1.val()) > 0.5) {
        imgsetCrossFade1();
      } else {
        imgsetCrossFade2();
      }
    }
    
    imgChangeBtn.on("click", function() {
      crossfadeControl();
    });
    
    function changeImage() {
      crossfadeLoader.stop();
      togglePlayPause.removeAttr("style");
      crossfadeControl();
      imgtrackForward();
      if (imgplayerNumber.val() === "imgplayer1") {
         imgplayerNumber.val("imgplayer2");
          } else if (imgplayerNumber.val() === "imgplayer2") {
         imgplayerNumber.val("imgplayer1");
          }
      setTimeout(function() {
        if (imgplayerNumber.val() === "imgplayer2") {
              loadImage("imgbox1");
            } else if (imgplayerNumber.val() === "imgplayer1") {
              loadImage("imgbox2");
            }
      }, imgcrossFadeTime.val()*1000);
    }
    
    function changeImageRev() {
      crossfadeLoader.stop();
      togglePlayPause.removeAttr("style");
      crossfadeControl();
      imgtrackReverse();
      if (imgplayerNumber.val() === "imgplayer1") {
         imgplayerNumber.val("imgplayer2");
          } else if (imgplayerNumber.val() === "imgplayer2") {
         imgplayerNumber.val("imgplayer1");
          }
      setTimeout(function() {
        if (imgplayerNumber.val() === "imgplayer2") {
              loadImage("imgbox1");
            } else if (imgplayerNumber.val() === "imgplayer1") {
              loadImage("imgbox2");
            }
      }, imgcrossFadeTime.val()*1000);
    }
    
    imgbox1.on("click", function(e) {
      if (e.ctrlKey) {
        changeImageRev();
      } else {
        changeImage();
      }
    });
    
    imgbox2.on("click", function(e) {
      if (e.ctrlKey) {
        changeImageRev();
      } else {
        changeImage();
      }
    });
    
    function setLoader() {
        crossfadeLoader.animate({width: window.screen.availWidth+"px"},loaderduration.val()*1000, function() {
          crossfadeControl();
          imgtrackForward();
          if (imgplayerNumber.val() === "imgplayer1") {
            imgplayerNumber.val("imgplayer2");
          } else if (imgplayerNumber.val() === "imgplayer2") {
            imgplayerNumber.val("imgplayer1");
          }
          setTimeout(function() {
            if (imgplayerNumber.val() === "imgplayer2") {
              loadImage("imgbox1");
            } else if (imgplayerNumber.val() === "imgplayer1") {
              loadImage("imgbox2");
            }
            
            crossfadeLoader.animate({width: "0px"},10, function() {
              setLoader();
            });
          }, imgcrossFadeTime.val()*1000);
        });
    }
    
    togglePlayPause.on("click", function() {
      if (!togglePlayPause.attr("style")) {
        setLoader();
        togglePlayPause.css({
          "background": "linear-gradient(to right, green, lime, green)",
          "border-style": "inset",
          "border-color": "lime"
        });
      } else {
        crossfadeLoader.stop();
        togglePlayPause.removeAttr("style");
      }
    });
    
    imgpath.on("change", function() {
      saveImgpath();
    });
    
    imgcrossFadeMode.on("change", function() {
      imgcrossfadeImg.attr("src","symbole/"+imgcrossFadeMode.val()+".png");
      imgsaveCrossfadeSettings();
    });
    
    imgcrossFadeTime.on("change", function() {
      imgsaveCrossfadeSettings();
    });
    
    imgEffectMode.on("change", function() {
      imgsaveCrossfadeSettings();
    });
    
    imgcrossFadeMode2.on("change", function() {
      imgcrossFadeMode.val(imgcrossFadeMode2.val()).trigger("change");
    });
    
    imgcrossFadeTime2.on("change", function() {
      imgcrossFadeTime.val(imgcrossFadeTime2.val()).trigger("change");
    });
    
    imgEffectMode2.on("change", function() {
      imgEffectMode.val(imgEffectMode2.val()).trigger("change");
    });
    
    function imgsetFilters1() {
    var imgblur = imgblurfilter1.val();
    var imgbright = imgbrightfilter1.val();
    var imgcontrast = imgcontrastfilter1.val();
    var imgcolrotate = imghuefilter1.val();
    var imggrayscale = imggrayfilter1.val();
    var imginvert = imginvertfilter1.val();
    var imgopacit = imgopacityfilter1.val()*100;
    var imgsepia = imgsepiafilter1.val();
    var imgsat = imgsatfilter1.val();
    imgbox1.css("filter", "blur("+imgblur+"px) brightness("+imgbright+"%) contrast("+imgcontrast+"%) hue-rotate("+imgcolrotate+"deg) grayscale("+imggrayscale+"%) invert("+imginvert+"%) opacity("+imgopacit+"%) sepia("+imgsepia+"%) saturate("+imgsat+"%)");
  		}
    
    imgblurfilter1.on("change", imgsetFilters1);
  	imgbrightfilter1.on("change", imgsetFilters1);
  	imgcontrastfilter1.on("change", imgsetFilters1);
  	imghuefilter1.on("change", imgsetFilters1);
  	imggrayfilter1.on("change", imgsetFilters1);
  	imginvertfilter1.on("change", imgsetFilters1);
  	imgopacityfilter1.on("change", imgsetFilters1);
  	imgsepiafilter1.on("change", imgsetFilters1);
  	imgsatfilter1.on("change", imgsetFilters1);
    
    function imgsetFilters2() {
    var imgblur2 = imgblurfilter2.val();
    var imgbright2 = imgbrightfilter2.val();
    var imgcontrast2 = imgcontrastfilter2.val();
    var imgcolrotate2 = imghuefilter2.val();
    var imggrayscale2 = imggrayfilter2.val();
    var imginvert2 = imginvertfilter2.val();
    var imgopacit2 = imgopacityfilter2.val()*100;
    var imgsepia2 = imgsepiafilter2.val();
    var imgsat2 = imgsatfilter2.val();
    imgbox2.css("filter", "blur("+imgblur2+"px) brightness("+imgbright2+"%) contrast("+imgcontrast2+"%) hue-rotate("+imgcolrotate2+"deg) grayscale("+imggrayscale2+"%) invert("+imginvert2+"%) opacity("+imgopacit2+"%) sepia("+imgsepia2+"%) saturate("+imgsat2+"%)");
  		}
    
    imgblurfilter2.on("change", imgsetFilters2);
  	imgbrightfilter2.on("change", imgsetFilters2);
  	imgcontrastfilter2.on("change", imgsetFilters2);
  	imghuefilter2.on("change", imgsetFilters2);
  	imggrayfilter2.on("change", imgsetFilters2);
  	imginvertfilter2.on("change", imgsetFilters2);
  	imgopacityfilter2.on("change", imgsetFilters2);
  	imgsepiafilter2.on("change", imgsetFilters2);
  	imgsatfilter2.on("change", imgsetFilters2);
    
    imgresetBtn1.on("click", function() {
    imgblurfilter1.val(0);
  	imgbrightfilter1.val(100);
  	imgcontrastfilter1.val(100);
  	imghuefilter1.val(0);
  	imggrayfilter1.val(0);
  	imginvertfilter1.val(0);
  	imgopacityfilter1.val(1);
  	imgsepiafilter1.val(0);
  	imgsatfilter1.val(100);
    imgbox1.css("filter", "none");
  	});
  
  	imgresetBtn2.on("click", function() {
    imgblurfilter2.val(0);
  	imgbrightfilter2.val(100);
  	imgcontrastfilter2.val(100);
  	imghuefilter2.val(0);
  	imggrayfilter2.val(0);
  	imginvertfilter2.val(0);
  	imgopacityfilter2.val(1);
  	imgsepiafilter2.val(0);
  	imgsatfilter2.val(100);
    imgbox2.css("filter", "none");
  	});
    
    imgblurfilter1.on("mouseenter", function() {
      imginfoBox.text("Blur: ");
    });
    
    imgblurfilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Blur: "+ $(this).val() + "px");
      $(this).trigger("change");
    });
    
    imgblurfilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgblurfilter2.on("mouseenter", function() {
      imginfoBox.text("Blur: ");
    });
    
    imgblurfilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Blur: "+ $(this).val() + "px");
      $(this).trigger("change");
    });
    
    imgblurfilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgbrightfilter1.on("mouseenter", function() {
      imginfoBox.text("Brightness: ");
    });
    
    imgbrightfilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Brightness: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgbrightfilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgbrightfilter2.on("mouseenter", function() {
      imginfoBox.text("Brightness: ");
    });
    
    imgbrightfilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Brightness: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgbrightfilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgcontrastfilter1.on("mouseenter", function() {
      imginfoBox.text("Contrast: ");
    });
    
    imgcontrastfilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Contrast: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgcontrastfilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgcontrastfilter2.on("mouseenter", function() {
      imginfoBox.text("Contrast: ");
    });
    
    imgcontrastfilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Contrast: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgcontrastfilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imghuefilter1.on("mouseenter", function() {
      imginfoBox.text("Color-Rotation: ");
    });
    
    imghuefilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Color-Rotation: "+ $(this).val() + "deg");
      $(this).trigger("change");
    });
    
    imghuefilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imghuefilter2.on("mouseenter", function() {
      imginfoBox.text("Color-Rotation: ");
    });
    
    imghuefilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Color-Rotation: "+ $(this).val() + "deg");
      $(this).trigger("change");
    });
    
    imghuefilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imggrayfilter1.on("mouseenter", function() {
      imginfoBox.text("Grayscale: ");
    });
    
    imggrayfilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Grayscale: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imggrayfilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imggrayfilter2.on("mouseenter", function() {
      imginfoBox.text("Grayscale: ");
    });
    
    imggrayfilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Grayscale: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imggrayfilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imginvertfilter1.on("mouseenter", function() {
      imginfoBox.text("Negativ: ");
    });
    
    imginvertfilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Negativ: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imginvertfilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imginvertfilter2.on("mouseenter", function() {
      imginfoBox.text("Negativ: ");
    });
    
    imginvertfilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Negativ: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imginvertfilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgopacityfilter1.on("mouseenter", function() {
      imginfoBox.text("Opacity: ");
    });
    
    imgopacityfilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Opacity: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgopacityfilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgopacityfilter2.on("mouseenter", function() {
      imginfoBox.text("Opacity: ");
    });
    
    imgopacityfilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Opacity: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgopacityfilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgsepiafilter1.on("mouseenter", function() {
      imginfoBox.text("Sepia: ");
    });
    
    imgsepiafilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Sepia: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgsepiafilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgsepiafilter2.on("mouseenter", function() {
      imginfoBox.text("Sepia: ");
    });
    
    imgsepiafilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Sepia: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgsepiafilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgsatfilter1.on("mouseenter", function() {
      imginfoBox.text("Saturate: ");
    });
    
    imgsatfilter1.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Saturate: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgsatfilter1.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgsatfilter2.on("mouseenter", function() {
      imginfoBox.text("Saturate: ");
    });
    
    imgsatfilter2.on("mousemove", function(e) {
      var xPos = e.pageX;
      var yPos = e.pageY;
      var imginfoWidth = imginfoBox.width();
      var imginfoPos = imginfoWidth/2;
    
      imginfoBox.animate({left: xPos - imginfoPos, top: yPos - 60},6).show();
      imginfoBox.text("Saturate: "+ $(this).val() + "%");
      $(this).trigger("change");
    });
    
    imgsatfilter2.on("mouseleave", function() {
      imginfoBox.hide();
    });
    
    imgresetBtn1.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    imgresetBtn1.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
  
   imgresetBtn2.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    imgresetBtn2.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
  
  	imgfiltermix.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    imgfiltermix.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
    
    imgChangeBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, #363636, yellow, #363600)",
        "border-style": "inset",
        "border-color": "yellow"
      });
    });
    
    imgChangeBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#292900",
        "border-style": "outset",
        "border-color": "#292900"
      });
    });
    
    var imgbigTrackMod = $("<div/>");
    imgbigTrackMod.css({
      "width": "70%",
      "background": "#212121",
      "border": "4px outset white",
      "position": "absolute",
      "left": "20px",
      "top": "20px",
      "z-index": 250,
      "display": "none"
    }).appendTo(imageelement);
    
    var imgbigTrackHead = $("<div/>");
    imgbigTrackHead.css({
      "width": "100%",
      "height": "25px",
      "background": "#151515",
      "padding-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left"
    }).text("Zoom Imagelist").appendTo(imgbigTrackMod);
    
    var imgbigCloseBtn = $("<button class='closeBtn'>X</button>");
    imgbigCloseBtn.css({
      "margin-right": "6px",
      "margin-bottom": "4px"
    });
    imgbigCloseBtn.appendTo(imgbigTrackHead);
    
    var imgbigTrackArea = $("<div/>");
    imgbigTrackArea.css({
      "width": "100%",
      "height": "600px",
      "border-top": "4px solid rgba(255, 255, 255, 0.8)",
      "border-bottom": "4px solid rgba(255, 255, 255, 0.8)",
      "display": "flex",
      "flex-direction": "row"
    }).appendTo(imgbigTrackMod);
    
    var imgbigTrackBox = $("<div/>");
    imgbigTrackBox.css({
      "width": "99%",
      "height": "584px",
      "margin": "4px",
      "border": "4px solid rgba(255, 255, 255, 0.6)",
      "overflow": "auto"
    }).appendTo(imgbigTrackArea);
    
    var imgbigTrackfoot = $("<div/>");
    imgbigTrackfoot.css({
      "width": "100%",
      "height": "35px",
      "background": "#151515",
      "padding-top": "6px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "center",
      "cursor": "pointer"
    }).appendTo(imgbigTrackMod);
    
    var imgtrackBigList = $("<ul id='imgtrackBigList'></ul>");
    imgtrackBigList.css({
      "padding": "1px",
      "margin": "1px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "list-style": "none",
      "text-align": "left",
      "cursor": "pointer",
    }).appendTo(imgbigTrackBox);
    
    var imgsortBtn1 = $("<button/>");
    imgsortBtn1.css({
      "width": "180px",
      "height": "30px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "background": "#212121",
      "border": "2px outset silver",
      "border-radius": "6px",
      "margin-left": "6px",
      "cursor": "pointer"
    }).text("Sort A-Z").appendTo(imgbigTrackfoot);
    
    var imgsortBtn2 = $("<button/>");
    imgsortBtn2.css({
      "width": "180px",
      "height": "30px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "background": "#212121",
      "border": "2px outset silver",
      "border-radius": "6px",
      "margin-left": "6px",
      "cursor": "pointer"
    }).text("Sort Z-A").appendTo(imgbigTrackfoot);
    
    var imgsortBtn3 = $("<button/>");
    imgsortBtn3.css({
      "width": "180px",
      "height": "30px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "background": "#212121",
      "border": "2px outset silver",
      "border-radius": "6px",
      "margin-left": "6px",
      "cursor": "pointer"
    }).text("Random Order").appendTo(imgbigTrackfoot);
    
    var imgcloseBigTrack = $("<button/>");
    imgcloseBigTrack.css({
      "width": "180px",
      "height": "30px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "background": "#212121",
      "border": "2px outset silver",
      "border-radius": "6px",
      "margin-left": "6px",
      "cursor": "pointer"
    }).text("Close Imagebox").appendTo(imgbigTrackfoot);
    
    imgplayBtn.on("click", function() {
      imgtrackBigList.html(imgtrackLibList.html());
      imgbigTrackMod.animate({left: imageelement.width()/2 - imgbigTrackMod.width()/2, top: imageelement.height()/2 - imgbigTrackMod.height()/2},1).show();
    });
    
    imgcloseBigTrack.on("click", function() {
      imgbigTrackMod.hide();
    });
    
    imgbigCloseBtn.on("click", function() {
      imgbigTrackMod.hide();
    });
    
    imgbigTrackBox.on("mouseenter", function() {
      $("#imgtrackBigList li").on("mouseenter", function() {
        $(this).css("background", "#00b2ff");
      });
      
      $("#imgtrackBigList li").on("mouseleave", function() {
        $(this).css("background", "none");
      });
      
      $("#imgtrackBigList li").on("click", function() {
        $("#imgtracklist li").removeClass("imgselTrack");
        currentImage = $(this).index();
        $("#imgtracklist li:eq("+currentImage+")").addClass("imgselTrack");
        
        if (imgplayerNumber.val() === "imgplayer1") {
          loadImage("imgbox1");
        } else if (imgplayerNumber.val() === "imgplayer2") {
          loadImage("imgbox2");
        }
        
        imgbigTrackMod.hide();
      });
    });
    
    imgbigTrackBox.on("mouseleave", function() {
      $("#trackBigList li").off("mouseenter").off("mouseleave").off("click");
    });
    
    imgsortBtn1.on("click", function() {
      var imgsortArr = [];
      var imgsortArr2 = [];
      
      for (var y=0; y<$("#imgtracklist li").length; y++) {
        imgsortArr.push($("#imgtracklist li:eq("+y+")").text());
      }
      
      imgsortArr.sort();
      for (var z=0; z<imgsortArr.length; z++) {
        imgsortArr2.push("<li style='padding-top:4px; padding-bottom:4px;'>"+imgsortArr[z]+"</li>");
      }
      
      imgtrackLibList.html(imgsortArr2.join(""));
      $("#imgtracklist li:eq(0)").addClass("imgselTrack");
      imgplayBtn.click();
    });
    
    imgsortBtn2.on("click", function() {
      var imgsortrevArr = [];
      var imgsortrevArr2 = [];
      
      for (var y=0; y<$("#imgtracklist li").length; y++) {
        imgsortrevArr.push($("#imgtracklist li:eq("+y+")").text());
      }
      
      imgsortrevArr.sort().reverse();
      for (var z=0; z<imgsortrevArr.length; z++) {
        imgsortrevArr2.push("<li style='padding-top:4px; padding-bottom:4px;'>"+imgsortrevArr[z]+"</li>");
      }
      
      imgtrackLibList.html(imgsortrevArr2.join(""));
      $("#imgtracklist li:eq(0)").addClass("imgselTrack");
      imgplayBtn.click();
    });
    
    imgsortBtn3.on("click", function() {
      var imgrandOrderArr1 = [];
      var imgrandOrderArr2 = [];
      
      for (var u=0; u<$("#imgtracklist li").length; u++) {
        imgrandOrderArr1.push($("#imgtracklist li:eq("+u+")").text());
      }
            
      for (var v=0; v<$("#imgtracklist li").length; v++) {
        var imgorderNumber = Math.floor(Math.random()*imgrandOrderArr1.length);
        imgrandOrderArr2.push("<li style='padding-top:4px; padding-bottom:4px;'>"+imgrandOrderArr1[imgorderNumber]+"</li>");
        imgrandOrderArr1.splice(imgorderNumber,1);
      }
      
      imgtrackLibList.html(imgrandOrderArr2.join(""));
      $("#imgtracklist li:eq(0)").addClass("imgselTrack");
      imgplayBtn.click();
    	});
    
    imgsortBtn1.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgsortBtn1.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgsortBtn2.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgsortBtn2.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgsortBtn3.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgsortBtn3.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgcloseBigTrack.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgcloseBigTrack.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgplayBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, green, lime, green)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgplayBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#002900",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    var imgrecMod = $("<div/>");
    imgrecMod.css({
      "width": "80%",
      "border": "4px outset white",
      "background": "#212121",
      "position": "absolute",
      "left": "20px",
      "top": "20px",
      "z-index": 2000,
      "display": "none"
    }).appendTo(imageelement);
    
    var imgrecHead = $("<div/>");
    imgrecHead.css({
      "width": "98%",
      "height": "auto",
      "background": "#151515",
      "font-weight": "bold",
	  "font-size": "20px",
	  "color": "white",
      "text-align": "left",
      "padding": "6px"
    }).text("Microphone- & ScreenRecord").appendTo(imgrecMod);
    
    var imgrecClose = $("<button class='closeBtn' style='margin-bottom:6px;'>X</button>");
    imgrecClose.appendTo(imgrecHead);
    
    var imgrecMain = $("<div/>");
    imgrecMain.css({
      "width": "98%",
      "height": "550px",
    }).appendTo(imgrecMod);
    
    var imgrecArea = $("<div/>");
    imgrecArea.css({
	  "background": "#212121",
      "width": "100%",
      "height": "300px"
    }).appendTo(imgrecMain);
    
    var imgrecPlayer = $("<video id='imgrecplayer' controls style='width:400px; height:300px;'></video>");
    imgrecPlayer.appendTo(imgrecArea);
    
    var imgsaveRecName = $("<div/>");
    imgsaveRecName.css({
      "background": "#000029",
      "width": "100%",
      "height": "50px"
    }).appendTo(imgrecMain);
    
    var imgrecSaveTxt = $("<input id='imgrecfilename'/>");
    imgrecSaveTxt.css({
	  "background": "#212121",
      "width": "400px",
      "height": "40px",
      "font-weight": "bold",
      "font-size": "20px",
      "color": "white",
      "border-radius": "6px"
    }).appendTo(imgsaveRecName);
    
    var imgrecSaveExt = $("<select id='imgrecExt'><option value='webm'>WEBM</option><option value='mp4'>MP4</option></select>");
    imgrecSaveExt.css({
	  "background": "#212121",
      "width": "100px",
      "height": "40px",
      "font-weight": "bold",
      "font-size": "20px",
      "color": "white",
      "border-radius": "6px",
      "margin-left": "6px"
    }).appendTo(imgsaveRecName);
    
    var imgreclistArea = $("<div/>");
    imgreclistArea.css({
      "background": "#292929",
      "width": "100%",
      "height": "200px",
      "overflow": "auto",
    }).appendTo(imgrecMain);
    
    var imgrecordingsList = $("<ul id='imgrecordingsList'></ul>");
	imgrecordingsList.css({
	  "padding": "1px",
	  "margin": "1px",
	  "font-size": "20px",
	  "font-weight": "bold",
	  "list-style": "none",
	  "cursor": "pointer",
	  "text-align": "left"
	}).appendTo(imgreclistArea);
    
    var imgrecFoot = $("<div/>");
    imgrecFoot.css({
      "background": "#151515",
      "width": "100%",
      "height": "50px",
    }).appendTo(imgrecMod);
    
    var imgrecStart = $("<button class='toolbuttons9'></button>");
    imgrecStart.css({
	  "background": "#212121",
	  "border-color": "silver"
	}).text("Start Record").appendTo(imgrecFoot);
    
    var imgrecordButton = $("<button class='toolbuttons9'>");
	imgrecordButton.css({
	  "background": "#002900",
	  "border-color": "silver"
	}).html("<img src='Symbole/rec.png' style='width:18px; height: 18px; margin-right: 6px;'>Record").appendTo(imgrecFoot);
    
    var imgstopButton = $("<button class='toolbuttons9'></button>");
	imgstopButton.css({
	  "background": "#212121",
	  "border-color": "silver"
	}).text("Stop Record").appendTo(imgrecFoot);
    
    var imgcloseButton = $("<button class='toolbuttons9'></button>");
	imgcloseButton.css({
	  "background": "#212121",
	  "border-color": "silver"
	}).text("Close").appendTo(imgrecFoot);
    
    imgrecStart.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgrecStart.on("mouseup mouseleave", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgstopButton.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgstopButton.on("mouseup mouseleave", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgcloseButton.on("mousedown", function() {
      $(this).css({
        "background": "linear-gradient(to right, grey, silver, grey)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgcloseButton.on("mouseup mouseleave", function() {
      $(this).css({
        "background": "#212121",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    imgcloseButton.on("click", function() {
      imgrecMod.hide();
    });
    
    imgrecClose.on("click", function() {
      imgrecMod.hide();
    });
    
    var imgrecordTimer;
    
    imgrecmodBtn.on("click", function() {
      imgrecMod.animate({left: imageelement.width()/2 - imgrecMod.width()/2 + "px", top: imageelement.height()/2 - imgrecMod.height()/2 + "px"},1).show();
      clearTimeout(imgrecordTimer);
    });
    
    imgrecmodBtn.on("mousedown touchstart", function() {
      $(this).css({
        "background": "linear-gradient(to right, darkred, red, darkred)",
        "border-style": "inset",
        "border-color": "white"
      });
    });
    
    imgrecmodBtn.on("mouseup mouseleave touchend", function() {
      $(this).css({
        "background": "#290000",
        "border-style": "outset",
        "border-color": "silver"
      });
    });
    
    var imgtrackInfoMod = $("<div/>");
    imgtrackInfoMod.css({
      "width": "600px",
      "background": "rgba(30, 30, 30, 0.8)",
      "border": "4px outset rgba(255, 255, 255, 0.8)",
      "display": "none",
      "position": "absolute",
      "left": "20px",
      "top": "20px",
      "z-index": 1000
    });
    
    imgtrackInfoMod.appendTo(imageelement);
    
    var imgtrackInfoHead = $("<div/>");
    imgtrackInfoHead.css({
      "width": "600px",
      "height": "30px",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "text-align": "left"
    }).html("Tracklist-Info");
    
    imgtrackInfoHead.appendTo(imgtrackInfoMod);
    
    var imgcloseInfoBtn = $("<button class='closeBtn'>X</button>");
  	imgcloseInfoBtn.appendTo(imgtrackInfoHead);
    
    var imgtrackInfoMain1 = $("<div/>");
    imgtrackInfoMain1.css({
      "width": "600px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    imgtrackInfoMain1.appendTo(imgtrackInfoMod);
    
    var imgtrackInfoTxt1 = $("<div/>");
    imgtrackInfoTxt1.css({
      "width": "240px",
      "text-align": "left"
    }).text("Imagelistname:");
    
    imgtrackInfoTxt1.appendTo(imgtrackInfoMain1);
    
    var imgtrackInfoItem1 = $("<div/>");
    imgtrackInfoItem1.css({
      "width": "340px",
      "text-align": "left"
    });
    
    imgtrackInfoItem1.appendTo(imgtrackInfoMain1);
    
    var imgtrackInfoMain2 = $("<div/>");
    imgtrackInfoMain2.css({
      "width": "600px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    imgtrackInfoMain2.appendTo(imgtrackInfoMod);
    
    var imgtrackInfoTxt2 = $("<div/>");
    imgtrackInfoTxt2.css({
      "width": "240px",
      "text-align": "left"
    }).text("Numbers of Images:");
    
    imgtrackInfoTxt2.appendTo(imgtrackInfoMain2);
    
    var imgtrackInfoItem2 = $("<div/>");
    imgtrackInfoItem2.css({
      "width": "340px",
      "text-align": "left"
    });
    
    imgtrackInfoItem2.appendTo(imgtrackInfoMain2);
    
    var imgtrackInfoMain3 = $("<div/>");
    imgtrackInfoMain3.css({
      "width": "600px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    imgtrackInfoMain3.appendTo(imgtrackInfoMod);
    
    var imgtrackInfoTxt3 = $("<div/>");
    imgtrackInfoTxt3.css({
      "width": "240px",
      "text-align": "left"
    }).text("Current Image Box 1:");
    
    imgtrackInfoTxt3.appendTo(imgtrackInfoMain3);
    
    var imgtrackInfoItem3 = $("<div/>");
    imgtrackInfoItem3.css({
      "width": "340px",
      "text-align": "left"
    });
    
    imgtrackInfoItem3.appendTo(imgtrackInfoMain3);
    
    var imgtrackInfoMain4 = $("<div/>");
    imgtrackInfoMain4.css({
      "width": "600px",
      "font-size": "14px",
      "font-weight": "bold",
      "color": "white",
      "padding": "6px",
      "display": "flex",
      "flex-direction": "row"
    });
    
    imgtrackInfoMain4.appendTo(imgtrackInfoMod);
    
    var imgtrackInfoTxt4 = $("<div/>");
    imgtrackInfoTxt4.css({
      "width": "240px",
      "text-align": "left"
    }).text("Current Image Box 2:");
    
    imgtrackInfoTxt4.appendTo(imgtrackInfoMain4);
    
    var imgtrackInfoItem4 = $("<div/>");
    imgtrackInfoItem4.css({
      "width": "340px",
      "text-align": "left"
    });
    
    imgtrackInfoItem4.appendTo(imgtrackInfoMain4);
    
    function imgInfos() {
      var imgtrackSource1 = imgbox1.attr("src");
      var imgtrackSource2 = imgbox2.attr("src");
      
      imgtrackInfoItem1.text(imgtrackSaveTxt.val());
      imgtrackInfoItem2.text($("#imgtracklist li").length);
      imgtrackInfoItem3.text(imgtrackSource1.substring(imgtrackSource1.lastIndexOf("/")+1, imgtrackSource1.lastIndexOf(".")));
      imgtrackInfoItem4.text(imgtrackSource2.substring(imgtrackSource2.lastIndexOf("/")+1, imgtrackSource2.lastIndexOf(".")));
    }
    
    imgcloseInfoBtn.on("click", function() {
      imgtrackInfoMod.hide();
    });
    
    var imgmainMenu = $("<div id='imgmainmenu'></div>");
    imgmainMenu.css({
      "width": "280px",
      "background": "rgba(21, 21, 21, 0.8)",
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "z-index": 2200,
      "border": "2px outset #303030",
      "display": "none"
    });
    
    imgmainMenu.appendTo(imageelement);
    
    var imgmenuList = $("<ul/>");
    imgmenuList.css({
      "margin": "1px",
      "padding": "1px",
      "list-style": "none",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
    });
    
    imgmenuList.appendTo(imgmainMenu);
    
    var imgmainlistPoint1 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6);'><img src='Symbole/plist2.png' style='width:16px; height:16px;'>&nbsp;Load Images</li>");
    imgmainlistPoint1.css({
      "padding-top": "9px",
      "padding-bottom": "9px",
      "cursor": "pointer"
    }).appendTo(imgmenuList);
    
    var imgmainlistPoint2 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6);'><img src='Symbole/open.png' style='width:16px; height:16px;'>&nbsp;Load Imagelist</li>");
    imgmainlistPoint2.css({
      "padding-top": "9px",
      "padding-bottom": "9px",
      "cursor": "pointer"
    }).appendTo(imgmenuList);
    
    var imgmainlistPoint3 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6);'><img src='Symbole/export.png' style='width:16px; height:16px;'>&nbsp;Save Imagelist</li>");
    imgmainlistPoint3.css({
      "padding-top": "9px",
      "padding-bottom": "9px",
      "cursor": "pointer"
    }).appendTo(imgmenuList);
    
    var imgmainlistPoint4 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6);'>Zoom Imagelist</li>");
    imgmainlistPoint4.css({
      "padding-top": "9px",
      "padding-bottom": "9px",
      "cursor": "pointer"
    }).appendTo(imgmenuList);
    
    var imgmainlistPoint5 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6);'><img src='Symbole/fullscreen.png' style='width:16px; height:16px;'>&nbsp;Zoom Images</li>");
    imgmainlistPoint5.css({
      "padding-top": "9px",
      "padding-bottom": "9px",
      "cursor": "pointer"
    }).appendTo(imgmenuList);
    
    var imgmainlistPoint6 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6);'><img src='Symbole/rec.png' style='width:16px; height:16px;'>&nbsp;Record</li>");
    imgmainlistPoint6.css({
      "padding-top": "9px",
      "padding-bottom": "9px",
      "cursor": "pointer"
    }).appendTo(imgmenuList);
    
    var imgmainlistPoint7 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6);'>Toogle Filter & Imagelist</li>");
    imgmainlistPoint7.css({
      "padding-top": "9px",
      "padding-bottom": "9px",
      "cursor": "pointer"
    }).appendTo(imgmenuList);
    
    var imgmainlistPoint8 = $("<li>Tracklist-Info</li>");
    imgmainlistPoint8.css({
      "padding-top": "9px",
      "padding-bottom": "9px",
      "cursor": "pointer"
    });
    imgmainlistPoint8.appendTo(imgmenuList);
    
    imgmain.on("contextmenu", function(e) {
      var scW = window.screen.availWidth;
      var scH = window.screen.availHeight;
      var imenuX = e.pageX;
      var imenuY = e.pageY;
      var imenSizeX = imgmainMenu.width();
      var imenSizeY = imgmainMenu.height();
      var imenuPoxX = imenuX + imenSizeX;
      var imenuPosY = imenuY + imenSizeY;
      
      if (imenuPoxX > scW && imenuPosY < scH) {
        imgmainMenu.animate({left: imenuX - imenSizeX, top: imenuY},6).show();
      } else if (imenuPosY > scH && imenuPoxX < scW) {
        imgmainMenu.animate({left: imenuX, top: imenuY - imenSizeY},6).show();
      } else if (imenuPosY > scH && imenuPoxX > scW) {
        imgmainMenu.animate({left: imenuX - imenSizeX, top: imenuY - imenSizeY},6).show();
      } else {
        imgmainMenu.animate({left: imenuX, top: imenuY},6).show();
      }
      
      return false;
    });
    
    var imgmaincloseMenu;
    
    imgmainMenu.on("mouseenter", function() {
	clearTimeout(imgmaincloseMenu);
    });
    
    imgmainMenu.on("mouseleave", function() {
	imgmaincloseMenu = setTimeout(function() {
	   imgmainMenu.hide();
	},1600);	
    });
    
    imgmainlistPoint1.on("click", function() {
      imgaddTrackMultiBtn.click();
      imgmainMenu.hide();
    });
    
    imgmainlistPoint2.on("click", function() {
      imgtrackListLoadBtn.click();
      imgmainMenu.hide();
    });
    
    imgmainlistPoint3.on("click", function() {
      imgtrackSaveBtn.click();
      imgmainMenu.hide();
    });
    
    imgmainlistPoint4.on("click", function() {
      imgplayBtn.click();
      imgmainMenu.hide();
    });
    
    imgmainlistPoint5.on("click", function() {
      if (imgplayerNumber.val() === "imgplayer1") {
        imgFullscreen1.click();
      } else if (imgplayerNumber.val() === "imgplayer2") {
        imgFullscreen2.click();
      }
      imgmainMenu.hide();
    });
    
    imgmainlistPoint6.on("click", function() {
      imgrecmodBtn.click();
      imgmainMenu.hide();
    });
    
    imgmainlistPoint7.on("click", function() {
      imgfiltermix.click();
      imgmainMenu.hide();
    });
    
    imgmainlistPoint8.on("click", function() {
      imgInfos();
      imgtrackInfoMod.animate({left: imageelement.width()/2 - imgtrackInfoMod.width()/2 + "px", top: imageelement.height()/2 - imgtrackInfoMod.height()/2 + "px"},1).show();
      imgmainMenu.hide();
    });
    
    $("#imgmainmenu li").on("mouseenter", function() {
      $(this).css("background","#009aff");
    });
    
    $("#imgmainmenu li").on("mouseleave", function() {
      $(this).css("background","none");
    });
    
    $("#imgmainmenu li").on("contextmenu", function(e) {
      $(this).click();
      return false;
    });
    
    var imgboxmenu = $("<div id='imgboxmenu'></div>");
    imgboxmenu.css({
      "width": "300px",
      "background": "rgba(21, 21, 21, 0.8)",
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "z-index": 2200,
      "border": "2px outset #303030",
      "display": "none"
    });
    
    imgboxmenu.appendTo(this);
    
    var imgboxList = $("<ul/>");
    imgboxList.css({
      "margin": "1px",
      "padding": "1px",
      "list-style": "none",
      "font-size": "20px",
      "font-weight": "bold",
      "color": "white",
      "text-align": "left",
    });
    
    imgboxList.appendTo(imgboxmenu);
    
    var imglistPoint1 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>&#9654;/|| Play/Pause</li>");
    imglistPoint1.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    imglistPoint1.appendTo(imgboxList);
    
    var imglistPoint2 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>|&laquo; Imagelist Reverse</li>");
    imglistPoint2.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer",
    });
    
    imglistPoint2.appendTo(imgboxList);
    
    var imglistPoint3 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>&raquo;| Imagelist Forward</li>");
    imglistPoint3.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer",
    });
    
    imglistPoint3.appendTo(imgboxList);
    
    var imglistPoint4 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>Exit Fullscreen</li>");
    imglistPoint4.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    imglistPoint4.appendTo(imgboxList);
    
    var imglistPoint5 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'><img src='Symbole/open.png' style='width:20px; height:20px;'>&nbsp;Load Video</li>");
    imglistPoint5.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    imglistPoint5.appendTo(imgboxList);
    
    var imglistPoint6 = $("<li style='border-bottom: 1px solid rgba(255, 255, 255, 0.6)'>Show Toolbar</li>");
    imglistPoint6.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    imglistPoint6.appendTo(imgboxList);
    
    var imglistPoint7 = $("<li>Show Gallery</li>");
    imglistPoint7.css({
      "padding-top": "12px",
      "padding-bottom": "12px",
      "cursor": "pointer"
    });
    
    imglistPoint7.appendTo(imgboxList);
    
    imgbox1.on("contextmenu", function(e) {
      var scW = window.screen.availWidth;
      var scH = window.screen.availHeight;
      var imenuX = e.pageX;
      var imenuY = e.pageY;
      var imenSizeX = imgboxmenu.width();
      var imenSizeY = imgboxmenu.height();
      var imenuPoxX = imenuX + imenSizeX;
      var imenuPosY = imenuY + imenSizeY;
      
      if (imgbox1.hasClass("imgfullScreen1")) {
        if (imenuPoxX > scW && imenuPosY < scH) {
        imgboxmenu.animate({left: imenuX - imenSizeX, top: imenuY},6).show();
      	} else if (imenuPosY > scH && imenuPoxX < scW) {
        imgboxmenu.animate({left: imenuX, top: imenuY - imenSizeY},6).show();
      	} else if (imenuPosY > scH && imenuPoxX > scW) {
        imgboxmenu.animate({left: imenuX - imenSizeX, top: imenuY - imenSizeY},6).show();
      	} else {
        imgboxmenu.animate({left: imenuX, top: imenuY},6).show();
      	}
      imgplayerNumber.val("imgplayer1");
      imgfader1.val(1);
      imgfader2.val(0);
      return false;
      }
    });
    
    imgbox2.on("contextmenu", function(e) {
      var scW = window.screen.availWidth;
      var scH = window.screen.availHeight;
      var imenuX = e.pageX;
      var imenuY = e.pageY;
      var imenSizeX = imgboxmenu.width();
      var imenSizeY = imgboxmenu.height();
      var imenuPoxX = imenuX + imenSizeX;
      var imenuPosY = imenuY + imenSizeY;
      
      if (imgbox2.hasClass("imgfullScreen2")) {
        if (imenuPoxX > scW && imenuPosY < scH) {
        imgboxmenu.animate({left: imenuX - imenSizeX, top: imenuY},6).show();
      	} else if (imenuPosY > scH && imenuPoxX < scW) {
        imgboxmenu.animate({left: imenuX, top: imenuY - imenSizeY},6).show();
      	} else if (imenuPosY > scH && imenuPoxX > scW) {
        imgboxmenu.animate({left: imenuX - imenSizeX, top: imenuY - imenSizeY},6).show();
      	} else {
        imgboxmenu.animate({left: imenuX, top: imenuY},6).show();
      	}
      	imgplayerNumber.val("imgplayer2");
      	imgfader1.val(0);
      	imgfader2.val(1);
      	return false;
      }
    });
    
    var imgboxcloseMenu;
    
    imgboxmenu.on("mouseenter", function() {
	clearTimeout(imgboxcloseMenu);
    });
    
    imgboxmenu.on("mouseleave", function() {
	imgboxcloseMenu = setTimeout(function() {
	   imgboxmenu.hide();
	},1600);	
    });
    
    imglistPoint1.on("click", function() {
      togglePlayPause.click();
      imgboxmenu.hide();
    });
    
    imglistPoint2.on("click", function() {
      changeImageRev();
      imgboxmenu.hide();
    });
    
    imglistPoint3.on("click", function() {
      changeImage();
      imgboxmenu.hide();
    });
    
    imglistPoint4.on("click", function() {
      exitfullBtn.click();
      imgboxmenu.hide();
    });
    
    imglistPoint5.on("click", function() {
      imgtrackLoadBtn.click();
      imgboxmenu.hide();
    });
    
    imglistPoint6.on("click", function() {
      toolbaropener.click();
      imgboxmenu.hide();
    });
    
    imglistPoint7.on("click", function() {
      imggalleryBtn.click();
      imgboxmenu.hide();
    });
    
    $("#imgboxmenu li").on("mouseenter", function() {
      $(this).css("background","#009aff");
    });
    
    $("#imgboxmenu li").on("mouseleave", function() {
      $(this).css("background","none");
    });
    
    $("#imgboxmenu li").on("contextmenu", function(e) {
      $(this).click();
      return false;
    });
    
    var mixrecorder, mixstream, voicestream;
    
    imgrecStart.on("click", async function() {
  	 mixstream = await navigator.mediaDevices.getDisplayMedia({
     	audio: true,
     	video: true,
     	selfBrowserSurface: "include",
     	systemAudio: "include",
     	surfaceSwitching: "include",
     	monitorTypeSurfaces: "include"
            });

     voicestream = await navigator.mediaDevices.getUserMedia({
     	audio: true,
     	video: false
        });

  	imgrecordButton.removeAttr("disabled");
 	 imgrecordButton.on('click', mixstartRecording);
 	 imgstopButton.on('click', mixstopRecording);
 	 var combinedStream = new MediaStream([...mixstream.getTracks(), ...voicestream.getTracks()]);
 	 mixrecorder = new MediaRecorder(combinedStream);
 	 mixrecorder.addEventListener('dataavailable', mixonRecordingReady);
        });
    
    function mixstartRecording() {
      imgrecStart.attr("disabled", "disabled");
  	  imgrecordButton.attr("disabled", "disabled").css({
     "background": "linear-gradient(to right, darkred, red, darkred)",
     "border-style": "inset",
     "border-color": "red",
      	    });

  	  imgrecmodBtn.css({
     "background": "linear-gradient(to right, darkred, red, darkred)",
     "border-style": "inset",
     "border-color": "red"
      	    });

  	 imgstopButton.removeAttr("disabled");
  	 imgrecMod.hide();
  	 mixrecorder.start();
     imgrecordTimer = setTimeout(function() {
       mixstopRecording();
       imgrecMod.show();
     },900000);
	}
    
    function mixstopRecording() {
  	 imgrecStart.removeAttr("disabled").css({
     "background": "#290000",
     "border-style": "outset",
     "border-color": "silver"
      	  });

  	  imgrecmodBtn.css({
     "background": "#151515",
     "border-style": "outset",
     "border-color": "silver"
      	    });

  	 imgstopButton.attr("disabled", "disabled");
  	 mixrecorder.stop();
	}
    
    function mixonRecordingReady(e) {
  	  var mixaudio = document.getElementById('imgrecplayer');
  	  var mixli = document.createElement('li');
  	  var mixlink = document.createElement('a');
  	  var mixrecordfile = document.getElementById('imgrecfilename').value;
      var mixrecordext = document.getElementById('imgrecExt').value;
          
  	  // e.data contains a blob representing the recording
  	  mixaudio.src = URL.createObjectURL(e.data);
  	  mixaudio.play();
  	  mixlink.href = mixaudio.src;
  	  mixlink.download = mixrecordfile + "." + "webm";
  	  mixlink.innerHTML = mixlink.download;
  	  mixli.appendChild(mixlink);
  	  imgrecordingsList.append(mixli);
		}
    
    function setimgAreaSize() {
      if (imageelement.width() < 1600) {
        imgplayerArea1.css("height", "300px");
        imgplayerArea2.css("height", "300px");
        imgTools1.css("height", "300px");
        
        imgcrossfadeImg.css({
      	  "width": "130px",
      	  "height": "45px"
    	});
        
        imgfader1.css({
      	  "width": "160px",
      	  "height": "12px",
	  	  "margin-top": "2px"
    	});
        
         imgfader2.css({
      	  "width": "160px",
      	  "height": "12px",
	  	  "margin-top": "2px"
    	});
        
        imgcrossFadeMode.css({
      	 "width": "110px",
      	 "height": "30px",
         "font-size": "12px",
    	});
        
         imgcrossFadeTime.css({
      	  "width": "50px",
      	  "height": "20px",
          "font-size": "12px",
    	});
        
        imgEffectMode.css({
      	  "width": "170px",
      	  "height": "30px",
          "font-size": "12px",
    	});
        
        $(".imgSymbol").css({
          "width": "12px",
          "height": "12px"
        });
        
        imgWidth.css({
          "width": "30px",
          "height": "20px",
          "font-size": "9px"
        });
        
        imgWidth2.css({
          "width": "30px",
          "height": "20px",
          "font-size": "9px"
        });
        
        imgHeight.css({
          "width": "30px",
          "height": "20px",
          "font-size": "9px"
        });
        
        imgHeight2.css({
          "width": "30px",
          "height": "20px",
          "font-size": "9px"
        });
        
        imgtrackLib.css({
          "height": "170px",
    	});
        
        imgtoolbarArea.css({
          "height": "170px",
    	});
        
        imgtrackToolbar.css({
          "height": "150px",
    	});
        
        imgtrackLibList.css({
          "font-size": "14px",
    	});
        
        imgplayerNumber.css({
          "width": "80px",
          "height": "35px",
          "font-size": "12px"
        });
        
        imgpath.css({
          "width": "400px",
          "height": "30px",
          "font-size": "12px"
        });
        
        imgtrackLoadBtn.css({
      	  "width": "130px",
      	  "height": "35px",
      	  "font-size": "14px",
      	  "margin-left": "6px"
    	});
        
        imgtrackName.css({
      	  "width": "150px",
      	  "height": "30px",
      	  "font-size": "16px",
      	  "margin-left": "6px",
      	  "border": "2px outset silver"
    	});
        
        imgaddTrackBtn.css({
      	  "width": "35px",
          "height": "35px",
          "font-size": "16px",
          "margin-left": "6px",
      	  "border": "4px outset silver"
    	});
        
        imgaddTrackMultiBtn.css({
      	  "width": "160px",
      	  "height": "35px",
      	  "font-size": "14px",
      	  "margin-left": "6px"
    	});
        
        imgtrackUpBtn.css({
      	  "width": "120px",
      	  "height": "35px",
      	  "font-size": "14px",
      	  "margin-left": "6px"
    	});
        
        imgtrackDownBtn.css({
      	  "width": "120px",
      	  "height": "35px",
      	  "font-size": "14px",
      	  "margin-left": "6px"
    	});
        
        imgtrackCountUpBtn.css({
      	  "width": "120px",
      	  "height": "35px",
      	  "font-size": "14px",
      	  "margin-left": "6px"
    	});
        
        imgtrackCountDownBtn.css({
      	  "width": "120px",
      	  "height": "35px",
      	  "font-size": "14px",
      	  "margin-left": "6px"
    	});
        
        imgtrackListLoadBtn.css({
      	  "width": "160px",
      	  "height": "35px",
      	  "font-size": "16px",
      	  "margin-left": "6px",
      	  "border": "4px outset silver"
    	});
        
        imgaddTrackListBtn.css({
      	  "width": "35px",
      	  "height": "35px",
      	  "font-size": "16px",
      	  "margin-left": "6px",
      	  "border": "4px outset silver"
    	});
        
        imgtrackDelBtn.css({
      	  "width": "35px",
          "height": "35px",
          "font-size": "16px",
          "margin-left": "6px",
      	  "border": "4px outset silver"
    	});
        
        imgtracklistDelBtn.css({
      	  "width": "35px",
          "height": "35px",
          "font-size": "16px",
          "margin-left": "6px",
      	  "border": "4px outset silver"
    	});
        
        imgtrackSaveTxt.css({
      	  "width": "290px",
      	  "height": "30px",
      	  "font-size": "16px",
      	  "margin-left": "6px",
      	  "border": "4px outset silver"
    	});
        
        imgtrackSaveBtn.css({
      	  "width": "160px",
      	  "height": "35px",
      	  "font-size": "16px",
      	  "margin-left": "6px",
      	  "border": "4px outset silver"
    	});
        
         imgmixerBox.css({
      	  "height": "170px",
    	});
        
        imgmixerArea1.css({
      	  "height": "120px",
    	});
        
        imgmixerArea2.css({
      	  "height": "40px",
    	});
        
        imgfilterrow1.css({
      	  "height": "35px",
      	  "padding-top": "2px",
    	});
        
        imgfilterrow2.css({
      	  "height": "35px",
      	  "padding-top": "2px",
    	});
        
        imgfilterrow3.css({
      	  "height": "35px",
      	  "padding-top": "2px",
    	});
        
        imgfilterrow4.css({
      	  "height": "35px",
      	  "padding-top": "2px",
    	});
        
        imgfilterrow5.css({
      	  "height": "35px",
      	  "padding-top": "2px",
    	});
        
        imgfilterrow6.css({
      	  "height": "35px",
      	  "padding-top": "2px",
    	});
        
        imgblurtxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgblurtxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});

        imgbrighttxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgbrighttxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgcontrasttxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgcontrasttxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgcontrasttxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imghuetxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imghuetxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imggraytxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imggraytxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imginverttxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imginverttxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgopacitytxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgopacitytxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgsepiatxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgsepiatxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgsattxt1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgsattxt2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgblurfilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgbrightfilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgcontrastfilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imghuefilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imggrayfilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imginvertfilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgopacityfilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgsepiafilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgsatfilter1.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgblurfilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgbrightfilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgcontrastfilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imghuefilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imggrayfilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imginvertfilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgopacityfilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgsepiafilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgsatfilter2.css({
      	  "height": "15px",
      	  "border": "4px outset silver"
    	});
        
        imgblurbox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgblurbox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgbrightbox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgbrightbox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgcontrastbox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgcontrastbox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgcontrastbox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imghuebox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imghuebox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imggraybox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imggraybox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imginvertbox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imginvertbox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgopacitybox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgopacitybox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgsepiabox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgsepiabox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgsatbox1.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
        
        imgsatbox2.css({
      	  "height": "35px",
      	  "font-size": "16px",
      	  "padding-top": "2px",
	  	  "font-family": "arial"
    	});
      }
    }
    
    setimgAreaSize();
    
    
    function imgsaveTracklist() {
	  localStorage.setItem("miximages", imgtrackLibList.html());
	  imgsetTracklist();
	}

	function imgsetTracklist() {
	  var currentHtml111 = localStorage.getItem("miximages");
	  imgtrackLibList.html(currentHtml111);
	  }
    
	try {
      if(!localStorage.getItem("miximages")) {
      imgsaveTracklist();
    	} else {
      imgsetTracklist();
    	}
    } catch(error) {
      imgalertMod.animate({left: imageelement.width()/2 - imgalertMod.width()/2, top: imageelement.height()/2 - imgalertMod.height()/2},1).show();
      imgalertTextBox.text(error);
    }
    
    function imgsaveCrossfadeSettings() {
      localStorage.setItem("imgcrfImg", imgcrossfadeImg.attr("src"));
      localStorage.setItem("imgcrfMode", imgcrossFadeMode.val());
      localStorage.setItem("imgcrfTime", imgcrossFadeTime.val());
      localStorage.setItem("imgeffect", imgEffectMode.val());
      imgsetCrossfadeSettings();
    }
    
    function imgsetCrossfadeSettings() {
      var imgnewCrfImg = localStorage.getItem("imgcrfImg");
      var imgnewCrfMode = localStorage.getItem("imgcrfMode");
      var imgnewCrfTime = localStorage.getItem("imgcrfTime");
      var imgnewEffect = localStorage.getItem("imgeffect");
      
      imgcrossfadeImg.attr("src", imgnewCrfImg);
      imgcrossFadeMode.val(imgnewCrfMode);
      imgcrossFadeTime.val(imgnewCrfTime);
      imgEffectMode.val(imgnewEffect);
    }
    
    try {
        if (!localStorage.getItem("imgcrfImg") && !localStorage.getItem("imgcrfMode") && !localStorage.getItem("imgcrfTime") && !localStorage.getItem("imgeffect")) {
        imgsaveCrossfadeSettings();
    	} else {
        imgsetCrossfadeSettings();
    	}
    } catch(error) {
      imgalertMod.animate({left: imageelement.width()/2 - imgalertMod.width()/2, top: imageelement.height()/2 - imgalertMod.height()/2},1).show();
      imgalertTextBox.text(error);
    }
    
    function saveImgpath() {
      localStorage.setItem("imgpath", imgpath.val());
      setImgpath();
    }
    
    function setImgpath() {
      var newPath = localStorage.getItem("imgpath");
      imgpath.val(newPath);
    }
    
    try {
      if (!localStorage.getItem("imgpath")) {
        saveImgpath();
      } else {
        setImgpath();
      }
    } catch(error) {
      imgalertMod.animate({left: imageelement.width()/2 - imgalertMod.width()/2, top: imageelement.height()/2 - imgalertMod.height()/2},1).show();
      imgalertTextBox.text(error);
    }
    
    return imageelement;
  };
  
}(jQuery));
