var numRows = 0;
var id = 0;
var categoriesShowing = true;
var resSettingsShowing = false;
var settings = false;
var dblink = "http://www.aseemsdb.me/results?query=";

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
	$("#diff").val("College");
});

function addRow(slide = true){
	if(numRows < 25){
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
		if(slide){
			$(categoryRow).slideDown(200);
		}
		else{
			$(categoryRow).show();
		}
		$("#remove"+id).click(function(e){
			$(this).prop('disabled', true)
			p = $(this).parent().parent();
			p.slideUp(200);
			setTimeout(function(){p.remove()},400);
			numRows--;
		});
		id++;
		return categoryRow;
	}
	return null;
}

function clearRows(slide = true){
	if(slide){
		$('#categoryWrapper').slideUp(300);
	}
	$('#categoryWrapper').empty();
	numRows = 0;
}

function toggleSettings(){
	wrapperspan  = document.createElement("span");
	caret = document.createElement("span");
	$(caret).addClass("caret");
	$(wrapperspan).append(caret);
	if(settings){
		$("#settings").slideUp(200);
		$("#settingsbtn").text("Show Settings");
		$("#settingsbtn").append(wrapperspan);
	}
	else{
		$("#settings").slideDown(200);
		$("#settingsbtn").text("Hide Settings");
		$(wrapperspan).addClass("dropup");
		$("#settingsbtn").append(wrapperspan);
	}
	settings = !settings;
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

function restoreDistro(){
	if(localStorage.getItem("distro") != null){
		setDistro(JSON.parse(localStorage["distro"]));
	}
	else{
		alert('No saved distribution found. Try saving a distribution first');
	}
}


function setDistro(distro = [["All", 5]]){
	clearRows(false);
	distro.forEach(function(e){
		row = addRow(false);
		if(row != null){
			$(row).find("select").val(e[0]);
			$(row).find("input").val(e[1]);
		}
	});
}

function sub(){
	$("#submit").prop("disabled", true);
	querries = [];
	rows = document.getElementsByClassName("categoryRow");
	diff = $("#diff").val()
	diffs = ["All", "Open", "College", "High School", "HS", "Middle School"]
	type = $("#type").val()
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
		str = subs[subject]+ "&amount=" + num + "&qtype="+type;
		if(diff != "College" && diffs.indexOf(diff) >= 0){
			str += "&difficulty=" + diff;
		}
		querries.push(str);
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
		addDBLinks();
	});
	setTimeout(function(){$("#submit").prop("disabled", false);},3000);
	
}

function addDBLinks(){
	rows = $(".row")
	Array.prototype.forEach.call(rows, function(row) {
		answer = $(row).text().match(/ANSWER: ([^[\n(]+)/)[0].trim().replace("ANSWER: ", "");
		a = document.createElement("a");
		$(a).attr("href", dblink + answer);
		$(a).attr("target", "_blank")
		$(a).text("AseemIt!");
		$(row).find(".col-md-12").append(a);
	});
	
}


function replaceQuestion(ele){
	query = $(ele).parent().find(".subjTag").text() + ";";
	row = $(ele).parent().parent();
	resultnum = $($(row).find("p")[0]).text().match(/Result: [0-9]+ /)[0]
	jQuery.get("/random/", query, function(data){
		data = $(data.replace("Result: 1 ", resultnum));
		answer = data.text().match(/ANSWER: ([^[\n(]+)/)[0].trim().replace("ANSWER: ", "");
		a = document.createElement("a");
		$(a).attr("href", dblink + answer);
		$(a).attr("target", "_blank")
		$(a).text("AseemIt!");
		data.find(".col-md-12").append(a);
		data.insertBefore($(row));
		$(row).remove();
	});
	
}

function saveDistro(){
	rows = $(".categoryRow");
	distro = [];
	Array.prototype.forEach.call(rows, function(r){
		subj = $(r).find("select").val();
		numstr = $(r).find("input").val();
		num = 1;
		temp = []
		if(!isNaN(parseInt(numstr))){
			num = parseInt(numstr);
			if(num > 20){
				num = 20;
			}
			if(num <= 0){
				num = 0;
			}
		}
		temp.push(subj);
		temp.push(num);
		distro.push(temp);
	});
	localStorage.setItem("distro", JSON.stringify(distro));
}
