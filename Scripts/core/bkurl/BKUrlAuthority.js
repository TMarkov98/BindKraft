
function BKUrlAuthority(urlstr, bdecode, bencode) {
	BKUrlObjectBase.apply(this, arguments);
}
BKUrlAuthority.Inherit(BKUrlObjectBase,"BKUrlAuthority");
// Static checkers
// 1- userinfo
// 2- host
// 3- port
//								  1           2						       3
BKUrlAuthority.$reBreaker = /^(?:([^@:]+)@)?((?:\[.+\])|(?:[^\:]+))(?:\:([0-9]+))?$/;
//                          1=ip6                                         2 = ip4                                       3=ipvfuture                                                    4=rname
BKUrlAuthority.$reHost = /^(?:(\[[0-9a-fA-F\:]+(?:%[a-zA-Z0-9\_\-]+)?\])|([0-9]{1,3}\.0-9]{1,3}\.0-9]{1,3}\.0-9]{1,3})|(\[v[0-9a-zA-Z]\.(?:[A-Za-z0-9\-\._~]|[!$&'()*+,;=]|\:){1,}\])|([a-zA-Z0-9][A-Za-z0-9\-\._]*))$/;
BKUrlAuthority.$rePort = /^([0-9]*)$/;
BKUrlAuthority.$reUserInfo = /^((?:[A-Za-z0-9\-\._~]|%[A-Za-z0-9]{2}|[!$&'()*+,;=]|\:)*)(?:@)?$/; // The userinfo is not currently split further
BKUrlAuthority.prototype.$userinfo = null; // Little control over this - it is widely deprecated in part and as whole
BKUrlAuthority.prototype.$host = null;
BKUrlAuthority.prototype.$port = null;
BKUrlAuthority.prototype.get_host = function() {
	return this.nullIfEmpty(this.$host);
}
BKUrlAuthority.prototype.set_host = function(v) {
	if (v == null) {
		this.$host = null;
		return true;
	}
	var arr = BKUrlAuthority.$reHost.exec(v);
	if (arr != null) {
		this.$host = this.nullIfEmpty(arr[0]); // the whole match
		return true;
	} else {
		this.$host = null;
		if (this.get_throwonerror()) {
			throw "Incorrect host format";
		}
		return false;
	}	
}
BKUrlAuthority.prototype.hostKind = function() {
	if (typeof this.$host != "string" || this.$host.length == 0) {
		return null;
	}
	var arr = BKUrlAuthority.$reHost.exec(this.$host);
	if (arr != null) {
		if (arr[1] != null) {
			return "ip6";
		}
		if (arr[2] != null) {
			return "ip4";
		}
		if (arr[3] != null) {
			return "ipfuture";
		}
		if (arr[4] != null) {
			return "regname";
		}
	}
	return null;
}
BKUrlAuthority.prototype.get_port = function() {
	return this.nullIfEmpty(this.$port);
}
BKUrlAuthority.prototype.set_port = function(v) {
	var v = v?(v + ""):null;
	if (v == null) {
		this.$port= null;
		return true;
	}
	if (BKUrlAuthority.$rePort.test(v)) {
		this.$port = this.nullIfEmpty(v);
		return true;
	} else {
		this.$port = null;
		if (this.get_throwonerror()) {
			throw "Incorrect port format";
		}
		return false;
	}
}
BKUrlAuthority.prototype.get_userinfo = function() {
	return this.nullIfEmpty(this.$userinfo);
}
BKUrlAuthority.prototype.set_userinfo = function(v) {
	if (v == null) {
		this.$userinfo = null;
		return true;
	}
	if (BKUrlAuthority.$reUserInfo.test(v)) {
		this.$userinfo = this.nullIfEmpty(v);
		return true;
	} else {
		this.$userinfo = null;
		if (this.get_throwonerror()) {
			throw "Incorrect userinfo value";
		}
		return false;
	}
}


// IBKUrlObject /////////////////////////////
BKUrlAuthority.prototype.$combine = function(v) {
	this.$host = v.$host;
	this.$port = v.$port;
	this.$userinfo = v.$userinfo;
	return true;
}
BKUrlAuthority.prototype.clear = function() {
	this.$userinfo = null;
	this.$host = null;
	this.$port = null;
}
BKUrlAuthority.prototype.readAsString = function(v) {
	if (this.isempty(v)) {
		this.clear();
		return true;
	}
	if (typeof v != "string") {
		v = v + "";
		if (this.isempty(v)) {
			this.clear();
			return true;
		}
	}
	var arr = BKUrlAuthority.$reBreaker.exec(v);
	if (arr != null) {
		if (!this.set_userinfo(this.deCode(arr[1]))) return false;
		if (!this.set_host(this.deCode(arr[2]))) return false;
		if (!this.set_port(this.deCode(arr[3]))) return false;
		return true;
	} else {
		return false;
	}
}
BKUrlAuthority.prototype.composeAsString = function() {
	var r = "";
	var x;
	x = this.get_userinfo();
	if (x != null) {
		r += this.enCode(x) + "@";
	}
	x = this.get_host();
	if (x != null) {
		r += x; // Further parsing will be needed in order to encode the lan component delimiter %
	}
	x = this.get_port();
	if (x != null) {
		r += ":" + x;
	}
	return this.nullIfEmpty(r);
}
BKUrlAuthority.prototype.get_isempty = function() {
	if (this.isempty(this.get_userinfo()) && 
		this.isempty(this.get_host()) &&
		this.isempty(this.get_port())) {
			return true;
		}
		// TODO: This logic seems a bit too permitting may be the lack of host should be enough?
	return false;
}