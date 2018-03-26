(function() {
    "use strict";

    function start_app() {
        var local_storage_name = "framework";
        var app = Elm.Framework.fullscreen({
            local_storage: String((localStorage.getItem(local_storage_name) || "")),
            width: window.innerWidth,
            height: window.innerHeight
        });

        //app.ports.sendValueToJsLocalStore.subscribe(function(value) {
        //    localStorage.setItem(local_storage_name, value);
        //});

        //window.addEventListener("storage", function(event) {
        //    if (event.storageArea === localStorage && event.key === local_storage_name) {
        //        app.ports.onLocalStorageChange.send(event.newValue);
        //    }
        //}, false);
    }

    start_app();

})();
