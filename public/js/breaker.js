
(function(w, $, Physics) {

 var htmlRenderer = Physics.renderer('windowhtml', function( parent ){

    var defaults = {
        width: window.innerWidth,
        height: window.innerHeight,
        fontSize: 4
    };
    var count = 0;

    return {
        init: function( options ){
            console.log('init RENDERER')
            options = Physics.util.extend( defaults, options );
            parent.init.call(this, options);
            this.el = document.body
        },

        drawMeta: function( meta ){
            this.els.fps.innerHTML = meta.fps.toFixed(2);
            this.els.ipf.innerHTML = meta.ipf;
        },

        drawBody: function( body ){
            // "t" is the "leftover" time between timesteps. You can either ignore it, 
            // or use it to interpolate the position by multiplying it by the velocity 
            // and adding it to the position. This ensures smooth motion during "bullet-time"
            var t = this._interpolateTime;
            var view = body.view;
            var x = body.state.pos.get(0) + t * body.state.vel.get(0);
            var y = body.state.pos.get(1) + t * body.state.vel.get(1);
            var angle = body.state.angular.pos + t * body.state.angular.vel;
            x = x.toFixed(2);
            y = y.toFixed(2);
            x = (x < 0) ? 0 : x;
            y = (y < 0) ? 0 : y;

            angle = angle.toFixed(2);
            body.view.style.transform = 'translate('+x+'px,'+y+'px) rotate('+ angle +'rad)';
        
            // render "view" at (x, y) with a rotation of "angle"...
        }
        // other methods go here...
    };
});

  var simulation = function(world){
    var viewWidth = Math.ceil(window.innerWidth)
        ,viewHeight = Math.ceil(window.innerHeight)
        // bounds of the window
        ,viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
        ,edgeBounce
        ,renderer
        ;
        console.log(viewportBounds)
    // create a renderer
    renderer = Physics.renderer('windowhtml');

    // add the renderer
    world.add(renderer);
    // render on each step
    world.on('step', function () {
        world.render();
    });

    // constrain objects to these bounds
    edgeBounce = Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds
        ,restitution: 0.2
        ,cof: 0.8
    });

    // resize events
    window.addEventListener('resize', function () {

        viewWidth = window.innerWidth;
        viewHeight = window.innerHeight;

        renderer.el.width = viewWidth;
        renderer.el.height = viewHeight;

        viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
        // update the boundaries
        edgeBounce.setAABB(viewportBounds);

    }, true);

    var pent = [
        { x: 50, y: 0 }
        ,{ x: 25, y: -25 }
        ,{ x: -25, y: -25 }
        ,{ x: -50, y: 0 }
        ,{ x: 0, y: 50 }
    ];

    function random( min, max ){
        return (Math.random() * (max-min) + min)|0
    }

    /*function dropInBody(){

        var body;

        body = Physics.body('rectangle', {
                    width: 50
                    ,height: 50
                    ,x: viewWidth / 2
                    ,y: 50
                    ,vx: random(-5, 5)/100
                    ,restitution: 0.9
                    ,styles: {
                        fillStyle: '#d33682'
                        ,angleIndicator: '#751b4b'
                    },
                });

        world.add( body );
    }

    var int = setInterval(function(){
        if ( world._bodies.length > 40 ){
            clearInterval( int );
        }
        dropInBody();
    }, 700);*/

    // add some fun interaction
    /*var attractor = Physics.behavior('attractor', {
        order: 0,
        strength: 0.005
    });
    world.on({
        'interact:poke': function( pos ){
            attractor.position( pos );
            world.add( attractor );
        }
        ,'interact:move': function( pos ){
            attractor.position( pos );
        }
        ,'interact:release': function(){
            world.remove( attractor );
        }
    });*/

    // add things to the world
    world.add([
        Physics.behavior('interactive', { el: document})
        ,Physics.behavior('constant-acceleration')
        ,Physics.behavior('body-impulse-response')
        ,Physics.behavior('body-collision-detection')
        ,Physics.behavior('sweep-prune')
        ,edgeBounce
        ,htmlRenderer
    ]);

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time ) {
        world.step( time );
    });

  };

  function random( min, max ){
        return (Math.random() * (max-min) + min)|0
    }

  var breaker = function() {
    //$('body').append('<canvas id="viewport" style="position:absolute;top:0;left:0;background:#333;z-index:200"></canvas>')

    var world = Physics({ timestep: 4 }, simulation);

    $('html').css({
        'overflow': 'hidden',
        'user-select': 'none'
    });

    $('h1.title, h2.subtitle, p.copy, p.love').each(function() {
      //if (this.nodeType != Node.TEXT_NODE) return;


      console.log(this)
      var $this = $(this);
      
      var offset = $this.offset();

      $this.remove().prependTo('body');
      

      $this.css({
        position: 'absolute',
        top: 0,
        left: 0,
        border: '1px solid red',
        margin: 0,
        padding: 0,
        background: 'rgba(200, 100, 100, .5)',
        display: 'inline-block',
        zIndex: '99999',
        transform: 'translate3d(' + offset.left + 'px,' + offset.top + 'px,0)',
        'user-select': 'none'
      });
      
      body = Physics.body('rectangle', {
                    width: $this.outerWidth(),
                    height: $this.outerHeight(),
                    x: offset.left,
                    y: offset.top,
                    vx: 0,
                    restitution: 0.9,
                    
                    view: $this[0]
                });
       world.add( body );
    });

    // start the ticker
    Physics.util.ticker.start();
  };
  
  window.breaker = breaker;

})(window, jQuery, Physics);
