(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['layout'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.notifications, 'notifications', stack1, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n  <div class=\"zero-notifications\">\n    <h1>No notifications :C</h1>\n  </div>\n";}

  buffer += "<header>\n  <div class=\"brand\">\n    Cyberscore Notifications\n  </div>\n  Welcome, <strong>";
  foundHelper = helpers.username;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</strong>\n</header>\n\n";
  stack1 = depth0.notifications;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;});
templates['notifications'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n        <tr>\n            <td>";
  stack1 = depth0.timestamp;
  stack2 = {};
  foundHelper = helpers.formatDate;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "formatDate", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</td>\n            <td><a href=\"";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.link;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.game;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</a></td>\n            <td><a href=\"";
  stack1 = depth0.chart;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.link;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.chart;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "<a></td>\n            <td><button>:)</button></td>\n        </tr>\n      ";
  return buffer;}

  buffer += "<div class=\"table-container\">\n<table>\n    <thead>\n        <tr>\n            <td>Date</td>\n            <td>Game</td>\n            <td>Chart</td>\n            <td></td>\n        </tr>\n    </thead>\n    <tfoot>\n        <tr>\n            <td>Date</td>\n            <td>Game</td>\n            <td>Chart</td>\n            <td></td>\n        </tr>\n    </tfoot>\n    <tbody>\n      ";
  stack1 = depth0.notifications;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>\n</div>";
  return buffer;});
})();