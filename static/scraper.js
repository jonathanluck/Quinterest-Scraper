//alert("js loaded");
querries = [];
topLevel = ["Literature", "History", "Science", "Fine Arts", "Religion", "Mythology", "Philosophy", "Social Science", "Geography", "Current Events", "Trash"];
subs = ["American", "British", "European", "World", "Classical", "Other", "Biology", "Chemistry", "Physics", "Math", "Computer Science", "Auditory", "Visual", "Audiovisual"];

$(document).ready(function(){
	$(".remove").click(function(e){
		p = $(this).parent().parent();
		p.slideUp(200);
		setTimeout(function(){p.remove()},400);
	});
});

function add(subj, n){
	console.log(subj);
	console.log(n);
	a = []
	if(topLevel.indexOf(subj)>=0){
		a.push(subj)
		a.push("None")
	}
	else if (subs.indexOf(subj)>=0){
		
	}
	else{
		a.push("All");
		a.push("None")
	}
	if(Math.abs(n) < 20){
		a.push(Math.abs(n));
	}
	else{
		a.push(20);
	}
	console.log(a);
	
}