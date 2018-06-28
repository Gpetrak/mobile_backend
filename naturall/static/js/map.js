Ext.require([
    'GeoExt.component.Map',
    'GeoExt.component.OverviewMap'
]);

var mapComponent;
var mapPanel;
var overviewMap1;
var overviewMap2;
// declare blur and radius variables for tools div
var blur = document.getElementById('blur');
var radius = document.getElementById('radius');

Ext.application({
    name: 'OverviewMaps',
    launch: function() {
        var source;
        var source2;
        var layer;
        var layer2;
        var olMap;
        var tools;
        var ovMapPanel1;
        var ovMapPanel2;

        /* source = new ol.source.OSM();
        layer = new ol.layer.Tile({
            source: source
        }); */

        var data = new ol.source.Vector();

        var csrf = Ext.util.Cookies.get('csrftoken');
        var records= [];
        var temprature;
	
        function goAjax () {
		Ext.Ajax.request({ 
                  url: 'result',
                  method: 'GET',
                  // wait JavaScript and store the ajax response (depricated)
                  async: false,
                  params: {
                  //'points' : coords_array,
                  'csrfmiddlewaretoken': csrf
                  },
                  success: function(response) {
                  // Ext.decode convert the resopnse from string to object
                  res = Ext.decode(response.responseText);
                  records.push(res);
                  // values function call in order to update the values
                  values();
                  // Ext.util.JSON.decode();
                  // console.log(typeof(lonlat_list[0]));
                  // alert("Your data submitted successfully !");
                  }, 
                  failure: function (response) {
                  // var text = response.responseText;
                  Ext.Msg.alert('Failure', 'Please try again...');
                  },          
              });
	}
         
        goAjax();
        // call the function every 2 sec
        window.setInterval(function(){
          // call your functin here  
          goAjax();
        }, 1000);

        function values() {
          // last item of records list
          var last = records[records.length - 1];
          // get the temprature which is the third value of every sub-array
          temprature = last[2];
          var coord = ol.proj.fromLonLat(last);
          console.log(coord);        
          var lonlat = new ol.geom.Point(coord);
          // var lonlat = point;

          var pointFeature = new ol.Feature({
              geometry: lonlat,
              weight: temprature // e.g. temprature
              });

            data.addFeature(pointFeature);
         }
        // create the layer
        var heatPoints = new ol.layer.Heatmap({
          source: data,
          blur: parseInt(blur.value, 10),
          radius: parseInt(radius.value, 10),
        });


         heatPoints.getSource().on('addfeature', function(event) {
            // Set the points in order to listen their temprature value (weight)
            // Tempreture was devided with 42 in order its range to be (0-1)
	    // as refered at OpenLayers docs (ol.layer.Heatmap)
            event.feature.set('weight', temprature / 42);
          });   
 
       source = new ol.source.OSM();
       layer = new ol.layer.Tile({
           source: source
       });
 
        source2 = new ol.source.TileWMS({
            url: 'https://ows.terrestris.de/osm-gray/service',
            params: {'LAYERS': 'OSM-WMS', 'TILED': true}
        });
        layer2 = new ol.layer.Tile({
            source: source2
        });

        olMap = new ol.Map({
            layers: [
                layer,
                heatPoints,
                /*
                new ol.layer.Tile({
                    source: new ol.source.Stamen({
                        layer: 'watercolor'
                    })
                }),
                new ol.layer.Tile({
                    source: new ol.source.Stamen({
                        layer: 'terrain-labels'
                    })
                }), */
            ],
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ]),
            view: new ol.View({
                center: ol.proj.fromLonLat([24.022, 35.507]),
                zoom: 14
            })
        });

        blur.addEventListener('input', function() {
          heatPoints.setBlur(parseInt(blur.value, 10));
        });

        radius.addEventListener('input', function() {
          heatPoints.setRadius(parseInt(radius.value, 10));
        });

        mapComponent = Ext.create('GeoExt.component.Map', {
            map: olMap
        });

        mapPanel = Ext.create('Ext.panel.Panel', {
            title: 'NaturALL',
            region: 'center',
            layout: 'fit',
            border: false,
            items: [mapComponent]
        });

        overviewMap1 = Ext.create('GeoExt.component.OverviewMap', {
            parentMap: olMap
        });

        overviewMap2 = Ext.create('GeoExt.component.OverviewMap', {
            parentMap: olMap,
            magnification: 12,
            layers: [layer2],
            anchorStyle: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: 'rgb(255, 204, 51)'
                    })
                })
            }),
            boxStyle: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgb(255, 204, 51)',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 204, 51, 0.2)'
                })
            })
        });

        tools = Ext.create('Ext.panel.Panel', {
            contentEl: 'tools',
            title: 'Tools',
            flex: 1,
            border: false,
            bodyPadding: 5,
            autoScroll: true
        });

        ovMapPanel1 = Ext.create('Ext.panel.Panel', {
            title: 'OverviewMap',
            flex: 1,
            layout: 'fit',
            items: overviewMap1
        });

        ovMapPanel2 = Ext.create('Ext.panel.Panel', {
            //title: 'OverviewMap (configured)',
            flex: 1,
            layout: 'fit',
            items: overviewMap2
        });

        Ext.create('Ext.Viewport', {
            layout: 'border',
            items: [
                mapPanel,
                {
                    xtype: 'panel',
                    region: 'east',
                    width: 400,
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        ovMapPanel1,
                        tools,
                        ovMapPanel2
                    ]
                }
            ]
        });
    }
});

