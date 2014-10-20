package com.amal.SYE_PUB;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.AsyncTask;
import android.util.Log;

public class serverRequest {
	static InputStream in = null;
	static JSONObject JObj = null;
	static String Json = "";
	public serverRequest() {
	}
	// retrieve information from 
	//database in the form of JSON string
	public JSONObject JSONfromURL(String url, List<NameValuePair> params) {
        try {
            DefaultHttpClient httpClient = new DefaultHttpClient();
            HttpPost httpPost = new HttpPost(url);
            httpPost.setEntity(new UrlEncodedFormEntity(params));
            HttpResponse httpResponse = httpClient.execute(httpPost);
            HttpEntity httpEntity = httpResponse.getEntity();
            in = httpEntity.getContent();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try{
        	BufferedReader reader = new BufferedReader(new InputStreamReader(
                    in, "iso-8859-1"), 8);
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }
            in.close();
            Json = sb.toString();
            Log.e("JSON", Json);
        } catch (Exception e) {
            Log.e("Buffer Error", "Error converting result " + e.toString());
        }
        try {
            JObj = new JSONObject(Json);
        } catch (JSONException e) {
            Log.e("JSON Parser", "Error parsing data " + e.toString());
        }
        return JObj;
    }
	JSONObject jobj;
    public JSONObject getJSON(String url, List<NameValuePair> params) {
        Params param = new Params(url,params);
        Request myTask = new Request();
        try{
         jobj= myTask.execute(param).get();
        }catch (InterruptedException e) {
            e.printStackTrace();
        }catch (ExecutionException e){
            e.printStackTrace();
        }
        return jobj;
    }
    private static class Params {
        String url;
        List<NameValuePair> params;
        Params(String url, List<NameValuePair> params) {
            this.url = url;
            this.params = params;
        }
    }
    private class Request extends AsyncTask<Params, String, JSONObject> {
            @Override
        protected JSONObject doInBackground(Params... args) {
            serverRequest request = new serverRequest();
            JSONObject json = request.JSONfromURL(args[0].url,args[0].params);
            return json;
        }
        @Override
        protected void onPostExecute(JSONObject json) {
            super.onPostExecute(json);
        }
    }
    }


