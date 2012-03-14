var SBNation = {
    IsValidSite: function(){
        if(SBNation.IsSBN)
            return true

        $('script').each(function(index){
            var src = $(this).attr('src')
            if(/sbnation\.com\/javascripts\/universal/i.test(src)){
                SBNation.IsSBN = true;   
            }
        });

        if(SBNation.IsSBN)
            return true
    },
}
SBNation.IsSBN = false;

SBNation.Notification = {
    Setup: function(){
        if(!SBNation.IsValidSite())
            return;

        alert('sbnation')
            
        var script = document.createElement( 'script' );
        script.type = 'text/javascript';
        script.src = 'file://Users/wade/Desktop/extension/include.js';

        $('body').append(script);
    }
}

SBNation.Notification.Setup();


