package com.baobaoloufu.android.yun;

import android.app.Activity;
import android.widget.Toast;

import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;

import org.json.JSONObject;

public class YunPayWXModule extends WXSDKEngine.DestroyableModule {
    public String CONTENT = "content";

    @JSMethod(uiThread = true)
    public void show(JSONObject options, JSCallback jsCallback){
        if (mWXSDKInstance.getContext() instanceof Activity) {
            Toast.makeText(mWXSDKInstance.getContext(), "999999", Toast.LENGTH_SHORT).show();
        }

    }

    @Override
    public void destroy() {

    }
}
