Javascript-Password-Generator
=============================

2014-12-19
* Removed dependency to jQuery; demo still uses jQuery though
* optimized the CheckStrength method, and exposed it as public
* removed the Length property from the object, moved it to a parameter in the Generate method

2014-05-12
* Removed custom styling, and switched to bootstrap for the demo. The purpose of this is to begin removing all unnecessary code
* Next steps will be refactoring the .js to be independent of jquery, and to be easier to drop into future projects

2010-11-25
* Original PoC version. Dependent on jQuery.
