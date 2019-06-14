package com.unionpay.uppayplugin.demo;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.widget.Toast;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.unionpay.UPPayAssistEx;

import org.json.JSONException;

public class RichAlertWXModule extends WXSDKEngine.DestroyableModule {

    @JSMethod(uiThread = true)
    public void show(JSONObject options, JSCallback jsCallback) {
        if (mWXSDKInstance.getContext() instanceof Activity) {
            String content = options.getString("title");

            Activity activity = (Activity) mWXSDKInstance.getContext();

            if(UPPayAssistEx.checkWalletInstalled(activity)){
                //是否安装云闪付

                try {
                    Toast.makeText(mWXSDKInstance.getContext(), content, Toast.LENGTH_SHORT).show();

                    String serverMode = "01";
                    int ret = UPPayAssistEx.startPay(activity, null, null, content, serverMode);
                Toast.makeText(mWXSDKInstance.getContext(), ret+"", Toast.LENGTH_SHORT).show();

                } catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(mWXSDKInstance.getContext(), content, Toast.LENGTH_SHORT).show();

                }
            }else{
                Toast.makeText(mWXSDKInstance.getContext(), "请安装云闪付软件", Toast.LENGTH_SHORT).show();

            }
        }
    }

    @JSMethod(uiThread = true)
    public void dismiss() {
        destroy();
    }



    public String CONTENT_TN = "tn";



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
                    boolean ret = verify(dataOrg, sign, "01");
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

        AlertDialog.Builder builder = new AlertDialog.Builder(mWXSDKInstance.getContext());
        builder.setTitle("支付结果通知");
        builder.setMessage(msg);
        builder.setInverseBackgroundForced(true);
        // builder.setCustomTitle();
        builder.setNegativeButton("确定", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        builder.create().show();
    }

    private boolean verify(String msg, String sign64, String mode) {
        // 此处的verify，商户需送去商户后台做验签
        return true;

    }

    @Override
    public void destroy() {

    }
}
