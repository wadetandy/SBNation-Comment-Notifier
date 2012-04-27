Effect.OriginalAppear = Effect.Appear;

Effect.Appear = function(item) {
    if(item == 'autoupdate_info'){
        var event = document.createEvent('Event');
        var eventDiv = document.getElementById('wtandy-notification-plugin');

        event.initEvent('NewCommentsEvent', true, true);
        eventDiv.dispatchEvent(event);
    }

    return Effect.OriginalAppear(item);
}
