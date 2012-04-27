var SBNation = {};

SBNation.Notification = {
    Active: {},
    OnError: function(e){
        console.log('there was an error with this notification');
    },

    CreateAndShow: function(icon, title, body, replace_id, source_tab){
        SBNation.Notification.Active[source_tab.id] = webkitNotifications.createNotification(icon, title, body);

        SBNation.Notification.Active[source_tab.id].onclick = function(e){
            //chrome.tabs.sendRequest(source_tab.id, {type: "NotificationClick"});
            chrome.tabs.update(source_tab.id, {active: true});
            e.target.cancel();
            SBNation.Notification.Active[source_tab.id] = undefined;
        };

        SBNation.Notification.Active[source_tab.id].onerror = SBNation.Notification.OnError;
        SBNation.Notification.Active[source_tab.id].replaceId = replace_id;

        SBNation.Notification.Active[source_tab.id].show();
    },
}


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.type == "CreateNotification"){
        SBNation.Notification.CreateAndShow(request.icon, request.title, request.body, request.replace_id, sender.tab);
        sendResponse({status: "OK"});
    }
    else if (request.type == "HideNotification"){
        SBNation.Notification.Active[source_tab.id].cancel();
        SBNation.Notification.Active[source_tab.id] = undefined;

        sendResponse({status: "OK"});
    }
    else {
        sendResponse({status: "Invalid Request Type"})
    }
});
