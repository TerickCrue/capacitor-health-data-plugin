package com.cdis.plugins.health;

import android.util.Log;

public class HealthData {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
