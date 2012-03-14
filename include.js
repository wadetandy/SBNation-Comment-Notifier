Effect.OriginalAppear = Effect.Appear;

Effect.Appear = function(item) {
    Effect.OriginalAppear(item);

    alert(item);
}
