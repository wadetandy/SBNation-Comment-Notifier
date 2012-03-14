var Notification = {
    Window: window,
    ShouldShow: false,
    OnClick: function(e){
        Notification.Window.focus();
        Notification.Active = undefined;

        e.target.cancel();
    },
    Icon: function(){
        return $$('#logo img')[0].src;
    },
    Title: function(){
        return $$('#logo img')[0].alt;
    },
    Body: function(){
        return 'New Comments on ' + document.title;
    },
    CreateAndShow: function(){
        if(!Notification.ShouldShow){
            return;
        }
        
        Notification.Active = webkitNotifications.createNotification(Notification.Icon(), Notification.Title(), Notification.Body());

        Notification.Active.onclick = Notification.OnClick;
        Notification.Active.replaceid = Notification.Window.location.href;

        Notification.Active.show();
    }
}

Notification.Window.onblur = function(){
    Notification.ShouldShow = true;
}

Notification.Window.onfocus = function(){
    Notification.ShouldShow = false;
}

Effect.OriginalAppear = Effect.Appear;

Effect.Appear = function(item) {
    if(item == 'autoupdate_info'){
        Notification.CreateAndShow();
    }

    return Effect.OriginalAppear(item);
}