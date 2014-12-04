(function(d, w) {

  var canvas, ctx, svg;

  var createLayoutThird = function() {
    canvas = d.createElement('canvas');
    canvas.style.position = "absolute";
    canvas.style.width = canvas.style.height = "100%";
    canvas.style.top = canvas.style.left = "0";
    canvas.style.zIndex = "1000";
    d.body.appendChild(canvas);

    ctx = canvas.getContext("2d");
    
    svg = d.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    var svgNS = svg.namespaceURI;

    var pathHor = [
      'M0,33.33 L 100,33.33',
      'M0,66.66 L 100,66.66',
      'Z'
    ];

    var pathVert = [
      'M33.33,0 L 33.33,100',
      'M66.66,0 L 66.66, 100',
      'Z'
    ];

    var line = d.createElementNS(svgNS, "path");
    line.setAttribute('d', pathHor.join(' '));
    line.setAttribute('stroke', '#000');
    line.setAttribute('stroke-width', '.5');
    line.setAttribute('fill', 'none');
    svg.appendChild(line);
      
    line = d.createElementNS(svgNS, "path");
    line.setAttribute('d', pathVert.join(' '));
    line.setAttribute('stroke', '#000');
    line.setAttribute('stroke-width', '.25');
    line.setAttribute('fill', 'none');
    svg.appendChild(line);

    svg.style.position = "fixed";
    svg.style.width = "100%";
    //svg.style.height = w.innerHeight;
    svg.style.height = '100vh';
    svg.style.top = svg.style.left = "0";
    svg.style.zIndex = "1000";
    d.body.appendChild(svg);
  };

  var createLayoutGolden = function() {
    svg = d.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('viewBox', '0 0 850 525');
    svg.setAttribute('preserveAspectRatio', 'none');
    var svgNS = svg.namespaceURI;

    var path = [
      'M525,0 L 525,525',
      'M525,200 L 850,200',
      'M650,0 L 650,200',
      'M525,125 L 650,125',
      'M600,125 L 600,200',
      'M600,150 L 650,150',
      'M625,125 L 625,150',
      'Z'
    ];

    var curve = [
      'M0,0',
      'A 525,525 0,0,0 525,525',
      'A 325,325 0 0,0 850,200',
      'A 200,200 0 0,0 650,0',
      'A 125,125 0 0,0 525,125',
      'A 75,75 0 0,0 600,200',
      'A 50,50 0 0,0 650,150',
      'A 25,25 0 0,0 625,125',
      'M0,0 Z'
    ];

    var line = d.createElementNS(svgNS, "path");
    line.setAttribute('d', path.join(' '));
    line.setAttribute('stroke', '#000');
    line.setAttribute('stroke-width', '.5');
    line.setAttribute('fill', 'none');
    svg.appendChild(line);

    line = d.createElementNS(svgNS, "path");
    line.setAttribute('d', curve.join(' '));
    line.setAttribute('stroke', '#930');
    line.setAttribute('stroke-width', '.5');
    line.setAttribute('fill', 'none');
    svg.appendChild(line);

    svg.style.position = "fixed";
    svg.style.width = "100%";
    svg.style.height = '100vh';
    svg.style.top = svg.style.left = "0";
    svg.style.zIndex = "1000";
    d.body.appendChild(svg);
  };

  /*window.onresize = function(event) {
    //svg.style.width = w.innerWidth;
    svg.style.height = w.innerHeight;
  };*/

  /*var computeThirdGrid = function() {
    return {
      vertical: w.innerHeight / 3,
      horizontal: w.innerWidth / 3
    };
  };
  
  var drawThirdGrid = function() {
    var grid = computeThirdGrid();

    ctx.clearRect();
  };*/

  if (!ctx) {
    //createLayoutGolden();
    //createLayoutThird();
  }


  //console.log(computeThirdGrid())

  //ctx.fillStyle = "rgba(0,0,0,.3)"
  //ctx.fillRect(0, 0, 300,300);

})(document, window);