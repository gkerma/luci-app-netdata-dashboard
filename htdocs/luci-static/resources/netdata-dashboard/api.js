'use strict';
'require baseclass';
'require rpc';

var callStatus = rpc.declare({
	object: 'luci.netdata',
	method: 'status',
	expect: { }
});

var callInfo = rpc.declare({
	object: 'luci.netdata',
	method: 'info',
	expect: { }
});

return baseclass.extend({
	getStatus: callStatus,
	getInfo: callInfo
});
