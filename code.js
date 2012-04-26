var SBNation = {
    IsSBN: false,

    IsValidSite: function(){
        $('script').each(function(script){
            var src = $(this).attr('src')
            if(/sbnation\.com\/javascripts\/universal/i.test(src)){
                return true;
            }
        });
        return false;
    },

    Setup: function(){
        if(SBNation.IsValidSite()){
            var script_url = chrome.extension.getURL("include.js");
            var event_div = document.createElement('div');

            event_div.id = 'wtandy-notification-plugin';
            $('body').append(event_div);
            SBNation.AppendScript(script_url);

            document.getElementById('wtandy-notification-plugin').addEventListener('NewCommentsEvent', function() {
                SBNation.Notification.CreateAndShow();
            });

            window.onblur = function(){
                SBNation.Notification.ShouldShow = true;
            }

            window.onfocus = function(){
                SBNation.Notification.ShouldShow = false;

                if(SBNation.Notification.Active != undefined){
                    SBNation.Notification.Active.cancel();
                    SBNation.Notification.Active = undefined;
                }
            }

            chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
                if (request.type == "NotificationClick"){
                    sendResponse({status: "OK"});

                    SBNation.Notification.OnClick();
                }
            });
        }
    },

    AppendScript: function(url){
        var script = document.createElement( 'script' );
        script.type = 'text/javascript';
        script.src = url;

        $('body').append(script);
    }
}

SBNation.Notification = {
    ShouldShow: false,

    OnClick: function(e){
        window.focus();
    },

    OnError: function(e){
        console.log('there was an error with this notification');
    },

    Icon: function(){
        return $('#logo img')[0].src;
    },

    Title: function(){
        return $('#logo img')[0].alt;
    },

    Body: function(){
        var thread_title = document.title;
        var blog_title = ' - ' + SBNation.Notification.Title();

        thread_title = thread_title.substr(0, thread_title.indexOf(blog_title));
        return 'New Comments on ' + thread_title;
    },

    ReplaceID: function(){
        return window.location.href;
    },

    CreateAndShow: function(){
        // if(!SBNation.Notification.ShouldShow){
            // return;
        // }

        var request = {
            type: "CreateNotification",
            icon: SBNation.Notification.Icon(),
            title: SBNation.Notification.Title(),
            body: SBNation.Notification.Body(),
            replace_id: SBNation.Notification.ReplaceID(),
        };

        chrome.extension.sendRequest(request, function(response) {
            console.log(response.status);
        });

        // SBNation.Notification.Active = webkitNotifications.createNotification(SBNation.Notification.Icon(), SBNation.Notification.Title(), SBNation.Notification.Body());

        // SBNation.Notification.Active.onclick = SBNation.Notification.OnClick;
        // SBNation.Notification.Active.onerror = SBNation.Notification.OnError;
        // SBNation.Notification.Active.replaceId = SBNation.Notification.ReplaceID();

        // SBNation.Notification.Active.show();
    },
}

SBNation.Setup();
