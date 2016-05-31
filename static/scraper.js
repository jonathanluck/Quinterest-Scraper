var numRows = 0;
var id = 0;
var categoriesShowing = true;
var resSettingsShowing = false;

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
	if(numRows <=20){
		numRows++;
		$("#categoryWrapper").removeAttr("style")
		categoryRow = document.createElement("div");
		$(categoryRow).addClass("categoryRow");
		categoryBox = document.createElement("div");
		$(categoryBox).addClass("categoryBox");
		formGroup = document.createElement("div");
		$(formGroup).addClass("form-group");
		formControl = document.createElement("select");
		$(formControl).attr({"class": "form-control", "id": ("categ"+id)})
		Object.keys(subs).forEach(function(e){
			opt = document.createElement("option")
			$(opt).text(e);
			$(formControl).append(opt);
		});
		$(formGroup).append(formControl);
		$(categoryBox).append(formGroup);
		$(categoryRow).append(categoryBox);
		str = '<div style="display: inline-block">Number: </div><div class="form-group"><input class="form-control input-sm" id="num'+id+'" type="text" value="1"></div><div class="removeWrapper"><button class="btn remove" id="remove'+id+'">Remove</button></div>';
		$(categoryRow).append(str);
		$(categoryRow).hide();
		$("#categoryWrapper").append(categoryRow);
		$(categoryRow).slideDown(200);
		$("#remove"+id).click(function(e){
			$(this).prop('disabled', true)
			p = $(this).parent().parent();
			p.slideUp(200);
			setTimeout(function(){p.remove()},400);
			numRows--;
		});
		id++;
	}
}

function clearRows(){
	$('#categoryWrapper').slideUp(300).empty();
	numRows = 0;
}

function toggleCategories(){
	if(categoriesShowing){
		$("#categories").slideUp(200);
		$("#toggleCategories").text("Show Categories");
	}
	else{
		$("#categories").slideDown(200);
		$("#toggleCategories").text("Hide Categories");
	}
	categoriesShowing = !categoriesShowing;
}

function toggleresultsSettings(){
	if(resSettingsShowing){
		$("#resultsSettings").slideUp(200);
		if(!categoriesShowing){
			toggleCategories();

		}
		resSettingsShowing = !resSettingsShowing;
	}
	else if (!resSettingsShowing){
		$("#resultsSettings").slideDown(200);
		resSettingsShowing = !resSettingsShowing;
	}
}

function sub(){
	$("#submit").prop("disabled", true);
	querries = [];
	rows = document.getElementsByClassName("categoryRow");
	Array.prototype.forEach.call(rows, function(row) {
		subject = $(row).find("select").val();
		numstr = $(row).find("input").val();
		num = 1;
		if(!isNaN(parseInt(numstr))){
			num = parseInt(numstr);
			if(num > 20){
				num = 20;
			}
			if(num <= 0){
				num = 0;
			}
		}
		querries.push(subs[subject]+ "&amount=" + num);
	});
	querry = "";
	querries.forEach(function(e){
		querry += e + ";";
	});
	jQuery.get("/random/", querry, function(data){
		$("#content").empty();
		$("#resultsSettings").slideDown(200);
		resSettingsShowing=true;
		$("#content").append(data);
		$("#submit").prop("disabled", false);
	});
	setTimeout(function(){$("#submit").prop("disabled", false);},3000);
	
}
