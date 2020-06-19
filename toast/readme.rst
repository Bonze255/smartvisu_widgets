# Toast widget for Smartvisu

## Installation

1. Dateien zu 
   "/dropins/" Ordner hinzufügen
2. ```{% import "toast.html" as toast %}```
   zur html Datei hinzufügen
3. jetzt können die Toast Messages genutzt werden

## Allgemein
Das Widget ist sehr sehr mächtig  und sogut wie jeder Paramater kann verändert werden! 
![Alt text](docu/example.png?raw=true "Example")
Am einfachsten ist die Nutzung, wenn die vorgefertigten Templates genutzt werden, somit muss nur das Template angegeben werden, und die paramater dazu werden automatisch geladen.

## Templates
Es  gibt folgende Templates:
1. info
2. success
3. warning
4. error

```{{ toast.toast('id', 'triggeritem','','','','Test info',	'TESTEXT', 'message_attention','**info**') }}```
Wenn ein Template genutzt wird, brauchen nach dem template Namen keine weiteren Paramater angegeben werden. 

## Parameter
Das Widget kann entweder Inhalte von Items anzeigen, somit ist es sehr dynamisch oder man kann feste Texte hinterlegen , auch eine Mischung von beidem ist möglich!

Falls man den Toast speziell verändern möchte, stehen viele Parameter zur Verfügung.

{% macro toast(id, item_trigger, item_title, item_content, item_icon, text_title, text_content, text_icon,param_template, item_button,text_button, value_button, param_allowclose, param_hideafter, param_showhide, param_showloader, param_color,param_bgColor, param_stack, param_align, param_position ) %}

id:unique smartvisu id
item_trigger: Trigger Item zur anzeige des Toasts
item_title: Item welches die gewünschte Überschrift enthält
item_content: Item welches den gewünschten Inhalt enhält
item_icon: Item welches das gewünschte Icon enthält, es könne alle standart smartvisu Icons genutzt werden! es genügt den Icon Namen anzugeben
text_title: Titel als Text
text_content: Content als Text (auch html möglich)
text_icon: icon als textes könne alle Standart Smartvisu Icons genutzt werden! es genügt den Icon Namen anzugeben
param_template: Name des gewünschten Templates, wird dieses leergelassen, können alle parameter frei definiert werden!
item_button:  falls template error genutzt wird, kann  hier ein Item definiert werden, zu welchem beim betätigen des Buttons der Wert von value buttton gesendet wird
text_button: Text des Buttons der bei Template Error angezeigt wird
value_button: Wert, der gesendet werden soll, wenn der button betätigt wird
param_allowclose: gibt an, ob der Toast automatisch geschlossen wird, falls das Trigger item = false wird
param_hideafter: die Zeit bis der Toast automatisch geschlossen wird
param_showhide:
param_showloader:
param_color:
param_bgColor:
param_stack:
param_align:
param_position 

