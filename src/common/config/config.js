'use strict';
/**
 * config
 */
export default {
  //key: value
    port : 8361,
    default_module : 'home',
    route_on: true,
    resource_on: true,
    resource_reg: /^(upload\/|backup\/|static\/|[^\/]+\.(?!js|html)\w+$)/,
    /* 文档模型配置 (文档模型核心配置，请勿更改) */
};