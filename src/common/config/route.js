'use strict';
/**
 * config
 */
export  default [
    [/^detail\/([^\/]+)\/(\d+)$/, "home/index/detail?cat=:1&id=:2"],
    [/^category\/([^\/]+)$/, "home/index/category?cat=:1"],
    ['s', "home/index/search"]
]