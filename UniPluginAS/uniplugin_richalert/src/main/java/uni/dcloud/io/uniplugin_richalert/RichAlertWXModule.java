package uni.dcloud.io.uniplugin_richalert;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.text.TextUtils;
import android.widget.Toast;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;
import com.unionpay.UPPayAssistEx;

import org.json.JSONException;

public class RichAlertWXModule extends WXSDKEngine.DestroyableModule {
    private static String mMode = "01";
    private JSCallback jsCallback;

    @JSMethod(uiThread = true)
    public void show(JSONObject options, JSCallback jsCallback) {
        if (mWXSDKInstance.getContext() instanceof Activity) {
            this.jsCallback = jsCallback;

            if(!UPPayAssistEx.checkWalletInstalled(mWXSDKInstance.getContext())){
                JSONObject result = new JSONObject();
                result.put("type", "-1");
                jsCallback.invoke(result);
                return;
            }

            String tn = options.getString("title");
            UPPayAssistEx.startPay(mWXSDKInstance.getContext(), null, null, tn, mMode);



//            String content = options.getString(CONTENT);
//            int contentColor = WXResourceUtils.getColor(options.getString(CONTENT_COLOR), defColor);
//            String contentAlign = options.getString(CONTENT_ALIGN);
//
//            String title = options.getString(RichAlert.TITLE);
//            int titleColor = WXResourceUtils.getColor(options.getString(RichAlert.TITLE_COLOR), defColor);
//            String titleAlign = options.getString(TITLE_ALIGN);
//
//            String postion = options.getString(POSITION);
//
//            RichAlert richAlert = new RichAlert(mWXSDKInstance.getContext());
//
//            JSONArray buttons = options.getJSONArray(BUTTONS);
//            JSONObject checkBox = options.getJSONObject(CHECKBOX);
//
//            if(!TextUtils.isEmpty(title)) {
//                richAlert.setTitle(title, titleColor, titleAlign);
//            }
//            if(!TextUtils.isEmpty(content)) {
//                richAlert.setContent(content, contentColor, contentAlign,jsCallback);
//            }
//            if(checkBox != null) {
//                richAlert.setCheckBox(checkBox, jsCallback);
//            }
//            if(buttons != null) {
//                richAlert.setButtons(buttons, jsCallback);
//            }
//            if(!TextUtils.isEmpty(postion)) {
//                richAlert.setPosition(postion);
//            }
//
//            richAlert.show();
//            tracking(richAlert, jsCallback);
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        /*************************************************
         * 步骤3：处理银联手机支付控件返回的支付结果
         ************************************************/
        if (data == null) {
            return;
        }

        String msg = "";
        /*
         * 支付控件返回字符串:success、fail、cancel 分别代表支付成功，支付失败，支付取消
         */
        String str = data.getExtras().getString("pay_result");
        if (str.equalsIgnoreCase("success")) {

            // 如果想对结果数据验签，可使用下面这段代码，但建议不验签，直接去商户后台查询交易结果
            // result_data结构见c）result_data参数说明
            if (data.hasExtra("result_data")) {
                String result = data.getExtras().getString("result_data");
                try {
                    org.json.JSONObject resultJson = new org.json.JSONObject(result);
                    String sign = resultJson.getString("sign");
                    String dataOrg = resultJson.getString("data");
                    // 此处的verify建议送去商户后台做验签
                    // 如要放在手机端验，则代码必须支持更新证书
                    boolean ret = verify(dataOrg, sign, mMode);
                    if (ret) {
                        // 验签成功，显示支付结果
                        msg = "支付成功！";
                    } else {
                        // 验签失败
                        msg = "支付失败！";
                    }
                } catch (JSONException e) {
                }
            }
            // 结果result_data为成功时，去商户后台查询一下再展示成功
            msg = "支付成功！";
        } else if (str.equalsIgnoreCase("fail")) {
            msg = "支付失败！";
        } else if (str.equalsIgnoreCase("cancel")) {
            msg = "用户取消了支付";
        }

        Toast.makeText(mWXSDKInstance.getContext(), msg, Toast.LENGTH_LONG).show();

        JSONObject result = new JSONObject();
        result.put("type", msg);
        jsCallback.invoke(result);
    }

    private boolean verify(String msg, String sign64, String mode) {
        // 此处的verify，商户需送去商户后台做验签
        return true;

    }

    @JSMethod(uiThread = true)
    public void dismiss() {
        destroy();
    }


    @Override
    public void destroy() {

    }
}
