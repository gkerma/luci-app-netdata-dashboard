'use strict';
'require rpc';

/**
 * Netdata Dashboard API Module
 * Copyright (C) 2024 CyberMind.fr - Gandalf
 */

var callNetdataStats = rpc.declare({
	object: 'netdata',
	method: 'stats',
	expect: {}
});

var callNetdataCpu = rpc.declare({
	object: 'netdata',
	method: 'cpu',
	expect: {}
});

var callNetdataMemory = rpc.declare({
	object: 'netdata',
	method: 'memory',
	expect: {}
});

var callNetdataDisk = rpc.declare({
	object: 'netdata',
	method: 'disk',
	expect: {}
});

var callNetdataNetwork = rpc.declare({
	object: 'netdata',
	method: 'network',
	expect: {}
});

var callNetdataProcesses = rpc.declare({
	object: 'netdata',
	method: 'processes',
	expect: {}
});

var callNetdataSensors = rpc.declare({
	object: 'netdata',
	method: 'sensors',
	expect: {}
});

var callNetdataSystem = rpc.declare({
	object: 'netdata',
	method: 'system',
	expect: {}
});

return {
	getStats: function() {
		return callNetdataStats();
	},
	
	getCpu: function() {
		return callNetdataCpu();
	},
	
	getMemory: function() {
		return callNetdataMemory();
	},
	
	getDisk: function() {
		return callNetdataDisk();
	},
	
	getNetwork: function() {
		return callNetdataNetwork();
	},
	
	getProcesses: function() {
		return callNetdataProcesses();
	},
	
	getSensors: function() {
		return callNetdataSensors();
	},
	
	getSystem: function() {
		return callNetdataSystem();
	},
	
	getAllData: function() {
		return Promise.all([
			this.getStats(),
			this.getCpu(),
			this.getMemory(),
			this.getDisk(),
			this.getNetwork(),
			this.getProcesses(),
			this.getSensors(),
			this.getSystem()
		]).then(function(results) {
			return {
				stats: results[0] || {},
				cpu: results[1] || {},
				memory: results[2] || {},
				disk: results[3] || {},
				network: results[4] || {},
				processes: results[5] || {},
				sensors: results[6] || {},
				system: results[7] || {}
			};
		});
	},
	
	// Utility functions
	formatBytes: function(bytes, decimals) {
		if (bytes === 0) return '0 B';
		var k = 1024;
		var dm = decimals || 2;
		var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	},
	
	formatBytesPerSec: function(bytes, decimals) {
		return this.formatBytes(bytes, decimals) + '/s';
	},
	
	formatUptime: function(seconds) {
		var days = Math.floor(seconds / 86400);
		var hours = Math.floor((seconds % 86400) / 3600);
		var minutes = Math.floor((seconds % 3600) / 60);
		
		var parts = [];
		if (days > 0) parts.push(days + 'd');
		if (hours > 0) parts.push(hours + 'h');
		if (minutes > 0) parts.push(minutes + 'm');
		
		return parts.join(' ') || '< 1m';
	},
	
	formatKB: function(kb, decimals) {
		return this.formatBytes(kb * 1024, decimals);
	},
	
	getStatusClass: function(percent) {
		if (percent >= 90) return 'danger';
		if (percent >= 70) return 'warning';
		return 'good';
	},
	
	getTempClass: function(temp) {
		if (temp >= 80) return 'hot';
		if (temp >= 60) return 'warm';
		if (temp >= 40) return 'normal';
		return 'cool';
	}
};
