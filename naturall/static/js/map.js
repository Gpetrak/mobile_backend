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

        var heatPoints = new ol.layer.Heatmap({
          source: new ol.source.Vector({
            url: 'https://openlayers.org/en/v4.6.5/examples/data/kml/2012_Earthquakes_Mag5.kml',
            format: new ol.format.KML({
              extractStyles: false
            })
          }),
          blur: parseInt(blur.value, 10),
          radius: parseInt(radius.value, 10)
        });

        heatPoints.getSource().on('addfeature', function(event) {
          // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
          // standards-violating <magnitude> tag in each Placemark.  We extract it from
          // the Placemark's name instead.
          var name = event.feature.get('name');
          var magnitude = parseFloat(name.substr(2));
          event.feature.set('weight', magnitude - 5);
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
                new ol.layer.Tile({
                    source: new ol.source.Stamen({
                        layer: 'watercolor'
                    })
                }),
                new ol.layer.Tile({
                    source: new ol.source.Stamen({
                        layer: 'terrain-labels'
                    })
                }),
                heatPoints,
            ],
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ]),
            view: new ol.View({
                center: ol.proj.fromLonLat([24, 38.0]),
                zoom: 7
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

