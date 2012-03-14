var NotificationWindow = window;

var Notification = {
    OnClick: function(e){
        NotificationWindow.focus();

        e.target.cancel();
    },
    Icon: function(){
        found = null;
        $$('link').each(function(link){
            if(link.rel == 'shortcut icon'){
                found = link;
            }
        })
        
        if(found == null){
            return "";
        }else{
            return found.href;
        }
    }
}

Effect.OriginalAppear = Effect.Appear;

Effect.Appear = function(item) {
    if(item == 'autoupdate_info'){
        notify = webkitNotifications.createNotification(Notification.Icon, 'CasualHoya', 'New Comments at CasualHoya');

        notify.onclick = Notification.OnClick;

        notify.show();
    }

    return Effect.OriginalAppear(item);
}
