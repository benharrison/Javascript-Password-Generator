window.PasswordGenerator = (function($){
    // private
    var _alpha              = 'abcdefghijklmnopqrstuvwxyz';
    var _lowerCase          = _alpha.split('');
    var _upperCase          = _alpha.toUpperCase().split('');
    var _digits             = ('0123456789').split('');
    var _specialCharacters  = ('-_\'"!@#$%^&*()+=~:;|.,').split('');
    var _spaces             = [' '];
    var _brackets           = ('[]{}<>()').split('');
    
    // Check strength
    var checkStrength = function(password) {
        var strength    = 0,
            hasLower    = false,
            hasUpper    = false;
        
        strength = Math.min(6, Math.floor(password.length / 8));
        
        for (var i = 0; i < _lowerCase.length; i++) {
            if ( !hasLower && password.indexOf(_lowerCase[i]) > -1 ) hasLower = true;
            if ( !hasUpper && password.indexOf(_upperCase[i]) > -1 ) hasUpper = true;
            if ( hasLower && hasUpper ) { strength++; break; } // must have BOTH
        }
        
        for (var i = 0; i < _digits.length; i++) {
            if ( password.indexOf(_digits[i]) > -1 ) { strength++; break; }
        }
        
        for (var i = 0; i < _specialCharacters.length; i++) {
            if ( password.indexOf(_specialCharacters[i]) > -1 ) { strength++; break; }
        }
        
        var others = [].concat(_spaces, _brackets);
        for (var i = 0; i < others.length; i++) {
            if ( password.indexOf(others[i]) > -1 ) { strength++; break; }
        }
        
        return strength;
    }
    
    var generate = function(length) {
        var chars = [];
        if (this.LowerCase) chars.push(_lowerCase);
        if (this.UpperCase) chars.push(_upperCase);
        if (this.Digits) chars.push(_digits);
        if (this.SpecialCharacters) chars.push(_specialCharacters);
        if (this.Spaces) chars.push(_spaces);
        if (this.Brackets) chars.push(_brackets);
        
        var generatedPassword = '';
        
        for (var i = 0; i < length; i++)
        {
            var rand1 = Math.floor(Math.random() * chars.length);
            var rand2 = Math.floor(Math.random() * chars[rand1].length);
            generatedPassword = generatedPassword + chars[rand1][rand2];
        }
        
        return generatedPassword;
    }
    
    // public
    return {
        LowerCase           : false,
        UpperCase           : false,
        Digits              : false,
        SpecialCharacters   : false,
        Spaces              : false,
        Brackets            : false,
        Generate            : generate,
        CheckStrength       : checkStrength
    }
})();
