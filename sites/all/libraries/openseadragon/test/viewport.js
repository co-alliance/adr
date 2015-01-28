/* global module, asyncTest, $, ok, equal, notEqual, start, test, Util, testLog, propEqual */

(function () {
    var viewer;
    var VIEWER_ID = "example";
    var PREFIX_URL = "/build/openseadragon/images";
    var SPRING_STIFFNESS = 100; // Faster animation = faster tests

     module("viewport", {
        setup: function () {
            var example = $('<div id="example"></div>').appendTo("#qunit-fixture");

            testLog.reset();

            viewer = OpenSeadragon({
                id:            VIEWER_ID,
                prefixUrl:     PREFIX_URL,
                springStiffness: SPRING_STIFFNESS
            });
        },
        teardown: function () {
            if (viewer && viewer.close) {
                viewer.close();
            }

            viewer = null;
        }
    });

    // helpers and constants

    var ZOOM_FACTOR = 2; // the image will be twice as large as the viewer.
    var VIEWER_PADDING = new OpenSeadragon.Point(0.25, 0.25);
    var DZI_PATH = '/test/data/testpattern.dzi';
    var TALL_PATH = '/test/data/tall.dzi';

    var testZoomLevels = [-1, 0, 0.1, 0.5, 4, 10];

    var testPoints = [
        new OpenSeadragon.Point(0, 0),
        new OpenSeadragon.Point(0.001, 0.001),
        new OpenSeadragon.Point(0.25, 0.5),
        new OpenSeadragon.Point(0.99, 0.99),
        new OpenSeadragon.Point(1, 1)
    ];

    var testRects = [
        new OpenSeadragon.Rect(0, 0, 0, 0),
        new OpenSeadragon.Rect(0.001, 0.005, 0.001, 0.003),
        new OpenSeadragon.Rect(0.25, 0.25, 0.25, 0.25),
        new OpenSeadragon.Rect(0.999, 0.999, 0.999, 0.999),
        new OpenSeadragon.Rect(1, 1, 1, 1)
    ];

    // Test helper - a lot of these tests loop through a few possible
    // values for zoom levels, and reopen the viewer for each iteration.
    var reopenViewerHelper = function(config) {
        var expected, level, actual, i = 0;
        var openHandler = function(event) {
            viewer.removeHandler('open', openHandler);
            var viewport = viewer.viewport;
            expected = config.processExpected(level, expected);
            actual = viewport[config.method]();

            propEqual(
                actual,
                expected,
                "Test " + config.method + " with zoom level of " + level + ". Expected : " + expected + ", got " + actual
            );
            i++;
            if(i < testZoomLevels.length){
                level = expected = testZoomLevels[i];
                var viewerConfig = {
                    id:            VIEWER_ID,
                    prefixUrl:     PREFIX_URL,
                    springStiffness: SPRING_STIFFNESS
                };

                viewerConfig[config.property] = level;
                viewer = OpenSeadragon(viewerConfig);
                viewer.addHandler('open', openHandler);
                viewer.open(DZI_PATH);
            } else {
                start();
            }
        };
        viewer.addHandler('open', openHandler);
        level = expected = testZoomLevels[i];
        viewer[config.property] = level;
        viewer.open(DZI_PATH);
    };

    // Test helper - a lot of these tests loop through a test data
    // array and test different values. This helper does not reopen the viewer.
    var loopingTestHelper = function(config) {
        var openHandler = function(event) {
            viewer.removeHandler('open', openHandler);
            var viewport = viewer.viewport;
            viewport.zoomTo(ZOOM_FACTOR, null, true);
            viewport.update(); // need to call this even with immediately=true

            var orig, expected, actual;
            for (var i = 0; i < config.testArray.length; i++){
                orig = config.getOrig(config.testArray[i], viewport);
                expected = config.getExpected(orig, viewport);
                actual = viewport[config.method](orig);
                propEqual(
                    actual,
                    expected,
                    "Correctly converted coordinates " + orig
                );
            }

            start();
        };
        viewer.addHandler('open', openHandler);
        viewer.open(DZI_PATH);
    };

// Tests start here.
    asyncTest('getContainerSize', function() {
        var openHandler = function(event) {
            viewer.removeHandler('open', openHandler);
            var viewport = viewer.viewport;
            viewport.zoomTo(ZOOM_FACTOR, null, true);
            viewport.update(); // need to call this even with immediately=true

            propEqual(viewport.getContainerSize(), new OpenSeadragon.Point(500, 500), "Test container size");
            start();
        };
        viewer.addHandler('open', openHandler);
        viewer.open(DZI_PATH);
    });

    asyncTest('getAspectRatio', function() {
        var openHandler = function(event) {
            viewer.removeHandler('open', openHandler);
            var viewport = viewer.viewport;
            viewport.zoomTo(ZOOM_FACTOR, null, true);
            viewport.update(); // need to call this even with immediately=true

            equal(viewport.getAspectRatio(), 1, "Test aspect ratio");
            start();
        };
        viewer.addHandler('open', openHandler);
        viewer.open(DZI_PATH);
    });

    asyncTest('getMinZoomDefault', function() {
        var openHandler = function(event) {
            viewer.removeHandler('open', openHandler);
            var viewport = viewer.viewport;

            equal(viewport.getMinZoom(), 0.9, "Test default min zoom level");
            start();
        };
        viewer.addHandler('open', openHandler);
        viewer.open(DZI_PATH);
    });

    asyncTest('getMaxZoomDefault', function() {
        var openHandler = function(event) {
            viewer.removeHandler('open', openHandler);
            var viewport = viewer.viewport;

            equal(viewport.getMaxZoom(), 2.2, "Test default max zoom level");
            start();
        };
        viewer.addHandler('open', openHandler);
        viewer.open(DZI_PATH);
    });

    asyncTest('getMinZoom', function() {
        reopenViewerHelper({
            property: 'minZoomLevel',
            method: 'getMinZoom',
            processExpected: function(level, expected){
                if(level === 0) { // 0 means use the default
                    expected = 0.9;
                } else if(level > 1) {
                    expected = 1; // min zoom won't go bigger than 1.
                }
                return expected;
            }
        });
    });

    asyncTest('getMaxZoom', function() {
        reopenViewerHelper({
            property: 'maxZoomLevel',
            method: 'getMaxZoom',
            processExpected: function(level, expected) {
                if(level === 0){ // 0 means use the default
                    expected = 2.2;
                } else if(level < 1){
                    expected = 1; // max zoom won't go smaller than 1.
                }
                return expected;
            }

        });
    });

    asyncTest('getHomeBounds', function() {
        reopenViewerHelper({
            property: 'defaultZoomLevel',
            method: 'getHomeBounds',
            processExpected: function(level, expected) {
                // Have to special case this to avoid dividing by 0
                if(level === 0){
                    expected = new OpenSeadragon.Rect(0, 0, 1, 1);
                } else {
                    var sideLength = 1.0 / viewer.defaultZoomLevel;  // it's a square in this case
                    var position = 0.5 - (sideLength / 2.0);
                    expected = new OpenSeadragon.Rect(position, position, sideLength, sideLength);
                }
                return expected;
            }
        });
    });

    asyncTest('getHomeZoom', function() {
        reopenViewerHelper({
            property: 'defaultZoomLevel',
            method: 'getHomeZoom',
            processExpected: function(level, expected){
                // If the default zoom level is set to 0, then we expect the home zoom to be 1.
                if(expected === 0){
                    expected = 1;
                }
                return expected;
            }
        });
    });

    // I don't use the helper for this one because it sets a couple more
    // properties that would need special casing.
    asyncTest('getHomeZoomWithHomeFillsViewer', function() {
        var expected, level, i = 0;
        var openHandler = function(event) {
            viewer.removeHandler('open', openHandler);
            var viewport = viewer.viewport;
            viewport.zoomTo(ZOOM_FACTOR, null, true);
            viewport.update(); // need to call this even with immediately=true

            // If the default zoom level is set to 0, then we expect the home zoom to be 1.
            if(level === 0){
                expected = 1;
            }

            equal(
                viewport.getHomeZoom(),
                expected,
                "Test getHomeZoom with homeFillsViewer = true and default zoom level of " + expected
            );
            i++;
            if(i < testZoomLevels.length){
                level = expected = testZoomLevels[i];
                viewer = OpenSeadragon({
                    id:            VIEWER_ID,
                    prefixUrl:     PREFIX_URL,
                    springStiffness: SPRING_STIFFNESS,
                    defaultZoomLevel: level,
                    homeFillsViewer: true
                });
                viewer.addHandler('open', openHandler);
                viewer.open(TALL_PATH);  // use a different image for homeFillsViewer
            } else {
                start();
            }
        };
        viewer.addHandler('open', openHandler);
        level = expected = testZoomLevels[i];
        viewer.homeFillsViewer = true;
        viewer.defaultZoomLevel = expected;
        viewer.open(TALL_PATH); // use a different image for homeFillsViewer
    });

    asyncTest('deltaPixelsFromPoints', function() {
         loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport){
                return el.times(viewer.source.dimensions.x);
            },
            getExpected: function(orig, viewport){
                return orig.times(viewport.getContainerSize().x * ZOOM_FACTOR);
            },
            method: 'deltaPixelsFromPoints'
        });
    });

    asyncTest('deltaPointsFromPixels', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewport.getContainerSize().x);
            },
            getExpected: function(orig, viewport) {
                return orig.divide(viewport.getContainerSize().x * ZOOM_FACTOR);
            },
            method: 'deltaPointsFromPixels'
        });
    });

    asyncTest('pixelFromPoint', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewer.source.dimensions.x);
            },
            getExpected: function(orig, viewport) {
                return orig.plus(VIEWER_PADDING).times(viewport.getContainerSize().x * ZOOM_FACTOR).minus(viewport.getContainerSize());
            },
            method: 'pixelFromPoint'
        });
    });

    asyncTest('pointFromPixel', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewport.getContainerSize().x);
            },
            getExpected: function(orig, viewport) {
                return orig.divide(viewer.source.dimensions.x).plus(VIEWER_PADDING);
            },
            method: 'pointFromPixel'
        });
    });

    asyncTest('viewportToImageCoordinates', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewport.getContainerSize().x);
            },
            getExpected: function(orig, viewport) {
                return orig.divide(viewer.source.dimensions.x);
            },
            method: 'imageToViewportCoordinates'
        });
    });

    asyncTest('imageToViewportCoordinates', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewer.source.dimensions.x);
            },
            getExpected: function(orig, viewport) {
                return orig.divide(ZOOM_FACTOR * viewport.getContainerSize().x);
            },
            method: 'imageToViewportCoordinates'
        });
    });
    asyncTest('imageToViewportRectangle', function() {
        loopingTestHelper({
            testArray: testRects,
            getOrig: function(el, viewport) {
                return el.times(viewer.source.dimensions.x);
            },
            getExpected: function(orig, viewport) {
                return new OpenSeadragon.Rect(
                    orig.x / viewer.source.dimensions.x,
                    orig.y / viewer.source.dimensions.x,
                    orig.width / viewer.source.dimensions.x,
                    orig.height / viewer.source.dimensions.x
                );
            },
            method: 'imageToViewportRectangle'
        });
    });

    asyncTest('viewportToImageRectangle', function() {
        loopingTestHelper({
            testArray: testRects,
            getOrig: function(el, viewport) {
                return el.times(viewport.getContainerSize().x);
            },
            getExpected: function(orig, viewport) {
                return new OpenSeadragon.Rect(
                    orig.x * viewer.source.dimensions.x,
                    orig.y * viewer.source.dimensions.x,
                    orig.width * viewer.source.dimensions.x,
                    orig.height * viewer.source.dimensions.x
                );
            },
            method: 'viewportToImageRectangle'
        });
    });

    asyncTest('viewerElementToImageCoordinates', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewport.getContainerSize().x);
            },
            getExpected: function(orig, viewport) {
                return orig.plus(viewport.getContainerSize().divide(2));
            },
            method: 'viewerElementToImageCoordinates'
        });
    });

    asyncTest('imageToViewerElementCoordinates', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewer.source.dimensions.x);
            },
            getExpected: function(orig, viewport) {
                return orig.minus(viewport.getContainerSize().divide(2));
            },
            method: 'imageToViewerElementCoordinates'
        });
    });

   asyncTest('windowToImageCoordinates', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                var window_boundary = Math.min(window.innerWidth, window.innerHeight);
                return el.times(window_boundary);
            },
            getExpected: function(orig, viewport) {
                var position, pos_point;
                position = viewer.element.getBoundingClientRect();
                pos_point = new OpenSeadragon.Point(position.top, position.left);
                return orig.minus(pos_point).divide(viewport.getContainerSize().x * ZOOM_FACTOR).plus(VIEWER_PADDING);
            },
            method: 'windowToViewportCoordinates'
        });
    });

    asyncTest('imageToWindowCoordinates', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewer.source.dimensions.x);
            },
            getExpected: function(orig, viewport) {
                var position, pos_point;
                position = viewer.element.getBoundingClientRect();
                pos_point = new OpenSeadragon.Point(position.top, position.left);
                return orig.plus(pos_point).minus(VIEWER_PADDING.times(viewport.getContainerSize().x * ZOOM_FACTOR));
            },
            method: 'imageToWindowCoordinates'
        });
    });

    asyncTest('windowToViewportCoordinates', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                var window_boundary = Math.min(window.innerWidth, window.innerHeight);
                return el.times(window_boundary);
            },
            getExpected: function(orig, viewport) {
                var position, pos_point;
                position = viewer.element.getBoundingClientRect();
                pos_point = new OpenSeadragon.Point(position.top, position.left);
                return orig.minus(pos_point).divide(viewport.getContainerSize().x * ZOOM_FACTOR).plus(VIEWER_PADDING);
            },
            method: 'windowToViewportCoordinates'
        });
    });

    asyncTest('viewportToWindowCoordinates', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el.times(viewer.source.dimensions.x);
            },
            getExpected: function(orig, viewport) {
                var position, pos_point;
                position = viewer.element.getBoundingClientRect();
                pos_point = new OpenSeadragon.Point(position.top, position.left);
                return orig.minus(VIEWER_PADDING).times(viewport.getContainerSize().x * ZOOM_FACTOR).plus(pos_point);
            },
            method: 'viewportToWindowCoordinates'
        });
    });

    asyncTest('viewportToImageZoom', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el;
            },
            getExpected: function(orig, viewport) {
                return orig / ZOOM_FACTOR;
            },
            method: 'viewportToImageZoom'
        });
    });

    asyncTest('imageToViewportZoom', function() {
        loopingTestHelper({
            testArray: testPoints,
            getOrig: function(el, viewport) {
                return el;
            },
            getExpected: function(orig, viewport) {
                return orig * ZOOM_FACTOR;
            },
            method: 'imageToViewportZoom'
        });
    });

})();
