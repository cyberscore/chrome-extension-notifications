(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['layout'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n  ";
  }

function program3(depth0,data) {
  
  
  return "\n    <div class=\"zero-notifications\">\n      <h1>No notifications :C</h1>\n    </div>\n  ";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = self.invokePartial(partials['notification-table'], 'notification-table', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }

  buffer += "<section class=\"refresh-alert\">\n  New notifications available\n\n  <div class=\"buttons\">\n    <span class=\"reload\">\n      <i class=\"icon-refresh\"></i>\n    </span><span class=\"close\">\n      <i class=\"icon-remove-sign\"></i>\n    </span>\n  </div>\n</section>\n\n<header>\n  <div class=\"brand\">\n    Cyberscore Notifications\n  </div>\n  Welcome, <strong>";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</strong>\n</header>\n\n<section class=\"toolbar\">\n  <a class=\"option mark-read\" href=\"#\"><i class=\"icon-bookmark\"></i> mark as read</a>\n  <a class=\"option mark-unread\" href=\"#\"><i class=\"icon-bookmark-empty\"></i> mark as unread</a>\n  <a class=\"option delete\" href=\"#\"><i class=\"icon-trash\"></i> delete</a>\n</section>\n\n<section class=\"table-container\">\n  ";
  stack1 = helpers['if'].call(depth0, depth0.total, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers.each.call(depth0, depth0.notifications, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</section>\n\n<section class=\"toolbar reverse\">\n    <a class=\"option mark-read\" href=\"#\"><i class=\"icon-bookmark\"></i> mark as read</a>\n    <a class=\"option mark-unread\" href=\"#\"><i class=\"icon-bookmark-empty\"></i> mark as unread</a>\n    <a class=\"option delete\" href=\"#\"><i class=\"icon-trash\"></i> delete</a>\n</section>\n\n<footer>\n  <div class=\"brand\">\n    Cyberscore Notifications\n  </div>\n</footer>\n";
  return buffer;
  });
templates['notification-table'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, options, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <tr ";
  stack1 = helpers['if'].call(depth0, depth0.unread, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <td><input type=\"checkbox\" data-notification-url=\"";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-notification-type=\""
    + escapeExpression(((stack1 = depth0.type),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></td>\n            <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatDate || depth0.formatDate),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatDate", depth0.timestamp, options)))
    + "</td>\n            <td><a target=\"_blank\" href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td>\n            <td><a target=\"_blank\" href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.chart),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.chart),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td>\n        </tr>\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"unread\"";
  }

  buffer += "<table id=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.type || depth0.type),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "type", depth0, options)))
    + "\">\n    <caption>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fullType || depth0.fullType),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "fullType", depth0, options)))
    + "</caption>\n    <thead>\n        <tr>\n            <td><input type=\"checkbox\" data-notification-type=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.type || depth0.type),stack1 ? stack1.call(depth0, depth0, options) : helperMissing.call(depth0, "type", depth0, options)))
    + "\"></td>\n            <td>Date</td>\n            <td>Game</td>\n            <td>Chart</td>\n        </tr>\n    </thead>\n    <tbody>\n      ";
  stack2 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  });
templates['notifications'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n        <tr>\n            <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatDate || depth0.formatDate),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatDate", depth0.timestamp, options)))
    + "</td>\n            <td><a href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td>\n            <td><a href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.chart),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.chart),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<a></td>\n            <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.fullType || depth0.fullType),stack1 ? stack1.call(depth0, depth0.type, options) : helperMissing.call(depth0, "fullType", depth0.type, options)))
    + "</td>\n        </tr>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n        <tr>\n            <td>";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatDate || depth0.formatDate),stack1 ? stack1.call(depth0, depth0.timestamp, options) : helperMissing.call(depth0, "formatDate", depth0.timestamp, options)))
    + "</td>\n            <td><a href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.game),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></td>\n            <td><a href=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.chart),stack1 == null || stack1 === false ? stack1 : stack1.link)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.chart),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<a></td>\n            <td>";
  if (stack2 = helpers.type) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.type; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</td>\n        </tr>\n      ";
  return buffer;
  }

  buffer += "<div class=\"table-container\">\n<table>\n    <thead>\n        <tr>\n            <td>Date</td>\n            <td>Game</td>\n            <td>Chart</td>\n            <td>type</td>\n        </tr>\n    </thead>\n    <tfoot>\n        <tr>\n            <td>Date</td>\n            <td>Game</td>\n            <td>Chart</td>\n            <td>type</td>\n        </tr>\n    </tfoot>\n    <tbody>\n      ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.notifications),stack1 == null || stack1 === false ? stack1 : stack1.ygb), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.notifications),stack1 == null || stack1 === false ? stack1 : stack1.proof_refused), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n      ";
  stack2 = helpers.each.call(depth0, ((stack1 = depth0.notifications),stack1 == null || stack1 === false ? stack1 : stack1.rec_approved), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </tbody>\n</table>\n</div>";
  return buffer;
  });
})();