var Notification = {
    Window: window,
    ShouldShow: false,
    OnClick: function(e){
        Notification.Window.focus();
        Notification.Active = undefined;

        e.target.cancel();
    },
    OnError: function(e){
        console.log('there was an error with this notification');
    },
    Icon: function(){
        return $$('#logo img')[0].src;
    },
    Title: function(){
        return $$('#logo img')[0].alt;
    },
    Body: function(){
        var thread_title = document.title;
        var blog_title = ' - ' + Notification.Title();
        
        thread_title = thread_title.substr(0, thread_title.indexOf(blog_title));
        return 'New Comments on ' + thread_title;
    },
    ReplaceID: function(){
        return Notification.Window.location.href;
    },
    CreateAndShow: function(){
        if(!Notification.ShouldShow){
            return;
        }
        
        Notification.Active = webkitNotifications.createNotification(Notification.Icon(), Notification.Title(), Notification.Body());

        Notification.Active.onclick = Notification.OnClick;
        Notification.Active.onerror = Notification.OnError;
        Notification.Active.replaceId = Notification.ReplaceID();

        Notification.Active.show();
    },
}

Notification.Window.onblur = function(){
    Notification.ShouldShow = true;
}

Notification.Window.onfocus = function(){
    Notification.ShouldShow = false;
    
    if(Notification.Active != undefined){
        Notification.Active.cancel();
        Notification.Active = undefined;
    }
}

Effect.OriginalAppear = Effect.Appear;

Effect.Appear = function(item) {
    if(item == 'autoupdate_info'){
        Notification.CreateAndShow();
    }

    return Effect.OriginalAppear(item);
}