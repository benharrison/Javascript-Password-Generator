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
            hasUpper    = false,
            hasDigits   = false,
            hasSpecial  = false,
            hasOthers   = false;
        
        // 1. length
        if (password.length > 6)
            strength++;
        if (password.length > 12)
            strength++;
        if (password.length > 16)
            strength++;
        if (password.length > 32)
            strength++;
        if (password.length > 48)
            strength++;
        if (password.length > 64)
            strength++;
            
        // 2. upper and lowercase
        for (var i = 0; i < _lowerCase.length; i++) {
            if ( password.indexOf(_lowerCase[i]) > -1 ) hasLower = true;
            if ( password.indexOf(_upperCase[i]) > -1 ) hasUpper = true;
        }
        if ( hasLower && hasUpper ) strength++;
        
        // 3. digits
        for (var i = 0; i < _digits.length; i++) {
            if ( password.indexOf(_digits[i]) > -1 ) hasDigits = true;
        }
        if ( hasDigits ) strength++;
            
        // 4. special
        for (var i = 0; i < _specialCharacters.length; i++) {
            if ( password.indexOf(_specialCharacters[i]) > -1 ) hasSpecial = true;
        }
        if ( hasSpecial ) strength++;
        
        // 5. others
        var others = [].concat(_spaces, _brackets);
        for (var i = 0; i < others.length; i++) {
            if ( password.indexOf(others[i]) > -1 ) hasOthers = true;
        }
        if ( hasOthers) strength++;
        
        return strength;
    }
    
    // public
    return {
        Length              : 20,
        LowerCase           : false,
        UpperCase           : false,
        Digits              : false,
        SpecialCharacters   : false,
        Spaces              : false,
        Brackets            : false,
        Generate: function() {
            var chars = [];
            if (this.LowerCase) chars.push(_lowerCase);
            if (this.UpperCase) chars.push(_upperCase);
            if (this.Digits) chars.push(_digits);
            if (this.SpecialCharacters) chars.push(_specialCharacters);
            if (this.Spaces) chars.push(_spaces);
            if (this.Brackets) chars.push(_brackets);
            
            var generatedPassword = '';
            var l = this.Length;
            
            for (var i = 0; i < l; i++)
            {
                var rand1 = Math.floor(Math.random() * chars.length);
                var rand2 = Math.floor(Math.random() * chars[rand1].length);
                generatedPassword = generatedPassword + chars[rand1][rand2];
            }
            
            $('#output').val(generatedPassword);
            $('#strength').html( checkStrength(generatedPassword) );
        }
    }
})(jQuery);
