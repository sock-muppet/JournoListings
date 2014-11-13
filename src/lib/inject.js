'use strict';

var _window = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;

/**
 * Returns all the lists that can be used.  When toggling is added
 * then this function will need to check an enabled/disabled flag
 * to filter out the results (and auto-detection would be nice btw).
 * @var useSuppLists
 * @returns {*[]}
 */
function getValidLists( skipSuppLists )
{
    skipSuppLists = skipSuppLists || false;
    var baseLists = [_window.JLISTS_GAMEJOURNOPROS, _window.JLISTS_JOURNOLIST, _window.JLISTS_GAMECHANGER_SALON ];
    if ( !skipSuppLists )
    {
        baseLists.push( _window.GAWKERMEDIA );
    }
    return baseLists;
}

/**
 * For the current website/url, this function returns
 * the rule(s) to find the author of an article.
 * @returns {*}
 */
function getRuleForPage()
{
    var domain = _window.location.host;
    domain = domain.replace( 'www.', '' );
    return _window.JLISTS_SITE_RULES[domain];
}

/**
 * Injects some ethics and transparency into an article by calling out
 * authors that have been known to be a part of private journalist mailing-lists.
 * This will add a banner to the top of the page and sticky it there.
 * @param list One of the lists returned from getValidLists()
 */
function injectEthics( list )
{
    // Puts a big red banner at the top of the page.
    var body = document.getElementsByTagName( 'body' )[0];
    var banner = document.createElement( 'div' );
    banner.className = 'journolisting-reset journolisting-banner';

    // set our styles
    banner.style.backgroundColor = list.backgroundColor;
    banner.style.borderColor = list.borderColor;
    banner.style.color = list.fontColor;

    var textElt = document.createElement( 'span' );
    var listNameFormatted = '<span title="' + list.desc + '">\'' + list.name + '\'</span>';
    var displayMessage = "This article was written by a member of " + listNameFormatted;

    // assign the text
    textElt.innerHTML = '[JournoListings] ' + displayMessage + '&nbsp;&times;';

    banner.appendChild( textElt );

    banner.onclick = function ()
    {
        this.remove();
    };
    textElt.onclick = function ()
    {
        this.parentNode.remove();
    };

    body.appendChild( banner );
    body.style.marginTop = '65px';
}

/**
 * Array search function to avoid needing something overkill like jquery.
 * This extension is HAES enough, don't need external libs to add more genetics.
 * @param arr Array to iterate over. The haystack if you will (you will)
 * @param val The needle to be searched for
 * @returns {boolean}
 */
function arrayHasVal( arr, val )
{
    for ( var i = 0; i < arr.length; i++ )
    {
        if ( arr[i] == val )
        {
            return true;
        }
    }
    return false;
}

/**
 * For a given author's name, determine if they belong to any
 * of the getValidLists() lists and if so, inject ethics (a banner)
 * into the article by calling injectEthics() on the list.
 * @param authorStr
 */
function matchAuthorInjectEthics( authorStr )
{
    var lists = getValidLists();
    for ( var i = 0; i < lists.length; i++ )
    {
        var list = lists[i];
        var authFound = arrayHasVal( list.members, authorStr );
        console.log( authorStr + ' ' + authFound );
        if ( authFound )
        {
            injectEthics( list );
            return;
        }
    }
}

/*
 *  this is the work-horse function.  This horsekin function
 *  will root out corruption and inject ethics.
 *  Good luck Ethics-Chan!
 */
(function run()
{
    if ( typeof _window.JLISTS_SITE_RULES === 'undefined' )
    {
        // if the rules-script hasn't been loaded yet,
        // come back once the excessive ad-tracking bullshit
        // does it's crap.
        setTimeout( function ()
                    {
                        run();
                    }, 250 );
        return;
    }

    // cool, we here now - get the rules and find the author
    var rules = getRuleForPage();
    if ( !rules )
    {
        return;
    }

    // we may have multiple rules to match against
    // in any case, just loop over all of them and
    // work with whatever gets us results #ethics.
    for ( var i = 0; i < rules.length; i++ )
    {
        var rule = rules[i];
        var author = rule.getAuthor();
        if ( !author )
        {
            return;
        }

        // we have found the author of the article, so now
        // we just need to make this about ethics in journalism
        if ( author.length > 0 )
        {
            matchAuthorInjectEthics( author );
        }
    }
})();


