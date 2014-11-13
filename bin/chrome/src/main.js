'use strict';

var _window = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;

/**
 * Injects a script into a page for a given HTML tag
 * @param filePath
 * @param htmlTagStr
 */
function injectScript( filePath, htmlTagStr )
{
    var t = document.getElementsByTagName( htmlTagStr )[0];
    var s = document.createElement( 'script' );
    s.setAttribute( 'type', 'text/javascript' );
    s.setAttribute( 'src', filePath );
    t.appendChild( s );
}

/**
 * Injects all the scripts needed to root out corruption and cronyism.
 * Warning: does not solve any issues, but will sticky an ethics-banner,
 * so that at least counts for ... something.
 */
function injectAllScript()
{
    // add in the lists
    injectScript( chrome.extension.getURL( '/src/lib/lists/gamejournopros.js' ), 'body' );
    injectScript( chrome.extension.getURL( '/src/lib/lists/journolist.js' ), 'body' );
    injectScript( chrome.extension.getURL( '/src/lib/lists/gamechanger-salon.js' ), 'body' );
    injectScript( chrome.extension.getURL( '/src/lib/lists/gawker.js' ), 'body' );

    injectScript( chrome.extension.getURL( '/src/lib/inject.js' ), 'body' );
    // site rules
    injectScript( chrome.extension.getURL( '/src/lib/sites.js' ), 'body' );
}

chrome.extension.sendMessage( {}, function ( resp )
{
    var readyStateCheckInterval = setInterval( function ()
    {
        if ( document.readyState === "complete" )
        {
            clearInterval( readyStateCheckInterval );
            injectAllScript();
        }
    }, 10 );
} );