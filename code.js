var SBNation = {
    IsValidSite: function(){
        if(SBNation.IsSBN)
            return truea

        $$('script').each(function(script){
            if(/sbnation\.com\/javascripts\/universal/i.test(script.src)){
                SBNation.IsSBN = true;   
                alert(script.src);
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

    $$('body')[0].appendChild(script);
}

SBNation.Notification = {
    Setup: function(){
        if(!SBNation.IsValidSite())
            return;
        
        SBNation.AppendScript('https://github.com/wadetandy/SBNation-Comment-Notifier/raw/master/include.js');
    }
}

SBNation.Notification.Setup();


