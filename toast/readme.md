# Toast widget for Smartvisu
1. place the files to
   "/dropins/" folder
2. add to your html
```{% import "toast.html" as toast %}```
3. now you can create Toast Messages!

The widget is very huge, so everything can changed. There are some templates you can use.
![Alt text](docu/example.png?raw=true "Example")

 a simple info tast(the gray one), which would automatic disappear after x seconds
```{{ toast.toast('id', 'trigger.item', '','','','Bewegung erkannt','', '','','info') }}```

template success (the green one)

```{{ toast.toast('test1', 'sprechanlage.live.bewegungsmelder','','','','Bewegung erkannt success',	'TESTEXT', '','success') }}```

template info (the blue one)

```{{ toast.toast('test1', 'sprechanlage.live.bewegungsmelder','','','','Test info',	'TESTEXT', 'message_attention','info') }}```

template warning(the orange one)

```{{ toast.toast('test2', 'sprechanlage.live.bewegungsmelder', '','sprechanlage.live.live_video','','HEADER  Bewegung erkannt! warning', 	'','','warning') }}```
  
template error(the red one)

```{{ toast.toast('id', 'trigger.item','', 'sprechanlage.live.live_video','','Bewegung!','','','error','dg.buero.licht','QUITT','') }}```

own icon from smartvisu
```{{ toast.toast('test', 'sprechanlage.live.bewegungsmelder', '','',							   '','',				'Test own icon', 'message_attention','','','','','true','false') }}```
 its possible to define all parameters at your own, because there are many more
  
*/**
* Displays a notification toast
* 4 style templates could be choosen, 'info', 'success', 'warning', 'error' or you define your own style
* 
* @param {id} unique id for this widget
* @param {item} item_trigger: (true to open, false to close)
* @param {item=} item_title : an item(optional, text)
* @param {item=} item_content : an item (optional, text, html)
* @param {item=} item_icon : an item (optional, info, warning, success, error)
* @param {text} text_title : title (optional, text)
* @param {text} text_content : plain text (optional, text or html)
* @param {text} text_icon : plain text (optional, info, warning, success, error)
* @param {value=true} template:  	 (optional, error, warning, info, when set, so paramater must set )
* @param {item=} item_button: an item to send a value on butttonpress(optional)
* @param {text=OK} text_button : button text(optional, text)
* @param {text=false} value_button : value send by button  (optional)
* @param {value=true} allowClose:  	 (optional, true, false)
* @param {text=false} hideafter (optional,`` to make it sticky or time in miliseconds to hide after)
* @param {text=slide} showhide(optional, plain, fade, slide)
* @param {text=true} showloader ()
* @param {color=#eee} color        (optional, #eee)
* @param {color=gray} bgColor          (optional, gray)
* @param {value=5} stack                     // `false` to show one stack at a time count showing the number of toasts that can be shown at once(optional)
* @param {text=left} align              // Alignment of text i.e. left, right, center(optional)
* @param {text=bottom-left} position   		// Toast position on display(optional, bottom-left, bottom-right, top-left, top-right....)
* when a template is given(info, warning, error) then the values must not set otherwise you can change every color ....
 
*/

{% macro toast(id, item_trigger, item_title, item_content, item_icon, text_title, text_content, text_icon,param_template, item_button,text_button, value_button, param_allowclose, param_hideafter, param_showhide, param_showloader, param_color,param_bgColor, param_stack, param_align, param_position ) %}

*
