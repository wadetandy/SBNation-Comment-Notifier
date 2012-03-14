var NotificationWindow = window;

var Notification = function(){
    OnClick: function(e){
        NotificationWindow.focus();

        e.target.cancel();
    }
}

Effect.OriginalAppear = Effect.Appear;

Effect.Appear = function(item) {
    if(item == 'autoupdate_info'){
        notify = webkitNotifications.createNotification('', 'CasualHoya', 'New Comments at CasualHoya');

        notify.onclick = Notification.OnClick;

        notify.show();
    }

    return Effect.OriginalAppear(item);
}
