/**
 * @packageDocumentation
 * @module Structures
 */

/**
 * Just an interface for {@link Booru}'s search params :)
 */
interface SearchParameters {
    /** The limit on *max* posts to show, you might get less posts than this */
    limit?: number;
    /** Should posts be in random order, implementation differs per booru */
    random?: boolean;
    /** Which page of results to fetch */
    page?: number;
    /** The credentials to use to auth with the booru */
    credentials?: BooruCredentials;
    /** Return unavailable posts (ie. banned/deleted posts) */
    showUnavailable?: boolean;
}

/**
 * @packageDocumentation
 * @module Structures
 */

/**
 * Interface for {@link Booru}'s **private internal** search params pls no use
 */
interface InternalSearchParameters extends SearchParameters {
    /** The uri to override with, if provided */
    uri?: string | null;
    /** If `order:random` should be faked */
    fakeLimit?: number;
    /** The tags used in the search */
    tags?: string[];
}

/**
 * @packageDocumentation
 * @module Structures
 */

/**
 * An image from a booru with a few common props
 *
 * @example
 * ```
 * Post {
 *  fileUrl: 'https://aaaa.com/image.jpg',
 *  id: '124125',
 *  tags: ['cat', 'cute'],
 *  score: 5,
 *  source: 'https://giraffeduck.com/aaaa.png',
 *  rating: 's'
 * }
 * ```
 */
declare class Post {
    /** The {@link Booru} it came from */
    booru: Booru;
    /** The direct link to the file */
    fileUrl: string | null;
    /** The height of the file */
    height: number;
    /** The width of the file */
    width: number;
    /** The url to the medium-sized image (if available) */
    sampleUrl: string | null;
    /** The height of the medium-sized image (if available) */
    sampleHeight: number | null;
    /** The width of the medium-sized image (if available) */
    sampleWidth: number | null;
    /** The url to the smallest image (if available) */
    previewUrl: string | null;
    /** The height of the smallest image (if available) */
    previewHeight: number | null;
    /** The width of the smallest image (if available) */
    previewWidth: number | null;
    /** The id of this post */
    id: string;
    /** If this post is available (ie. not deleted, not banned, has file url) */
    available: boolean;
    /** The tags of this post */
    tags: string[];
    /** The score of this post */
    score: number;
    /** The source of this post, if available */
    source?: string | string[];
    /**
     * The rating of the image, as just the first letter
     * (s/q/e/u) => safe/questionable/explicit/unrated
     */
    rating: string;
    /** The Date this post was created at */
    createdAt?: Date | null;
    /** All the data given by the booru @private */
    protected data: any;
    /**
     * Create an image from a booru
     *
     * @param {Object} data The raw data from the Booru
     * @param {Booru} booru The booru that created the image
     */
    constructor(data: any, booru: Booru);
    /** Is this post safe */
    get isRatingS(): boolean;
    /** Is this post questionable */
    get isRatingQ(): boolean;
    /** Is this post explicit */
    get isRatingE(): boolean;
    /** The aspect ratio of this post: `width / height` */
    get aspectRatio(): number;
    /** The jpeg url of this post */
    get jpegUrl(): string;
    /** The jpeg width url of this post */
    get jpegWidth(): number;
    /** The jpeg height url of this post */
    get jpegHeight(): number;
    /** The file extension of this post */
    get fileExt(): string;
    /** The sample size url of this post */
    get sampleSize(): number;
    /** The jpeg size url of this post */
    get jpegSize(): number;
    /** The file size url of this post */
    get fileSize(): number;
    /** The sample image file size of this post */
    get sampleSizeText(): string;
    /** The sample download text of this post */
    get sampleDownloadText(): string;
    /** The sample download name of this post */
    get sampleDownloadName(): string;
    /** The jpeg image file size of this post */
    get jpegSizeText(): string;
    /** The jpeg download text of this post */
    get jpegDownloadText(): string;
    /** The jpeg download name of this post */
    get jpegDownloadName(): string;
    /** The original image file size of this post */
    get fileSizeText(): string;
    /** The original file download text of this post */
    get fileDownloadText(): string;
    /** The original file download name of this post */
    get fileDownloadName(): string;
    /** The formatted created time of this post */
    get createdTime(): string;
    get sourceUrl(): string;
    /**
     * Get the post view (url to the post) of this image
     *
     * @type {String}
     * @example
     * ```
     * const e9 = Booru('e9')
     * const imgs = e9.search(['cat', 'dog'])
     *
     * // Log the post url of the first image
     * console.log(imgs[0].postView)
     * ```
     */
    get postView(): string;
}

/**
 * @packageDocumentation
 * @module Structures
 */

/**
 * Represents a page of search results, works like an array of {@link Post}
 * <p> Usable like an array and allows to easily get the next page
 *
 * @example
 * ```
 * const Booru = require('booru')
 * // Safebooru
 * const sb = new Booru('sb')
 *
 * const imgs = await sb.search('cat')
 *
 * // Log the images from the first page, then from the second
 * imgs.forEach(i => console.log(i.postView))
 * const imgs2 = await imgs.nextPage()
 * imgs2.forEach(i => console.log(i.postView))
 * ```
 */
declare class SearchResults extends Array<Post> {
    /** The booru used for this search */
    booru: Booru;
    /** The page of this search */
    page: number;
    /** The tags used for this search */
    readonly tags: string[];
    /** The options used for this search */
    readonly options: SearchParameters;
    /** The posts from this search result */
    readonly posts: Post[];
    /** @private */
    constructor(posts: Post[], tags: string[], options: SearchParameters, booru: Booru);
    /**
     * Get the first post in this result set
     * @return {Post}
     */
    get first(): Post;
    /**
     * Get the last post in this result set
     * @return {Post}
     */
    get last(): Post;
    /**
     * Get the next page
     * <p>Works like <code>sb.search('cat', {page: 1}); sb.search('cat', {page: 2})</code>
     * @return {Promise<SearchResults>}
     */
    nextPage(): Promise<SearchResults>;
    /**
     * Create a new SearchResults with just images with the matching tags
     *
     * @param {String[]|String} tags The tags (or tag) to search for
     * @param {Object} options The extra options for the search
     * @param {Boolean} [options.invert=false] If the results should be inverted and
     *                                         return images *not* tagged
     * @return {SearchResults}
     */
    tagged(tags: string[] | string, { invert }?: {
        invert?: boolean | undefined;
    }): SearchResults;
    /**
     * Returns a SearchResults with images *not* tagged with any of the specified tags (or tag)
     * @param {String[]|String} tags The tags (or tag) to blacklist
     * @return {SearchResults} The results without any images with the specified tags
     */
    blacklist(tags: string[] | string): SearchResults;
}

/**
 * @packageDocumentation
 * @module Structures
 */
/**
 * Represents the api of a {@link Site}
 * <p>Each property is a path on the {@link Site}
 */
interface SiteApi {
    /** The path to search for posts */
    search: string;
    /** The path to view a post by ID */
    postView: string;
}

/**
 * @packageDocumentation
 * @module Structures
 */

/**
 * Represents the info needed to create a new {@link Site}
 * <p>Same properties as {@link Site}, but some optional</p>
 * <p>Mostly just here to reflect what sites.json should look like
 */
interface SiteInfo {
    /** The domain of the Site (the "google.com" part of "https://google.com/foo") */
    domain: string;
    /** The type of this site (json/xml/derpi) */
    type: string;
    /** The aliases of this site */
    aliases: string[];
    /** If this site serves NSFW posts or not */
    nsfw: boolean;
    /** An object representing the api of this site */
    api: SiteApi;
    /** The url query param to paginate on the site */
    paginate?: string;
    /** If the site supports `order:random` */
    random: boolean | string;
    /** The url query param for tags */
    tagQuery?: string;
    /** The character to use to join tags when creating the search url */
    tagJoin?: string;
    /** If this site supports only http:// */
    insecure?: boolean;
    /** Tags to add to every request, if not included */
    defaultTags?: string[];
}

/**
 * @packageDocumentation
 * @module Structures
 */

/**
 * Represents a site, mostly used for JSDoc
 */
declare class Site {
    /** The domain of the Site (the "google.com" part of "https://google.com/foo") */
    domain: string;
    /** The type of this site (json/xml/derpi) */
    type: string;
    /** The aliases of this site */
    aliases: string[];
    /** If this site serves NSFW posts or not */
    nsfw: boolean;
    /** An object representing the api of this site */
    api: SiteApi;
    /** The url query param to paginate on the site */
    paginate: string;
    /**
     * If the site supports `order:random`.
     * If a string, this means a custom random system is used :/
     */
    random: boolean | string;
    /** The url query param for tags */
    tagQuery: string;
    /** The character to use to join tags when creating the search url */
    tagJoin: string;
    /** If this site supports only http:// */
    insecure: boolean;
    /** Tags to add to every request, if not included */
    defaultTags: string[];
    constructor(data: SiteInfo);
}

/**
 * @packageDocumentation
 * @module Boorus
 */

interface BooruCredentials {
    token?: string;
    query?: string;
}
interface SearchUrlParams {
    tags: string[];
    limit: number;
    page: number;
    credentials: BooruCredentials;
}
/**
 * A basic, JSON booru
 * @example
 * ```
 * const Booru = require('booru')
 * // Aliases are supported
 * const e9 = Booru('e9')
 *
 * // You can then search the site
 * const imgs = await e9.search(['cat', 'cute'], {limit: 3})
 *
 * // And use the images
 * imgs.forEach(i => console.log(i.fileUrl))
 *
 * // Or access other methods on the Booru
 * e9.postView(imgs[0].id)
 * ```
 */
declare class Booru {
    /** The domain of the booru */
    domain: string;
    /** The site object representing this booru */
    site: Site;
    /** The credentials to use for this booru */
    credentials?: BooruCredentials;
    /**
     * Create a new booru from a site
     *
     * @private
     * @param site The site to use
     * @param credentials Credentials for the API (Currently not used)
     */
    constructor(site: Site, credentials?: BooruCredentials);
    protected normalizeTags(tags: string | string[]): string[];
    /**
     * Search for images on this booru
     * @param {String|String[]} tags The tag(s) to search for
     * @param {SearchParameters} searchArgs The arguments for the search
     * @return {Promise<SearchResults>} The results as an array of Posts
     */
    search(tags: string | string[], { limit, random, page, showUnavailable, credentials }?: SearchParameters): Promise<SearchResults>;
    /**
     * Gets the url you'd see in your browser from a post id for this booru
     *
     * @param {String} id The id to get the postView for
     * @return {String} The url to the post
     */
    postView(id: string | number): string;
    /**
     * The internal & common searching logic, pls dont use this use .search instead
     *
     * @protected
     * @param {String[]} tags The tags to search with
     * @param {InternalSearchParameters} searchArgs The arguments for the search
     * @return {Promise<Object>}
     */
    protected doSearchRequest(tags: string[], { uri, limit, random, page, credentials }?: InternalSearchParameters): Promise<any>;
    /**
     * Generates a URL to search the booru with, mostly for debugging purposes
     * @param opt
     * @param {string[]} [opt.tags] The tags to search for
     * @param {number} [opt.limit] The limit of results to return
     * @param {number} [opt.page] The page of results to return
     * @returns A URL to search the booru
     */
    getSearchUrl({ tags, limit, page, credentials }: Partial<SearchUrlParams>): string;
    /**
     * Parse the response from the booru
     *
     * @protected
     * @param {Object} result The response of the booru
     * @param {InternalSearchParameters} searchArgs The arguments used for the search
     * @return {SearchResults} The results of this search
     */
    protected parseSearchResult(result: any, { fakeLimit, tags, limit, random, page, showUnavailable, }: InternalSearchParameters): SearchResults;
}

/**
 * @packageDocumentation
 * @module Boorus
 */

/**
 * A class designed for Derpibooru
 * >:(
 * @private
 * @extends Booru
 * @inheritDoc
 */
declare class Derpibooru extends Booru {
    /**
     * Create a new booru for Derpibooru from a site
     * @param site The site to use
     * @param credentials Credentials for the API (Currently not used)
     */
    constructor(site: Site, credentials?: BooruCredentials);
    /** @inheritDoc */
    search(tags: string[] | string, { limit, random, page }?: SearchParameters): Promise<SearchResults>;
}

/**
 * @packageDocumentation
 * @module Boorus
 */

/**
 * A class designed for Xml-returning boorus
 *
 * @extends Booru
 * @inheritDoc
 */
declare class XmlBooru extends Booru {
    /**
     * Create a new booru using XML from a site
     * @param {Site} site The site to use
     * @param {Object?} credentials Credentials for the API (Currently not used)
     */
    constructor(site: Site, credentials?: BooruCredentials);
}

/**
 * @packageDocumentation
 * @module Constants
 */

interface SMap<V> {
    [key: string]: V;
}
/**
 * A map of site url/{@link SiteInfo}
 */
declare const sites: SMap<SiteInfo>;
/**
 * Custom error type for when the boorus error or for user-side error, not my code (probably)
 * <p>The name of the error is 'BooruError'
 * @type {Error}
 */
declare class BooruError extends Error {
    constructor(message: string | Error);
}

/**
 * @packageDocumentation
 * @module Utils
 */
/**
 * Check if `site` is a supported site (and check if it's an alias and return the sites's true name)
 *
 * @param  {String} domain The site to resolveSite
 * @return {String?} null if site is not supported, the site otherwise
 */
declare function resolveSite(domain: string): string | null;

/**
 * @packageDocumentation
 * @module Index
 */

/**
 * Create a new booru to search with
 *
 * @constructor
 * @param {String} site The {@link Site} domain (or alias of it) to create a booru from
 * @param {*} credentials The credentials to use on this booru
 * @return {Booru} A booru to use
 */
declare function booruForSite(site: string, credentials?: any): Booru;

/**
 * Searches a site for images with tags and returns the results
 * @param {String} site The site to search
 * @param {String[]|String} [tags=[]] Tags to search with
 * @param {SearchParameters} [searchOptions={}] The options for searching
 *  if provided (Unused)
 * @return {Promise<SearchResults>} A promise with the images as an array of objects
 *
 * @example
 * ```
 * const Booru = require('booru')
 * // Returns a promise with the latest cute glace pic from e926
 * Booru.search('e926', ['glaceon', 'cute'])
 * ```
 */
declare function search(site: string, tags?: string[] | string, { limit, random, page, credentials }?: SearchParameters): Promise<SearchResults>;

export { Booru as BooruClass, BooruCredentials, BooruError, Derpibooru, Post, SearchParameters, SearchResults, Site, XmlBooru, booruForSite as default, booruForSite as forSite, resolveSite, search, sites };
