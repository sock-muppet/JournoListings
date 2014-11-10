/**
 * Short-hand function for a querySelector's inner contents
 * Easier to just write this than require jQuery or other lib.
 * @param str
 * @returns {*}
 */
function qSel( str )
{
    try
    {
        return document.querySelector( str ).innerHTML;
    }
    catch ( e )
    {
        return null;
    }
}

/**
 * Fixes common issues with bylines where websites decide it would
 * be best to not wrap *only* the author's name in a tag or class and
 * have extra filler words which need to be rooted out (just like corruption!)
 * @param str
 * @returns {XML|string|void}
 */
function trimByLine( str )
{
    var regex = /(<([^>]+)>)/ig;
    var author = str.replace( regex, "" );
    author = author.replace( 'By', "" ).replace( 'by', "" ).replace( ',', '' ).trim();

    return author;
}
/**
 * General format is 'domain': [ { getAuthor: function() }, ... ]
 * Each getAuthor should scan the document contents and return author's name
 * or if they are not found, return null.  Multiple rules may be used.
 * If there are multiple rules, first one wins, just like sperm.
 */
_window.JLISTS_SITE_RULES = {
    'america.aljazeera.com': [
        {
            getAuthor: function ()
            {
                return qSel( '.articleOpinion-byline .articleOpinion-byline--link' );
            }
        }
    ],
    'ap.org':                [
        {
            getAuthor: function ()
            {
                return qSel( '.author.vcard a' );
            }
        }
    ],
    'alternet.org':          [
        {
            getAuthor: function ()
            {
                return qSel( '.byline.story a' );
            }
        }
    ],
    'arstechnica.com/':      [
        {
            getAuthor: function ()
            {
                return qSel( '.post-meta .byline a span' );
            }
        }
    ],
    'baltimoresun.com':      [
        {
            getAuthor: function ()
            {
                return qSel( '.trb_columnistInfo_contactInfo a' );
            }
        }
    ],
    'bloomberg.com':         [
        {
            getAuthor: function ()
            {
                var authStr = qSel( '.byline .author' );

                return trimByLine( authStr );
            }
        }
    ],
    'boingboing.com':        [
        {
            getAuthor: function ()
            {
                var authStr = qSel( '.byline .author' );

                return trimByLine( authStr );
            }
        }
    ],
    'chicagotribune.com':    [
        {
            getAuthor: function ()
            {
                var byLine = qSel( '.trb_bylines_name_author' );

                return trimByLine( byLine );
            }
        }
    ],
    'cnbc.com':              [
        {
            getAuthor: function ()
            {
                return qSel( '.story-top .source span' );
            }
        }
    ],
    'destructoid.com':       [
        {
            getAuthor: function ()
            {
                return qSel( '.vcard a span.fn' );
            }
        }
    ],
    'huffingtonpost.com':    [
        {
            getAuthor: function ()
            {
                return qSel( '.info .name' );
            }
        }
    ],
    'ign.com':               [
        {
            getAuthor: function ()
            {
                return qSel( '.article-byline a' );
            }
        }
    ],
    'cnet.com':              [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( 'article .article-byline a.author' ) );
            }
        }
    ],
    'cnn.com':               [
        {
            getAuthor: function ()
            {
                return qSel( '.cnn_stryathrtmp .cnnByline strong' );
            }
        }
    ],
    'edition.cnn.com':       [
        {
            getAuthor: function ()
            {
                return qSel( '.cnn_stryathrtmp .cnnByline strong' );
            }
        }
    ],
    'consumerist.com':       [
        {
            getAuthor: function ()
            {
                return qSel( '.author.vcard .fn a' );
            }
        }
    ],
    'dailydot.com':          [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '.byline .byline-nav a[href*="/authors"]' ) );
            }
        }
    ],
    'dailycaller.com':       [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '#article-data #name' ) );
            }
        }
    ],
    'digitaltrends.com':     [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( 'header .byline .vcard a.author' ) );
            }
        }
    ],
    'engadget.net':          [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( 'header .byline a strong[itemprop="author"]' ) );
            }
        }
    ],
    'eurogamer.net':         [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( 'article .byline span[itemprop="author"]' ) );
            }
        }
    ],
    'fastcompany.com':       [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( 'article .summary .byline a[href*="/user"]' ) );
            }
        }
    ],
    'firstlook.org':         [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '.ti-article-page .ti-byline cite span a' ) );
            }
        }
    ],
    'fivethirtyeight.com':   [
        {

            getAuthor: function ()
            {
                return trimByLine( qSel( 'article .post-info .byline a.fn' ) );
            }
        }
    ],
    'gamedev.net':           [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '.ipsType_pagedesc b a[href*="/user"]' ) );
            }
        }
    ],
    'gameinformer.com':      [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '.full-post .post-author a[href*="/members"]' ) );
            }
        }
    ],
    'gamasutra.com':         [
        {
            getAuthor: function ()
            {
                var byLine = qSel( '.show-phone .comment_title' );
                var author = byLine.split( '|' )[1];

                return trimByLine( author );
            }
        }
    ],
    'gamefront.com':         [
        {
            getAuthor: function ()
            {
                return qSel( '.cdp-item footer a' );
            }
        }
    ],
    'gamepolitics.com':      [
        {
            getAuthor: function ()
            {
                var byLine = qSel( '.content .blogDate' );
                var author = byLine.split( '-' )[1];

                return author.trim();
            }
        }
    ],
    'gamernode.com':         [
        {
            getAuthor: function ()
            {
                return qSel( '.post-meta a' );
            }
        }
    ],
    'gamesradar.com':        [
        {
            getAuthor: function ()
            {
                return qSel( '.byline a' );
            }
        }
    ],
    'gamespot.com':          [
        {
            getAuthor: function ()
            {
                return qSel( '.primary-content .news-byline a[href*="/profile"]' );
            }
        }
    ],
    'giantbomb.com':         [
        {
            getAuthor: function ()
            {
                return qSel( '.news-byline a' );
            }
        }
    ],
    'theguardian.com':       [
        {
            getAuthor: function ()
            {
                return qSel( '.byline a' );
            }
        }
    ],
    'indieheven.com':        [
        {
            getAuthor: function ()
            {
                return qSel( '.cb-standard-featured .cb-author.cb-byline-element a' );
            }
        }
    ],
    'japanator.com':         [
        {
            getAuthor: function ()
            {
                return qSel( 'a[href*="/author"] .fn' );
            }
        }
    ],
    'joystiq.com':           [
        {
            getAuthor: function ()
            {
                return qSel( '.byline-author' );
            }
        }
    ],
    'killscreendaily.com':   [
        {

            getAuthor: function ()
            {
                return qSel( '.byline .author a[href*="/archive/"]' );
            }
        }
    ],
    'kotaku.com':            [
        {
            getAuthor: function ()
            {
                return qSel( '.author.vcard a' );
            }
        }
    ],
    'kotaku.co.uk':          [
        {
            getAuthor: function ()
            {
                return qSel( '.author.vcard a' );
            }
        }
    ],
    'kotaku.com.au':         [
        {
            getAuthor: function ()
            {
                return qSel( '.author.vcard a' );
            }
        }
    ],
    'kotaku.com.br':         [
        {
            getAuthor: function ()
            {
                return qSel( '.author.vcard a' );
            }
        }
    ],
    'kotaku.jp':             [
        {
            getAuthor: function ()
            {
                return qSel( '.author.vcard a' );
            }
        }
    ],
    'laweekly.com':          [
        {
            getAuthor: function ()
            {
                return qSel( '.postedBy a[href*="/authors/"]' );
            }
        }
    ],
    'maclife.com':           [
        {
            getAuthor: function ()
            {
                var byLine = qSel( '.node_article .submitted .posted_by' );
                var author = byLine.split( '|' )[1];

                return trimByLine( author );
            }
        }
    ],
    'macworld.com':          [
        {

            getAuthor: function ()
            {
                return trimByLine( qSel( '.article-author .author-name a' ) );
            }
        }
    ],
    'mashable.com':          [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '.author_and_date .author_name' ) );
            }
        }
    ],
    'medium.com':            [
        {
            getAuthor: function ()
            {

                return qSel( '.postFooter-info strong a.link' );
            }
        }
    ],
    'motherboard.vice.com':  [
        {
            getAuthor: function ()
            {

                return qSel( '.author-info h3 a[href*="/author/"]' );
            }
        }
    ],
    'motherjones.com':       [
        {
            getAuthor: function ()
            {

                return qSel( '.byline a[href*="/authors/"]' );
            }
        }
    ],
    'nytimes.com':           [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '.byline .byline-author' ) );
            }
        }
    ],
    'newsweek.com':          [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '.author .author-name' ) );
            }
        }
    ],
    'npr.org':               [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '#storybyline .nameWrap .nameInner' ) );
            }
        }
    ],
    'observer.com':          [
        {

            getAuthor: function ()
            {
                return trimByLine( qSel( '.author.vcard a' ) );
            }
        }
    ],
    'oxmonline.com':         [
        {
            example: '', getAuthor: function ()
        {
            return qSel( '.single-article .single-article__meta p.omega a' );
        }
        }
    ],
    'pastemagazine.com':     [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( '.header .byline a' ) );
            }
        }
    ],
    'pcgamer.com':           [
        {
            getAuthor: function ()
            {
                return qSel( '#page-content .author' );
            }
        }
    ],
    'pcworld.com':           [
        {
            getAuthor: function ()
            {
                return qSel( '.article-author .author-name a' );
            }
        }
    ],
    'pocketgamer.co.uk':     [
        {

            getAuthor: function ()
            {
                return qSel( 'b a[href*="writer.asp"]' );
            }
        }
    ],
    'politico.com':          [
        {
            getAuthor: function ()
            {
                return qSel( '.byline a' );
            }
        }
    ],
    'polygon.com':           [
        {
            getAuthor: function ()
            {
                return qSel( '.m-entry__byline a' );
            }
        }
    ],
    'post-gazette.com':      [
        {
            getAuthor: function ()
            {
                var byLine = qSel( '.byline' );
                var author = byLine.split( '/' )[0];

                return trimByLine( author );
            }
        }
    ],
    'recode.net':            [
        {
            getAuthor: function ()
            {
                var byLine = qSel( '.author-wrap .author' );
                return trimByLine( byLine );
            }
        }
    ],
    'salon.com':             [
        {
            getAuthor: function ()
            {
                return qSel( '.articleInner .byline a' );
            }
        }
    ],
    'slate.com':             [
        {
            getAuthor: function ()
            {
                return qSel( '.byline a' );
            }
        }
    ],
    'time.com':              [
        {
            getAuthor: function ()
            {
                return qSel( '.article-authors .byline a' );
            }
        }
    ],
    'thenation.com':         [
        {
            getAuthor: function ()
            {
                return qSel( '.byline a span' );
            }
        }
    ],
    'tytnetwork.com':        [
        {
            getAuthor: function ()
            {
                return qSel( '.entry-author .entry-author-name' );
            }
        }
    ],
    'venturebeat.com':       [
        {
            getAuthor: function ()
            {
                return qSel( '.entry-wrapper .the-author a' );
            }
        }
    ],
    'vice.com':              [
        {
            getAuthor: function ()
            {
                var authStr = qSel( '.contributor-full-name' );

                return trimByLine( authStr );
            }
        }
    ],
    'theverge.com':          [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( 'article header .author a.author' ) );
            }
        }
    ],
    'vox.com':               [
        {
            getAuthor: function ()
            {
                return trimByLine( qSel( 'header .m-entry__byline a[rel="author"]' ) );
            }
        }
    ],
    'washingtonmonthly.com': [
        {
            getAuthor: function ()
            {
                var authStr = qSel( '.article .author' );

                return trimByLine( authStr );
            }
        }
    ],
    'washingtonpost.com':    [
        {
            getAuthor: function ()
            {
                return qSel( '.pb-byline a' );
            }
        }
    ],
    'youtube.com':           [
        {
            getAuthor: function ()
            {
                return qSel( '#watch-header .yt-user-info a' );
            }
        }
    ]
};