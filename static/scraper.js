//alert("js loaded");
var querries = [];
var numRows = 0;
subs = {
	'All' : 'categ=All&sub=None',
	'Literature - All' : 'categ=Literature&sub=All',
	'Literature - American' : 'categ=Literature&sub=American',
	'Literature - British' : 'categ=Literature&sub=British',
	'Literature - European' : 'categ=Literature&sub=European',
	'Literature - World' : 'categ=Literature&sub=World',
	'Literature - Classical' : 'categ=Literature&sub=Classical',
	'Literature - Other' : 'categ=Literature&sub=Other',
	'History - All' : 'categ=History&sub=All',
	'History - American' : 'categ=History&sub=American',
	'History - British' : 'categ=History&sub=British',
	'History - European' : 'categ=History&sub=European',
	'History - World' : 'categ=History&sub=World',
	'History - Classical' : 'categ=History&sub=Classical',
	'History - Other' : 'categ=History&sub=Other',
	'Science - All' : 'categ=Science&sub=All',
	'Science - Biology' : 'categ=Science&sub=Biology',
	'Science - Chemistry' : 'categ=Science&sub=Chemistry',
	'Science - Physics' : 'categ=Science&sub=Physics',
	'Science - Math' : 'categ=Science&sub=Math',
	'Science - Computer Science' : 'categ=Science&sub=Computer Science',
	'Science - Other' : 'categ=Science&sub=Other',
	'Fine Arts - All' : 'categ=Fine Arts&sub=All',
	'Fine Arts - Auditory' : 'categ=Fine Arts&sub=Auditory',
	'Fine Arts - Visual' : 'categ=Fine Arts&sub=Visual',
	'Fine Arts - Audiovisual' : 'categ=Fine Arts&sub=Audiovisual',
	'Fine Arts - Other' : 'categ=Fine Arts&sub=Other',
	'Religion' : 'categ=Religion&sub=None',
	'Mythology' : 'categ=Mythology&sub=None',
	'Philosophy' : 'categ=Philosophy&sub=None',
	'Social Science' : 'categ=Social Science&sub=None',
	'Geography' : 'categ=Geography&sub=None',
	'Current Events' : 'categ=Current Events&sub=None',
	'Trash' : 'categ=Trash&sub=None'
}
$(document).ready(function(){
	addRow();
});

function addRow(){
	numRows++;
	categoryRow = document.createElement("div");
	$(categoryRow).addClass("categoryRow");
	categoryBox = document.createElement("div");
	$(categoryBox).addClass("categoryBox");
	formGroup = document.createElement("div");
	$(formGroup).addClass("form-group");
	formControl = document.createElement("select");
	$(formControl).attr({"class": "form-control", "id": ("categ"+numRows)})
	Object.keys(subs).forEach(function(e){
		opt = document.createElement("option")
		$(opt).text(e);
		$(formControl).append(opt)		
	});
	$(formGroup).append(formControl);
	$(categoryBox).append(formGroup);
	$(categoryRow).append(categoryBox);
	str = '<div style="display: inline-block">Number: </div><div class="form-group"><input class="form-control input-sm" id="num'+numRows+'" type="text"></div><div class="removeWrapper"><button class="btn remove" id="remove'+numRows+'">Remove</button></div>'
	$(categoryRow).append(str);
	$(categoryRow).hide();
	$("#categoryWrapper").append(categoryRow);
	$(categoryRow).slideDown(200);
	$("#remove"+numRows).click(function(e){
		$(this).prop('disabled', true)
		p = $(this).parent().parent();
		p.slideUp(200);
		setTimeout(function(){p.remove()},400);
		numRows--;
	});
}
