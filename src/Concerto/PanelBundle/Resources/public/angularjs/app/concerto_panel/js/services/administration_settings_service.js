concertoPanel.factory('AdministrationSettingsService', function ($http) {
    return {
        settingsMapInitialized: false,
        settingsMapPath: Paths.ADMINISTRATION_SETTINGS_MAP,
        internalSettingsMap: {},
        exposedSettingsMap: {},
        fetchSettingsMap: function (params, callback) {
            var obj = this;
            $http({
                url: obj.settingsMapPath,
                method: "GET",
                params: params
            }).success(function (response) {
                obj.internalSettingsMap = response.internal;
                obj.exposedSettingsMap = response.exposed;
                obj.settingsMapInitialized = true;
                if (callback)
                    callback.call(this);
            });
        },
        get: function (key) {
            if (key in this.internalSettingsMap)
                return this.internalSettingsMap[key];
            if (key in this.exposedSettingsMap)
                return this.exposedSettingsMap[key];
            return null;
        }
    };
});
