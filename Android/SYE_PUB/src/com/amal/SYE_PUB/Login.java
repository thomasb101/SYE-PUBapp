package com.amal.SYE_PUB;

import java.util.List;

import org.apache.http.NameValuePair;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class Login extends Activity {
	//important variables include references to UI and to server access
	EditText username,password;
	serverRequest sr;
	Button login;
	String username_txt,password_txt;
	//arrayList containing parameters(input from user) to be passed to server call
	List<NameValuePair> params;
	public boolean logintest(String user, String password){
		if (user.equals("tgball11") & password.equals("test")){
			return true;
		}else return false;
	}

	@Override
	//onCreate manages functions that start when activity launches
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_login);
		sr = new serverRequest();
		username = (EditText)findViewById(R.id.username);
		password = (EditText)findViewById(R.id.password);
		login = (Button)findViewById(R.id.loginbtn);
		//listener contains instructions for responding too button when it is clicked.
		login.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				username_txt = username.getText().toString();
				password_txt = password.getText().toString();
				//                 params = new ArrayList<NameValuePair>();
				//                 params.add(new BasicNameValuePair("email", username_txt));
				//                 params.add(new BasicNameValuePair("password", password_txt));
				//serverRequest sr = new serverRequest();
				//request data from server
				//JSONObject json = sr.getJSON("placeholder url",params);
				boolean status = logintest(username_txt, password_txt);
				if (status == true){
					Intent Catagories = new Intent(Login.this,Catagories.class);
                    startActivity(Catagories);
                    finish();

				}else{
					Toast.makeText(getApplicationContext(), "wrong username or password", Toast.LENGTH_SHORT).show();
				}
			}
		});
	}
}

