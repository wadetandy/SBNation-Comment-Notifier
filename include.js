var NotificationWindow = window;

var Notification = {
    OnClick: function(e){
        NotificationWindow.focus();

        e.target.cancel();
    },
    Icon: function(){
        return $$('#logo img')[0].src;
    }
}

Effect.OriginalAppear = Effect.Appear;

Effect.Appear = function(item) {
    if(item == 'autoupdate_info'){
        notify = webkitNotifications.createNotification(Notification.Icon(), 'CasualHoya', 'New Comments at CasualHoya');

        notify.onclick = Notification.OnClick;
        notify.replaceid = window.location.href;

        notify.show();
    }

    return Effect.OriginalAppear(item);
}
