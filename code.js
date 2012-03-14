var SBNation = {
    IsValidSite: function(){
        if(SBNation.IsSBN)
            return truea

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

SBNation.AppendScript = function(url){
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = url;

    $('body').append(script);
}

SBNation.Notification = {
    Setup: function(){
        if(!SBNation.IsValidSite())
            return;
        
        SBNation.AppendScript('https://github.com/wadetandy/SBNation-Comment-Notifier/raw/master/include.js');
    }
}

SBNation.Notification.Setup();


