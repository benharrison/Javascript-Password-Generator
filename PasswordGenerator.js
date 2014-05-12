window.PasswordGenerator = (function($){
    // private
    var alpha = 'abcdefghijklmnopqrstuvwxyz';
    var alphal  = alpha.split('');
    var alphau  = alpha.toUpperCase().split('');
    var digits  = ('0123456789').split('');
    var minus   = ['-'];
    var uline   = ['_'];
    var space   = [' '];
    var special = ('\'"!@#$%^&*()+=~:;|.,').split('');
    var bracket = ('[]{}<>()').split('');
    
    var chars = [].concat(alphal, alphau, digits);
    
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
        for (var i = 0; i < alphal.length; i++) {
            if ( password.indexOf(alphal[i]) > -1 )
                hasLower = true;
            if ( password.indexOf(alphau[i]) > -1 )
                hasUpper = true;
        }
        if ( hasLower && hasUpper )
            strength++;
        
        // 3. digits
        for (var i = 0; i < digits.length; i++) {
            if ( password.indexOf(digits[i]) > -1 )
                hasDigits = true;
        }
        if ( hasDigits )
            strength++;
            
        // 4. special
        for (var i = 0; i < special.length; i++) {
            if ( password.indexOf(special[i]) > -1 )
                hasSpecial = true;
        }
        if ( hasSpecial )
            strength++;
        
        // 5. others
        var others = minus.concat(uline, space, bracket);
        for (var i = 0; i < others.length; i++) {
            if ( password.indexOf(others[i]) > -1 )
                hasOthers = true;
        }
        if ( hasOthers)
            strength++;
        
        return strength;
    }
    
    // document ready
    $(document).ready(function(){
        // Checkboxes Click Event
        $(".genOptions").bind("click", function(){
            // build temp string of all checked options
            var temp = "";
            $.each( $(".genOptions"), function(){
                if ( $(this).is(":checked") )
                {
                    temp += $(this).attr("name") + " ";
                }
            })
            
            // merge arrays
            chars = [].concat(
                            (temp.indexOf('alphal') > -1 ? alphal : []),
                            (temp.indexOf('alphau') > -1 ? alphau : []),
                            (temp.indexOf('digits') > -1 ? digits : []),
                            (temp.indexOf('minus') > -1 ? minus : []),
                            (temp.indexOf('uline') > -1 ? uline : []),
                            (temp.indexOf('space') > -1 ? space : []),
                            (temp.indexOf('special') > -1 ? special : []),
                            (temp.indexOf('bracket') > -1 ? bracket : [])
                        );
                        
            // (en/dis)able generate link
            ( $.trim(temp) === '' ? $('#generate_password').hide() : $('#generate_password').show() );
        });
    });
    
    // public
    return {
        Generate: function() {
            var tempString = '';
            var l = parseInt($('#length').val());
            
            for (var i = 0; i < l; i++)
            {
                var rand = Math.floor(Math.random() * chars.length);
                tempString = tempString + chars[rand];
            }
            
            $('#output').val(tempString);
            $('#strength').html( checkStrength(tempString) );
        }
    }
})(jQuery);
