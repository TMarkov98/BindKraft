


/*CLASS*/

function MatchSets() {
    Base.apply(this, arguments);
    this.$left = { };
    this.$right = { };
}

MatchSets.Inherit(Base, "MatchSets");
MatchSets.prototype.standardOperation = new InitializeStringParameter("Instead of attaching matchproc callback a few standard operations are supported - or (one pair matching), and (all pairs match), xor (no pairs match)", "or");
MatchSets.prototype.$left = null;
MatchSets.prototype.set_left = function(idx, v) {
    this.$left[idx] = v;
};
MatchSets.prototype.get_left = function(idx) {
    return this.$left[idx];
};
MatchSets.prototype.$right = null;
MatchSets.prototype.set_right = function(idx, v) {
    this.$right[idx] = v;
};
MatchSets.prototype.get_right = function(idx) {
    return this.$right[idx];
};
MatchSets.prototype.matchproc = function(idx) {
    if (this.standardOperation == "or") {
        for (var key in this.$left) {
            if (this.$left[key] && this.$left[key] == this.$right[key]) return true;
        }
        return false;
    } else if (this.standardOperation == "and") {
        for (var key in this.$left) {
            if (this.$left[key] && this.$left[key] != this.$right[key]) return false;
        }
        return true;
    } else if (this.standardOperation == "xor") {
        for (var key in this.$left) {
            if (this.$left[key] && this.$left[key] == this.$right[key]) return false;
        }
        return true;
    }
    return null;
};
MatchSets.prototype.get_output = function() {
    if (BaseObject.is(this.matchproc, "Delegate")) {
        return this.matchproc.invoke(this.$left, this.$right);
    } else if (typeof this.matchproc == "function") {
        return this.matchproc.call(this, this.$left, this.$right);
    } else {
        return null;
    }
};