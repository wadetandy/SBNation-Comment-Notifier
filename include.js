var NotificationWindow = window;

var Notification = {
    OnClick: function(e){
        NotificationWindow.focus();

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
}

Effect.OriginalAppear = Effect.Appear;

Effect.Appear = function(item) {
    if(item == 'autoupdate_info'){
        notify = webkitNotifications.createNotification(Notification.Icon(), Notification.Title(), Notification.Body());

        notify.onclick = Notification.OnClick;
        notify.replaceid = window.location.href;

        notify.show();
    }

    return Effect.OriginalAppear(item);
}
