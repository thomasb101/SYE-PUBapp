package com.amal.SYE_PUB;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Catagories extends Activity {
	Button breakfast;

	@Override
	//onCreate manages functions that start when activity launches
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.catagories);

		breakfast = (Button)findViewById(R.id.bfbutton);
		//listener contains instructions for responding too button when it is clicked.
		breakfast.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub

			}
		});
	}

}
