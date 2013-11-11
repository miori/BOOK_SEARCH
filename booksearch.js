var count = 0;
var page_count = 1;
var html = "";

jQuery(function($) {
	
    $('#submit').click(function() {
 
		$("#search_result").html("");

        // ポストデータ
        var data = {};
		if ($('input[name="title"]').val()!="") {
			data.title = $('input[name="title"]').val();
	 	};
		if ($('input[name="author"]').val()!="") {
			data.author = $('input[name="author"]').val();
		};
		page_count = 1;
		data.hits = "20";
		data.page = page_count;
        // Ajax通信
        $.ajax({
            url: 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20130522?format=json&booksGenreId=001&applicationId=E&jsoncallback=result',
            type: 'POST',
            data: data,
            dataType: 'jsonp',
            success: function(response) {
				var items = response.Items
				html = "";
				for (var i = 0, j = items.length; i < j; i++) {
					if(count % 3 == 0){
						html += '<div class="boxContainer">';
					}
					html += '<div class="box"><img src=\"' + items[i].Item.largeImageUrl + '\"><br>';
					html += '<table><tr><td>書籍名</td><td>' + items[i].Item.title + "</td></tr>";
					html += '<tr><td>著者名</td><td>' + items[i].Item.author + "</td></tr></table>";
					html += "<Form><input name=\"openWin\" type=\"button\" value=\"詳細表示\" onClick=\"window.open('http://tobenai233.web.fc2.com/detail.html?" + items[i].Item.isbn + "','','scrollbars=yes,width=600,height=600,');\"></Form>"
					html += '</div>';
					count += 1;
					if(count % 3 == 0){
						html += '</div>';
					}
					$("#search_result").html(html);
				}
				$("#more").show();
           }
        });
        return false;
    });
    //もっと見る
    $('#more').click(function() {

		$("#more").hide();
 		page_count += 1;
 
        // ポストデータ
        var data = {};
		if ($('input[name="title"]').val()!="") {
			data.title = $('input[name="title"]').val();
	 	};
		if ($('input[name="author"]').val()!="") {
			data.author = $('input[name="author"]').val();
		};
		data.hits = "20";
		data.page = page_count;
        // Ajax通信
        $.ajax({
            url: 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20130522?format=json&booksGenreId=001&applicationId=&jsoncallback=result',
            type: 'POST',
            data: data,
            dataType: 'jsonp',
            success: function(response) {
				var items = response.Items
				for (var i = 0, j = items.length; i < j; i++) {
					if(count % 3 == 0){
						html += '<div class="boxContainer">';
					}
					html += '<div class="box"><img src=\"' + items[i].Item.largeImageUrl + '\"><br>';
					html += '<table><tr><td>書籍名</td><td>' + items[i].Item.title + "</td></tr>";
					html += '<tr><td>著者名</td><td>' + items[i].Item.author + "</td></tr></table>";
					html += "<Form><input name=\"openWin\" type=\"button\" value=\"詳細表示\" onClick=\"window.open('http://tobenai233.web.fc2.com/detail.html?" + items[i].Item.isbn + "','','scrollbars=yes,width=600,height=600,');\"></Form>"
					html += '</div>';
					count += 1;
					if(count % 3 == 0){
						html += '</div>';
					}
					$("#search_result").html(html);
				}
				$("#more").show();
            }
        });
        return false;
    });

    //スクロール時にTOPへもどるボタン表示
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 100) {
	        $("#back").fadeIn();
	    } else {
	        $("#back").stop().fadeOut();
	    }
	});
	// scroll body to 0px on click
	$("#back a").click(function () {
	    $("body,html").animate({
	        scrollTop: 0
	    }, 800);
	    return false;
	});

});

    
$(window).load(function() {
	$("#more").hide();

	$.getJSON("https://app.rakuten.co.jp/services/api/BooksBook/Search/20130522?format=json&booksGenreId=001&applicationId=&jsoncallback=result",
		function(result){
			var items = result.Items
			var html = "";
			for (var i = 0, j = items.length; i < j; i++) {
				if(count % 3 == 0){
					html += '<div class="boxContainer">';
				}
				html += '<div class="box"><img src=\"' + items[i].Item.largeImageUrl + '\"><br>';
				html += '<table><tr><td>書籍名</td><td>' + items[i].Item.title + "</td></tr>";
				html += '<tr><td>著者名</td><td>' + items[i].Item.author + "</td></tr></table>";
				html += "<Form><input name=\"openWin\" type=\"button\" value=\"詳細表示\" onClick=\"window.open('http://tobenai233.web.fc2.com/detail.html?" + items[i].Item.isbn + "','','scrollbars=yes,width=600,height=600,');\"></Form>"
				html += '</div>';
				count += 1;
				if(count % 3 == 0){
					html += '</div>';
				}
				$("#search_result").html(html);
			}
		});
})
