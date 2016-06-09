let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {};


Modules.server.startup = startup;
